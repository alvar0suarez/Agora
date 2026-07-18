import {
  LETTERS,
  vocabById,
  aphorismById,
  lessonById,
  CLOZE_ITEMS,
  BUILD_ITEMS,
  REALIA,
  type GreekLetter,
  type VocabEntry,
  type Aphorism,
  type Lesson,
  type Realia,
} from '../greek'
import { ALL_ITEMS, type SrsItem } from './items'
import type { Unit } from './syllabus'

/**
 * Constructor de SESIÓN: convierte una unidad del syllabus en la secuencia de
 * pasos con el arco del rector — OÍR (intro de lo nuevo) → ASOCIAR
 * (reconocimiento) → USAR (producción) → repasos SRS → PREMIO (museo).
 * Lógica PURA (aleatoriedad inyectable): testeable.
 */
export type Step =
  | { kind: 'intro-letter'; letter: GreekLetter }
  | { kind: 'intro-vocab'; entry: VocabEntry }
  | { kind: 'intro-aforismo'; aphorism: Aphorism }
  | { kind: 'teoria'; lesson: Lesson }
  | { kind: 'ejercicio'; item: SrsItem }
  | {
      /** DECIR (shadowing): óyelo y repítelo en voz alta. Sin nota ni SRS. */
      kind: 'decir'
      /** Texto griego a decir. */
      text: string
      /** Qué clip reproducir. */
      play: 'word' | 'aphorism'
      /** Id del clip (palabra o aforismo). */
      playId: string
    }
  | { kind: 'museo'; realia: Realia }

/** Repasos SRS máximos que se cuelan en una unidad (mantenerla corta). */
const REVIEWS_PER_UNIT = 4

const letterById = new Map(LETTERS.map((l) => [l.id, l]))

/** Ejercicio del catálogo por tipo + id de contenido (letra o palabra). */
function exercise(type: SrsItem['type'], contentId: string): SrsItem | null {
  return (
    ALL_ITEMS.find((i) => {
      if (i.type !== type) return false
      if ('letter' in i) return i.letter.id === contentId
      if ('entry' in i) return i.entry.id === contentId
      return false
    }) ?? null
  )
}

/**
 * Construye los pasos de una unidad. `due` son repasos SRS ya vencidos (de
 * cualquier área, ya intercalados por quien llama); se recortan aquí. Los
 * ejercicios de lo recién introducido usan las MISMAS claves SRS de siempre →
 * lo nuevo entra al ciclo de repaso global automáticamente.
 */
export function buildUnitSteps(
  unit: Unit,
  due: SrsItem[] = [],
  rnd: () => number = Math.random,
): Step[] {
  const steps: Step[] = []
  const reviews = due.slice(0, REVIEWS_PER_UNIT)
  const museo = (): Step => ({
    kind: 'museo',
    realia: REALIA[Math.floor(rnd() * REALIA.length)],
  })

  if (unit.kind === 'teoria') {
    const lesson = unit.lessonId ? lessonById.get(unit.lessonId) : undefined
    if (lesson) steps.push({ kind: 'teoria', lesson })
    return steps
  }

  if (unit.kind === 'letras') {
    const letters = (unit.letterIds ?? [])
      .map((id) => letterById.get(id))
      .filter((l): l is GreekLetter => Boolean(l))
    // OÍR: cada letra nueva suena y se presenta.
    for (const l of letters) steps.push({ kind: 'intro-letter', letter: l })
    // ASOCIAR: reconocimiento de las recién oídas (entran al SRS global).
    for (const l of letters) {
      const it = exercise('letter-rec', l.id)
      if (it) steps.push({ kind: 'ejercicio', item: it })
    }
    for (const it of reviews) steps.push({ kind: 'ejercicio', item: it })
    steps.push(museo())
    return steps
  }

  if (unit.kind === 'vocab') {
    const entries = (unit.vocabIds ?? [])
      .map((id) => vocabById.get(id))
      .filter((v): v is VocabEntry => Boolean(v))
    // OÍR: cada palabra nueva suena y se presenta con su sentido.
    for (const v of entries) steps.push({ kind: 'intro-vocab', entry: v })
    // ASOCIAR: reconocer las recién oídas.
    for (const v of entries) {
      const it = exercise('vocab-rec', v.id)
      if (it) steps.push({ kind: 'ejercicio', item: it })
    }
    // USAR: producción alternada — dictado (oír→escribir) y teclear (sentido→escribir).
    entries.forEach((v, i) => {
      const it = exercise(i % 2 === 0 ? 'vocab-dictado' : 'vocab-type', v.id)
      if (it) steps.push({ kind: 'ejercicio', item: it })
    })
    // DECIR: repite en voz alta un par de las palabras nuevas (shadowing).
    for (const v of entries.slice(0, 2)) {
      steps.push({ kind: 'decir', text: v.lemma, play: 'word', playId: v.id })
    }
    for (const it of reviews) steps.push({ kind: 'ejercicio', item: it })
    steps.push(museo())
    return steps
  }

  // kind === 'lectura'
  const aphorism = unit.aphorismId
    ? aphorismById.get(unit.aphorismId)
    : undefined
  if (aphorism) {
    // OÍR: el aforismo entero, con voz, texto y traducción.
    steps.push({ kind: 'intro-aforismo', aphorism })
    // USAR: sus huecos (máx. 3) y su construcción, si existen.
    for (const c of CLOZE_ITEMS.filter(
      (c) => c.aphorismId === aphorism.id,
    ).slice(0, 3)) {
      steps.push({ kind: 'ejercicio', item: { type: 'cloze', srsKey: c.id, cloze: c } })
    }
    const b = BUILD_ITEMS.find((b) => b.aphorismId === aphorism.id)
    if (b) steps.push({ kind: 'ejercicio', item: { type: 'build', srsKey: b.id, build: b } })
    // DECIR: la frase entera en voz alta, imitando a la voz (shadowing).
    steps.push({
      kind: 'decir',
      text: aphorism.greek,
      play: 'aphorism',
      playId: aphorism.id,
    })
  }
  for (const it of reviews) steps.push({ kind: 'ejercicio', item: it })
  return steps
}
