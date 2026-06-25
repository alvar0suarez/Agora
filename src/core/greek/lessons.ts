/**
 * Lecciones de TEORÍA: mini-artículos que explican cómo funciona el griego
 * (acentos, casos, conjugación…), para ENTENDER el sistema y no solo memorizar
 * palabras. Se leen "intercaladas en el camino": cada lección pertenece a una
 * banda de lectura (`band`) y se va desbloqueando con el nivel.
 *
 * Contenido estructurado (no markdown suelto) para que renderice consistente y
 * pueda apoyarse en los paradigmas reales de `verbs.ts`/`nouns.ts`. Vive en
 * `core` porque lo comparten features (la pestaña Teoría y el Camino). Datos
 * curados a mano y revisables; nivel introductorio.
 */

import { VERBS } from './verbs'
import { NOUNS, CASE_LABEL, type GrammaticalCase } from './nouns'

/** Un bloque de una lección (unión discriminada por `kind`). */
export type LessonBlock =
  | { kind: 'parrafo'; text: string }
  | { kind: 'titulo'; text: string }
  | { kind: 'ejemplo'; gr: string; pron?: string; gloss: string }
  | { kind: 'tip'; text: string }
  | { kind: 'tabla'; caption: string; headers: string[]; rows: string[][] }

const CASE_ORDER: GrammaticalCase[] = ['nom', 'gen', 'dat', 'acc']

/** Tabla de una declinación, DERIVADA del paradigma real (sin duplicar datos). */
function nounTable(nounId: string): LessonBlock {
  const n = NOUNS.find((x) => x.id === nounId)
  if (!n) throw new Error(`nounTable: sustantivo desconocido '${nounId}'`)
  const form = (c: GrammaticalCase, num: 'sg' | 'pl') =>
    n.forms.find((f) => f.case === c && f.number === num)?.form ?? '—'
  return {
    kind: 'tabla',
    caption: `${n.lemma} — ${n.declension} (${n.gender})`,
    headers: ['Caso', 'Singular', 'Plural'],
    rows: CASE_ORDER.map((c) => [CASE_LABEL[c], form(c, 'sg'), form(c, 'pl')]),
  }
}

/** Tabla de conjugación, DERIVADA del paradigma real (sin duplicar datos). */
function verbTable(verbId: string): LessonBlock {
  const v = VERBS.find((x) => x.id === verbId)
  if (!v) throw new Error(`verbTable: verbo desconocido '${verbId}'`)
  const form = (p: 1 | 2 | 3, num: 'sg' | 'pl') =>
    v.forms.find((f) => f.person === p && f.number === num)?.form ?? '—'
  return {
    kind: 'tabla',
    caption: `${v.lemma} — ${v.tense}`,
    headers: ['Persona', 'Singular', 'Plural'],
    rows: ([1, 2, 3] as const).map((p) => [
      `${p}.ª`,
      form(p, 'sg'),
      form(p, 'pl'),
    ]),
  }
}

/** Una lección de teoría, asociada a una banda del camino. */
export interface Lesson {
  /** Id único y estable. */
  id: string
  /** Título visible. */
  title: string
  /** Emoji para la lista. */
  icon: string
  /** Banda de lectura a la que pertenece ('Cimientos', 'A1'… como READING_BANDS). */
  band: string
  /** Resumen de una línea. */
  summary: string
  /** Cuerpo del artículo, en orden. */
  blocks: LessonBlock[]
}

