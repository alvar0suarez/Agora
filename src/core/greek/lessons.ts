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

/** Un bloque de una lección (unión discriminada por `kind`). */
export type LessonBlock =
  | { kind: 'parrafo'; text: string }
  | { kind: 'titulo'; text: string }
  | { kind: 'ejemplo'; gr: string; pron?: string; gloss: string }
  | { kind: 'tip'; text: string }

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
]

/** Índice por id, para resolver una lección rápido. */
export const lessonById = new Map(LESSONS.map((l) => [l.id, l]))

/** Lecciones de una banda concreta, en el orden del catálogo. */
export function lessonsForBand(band: string): Lesson[] {
  return LESSONS.filter((l) => l.band === band)
}
