import { describe, it, expect } from 'vitest'
import { SYLLABUS, unitById, nextUnit } from './syllabus'
import { buildUnitSteps } from './session'
import { LETTERS, VOCAB, APHORISMS, lessonById } from '../greek'
import { ALL_ITEMS } from './items'

describe('syllabus (el camino)', () => {
  it('ids únicos y todo contenido referenciado existe', () => {
    const ids = SYLLABUS.map((u) => u.id)
    expect(new Set(ids).size).toBe(ids.length)
    const letterIds = new Set(LETTERS.map((l) => l.id))
    const vocabIds = new Set(VOCAB.map((v) => v.id))
    const aphorismIds = new Set(APHORISMS.map((a) => a.id))
    for (const u of SYLLABUS) {
      for (const id of u.letterIds ?? []) expect(letterIds.has(id)).toBe(true)
      for (const id of u.vocabIds ?? []) expect(vocabIds.has(id)).toBe(true)
      if (u.aphorismId) expect(aphorismIds.has(u.aphorismId)).toBe(true)
      if (u.lessonId) expect(lessonById.has(u.lessonId)).toBe(true)
    }
  })

  it('cubre TODAS las letras, palabras y aforismos exactamente una vez', () => {
    const letters = SYLLABUS.flatMap((u) => u.letterIds ?? [])
    const vocab = SYLLABUS.flatMap((u) => u.vocabIds ?? [])
    const aphorisms = SYLLABUS.filter((u) => u.aphorismId).map(
      (u) => u.aphorismId,
    )
    expect(letters.sort()).toEqual(LETTERS.map((l) => l.id).sort())
    expect(vocab.sort()).toEqual(VOCAB.map((v) => v.id).sort())
    expect(aphorisms.sort()).toEqual(APHORISMS.map((a) => a.id).sort())
  })

  it('la teoría llega antes de terminar el tramo que la necesita', () => {
    const idx = (id: string) => SYLLABUS.findIndex((u) => u.id === id)
    expect(idx('teoria-acentos')).toBeGreaterThan(idx('letras-1'))
    expect(idx('teoria-acentos')).toBeLessThan(idx('letras-6'))
    expect(idx('teoria-espiritus')).toBeLessThan(idx('letras-6'))
  })

  it('nextUnit avanza en orden y termina en null', () => {
    expect(nextUnit(new Set())).toBe(SYLLABUS[0])
    expect(nextUnit(new Set([SYLLABUS[0].id]))).toBe(SYLLABUS[1])
    expect(nextUnit(new Set(SYLLABUS.map((u) => u.id)))).toBeNull()
  })
})

describe('constructor de sesión (arco oír → asociar → usar)', () => {
  const rnd = () => 0

  it('unidad de letras: intro + reconocer + repasos + museo', () => {
    const steps = buildUnitSteps(unitById.get('letras-1')!, [], rnd)
    const kinds = steps.map((s) => s.kind)
    expect(kinds.slice(0, 4)).toEqual(Array(4).fill('intro-letter'))
    expect(kinds.filter((k) => k === 'ejercicio')).toHaveLength(4)
    expect(kinds.at(-1)).toBe('museo')
  })

  it('unidad de vocabulario: intro + reconocer + producción alternada', () => {
    const steps = buildUnitSteps(unitById.get('vocab-1')!, [], rnd)
    const ejercicios = steps.filter(
      (s): s is Extract<typeof s, { kind: 'ejercicio' }> =>
        s.kind === 'ejercicio',
    )
    // 4 rec + 4 producción (dictado/type alternados)
    expect(ejercicios.filter((e) => e.item.type === 'vocab-rec')).toHaveLength(4)
    expect(
      ejercicios.filter((e) => e.item.type === 'vocab-dictado'),
    ).toHaveLength(2)
    expect(ejercicios.filter((e) => e.item.type === 'vocab-type')).toHaveLength(2)
  })

  it('unidad de lectura: se oye el aforismo y luego se usa (huecos/construir)', () => {
    const unit = SYLLABUS.find((u) => u.kind === 'lectura')!
    const steps = buildUnitSteps(unit, [], rnd)
    expect(steps[0].kind).toBe('intro-aforismo')
    expect(steps.length).toBeGreaterThan(1)
  })

  it('unidad de teoría: un solo paso con la lección', () => {
    const steps = buildUnitSteps(unitById.get('teoria-acentos')!, [], rnd)
    expect(steps).toHaveLength(1)
    expect(steps[0].kind).toBe('teoria')
  })

  it('los repasos se recortan al tope y usan claves SRS reales', () => {
    const due = ALL_ITEMS.slice(0, 10)
    const steps = buildUnitSteps(unitById.get('teoria-acentos')!, due, rnd)
    // teoría no mete repasos (1 paso); una unidad normal sí:
    const steps2 = buildUnitSteps(unitById.get('letras-1')!, due, rnd)
    expect(steps).toHaveLength(1)
    const reviewSteps = steps2.filter((s) => s.kind === 'ejercicio').length
    expect(reviewSteps).toBe(4 + 4) // 4 nuevas + 4 repasos (tope)
  })
})
