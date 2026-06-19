# Fase 1 — Alfabeto griego interactivo

> Plan de la fase. El estado vive en `docs/roadmap.md`.

## Objetivo

Leer y escribir las 24 letras del alfabeto griego desde cero, con repetición
espaciada + recuerdo activo + gamificación ligera. Pronunciación reconstruida
ática (referencia: *Vox Graeca*, W. S. Allen).

## Pasos

- **1a** ✅ Motor SRS (`core/srs`, Leitner) + datos de las 24 letras + sesión de
  **reconocimiento** (ver letra → recordar → autocalificar) con persistencia local.
- **1b** ⬜ **Producción**: ver sonido/nombre → escribir/elegir la letra.
  Interleaving reconocer/escribir en la misma sesión.
- **1c** ⬜ **Gamificación**: XP por acertar recordando, racha diaria, dominio por
  letra, resumen de sesión.

## Decisiones técnicas

- **SRS en el núcleo** (`core/srs`): función pura `review(state, grade)` con cajas
  de Leitner. Reemplazable por un algoritmo más fino (SM-2) sin tocar los features.
- **Persistencia local** (Dexie, tabla `srs`). Sin servidor.
- **Sin audio en v1**: no hay buen TTS de griego antiguo; el audio reconstruido es
  un problema de contenido (grabaciones) → mejora posterior. De momento, AFI +
  descripción escrita del sonido.
- **Escribir = elegir/teclear** en v1; el trazado a dedo de la letra queda como
  mejora futura.

## Criterio de "verde" (1a)

`build`/`typecheck` sin errores y, en la app: entrar en **Alfabeto** → repasar
varias letras → cerrar y reabrir → el progreso persiste y las falladas reaparecen
antes que las acertadas.

## Fuera de alcance (Fase 1)

Vocabulario, lectura, gramática, audio y trazado. Cada uno, su fase o mejora.
