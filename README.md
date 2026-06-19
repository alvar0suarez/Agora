# Agora

App personal **local-first** (PWA) pensada para usarse **desde el móvil (Android)**.
Un solo usuario. Los datos viven en el dispositivo.

## Stack

- **Vite + React + TypeScript** (estricto)
- **PWA** instalable y offline (`vite-plugin-pwa`)
- Almacenamiento local: **IndexedDB** vía **Dexie**
- Cifrado ligero: **WebCrypto** (sin criptografía hecha a mano)

## Arrancar

```bash
npm install
npm run dev
```

Abre la URL que muestra Vite. Para probar la versión instalable:

```bash
npm run build
npm run preview
```

Desde Chrome en Android: menú → **"Añadir a pantalla de inicio"**.

## Scripts

| Comando             | Qué hace                                  |
| ------------------- | ----------------------------------------- |
| `npm run dev`       | Servidor de desarrollo                    |
| `npm run build`     | Comprueba tipos y genera la PWA en `dist/`|
| `npm run preview`   | Sirve la build de producción              |
| `npm run typecheck` | Solo comprobación de tipos                |

## Arquitectura

- `src/core/` — núcleo: contrato de plugins, almacenamiento, cifrado, UI base.
- `src/features/` — funcionalidades enchufables. Cada una implementa `FeatureModule`.
- `src/app/` — shell: descubre los features y construye la navegación.

**Añadir una funcionalidad** = crear su carpeta en `src/features/`, implementar
`FeatureModule` y registrarla en `src/app/features.ts`. El núcleo no se toca.

## Documentación

- [`CLAUDE.md`](./CLAUDE.md) — contexto permanente para Claude Code.
- [`docs/principios.md`](./docs/principios.md) — forma de trabajar (método).
- [`docs/modo-colaboracion.md`](./docs/modo-colaboracion.md) — cómo colabora Claude.
- [`docs/roadmap.md`](./docs/roadmap.md) — fases y estado del proyecto.
