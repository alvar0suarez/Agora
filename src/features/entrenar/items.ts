import { VOCAB, LETTERS, type VocabEntry, type GreekLetter } from '../../core/greek'

/**
 * «Entrenar»: una sola sesión que INTERCALA tipos de ejercicio (reconocer,
 * escribir…) entre áreas, para que practicar no sea monótono. Cada ítem usa la
 * MISMA clave SRS que su modo enfocado, así el progreso es compartido (entrenar
 * y los modos sueltos mueven las mismas cartas).
 *
 * Aquí vive el catálogo de ítems (derivado de `core`); el motor y la vista lo
 * barajan e interpretan. Empezamos con tres tipos: reconocer vocabulario,
 * ESCRIBIR vocabulario y reconocer letras.
 */
export type ExerciseType = 'vocab-rec' | 'vocab-type' | 'letter-rec'

/** Un ítem de la sesión mixta (unión discriminada por `type`). */
export type ExerciseItem =
  | { type: 'vocab-rec'; srsKey: string; entry: VocabEntry }
  | { type: 'vocab-type'; srsKey: string; entry: VocabEntry }
  | { type: 'letter-rec'; srsKey: string; letter: GreekLetter }

/** Orden fijo de tipos para intercalar de forma estable (round-robin). */
export const TYPE_ORDER: ExerciseType[] = ['vocab-rec', 'vocab-type', 'letter-rec']

// Claves SRS idénticas a las de los modos enfocados (progreso compartido).
const vocabKey = (mode: 'rec' | 'type', id: string) => `vocab:${mode}:${id}`
const letterKey = (mode: 'rec', id: string) => `alfabeto:${mode}:${id}`

/** Catálogo completo de ítems posibles. */
export const ALL_ITEMS: ExerciseItem[] = [
  ...VOCAB.map(
    (v): ExerciseItem => ({
      type: 'vocab-rec',
      srsKey: vocabKey('rec', v.id),
      entry: v,
    }),
  ),
  ...VOCAB.map(
    (v): ExerciseItem => ({
      type: 'vocab-type',
      srsKey: vocabKey('type', v.id),
      entry: v,
    }),
  ),
  ...LETTERS.map(
    (l): ExerciseItem => ({
      type: 'letter-rec',
      srsKey: letterKey('rec', l.id),
      letter: l,
    }),
  ),
]

/**
 * Todos los tipos actuales son recuerdo real (reconocer de memoria o escribir),
 * así que dan XP al acertar. Si en el futuro se añade reconocimiento asistido
 * (elección múltiple), ese devolvería false.
 */
export function earnsXp(_type: ExerciseType): boolean {
  return true
}
