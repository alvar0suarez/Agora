import {
  VOCAB,
  LETTERS,
  REALIA,
  CLOZE_ITEMS,
  BUILD_ITEMS,
  VERB_FORMS,
  NOUN_FORMS,
  CASE_LABEL,
  type VocabEntry,
  type GreekLetter,
  type Realia,
  type ClozeItem,
  type BuildItem,
} from '../greek'

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
/** Tipos de EJERCICIO con SRS (se intercalan y dan XP). El museo no es uno. */
export type ExerciseType =
  | 'vocab-rec'
  | 'vocab-type'
  | 'vocab-dictado'
  | 'letter-rec'
  | 'cloze'
  | 'build'
  | 'morph'

/** Un drill de morfología: escribe la forma pedida de un paradigma. */
export interface MorphExercise {
  /** Lema del paradigma (λύω, λόγος…). */
  headword: string
  /** Significado del lema. */
  gloss: string
  /** Qué forma se pide ("yo (1.ª singular)", "genitivo plural"…). */
  prompt: string
  /** La forma griega correcta. */
  answer: string
}

/**
 * Un ítem de la sesión mixta. Los de SRS llevan `srsKey`; el `museo` es un
 * RESPIRO (una pieza real para mirar, sin nota ni XP) que rompe la rutina.
 */
export type ExerciseItem =
  | { type: 'vocab-rec'; srsKey: string; entry: VocabEntry }
  | { type: 'vocab-type'; srsKey: string; entry: VocabEntry }
  | { type: 'vocab-dictado'; srsKey: string; entry: VocabEntry }
  | { type: 'letter-rec'; srsKey: string; letter: GreekLetter }
  | { type: 'cloze'; srsKey: string; cloze: ClozeItem }
  | { type: 'build'; srsKey: string; build: BuildItem }
  | { type: 'morph'; srsKey: string; morph: MorphExercise }
  | { type: 'museo'; realia: Realia }

/** Ítems con SRS (todos menos el respiro de museo). */
export type SrsItem = Extract<ExerciseItem, { srsKey: string }>

/** Una pieza de museo al azar, para intercalar como respiro. */
export function museoBreather(rnd: () => number = Math.random): ExerciseItem {
  const r = REALIA[Math.floor(rnd() * REALIA.length)]
  return { type: 'museo', realia: r }
}

/** Orden fijo de tipos para intercalar de forma estable (round-robin). */
export const TYPE_ORDER: ExerciseType[] = [
  'vocab-rec',
  'cloze',
  'vocab-dictado',
  'vocab-type',
  'build',
  'morph',
  'letter-rec',
]

// Claves SRS idénticas a las de los modos enfocados (progreso compartido).
const vocabKey = (mode: 'rec' | 'type', id: string) => `vocab:${mode}:${id}`
const letterKey = (mode: 'rec', id: string) => `alfabeto:${mode}:${id}`

const numLabel = (n: 'sg' | 'pl') => (n === 'sg' ? 'singular' : 'plural')

/** Catálogo completo de ítems con SRS. */
export const ALL_ITEMS: SrsItem[] = [
  ...VOCAB.map(
    (v): SrsItem => ({
      type: 'vocab-rec',
      srsKey: vocabKey('rec', v.id),
      entry: v,
    }),
  ),
  ...VOCAB.map(
    (v): SrsItem => ({
      type: 'vocab-type',
      srsKey: vocabKey('type', v.id),
      entry: v,
    }),
  ),
  // Dictado (transcripción): OYES la palabra (voz neuronal) y la escribes.
  // Es una destreza propia (comprensión auditiva) → su propio espacio SRS.
  ...VOCAB.map(
    (v): SrsItem => ({
      type: 'vocab-dictado',
      srsKey: `vocab:dictado:${v.id}`,
      entry: v,
    }),
  ),
  ...LETTERS.map(
    (l): SrsItem => ({
      type: 'letter-rec',
      srsKey: letterKey('rec', l.id),
      letter: l,
    }),
  ),
  // Huecos y construir-frase: su `id` ya ES la clave SRS (lectura:cloze:…,
  // lectura:build:…) → progreso compartido con los modos de lectura.
  ...CLOZE_ITEMS.map(
    (c): SrsItem => ({ type: 'cloze', srsKey: c.id, cloze: c }),
  ),
  ...BUILD_ITEMS.map(
    (b): SrsItem => ({ type: 'build', srsKey: b.id, build: b }),
  ),
  // Morfología (conjugar/declinar escribiendo): MISMAS claves SRS que el drill
  // de la feature gramática (verb:type:…, noun:type:…) → progreso compartido.
  ...VERB_FORMS.map(
    ({ verb, form }): SrsItem => ({
      type: 'morph',
      srsKey: `verb:type:${form.id}`,
      morph: {
        headword: verb.lemma,
        gloss: verb.gloss,
        prompt: `${form.pronoun} (${form.person}.ª ${numLabel(form.number)})`,
        answer: form.form,
      },
    }),
  ),
  ...NOUN_FORMS.map(
    ({ noun, form }): SrsItem => ({
      type: 'morph',
      srsKey: `noun:type:${form.id}`,
      morph: {
        headword: noun.lemma,
        gloss: noun.gloss,
        prompt: `${CASE_LABEL[form.case]} ${numLabel(form.number)}`,
        answer: form.form,
      },
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
