import { describe, it, expect } from 'vitest'
import {
  buildMatchRound,
  pickEntries,
  newMatchRound,
  PAIRS_PER_ROUND,
} from './match'
import type { VocabEntry } from '../../core/greek'

const entry = (id: string): VocabEntry => ({
  id,
  lemma: `λ-${id}`,
  gloss: `g-${id}`,
  pos: 'sustantivo',
  tags: [],
})

const sample = ['a', 'b', 'c'].map(entry)

describe('emparejar (match)', () => {
  it('ambas columnas contienen exactamente los mismos ids', () => {
    const r = buildMatchRound(sample, () => 0)
    expect(r.greek.map((c) => c.id).sort()).toEqual(['a', 'b', 'c'])
    expect(r.spanish.map((c) => c.id).sort()).toEqual(['a', 'b', 'c'])
  })

  it('cada carta muestra el texto correcto de su lado', () => {
    const r = buildMatchRound(sample, () => 0)
    for (const g of r.greek) expect(g.text).toBe(`λ-${g.id}`)
    for (const s of r.spanish) expect(s.text).toBe(`g-${s.id}`)
  })

  it('pickEntries respeta el tamaño y no se pasa del corpus', () => {
    expect(pickEntries(sample, 2)).toHaveLength(2)
    expect(pickEntries(sample, 99)).toHaveLength(3)
    expect(pickEntries(sample, 0)).toHaveLength(0)
  })

  it('una ronda real del léxico trae PAIRS_PER_ROUND pares', () => {
    const r = newMatchRound(() => 0)
    expect(r.greek).toHaveLength(PAIRS_PER_ROUND)
    expect(r.spanish).toHaveLength(PAIRS_PER_ROUND)
    expect(new Set(r.greek.map((c) => c.id)).size).toBe(PAIRS_PER_ROUND)
  })
})