export const LESSONS: Lesson[] = [
  {
    id: 'acentos',
    title: 'Los acentos',
    icon: '🎵',
    band: 'Cimientos',
    summary: 'Agudo, grave y circunflejo: qué son y cómo se leen.',
    blocks: [
      {
        kind: 'parrafo',
        text: 'Casi toda palabra griega lleva un acento escrito sobre una vocal. Hay tres y conviene reconocerlos desde el principio, porque cambian cómo suena la palabra (y a veces, qué significa).',
      },
      { kind: 'titulo', text: 'Los tres acentos' },
      {
        kind: 'ejemplo',
        gr: 'λόγος',
        pron: 'LÓ-gos',
        gloss: 'palabra, razón — acento AGUDO (´) sobre la ο',
      },
      {
        kind: 'ejemplo',
        gr: 'δῶρον',
        pron: 'DÔ-ron',
        gloss: 'regalo — acento CIRCUNFLEJO (͂) sobre la ω larga',
      },
      {
        kind: 'ejemplo',
        gr: 'τὸν λόγον',
        pron: 'ton LÓ-gon',
        gloss: 'la palabra (acus.) — acento GRAVE (`) en τὸν',
      },
      { kind: 'titulo', text: '¿Tono, no fuerza?' },
      {
        kind: 'parrafo',
        text: 'En la pronunciación ática reconstruida el acento era de ALTURA (un tono musical), no de intensidad como en español. En el agudo la voz sube; en el circunflejo sube y baja dentro de la misma vocal larga; el grave es un agudo "rebajado". Para empezar a leer basta con marcar ahí un ligero énfasis.',
      },
      { kind: 'titulo', text: 'Dónde puede caer' },
      {
        kind: 'parrafo',
        text: 'El acento vive en una de las TRES últimas sílabas (ley de limitación). El AGUDO puede ir en cualquiera de esas tres; el CIRCUNFLEJO solo en las dos últimas y sobre vocal larga o diptongo; el GRAVE solo en la última, y aparece cuando una palabra con agudo final va seguida de otra sin pausa (por eso λόγος → τὸν λόγον).',
      },
      {
        kind: 'tip',
        text: 'No confundas el acento con el ESPÍRITU de la vocal inicial: ἁ (áspero) se lee con una h aspirada; ἀ (suave) no suena. Es otra marca distinta, aunque se escriba arriba.',
      },
    ],
  },
  {
    id: 'casos',
    title: 'Los casos (declinaciones)',
    icon: '🧩',
    band: 'A2',
    summary: 'Por qué la terminación de la palabra dice su función en la frase.',
    blocks: [
      {
        kind: 'parrafo',
        text: 'En español el orden marca quién hace qué ("el perro muerde al hombre" ≠ "el hombre muerde al perro"). En griego lo marca la TERMINACIÓN de la palabra: por eso el orden es libre y hay que mirar el final. A ese cambio de terminaciones se le llama declinación.',
      },
      { kind: 'titulo', text: 'Los cuatro casos' },
      {
        kind: 'parrafo',
        text: 'Nominativo: el SUJETO (quién realiza la acción). Acusativo: el objeto directo (a quién/qué se hace). Genitivo: pertenencia u origen (normalmente "de"). Dativo: destinatario o instrumento (normalmente "a/para" o "con").',
      },
      {
        kind: 'ejemplo',
        gr: 'ὁ λόγος / τὸν λόγον',
        gloss: 'la palabra como SUJETO (nom.) / como OBJETO (acus.)',
      },
      { kind: 'titulo', text: '2.ª declinación (masculina): λόγος' },
      nounTable('logos'),
      { kind: 'titulo', text: '1.ª declinación (femenina): ψυχή' },
      nounTable('psyche'),
      {
        kind: 'tip',
        text: 'Truco de lectura: ante una palabra, pregúntate "¿qué función tiene?" mirando su terminación. Reconocer el caso es la llave para entender quién hace qué a quién.',
      },
    ],
  },
  {
    id: 'verbo-presente',
    title: 'El presente del verbo',
    icon: '🔁',
    band: 'A2',
    summary: 'Conjugar: la terminación dice la persona y el número.',
    blocks: [
      {
        kind: 'parrafo',
        text: 'El verbo griego también cambia de terminación. La raíz se mantiene (λύ‑ = "soltar") y la terminación indica QUIÉN actúa (persona: yo/tú/él…) y CUÁNTOS (número: singular/plural). No hace falta el pronombre: ya va en la terminación.',
      },
      { kind: 'titulo', text: 'λύω «desatar, soltar», en presente' },
      verbTable('luo'),
      {
        kind: 'parrafo',
        text: 'Fíjate en el patrón regular del presente activo: ‑ω, ‑εις, ‑ει, ‑ομεν, ‑ετε, ‑ουσι(ν). Esas seis terminaciones se repiten en muchísimos verbos.',
      },
      { kind: 'titulo', text: 'El verbo «ser»: εἰμί' },
      verbTable('eimi'),
      {
        kind: 'tip',
        text: 'εἰμί es irregular y frecuentísimo (como «ser» en español): conviene aprendérselo de memoria desde el principio.',
      },
    ],
  },
  {
    id: 'articulo',
    title: 'El artículo (ὁ, ἡ, τό)',
    icon: '🗝️',
    band: 'A2',
    summary: 'El «el/la/lo» griego: un mapa de género, número y caso.',
    blocks: [
      {
        kind: 'parrafo',
        text: 'El artículo es la palabra más frecuente del griego y un mapa en miniatura: cambia según el GÉNERO (masculino, femenino, neutro), el NÚMERO (singular/plural) y el CASO. Si reconoces el artículo, ya sabes qué función tiene el sustantivo que le acompaña.',
      },
      { kind: 'titulo', text: 'Singular' },
      {
        kind: 'tabla',
        caption: 'El artículo en singular',
        headers: ['Caso', 'Masculino', 'Femenino', 'Neutro'],
        rows: [
          ['nominativo', 'ὁ', 'ἡ', 'τό'],
          ['genitivo', 'τοῦ', 'τῆς', 'τοῦ'],
          ['dativo', 'τῷ', 'τῇ', 'τῷ'],
          ['acusativo', 'τόν', 'τήν', 'τό'],
        ],
      },
      { kind: 'titulo', text: 'Plural' },
      {
        kind: 'tabla',
        caption: 'El artículo en plural',
        headers: ['Caso', 'Masculino', 'Femenino', 'Neutro'],
        rows: [
          ['nominativo', 'οἱ', 'αἱ', 'τά'],
          ['genitivo', 'τῶν', 'τῶν', 'τῶν'],
          ['dativo', 'τοῖς', 'ταῖς', 'τοῖς'],
          ['acusativo', 'τούς', 'τάς', 'τά'],
        ],
      },
      {
        kind: 'parrafo',
        text: 'Dos detalles que ahorran trabajo: en el NEUTRO, el nominativo y el acusativo son siempre iguales (τό / τά), y el GENITIVO plural es τῶν en los tres géneros.',
      },
      {
        kind: 'ejemplo',
        gr: 'ὁ λόγος · ἡ ψυχή · τὸ δῶρον',
        gloss: 'el discurso (masc.) · el alma (fem.) · el regalo (neutro)',
      },
      {
        kind: 'tip',
        text: 'Aprende el artículo como un esqueleto: muchas terminaciones de los sustantivos riman con él (τοῦ λόγου, τῷ λόγῳ, τὴν ψυχήν…). Saberlo te da media declinación gratis.',
      },
    ],
  },
]

/** Índice por id, para resolver una lección rápido. */
export const lessonById = new Map(LESSONS.map((l) => [l.id, l]))

/** Lecciones de una banda concreta, en el orden del catálogo. */
export function lessonsForBand(band: string): Lesson[] {
  return LESSONS.filter((l) => l.band === band)
}
