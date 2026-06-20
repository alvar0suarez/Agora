# Fase 2 — Vocabulario núcleo

> Plan de la fase. El estado vive en `docs/roadmap.md`.

## Objetivo

Aprender el léxico más útil para la meta del proyecto (leer aforismos y citas
**filosóficas** en ático): palabras de **altísima frecuencia** (artículo,
partículas, verbos comunes) + un **núcleo filosófico** (λόγος, ἀρετή, ψυχή…),
con repetición espaciada y la misma gamificación ligera ya construida.

## Arquitectura

- **Nuevo feature** `src/features/vocabulario/` que implementa el contrato
  `FeatureModule` y se registra con una línea en `src/app/features.ts`. Depende
  solo de `core`, nunca del feature `alfabeto`.
- **Reutiliza el núcleo ya hecho**:
  - `core/srs` para la memoria (cartas con clave `vocab:<dir>:<id>`).
  - `core/progress` para XP / racha / nivel (ya es transversal: el vocabulario
    también suma XP al acertar recordando).
- **Datos compartidos** en `core/greek/vocab.ts` (igual que `letters.ts`), para
  que la Fase 3 (lectura graduada) pueda referenciar las mismas palabras.

## Modelo de palabra (`VocabEntry`)

- `id` · `lemma` (griego con diacríticos) · `gloss` (significado en español,
  breve) · `pos` (categoría: sustantivo, verbo, partícula…) · `example` opcional
  (aforismo / frase corta) · `tags` (p. ej. `frecuencia`, `filosofia`).

## Sub-pasos (uno cada vez, verde + commit entre cada uno)

1. **Esqueleto + seed pequeño**: feature registrado + ~25 palabras curadas
   (frecuencia alta + términos filosóficos) + **sesión de reconocimiento**
   (ver griego → recordar significado), reutilizando SRS + progress. ← empezar aquí.
2. **Producción + interleaving**: ver significado → elegir la palabra; sesión
   mixta, espejando el alfabeto.
3. **Ampliar la lista** por tandas pequeñas y revisables (lista de frecuencia +
   núcleo filosófico). La calidad del contenido la revisa el dueño.
4. **Vista de dominio** del vocabulario (derivada del SRS).

## Decisiones técnicas

- Glosas **en español**, breves; una acepción principal por palabra en v1.
- Empezar por **reconocimiento** (como en el alfabeto), añadir producción después.
- Lista en **tandas pequeñas** revisadas, no un volcado masivo: prima la calidad.
- **Sin audio** en v1 (se añade luego, como se hizo con el alfabeto).

## Fuera de alcance (Fase 2)

Morfología (declinación/conjugación completas → Fase 4). Aquí se aprende la
palabra en su **forma de diccionario** (lema) y su significado, no a flexionarla.
