import { VOCAB, type VocabEntry } from '../../core/greek'

/**
 * "Emparejar" (matching): práctica ligera de reconocimiento donde casas cada
 * palabra griega con su significado. Es reconocimiento ASISTIDO (no producción
 * de memoria), así que —igual que la elección múltiple— NO da XP: es un
 * calentamiento de entrada comprensible, no un repaso que mueva el SRS.
 *
 * Aquí vive solo la lógica PURA (armar una ronda barajada); el estado del juego
 * lo lleva la vista. Determinista si se le inyecta el generador aleatorio.
 */

/** Pares por ronda (cómodo en móvil: dos columnas cortas). */
export const PAIRS_PER_ROUND = 5

/** Una carta de una columna: su id de palabra y el texto a mostrar. */
export interface MatchCard {
  id: string
  text: string
}

/** Una ronda: los pares de origen y las dos columnas ya barajadas. */
export interface MatchRound {
  /** Carta griega (id → lema), barajada. */
  greek: MatchCard[]
  /** Carta española (id → significado), barajada (orden distinto). */
  spanish: MatchCard[]
}

/** Baraja una copia del array (Fisher-Yates) con un generador inyectable. */
function shuffle<T>(arr: readonly T[], rnd: () => number): T[] {
  const out = arr.slice()
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

/** Toma `size` entradas (las primeras; el llamante baraja la selección). */
export function pickEntries(
  entries: readonly VocabEntry[],
  size: number,
): VocabEntry[] {
  return entries.slice(0, Math.max(0, Math.min(size, entries.length)))
}

/** Arma una ronda de emparejar a partir de unas entradas ya elegidas. */
export function buildMatchRound(
  entries: readonly VocabEntry[],
  rnd: () => number = Math.random,
): MatchRound {
  const greek = shuffle(
    entries.map((e) => ({ id: e.id, text: e.lemma })),
    rnd,
  )
  const spanish = shuffle(
    entries.map((e) => ({ id: e.id, text: e.gloss })),
    rnd,
  )
  return { greek, spanish }
}

/** Una ronda nueva con una selección aleatoria del léxico. */
export function newMatchRound(rnd: () => number = Math.random): MatchRound {
  const sample = shuffle(VOCAB, rnd).slice(0, PAIRS_PER_ROUND)
  return buildMatchRound(sample, rnd)
}
