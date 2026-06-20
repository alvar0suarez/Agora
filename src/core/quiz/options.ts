/**
 * Utilidad de quiz: construir las opciones de una pregunta de elección múltiple.
 * Genérica (sirve para letras, vocabulario…), por eso vive en `core` y la usan
 * varios features. Lógica PURA y testeable (el RNG se inyecta).
 */

/** Cualquier ítem con identificador estable. */
export interface Identifiable {
  id: string
}

/** Función que devuelve un número en [0, 1). Inyectable para testear. */
export type Rng = () => number

/**
 * Baraja una copia de `items` (Fisher–Yates). No muta el original.
 * El `rng` se inyecta para poder testear de forma determinista.
 */
function shuffle<T>(items: readonly T[], rng: Rng): T[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

/**
 * Construye las opciones de una pregunta: el ítem correcto (`target`) más
 * distractores tomados del resto de `pool`, todo barajado.
 *
 * Devuelve como mucho `count` opciones; siempre incluye el correcto. Si el
 * `pool` es pequeño, devuelve los que haya sin repetir.
 */
export function pickOptions<T extends Identifiable>(
  target: T,
  pool: readonly T[],
  count: number,
  rng: Rng = Math.random,
): T[] {
  const distractors = shuffle(
    pool.filter((item) => item.id !== target.id),
    rng,
  ).slice(0, Math.max(0, count - 1))
  return shuffle([target, ...distractors], rng)
}
