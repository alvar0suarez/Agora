# Agora — Estructura y proceso de build/despliegue

> Documento generado para pasárselo a otra aplicación/agente que tiene definido
> un proceso de empaquetado en **APK**. Describe **cómo está montada Agora hoy**
> (es una PWA, no genera APK aún) y **cómo se construye y despliega**, para que
> la otra app pueda decir exactamente qué cambios hay que hacer aquí para
> empaquetarla en APK igual que ella.

## 1. Qué es Agora (en una línea)

App personal **local-first**, **PWA instalable** (Vite + React + TypeScript),
de un solo usuario, pensada para usarse desde Android. Los datos viven en el
dispositivo (IndexedDB). **Hoy NO produce un APK**: se instala como PWA desde
GitHub Pages ("Añadir a pantalla de inicio").

## 2. Stack y herramientas

| Pieza | Qué |
|---|---|
| Bundler | **Vite** `^5.4.10` |
| UI | **React** `^18.3.1` + React DOM |
| Lenguaje | **TypeScript** `^5.9.3` (modo estricto) |
| PWA | **vite-plugin-pwa** `^0.20.5` (Workbox, `registerType: autoUpdate`) |
| Storage local | **Dexie** `^4.0.9` (IndexedDB) |
| Cripto | WebCrypto (AES-GCM), sin librerías |
| Tests | **Vitest** `^2.1.9` (lógica pura, entorno `node`) |
| Node (CI) | **Node 20** |
| Gestor paquetes | **npm** (lockfile commiteado, `npm ci` en CI) |

## 3. Scripts de npm (`package.json`)

```json
"scripts": {
  "dev": "vite",
  "build": "tsc --noEmit && vite build",
  "preview": "vite preview",
  "typecheck": "tsc --noEmit",
  "test": "vitest run"
}
```

- **Build de producción**: `npm run build` → typecheck + `vite build`.
- **Salida del build**: carpeta **`dist/`** (estática: `index.html`, JS/CSS con
  hash, `manifest.webmanifest`, service worker `sw.js` de Workbox, e `icons/`,
  `audio/`, `images/` copiados de `public/`).

## 4. Configuración PWA y de rutas (`vite.config.ts`)

Puntos clave que afectan a cómo se sirve y se instala:

- **`base`**: en `build` es **`/Agora/`** (se publica en GitHub Pages bajo
  `https://<usuario>.github.io/Agora/`). En `dev` es `/`.
- **Manifest** (generado por el plugin):
  - `name` / `short_name`: `Agora`
  - `display`: `standalone`
  - `orientation`: `portrait`
  - `theme_color` / `background_color`: `#0f172a`
  - `lang`: `es`
  - `start_url` y `scope` se **derivan de `base`** (no se fijan a mano; fijarlos
    a `/` rompería la instalación bajo `/Agora/`).
  - **Iconos**: hoy SOLO un SVG → `icons/icon.svg`, `sizes: "any"`,
    `type: image/svg+xml`, `purpose: "any maskable"`.
    ⚠️ **No hay PNGs 192/512** (relevante para APK / TWA, que suelen exigir
    iconos PNG de tamaños concretos).
- **Service worker / offline**: Workbox precachea
  `**/*.{js,css,html,ico,png,jpg,jpeg,svg,wav,m4a}`, tamaño máx 5 MB por fichero.
- `__BUILD_ID__`: marca de tiempo de build inyectada (visible en la app para
  saber si la PWA sirve la última versión).

## 5. Cómo se despliega HOY (GitHub Actions → GitHub Pages)

Workflow: `.github/workflows/deploy.yml`

- **Disparador**: `push` a `main` (o manual con `workflow_dispatch`).
- **Job build**: `actions/checkout` → `setup-node@v4` (Node 20, cache npm) →
  `npm ci` → `npm run build` → sube `dist/` como artefacto de Pages.
