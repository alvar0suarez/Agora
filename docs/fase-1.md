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
- **1c** ⬜ **Gamificación** (ver plan abajo): XP por acertar recordando, racha
  diaria, dominio por letra, resumen de sesión, interleaving.

## Plan 1c — gamificación ligera (acordado, pendiente de implementar)

> Principio: la gamificación va **anclada al recuerdo real**, no a tocar botones.
> XP solo al acertar recordando (grade `good` en recuerdo activo).

**Decisiones de arquitectura:**

- **XP + racha → nuevo `core/progress`** (Dexie), NO dentro del feature: la
  gamificación es transversal (la Fase 2 de vocabulario también dará XP). Lógica
  pura y testeable (cálculo de XP, racha por días).
- **Dominio por letra → DERIVADO del SRS** existente: la caja de Leitner de cada
  carta ya es su nivel de dominio. No se persiste nada nuevo; solo se muestra.
- **Resumen → ampliar `SessionSummary`** (XP ganada, racha).
- **Interleaving → modo "mixto"** en `useLetterSession` (hoy recibe una sola
  dirección `rec`/`prod`).

**Sub-pasos (uno cada vez, verde + commit entre cada uno):**

1. `core/progress`: XP + racha diaria (lógica pura + Dexie + tests). Mostrar XP y
   racha en el resumen de sesión. ← empezar por aquí.
2. Vista de **dominio**: las 24 letras con su nivel (derivado del SRS).
3. **Interleaving**: sesión que mezcla reconocer/escribir.

## Decisiones técnicas

- **SRS en el núcleo** (`core/srs`): función pura `review(state, grade)` con cajas
  de Leitner. Reemplazable por un algoritmo más fino (SM-2) sin tocar los features.
- **Persistencia local** (Dexie, tabla `srs`). Sin servidor.
- **Audio**: añadido tras 1a/1b. No hay buen TTS de ático reconstruido (y el
  griego moderno enseña mal), así que se generan **clips con eSpeak + fonemas
  curados** en build-time (robótico pero correcto). Detalle en `docs/audio.md`.
  Mejora futura: voz humana.
- **Escribir = elegir/teclear** en v1; el trazado a dedo de la letra queda como
  mejora futura.

## Criterio de "verde" (1a)

`build`/`typecheck` sin errores y, en la app: entrar en **Alfabeto** → repasar
varias letras → cerrar y reabrir → el progreso persiste y las falladas reaparecen
antes que las acertadas.

## Fuera de alcance (Fase 1)

Vocabulario, lectura, gramática, audio y trazado. Cada uno, su fase o mejora.
