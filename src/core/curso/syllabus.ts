import { VOCAB, APHORISMS } from '../greek'

/**
 * El SYLLABUS: la columna vertebral del viaje. Una secuencia ORDENADA de
 * unidades pequeñas (5-8 min) que lleva de cero a leer, con paradas de teoría
 * intercaladas donde tocan. Reaprovecha TODO el contenido existente (letras,
 * vocabulario, aforismos, lecciones); añadir contenido = añadir unidades.
 *
 * v1 cubre Cimientos → A1: alfabeto por grupos, vocabulario en tandas de 4 y
 * lecturas (aforismos) intercaladas como hitos. La morfología (conjugar,
 * declinar) entrará en una revisión siguiente con su propio tipo de unidad.
 *
 * Datos PUROS y deterministas (testeables).
 */
export interface Unit {
  /** Id único y estable (es la clave de "completada"). */
  id: string
  /** Título visible ("Letras I", "Leer: πάντα ῥεῖ"…). */
  title: string
  /** Tipo de unidad (decide el arco de pasos que construye la sesión). */
  kind: 'letras' | 'vocab' | 'lectura' | 'teoria'
  /** Letras que introduce (kind: letras). */
  letterIds?: string[]
  /** Palabras que introduce (kind: vocab). */
  vocabIds?: string[]
  /** Aforismo que trabaja (kind: lectura). */
  aphorismId?: string
  /** Lección que abre (kind: teoria). */
  lessonId?: string
}

/** Números romanos cortos para los títulos de serie ("Letras IV"). */
function roman(n: number): string {
  const map: [number, string][] = [
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I'],
  ]
  let out = ''
  let rest = n
  for (const [v, s] of map) {
    while (rest >= v) {
      out += s
      rest -= v
    }
  }
  return out
}

/** Grupos de letras en orden pedagógico: vocales primero, luego consonantes. */
const LETTER_GROUPS: string[][] = [
  ['alpha', 'epsilon', 'iota', 'omicron'],
  ['upsilon', 'eta', 'omega', 'mu'],
  ['pi', 'tau', 'kappa', 'sigma'],
  ['lambda', 'nu', 'rho', 'beta'],
  ['gamma', 'delta', 'theta', 'phi'],
  ['chi', 'psi', 'xi', 'zeta'],
]

function buildSyllabus(): Unit[] {
  const units: Unit[] = []

  // — Cimientos: el alfabeto por grupos, con la teoría de leer intercalada. —
  LETTER_GROUPS.forEach((ids, i) => {
    units.push({
      id: `letras-${i + 1}`,
      title: `Letras ${roman(i + 1)}`,
      kind: 'letras',
      letterIds: ids,
    })
    if (i === 1) {
      units.push({
        id: 'teoria-acentos',
        title: 'Teoría: los acentos',
        kind: 'teoria',
        lessonId: 'acentos',
      })
    }
    if (i === 3) {
      units.push({
        id: 'teoria-espiritus',
        title: 'Teoría: los espíritus',
        kind: 'teoria',
        lessonId: 'espiritus',
      })
    }
  })

  // — A1: vocabulario en tandas de 4, con una lectura cada dos tandas. —
  const WORDS_PER_UNIT = 4
  const vocabUnits: Unit[] = []
  for (let i = 0; i < VOCAB.length; i += WORDS_PER_UNIT) {
    const n = vocabUnits.length + 1
    vocabUnits.push({
      id: `vocab-${n}`,
      title: `Palabras ${roman(n)}`,
      kind: 'vocab',
      vocabIds: VOCAB.slice(i, i + WORDS_PER_UNIT).map((v) => v.id),
    })
  }
  const lecturaUnits: Unit[] = APHORISMS.map((a) => ({
    id: `lectura-${a.id}`,
    title: `Leer: ${a.greek}`,
    kind: 'lectura',
    aphorismId: a.id,
  }))

  // Intercalado: 2 de vocabulario → 1 de lectura (mientras queden).
  let li = 0
  vocabUnits.forEach((u, i) => {
    units.push(u)
    if (i % 2 === 1 && li < lecturaUnits.length) units.push(lecturaUnits[li++])
  })

  // — Puente hacia A2: la teoría de la morfología, antes de sus unidades. —
  units.push(
    {
      id: 'teoria-articulo',
      title: 'Teoría: el artículo',
      kind: 'teoria',
      lessonId: 'articulo',
    },
    {
      id: 'teoria-casos',
      title: 'Teoría: los casos',
      kind: 'teoria',
      lessonId: 'casos',
    },
    {
      id: 'teoria-verbo',
      title: 'Teoría: el presente del verbo',
      kind: 'teoria',
      lessonId: 'verbo-presente',
    },
  )

  // Lecturas restantes como tramo final de v1.
  for (; li < lecturaUnits.length; li++) units.push(lecturaUnits[li])

  return units
}

/** El syllabus completo, en orden. */
export const SYLLABUS: Unit[] = buildSyllabus()

/** Índice por id. */
export const unitById = new Map(SYLLABUS.map((u) => [u.id, u]))

/** La siguiente unidad no completada (o null si el camino v1 está acabado). */
export function nextUnit(completed: ReadonlySet<string>): Unit | null {
  return SYLLABUS.find((u) => !completed.has(u.id)) ?? null
}
