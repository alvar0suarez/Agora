# Roadmap de Agora

> Documento vivo: el estado y las fases del proyecto. Se actualiza al cerrar cada
> tarea relevante. El "qué" detallado de cada feature se decide con el dueño antes
> de empezarla.

## Estado actual

**Fase 0 — esqueleto PWA verde.** ✅ Completada.

## Fases

### Fase 0 — Cimiento (hecho)

Objetivo: una base sólida y verde sobre la que construir, sin funcionalidades aún.

- [x] Proyecto Vite + React + TypeScript (estricto).
- [x] PWA instalable y offline (`vite-plugin-pwa`).
- [x] Núcleo: contrato `FeatureModule` + registro, almacenamiento (Dexie),
      cifrado (WebCrypto), UI base.
- [x] Shell que descubre features y construye la navegación.
- [x] `CLAUDE.md` + `docs/` (principios, modo de colaboración).
- [x] Build verde + commit.

Criterio de "verde": `npm run build` sin errores, manifest y service worker
válidos, y el shell pinta el conjunto de features registrados.

### Fase 1+ — Funcionalidades (por definir)

Pendiente de sesión de diseño con el dueño: decidir las funcionalidades reales,
cómo se usarán y qué contenidos manejan. Cada una se implementará como un feature
en `src/features/`, una por sesión enfocada.

Ideas / candidatas (sin compromiso, se rellenará al hablarlo):

- _(pendiente)_

## Notas de decisiones

- **PWA en vez de Android nativo**: se desarrolla en Claude Code en la web (sin
  dispositivo ni SDK), la seguridad requerida es ligera, y la PWA corre en Android
  y se instala desde el móvil. Si en el futuro hiciera falta acceso nativo
  profundo, la vía es envolver la PWA con Capacitor.
- **Seguridad ligera**: WebCrypto + almacenamiento del dispositivo. Sin respaldo
  por hardware (no es el caso de uso).
