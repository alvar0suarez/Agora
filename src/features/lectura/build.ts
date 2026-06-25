import { APHORISMS, type Aphorism } from '../../core/greek'

/**
 * "Construir la frase" (estilo Duolingo): te damos la traducción y las palabras
 * griegas DESORDENADAS de un aforismo real; las ordenas tocando para reconstruir
 * la frase. Es producción de orden/sintaxis (recuerdo activo), así que da XP como
 * el cloze. Aquí vive solo la lógica PURA; el estado del juego lo lleva la vista.
 */

/** Mínimo de palabras para que ordenar tenga sentido (las de 2 son triviales). */
export const MIN_TOKENS = 3

/** Un ejercicio de construir: un aforismo y el orden correcto de sus palabras. */
export interface BuildItem {
  /** Identificador estable y clave SRS. */
  id: string
  aphorismId: string
  /** Traducción (la consigna). */
  translation: string
  /** Fuente (contexto). */
  source: string
  /** Palabras griegas en su orden CORRECTO. */
  tokens: string[]
}

/** Clave SRS de un ejercicio de construir. */
export const buildId = (aphorismId: string) => `lectura:build:${aphorismId}`

/** Construye los ejercicios a partir de los aforismos con suficientes palabras. */
export function buildSentenceItems(
  aphorisms: readonly Aphorism[],
): BuildItem[] {
  return aphorisms
    .filter((a) => a.words.length >= MIN_TOKENS)
    .map((a) => ({
      id: buildId(a.id),
      aphorismId: a.id,
      translation: a.translation,
      source: a.source,
      tokens: a.words.map((w) => w.gr),
    }))
}

/** ¿El orden montado coincide con el correcto? (compara por texto, en orden). */
export function isBuildCorrect(item: BuildItem, assembled: string[]): boolean {
  return (
    assembled.length === item.tokens.length &&
    assembled.every((t, i) => t === item.tokens[i])
  )
}

/** Una ficha del banco: su posición original (clave estable) y su texto. */
export interface BuildChip {
  key: number
  text: string
}

/** Banco de fichas barajado (generador aleatorio inyectable → testeable). */
export function shuffledBank(
  item: BuildItem,
  rnd: () => number = Math.random,
): BuildChip[] {
  const chips = item.tokens.map((text, key) => ({ key, text }))
  for (let i = chips.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1))
    ;[chips[i], chips[j]] = [chips[j], chips[i]]
  }
  return chips
}

export const BUILD_ITEMS = buildSentenceItems(APHORISMS)
export const buildItemById = new Map(BUILD_ITEMS.map((it) => [it.id, it]))
