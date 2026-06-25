import { describe, it, expect } from 'vitest'
import { LESSONS, lessonById, lessonsForBand } from './lessons'
import { READING_BANDS } from '../progress'

describe('lecciones de teoría', () => {
  it('los ids son únicos', () => {
    const ids = LESSONS.map((l) => l.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('cada lección tiene título, resumen y al menos un bloque', () => {
    for (const l of LESSONS) {
      expect(l.title.length).toBeGreaterThan(0)
      expect(l.summary.length).toBeGreaterThan(0)
      expect(l.blocks.length).toBeGreaterThan(0)
    }
  })

  it('cada lección pertenece a una banda de lectura real', () => {
    const bands = new Set(READING_BANDS.map((b) => b.code))
    for (const l of LESSONS) expect(bands.has(l.band)).toBe(true)
  })

  it('lessonById y lessonsForBand resuelven correctamente', () => {
    const first = LESSONS[0]
    expect(lessonById.get(first.id)).toBe(first)
    expect(lessonsForBand(first.band)).toContain(first)
    expect(lessonsForBand('banda-inexistente')).toHaveLength(0)
  })
})
