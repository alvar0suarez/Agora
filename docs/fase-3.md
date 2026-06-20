# Fase 3 — Lectura graduada

> Plan de la fase. El estado vive en `docs/roadmap.md`.

## Objetivo

Leer griego de verdad: las frases que aparecen en libros, citas e inscripciones.
Método: **input comprensible** (textos un punto por encima del nivel) + recuerdo
del vocabulario ya aprendido. Es el corazón de la meta (leer filosofía sin
depender de la traducción).

## Estado

- ✅ **Semilla** (`features/lectura`): navegar **aforismos célebres** con su
  traducción y **desglose palabra por palabra**. Sin SRS todavía: aquí prima la
  EXPOSICIÓN, no el drill. Datos en `core/greek/aphorisms.ts` (compartidos).

## Siguientes pasos (propuesta)

- Ampliar el corpus de aforismos/γνῶμαι por tandas revisadas.
- Enlazar las palabras del aforismo con el vocabulario (`core/greek/vocab.ts`):
  tocar una palabra → ver su ficha; marcar palabras nuevas para el SRS.
- "Lo entendí / repásamelo": meter la lectura en el progreso (XP por comprensión)
  sin romper el principio de anclar la gamificación al recuerdo real.
- Frases graduadas por dificultad (longitud, vocabulario conocido).

## Decisiones

- Atribuciones honestas ("atribuido a" cuando es tradición, no texto literal).
- Traducción y glosas en español, breves y literales para que se vea la
  correspondencia palabra a palabra.
