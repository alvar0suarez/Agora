import { describe, it, expect } from 'vitest'
import { buildClozeItems, isClozeCorrect, clozeId, CLOZE_ITEMS } from './cloze'
import type { Aphorism } from '../../core/greek'

const sample: Aphorism[] = [
  {
    id: 'demo',
    greek: 'ἓν οἶδα ὅτι',
    translation: 'demo',
    source: 'test',
    words: [
      { gr: 'ἓν', gloss: 'una cosa' }, // normaliza a "εν" (2) → no tapable
      { gr: 'οἶδα', gloss: 'sé' }, // "οιδα" (4) → tapable
      { gr: 'ὅτι', gloss: 'que' }, // "οτι" (3) → tapable
    ],
  },
]

describe('cloze (rellenar huecos)', () => {
  it('tapa solo palabras de longitud suficiente (sin acentos)', () => {
    const items = buildClozeItems(sample)
    expect(items.map((i) => i.blankIndex)).toEqual([1, 2])
  })

  it('cada hueco lleva su respuesta, pista y clave estable', () => {
    const [first] = buildClozeItems(sample)
    expect(first.id).toBe(clozeId('demo', 1))
    expect(first.answer).toBe('οἶδα')
    expect(first.hint).toBe('sé')
    expect(first.aphorismId).toBe('demo')
  })

  it('corrige sin acentos ni mayúsculas', () => {
    const [, second] = buildClozeItems(sample)
    expect(second.answer).toBe('ὅτι')
    expect(isClozeCorrect(second, 'οτι')).toBe(true)
    expect(isClozeCorrect(second, 'ὍΤΙ')).toBe(true)
    expect(isClozeCorrect(second, 'οἶδα')).toBe(false)
  })

  it('los ids del corpus real son únicos y no está vacío', () => {
    expect(CLOZE_ITEMS.length).toBeGreaterThan(0)
    const ids = CLOZE_ITEMS.map((i) => i.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})
