/**
 * Paradigmas nominales (declinaciones) para los drills de morfología. Empezamos
 * por los modelos básicos del ático: λόγος (2.ª declinación, masculino) y ψυχή
 * (1.ª declinación, femenino), en los cuatro casos principales (nominativo,
 * genitivo, dativo, acusativo), singular y plural.
 *
 * Saber los casos es la llave para LEER frases (quién hace qué a quién), así que
 * es contenido central hacia el objetivo de lectura. Datos en `core`.
 */

/** Caso gramatical (los cuatro principales en v1). */
export type GrammaticalCase = 'nom' | 'gen' | 'dat' | 'acc'

/** Nombre español de cada caso. */
export const CASE_LABEL: Record<GrammaticalCase, string> = {
  nom: 'nominativo',
  gen: 'genitivo',
  dat: 'dativo',
  acc: 'acusativo',
}

/** Una forma declinada concreta. */
export interface NounForm {
  /** Id único global, p. ej. 'logos-gen-sg'. */
  id: string
  case: GrammaticalCase
  number: 'sg' | 'pl'
  form: string
}

/** Un sustantivo con su declinación. */
export interface Noun {
  id: string
  /** Lema (nominativo singular). */
  lemma: string
  gloss: string
  gender: 'masculino' | 'femenino' | 'neutro'
  declension: string
  forms: NounForm[]
}

const CASES: GrammaticalCase[] = ['nom', 'gen', 'dat', 'acc']

/** Construye las 8 formas (4 casos × 2 números) de una declinación. */
function decline(
  id: string,
  sg: [string, string, string, string],
  pl: [string, string, string, string],
): NounForm[] {
  return [
    ...CASES.map((c, i) => ({
      id: `${id}-${c}-sg`,
      case: c,
      number: 'sg' as const,
      form: sg[i],
    })),
    ...CASES.map((c, i) => ({
      id: `${id}-${c}-pl`,
      case: c,
      number: 'pl' as const,
      form: pl[i],
    })),
  ]
}

export const NOUNS: Noun[] = [
  {
    id: 'logos',
    lemma: 'λόγος',
    gloss: 'palabra, razón',
    gender: 'masculino',
    declension: '2.ª declinación',
    forms: decline(
      'logos',
      ['λόγος', 'λόγου', 'λόγῳ', 'λόγον'],
      ['λόγοι', 'λόγων', 'λόγοις', 'λόγους'],
    ),
  },
  {
    id: 'psyche',
    lemma: 'ψυχή',
    gloss: 'alma',
    gender: 'femenino',
    declension: '1.ª declinación',
    forms: decline(
      'psyche',
      ['ψυχή', 'ψυχῆς', 'ψυχῇ', 'ψυχήν'],
      ['ψυχαί', 'ψυχῶν', 'ψυχαῖς', 'ψυχάς'],
    ),
  },
]

export const nounById = new Map(NOUNS.map((n) => [n.id, n]))

/** Todas las formas nominales con su sustantivo, aplanadas (para los drills). */
export const NOUN_FORMS: { noun: Noun; form: NounForm }[] = NOUNS.flatMap((n) =>
  n.forms.map((form) => ({ noun: n, form })),
)
