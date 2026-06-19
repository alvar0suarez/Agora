import type { GreekLetter } from '../../core/greek'

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
 * Construye las opciones de una pregunta de producción: la letra correcta
 * (`target`) más distractores tomados del resto de `pool`, todo barajado.
 *
 * Devuelve como mucho `count` opciones; siempre incluye la correcta. Si el
 * `pool` es pequeño, devuelve las que haya sin repetir.
 */
export function pickOptions(
  target: GreekLetter,
  pool: readonly GreekLetter[],
  count: number,
  rng: Rng = Math.random,
): GreekLetter[] {
  const distractors = shuffle(
    pool.filter((l) => l.id !== target.id),
    rng,
  ).slice(0, Math.max(0, count - 1))
  return shuffle([target, ...distractors], rng)
}
