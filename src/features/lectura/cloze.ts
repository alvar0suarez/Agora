import { APHORISMS, type Aphorism, type AphorismWord } from '../../core/greek'
import { normalizeGreek } from '../../core/greek'

/**
 * "Rellenar huecos" (cloze) sobre los aforismos: a partir del desglose palabra
 * por palabra de cada aforismo generamos ejercicios donde se tapa UNA palabra y
 * hay que escribir la que falta. Producción real anclada a comprensión lectora
 * (el tipo de ejercicio que pide el roadmap para llegar a B2).
 *
 * Lógica PURA y determinista (testeable, y clave SRS estable): un ejercicio por
 * cada palabra "tapable" de cada aforismo.
 */

/** Longitud mínima (sin acentos) de una palabra para poder ser hueco. */
const MIN_BLANK_LEN = 3

/** Un ejercicio de hueco: un aforismo con una palabra concreta tapada. */
export interface ClozeItem {
  /** Identificador estable, y a la vez clave SRS. */
  id: string
  /** Aforismo del que sale. */
  aphorismId: string
  /** Índice de la palabra tapada dentro de `words`. */
  blankIndex: number
  /** Respuesta esperada (la palabra griega que va en el hueco). */
  answer: string
  /** Pista: la glosa en español de la palabra tapada. */
  hint: string
  /** Traducción completa del aforismo (contexto). */
  translation: string
  /** Fuente del aforismo (contexto). */
  source: string
  /** Desglose completo, para pintar la frase con el hueco. */
  words: readonly AphorismWord[]
}

/** Clave SRS de un hueco (aforismo + índice de la palabra tapada). */
export const clozeId = (aphorismId: string, blankIndex: number) =>
  `lectura:cloze:${aphorismId}:${blankIndex}`

/** ¿Vale la pena tapar esta palabra? (evita partículas muy cortas). */
function isBlankable(w: AphorismWord): boolean {
  return normalizeGreek(w.gr).length >= MIN_BLANK_LEN
}

/** Construye todos los ejercicios de hueco a partir de una lista de aforismos. */
export function buildClozeItems(aphorisms: readonly Aphorism[]): ClozeItem[] {
  const items: ClozeItem[] = []
  for (const a of aphorisms) {
    a.words.forEach((w, i) => {
      if (!isBlankable(w)) return
      items.push({
        id: clozeId(a.id, i),
        aphorismId: a.id,
        blankIndex: i,
        answer: w.gr,
        hint: w.gloss,
        translation: a.translation,
        source: a.source,
        words: a.words,
      })
    })
  }
  return items
}

/** ¿La respuesta tecleada coincide con la del hueco? (sin acentos ni mayúsculas). */
export function isClozeCorrect(item: ClozeItem, typed: string): boolean {
  return normalizeGreek(typed) === normalizeGreek(item.answer)
}

/** Todos los huecos del corpus, y su índice por id. */
export const CLOZE_ITEMS = buildClozeItems(APHORISMS)
export const clozeItemById = new Map(CLOZE_ITEMS.map((it) => [it.id, it]))