- **Job deploy**: `actions/deploy-pages@v4` publica en GitHub Pages.
- **Resultado**: PWA online en `https://<usuario>.github.io/Agora/`, instalable
  en Android desde el navegador.

**No existe ningún paso de Android/APK** (ni Bubblewrap, ni Capacitor, ni
Cordova, ni Gradle, ni TWA). Ese es justamente el hueco a cubrir.

## 6. Estructura de carpetas

```
Agora/
  index.html              punto de entrada (carga /src/main.tsx)
  vite.config.ts          Vite + PWA (manifest, base, workbox)
  package.json            scripts y deps
  .github/workflows/
    deploy.yml            CI: build + deploy a GitHub Pages
  public/                 assets servidos tal cual
    icons/icon.svg        ÚNICO icono (SVG)
    audio/                clips .wav (letras, vocab, aforismos)
    images/realia/        imágenes .jpg
  src/
    app/                  shell: App.tsx, registro de features (features.ts)
    core/
      plugin/             contrato FeatureModule + registro
      storage/            Dexie (IndexedDB)
      crypto/             WebCrypto (AES-GCM)
      srs/                repetición espaciada (Leitner)
      greek/              datos del idioma (alfabeto, vocab, verbos…)
      audio/              resolución/reproducción de clips
      quiz/ plan/ progress/ settings/ ui/
    features/             funcionalidades enchufables (contrato FeatureModule):
      inicio/ alfabeto/ vocabulario/ gramatica/ etimologia/
      lectura/ camino/ museo/
    main.tsx              bootstrap React + registro service worker (PWA)
    index.css
  docs/                   principios, roadmap, fases, fuentes…
```

Arquitectura: cada feature vive en `src/features/<id>/`, implementa el contrato
`FeatureModule` (`src/core/plugin/types.ts`) y se registra en
`src/app/features.ts`. Los features dependen de `core`, nunca entre sí.

## 7. Restricciones / invariantes a respetar (importante para la otra app)

- **Local-first**: los datos NO salen del dispositivo. Nada de backend obligatorio.
- **Sin librerías nuevas sin justificación.** Si la solución APK añade deps
  (Capacitor, Bubblewrap…), hay que avisar y razonar.
- **Cripto solo con WebCrypto**, nunca a mano.
- **Nada de secretos/keys en el repo** (van a `.env` o variables de entorno;
  las de frontend empiezan por `VITE_`). Un keystore de firma de Android NO
  debe commitearse: iría como secreto del repo / variable de CI.
- El despliegue lo gestiona el agente (PR → merge a `main` → Pages).

## 8. Lo que necesito que me devuelva la otra app

Dado lo anterior, dime **qué cambios concretos hacer en ESTE repo** para
empaquetar la PWA como **APK instalable**, igual que haces tú. En concreto:

1. **Enfoque**: ¿TWA (Trusted Web Activity con Bubblewrap), Capacitor, o WebView
   propio? ¿Por qué ese y no otro para una PWA local-first?
2. **Dependencias / herramientas** exactas a añadir (y si requieren Android SDK,
   JDK, Gradle… y qué versiones).
3. **Ficheros nuevos** y su contenido (config del empaquetador, manifest Android,
   `assetlinks.json` si es TWA, etc.).
4. **Iconos**: qué tamaños/formatos PNG hacen falta y dónde colocarlos (hoy solo
   hay 1 SVG).
5. **Ajustes en `vite.config.ts` / manifest** (¿`base`, `start_url`, `scope`,
   `id`? ¿hace falta dominio propio para TWA o sirve GitHub Pages bajo `/Agora/`?).
6. **Firma del APK**: cómo generar y dónde guardar el keystore (sin commitearlo).
7. **CI**: paso(s) nuevos en GitHub Actions para producir el APK como artefacto
   descargable (y/o adjuntarlo a una Release), sin romper el deploy a Pages actual.
8. **Comandos** para construir el APK en local y verificar que instala en Android.
