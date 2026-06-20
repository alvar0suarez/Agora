# Agora

> Lee `docs/principios.md` y `docs/modo-colaboracion.md` y síguelos en CADA
> interacción. Lo de abajo son las decisiones específicas de ESTE proyecto.

## Qué es

App personal **local-first** para **aprender a leer y escribir griego antiguo**
(ático clásico, pronunciación **reconstruida ática**) de forma interactiva, con
métodos de eficacia probada (repetición espaciada, recuerdo activo, input
comprensible) y gamificación ligera. De un solo usuario, usada **desde el móvil
(Android)** como **PWA** instalable. Los datos viven en el dispositivo. La nube,
si algún día la hay, será solo backup cifrado, nunca el cerebro. Desarrollada con
Claude Code; el dueño es técnico pero no desarrollador de apps: dirige y revisa.

## Entorno de desarrollo

- Se desarrolla en **Claude Code en la web**: contenedor en la nube, **efímero**.
  Lo que no se commitea y pushea, se pierde. Persistir = `git push`.
- No hay dispositivo físico aquí: la prueba final "se instala en mi Android" la
  hace el dueño. Aquí se deja **verde**: `npm run build` + manifest/SW válidos.

## Stack

- Vite + React + TypeScript (estricto).
- PWA: `vite-plugin-pwa` (Workbox) → instalable + offline.
- Almacenamiento local: IndexedDB vía Dexie (`src/core/storage`).
- Cifrado ligero: WebCrypto AES-GCM (`src/core/crypto`).
- Tests: **Vitest** (`npm test`) para lógica pura (SRS, opciones…).
- Versiones fijadas (lockfile commiteado) para reproducibilidad.

## Invariantes de seguridad (no negociables)

1. NUNCA criptografía a mano. Solo WebCrypto u otras primitivas auditadas. Si una
   tarea parece pedir cripto custom, PARA y avisa.
2. Nada de claves, tokens o secretos en el código ni en el repo. Van a `.env`
   (ignorado) o a variables de entorno. Las del frontend empiezan por `VITE_`.
3. Datos sensibles → cifrados con WebCrypto antes de guardarse.
4. Nunca loguear contenido sensible (notas, credenciales, claves).
5. Seguridad LIGERA por diseño: no hay respaldo por hardware. Si una función
   necesitara grado hardware, se replantea (probablemente fuera de la PWA).

## Contrato de módulo

Cada funcionalidad vive en `src/features/<id>/` y DEBE implementar la interfaz
`FeatureModule` (`src/core/plugin/types.ts`) y registrarse en `src/app/features.ts`.
Los `features` dependen de `core`, NUNCA entre sí. La navegación la centraliza
`src/app`. Añadir un feature = crear carpeta + implementar contrato + 1 línea de
registro. Cero cambios en el núcleo.

## Cómo trabajamos

- Un cambio pequeño cada vez. Si la tarea no es trivial: primero PLAN en markdown
  y espera OK antes de implementar.
- Tras cada cambio relevante: `npm test` + `npm run build`/`typecheck` verde, luego commit.
- No añadir librerías nuevas sin avisar y justificar.
- No tocar invariantes de seguridad ni el contrato de módulo sin avisar.
- Si algo lleva 3-4 intentos sin funcionar, dilo y vuelve al último commit verde.
- **PR y despliegue los gestiono yo (Claude), por defecto.** El dueño no pulsa
  botones: yo creo el PR, lo fusiono a `main` cuando el trabajo está verde y
  aprobado, y le paso el enlace ya desplegado (GitHub Pages). Él dirige y revisa,
  no opera GitHub.

## Estructura

```
src/
  app/        shell: navegación, registro de features
  core/
    plugin/   contrato FeatureModule + registro
    storage/  Dexie (IndexedDB)
    crypto/   WebCrypto
    srs/      repetición espaciada (Leitner v1)
    greek/    datos del idioma compartidos (alfabeto…)
    ui/       componentes base
  features/   funcionalidades enchufables
docs/         principios, modo de colaboración, roadmap
```

## Fases

- **Fase 0** — esqueleto PWA verde + contrato + docs. ← hecho
- **Fase 1** — alfabeto griego. 1a (reconocer) ✅ · 1b (escribir) ✅ · 1c (gamificación) ← siguiente
- **Fase 2+** — vocabulario → lectura graduada → morfología.

Ver `docs/roadmap.md`.
