/**
 * Paradigmas verbales para los drills de morfología (Fase 4). Empezamos por el
 * presente de indicativo activo: el verbo modelo regular λύω y el esencial εἰμί.
 *
 * Se aprende la FORMA completa (no se construye desde reglas todavía); las reglas
 * y más tiempos llegan por tandas. Datos en `core` (compartidos por features).
 */

/** Persona y número de una forma verbal, con su pronombre español de apoyo. */
export interface VerbForm {
  /** Id único global (incluye el verbo), p. ej. 'luo-2sg'. */
  id: string
  person: 1 | 2 | 3
  number: 'sg' | 'pl'
  /** Pronombre español de apoyo ('yo', 'tú', 'él/ella'…). */
  pronoun: string
  /** La forma griega. */
  form: string
}

/** Un verbo con su paradigma (un tiempo/modo por ahora). */
export interface Verb {
  id: string
  /** Lema (1.ª persona singular, como en los diccionarios griegos). */
  lemma: string
  gloss: string
  /** Tiempo y modo del paradigma, en español. */
  tense: string
  forms: VerbForm[]
}

/** Construye las 6 formas de un paradigma a partir de sus cadenas. */
function paradigm(
  verbId: string,
  [s1, s2, s3, p1, p2, p3]: [string, string, string, string, string, string],
): VerbForm[] {
  return [
    { id: `${verbId}-1sg`, person: 1, number: 'sg', pronoun: 'yo', form: s1 },
    { id: `${verbId}-2sg`, person: 2, number: 'sg', pronoun: 'tú', form: s2 },
    { id: `${verbId}-3sg`, person: 3, number: 'sg', pronoun: 'él/ella', form: s3 },
    { id: `${verbId}-1pl`, person: 1, number: 'pl', pronoun: 'nosotros', form: p1 },
    { id: `${verbId}-2pl`, person: 2, number: 'pl', pronoun: 'vosotros', form: p2 },
    { id: `${verbId}-3pl`, person: 3, number: 'pl', pronoun: 'ellos', form: p3 },
  ]
}

export const VERBS: Verb[] = [
  {
    id: 'luo',
    lemma: 'λύω',
    gloss: 'desatar, soltar',
    tense: 'presente de indicativo activo',
    forms: paradigm('luo', [
      'λύω',
      'λύεις',
      'λύει',
      'λύομεν',
      'λύετε',
      'λύουσιν',
    ]),
  },
  {
    id: 'eimi',
    lemma: 'εἰμί',
    gloss: 'ser, estar',
    tense: 'presente de indicativo',
    forms: paradigm('eimi', [
      'εἰμί',
      'εἶ',
      'ἐστίν',
      'ἐσμέν',
      'ἐστέ',
      'εἰσίν',
    ]),
  },
]

export const verbById = new Map(VERBS.map((v) => [v.id, v]))

/** Todas las formas con su verbo, aplanadas (para los drills). */
export const VERB_FORMS: { verb: Verb; form: VerbForm }[] = VERBS.flatMap((v) =>
  v.forms.map((form) => ({ verb: v, form })),
)
