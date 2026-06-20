import { describe, it, expect } from 'vitest'
import { VOCAB, vocabById } from './vocab'

describe('VOCAB (datos)', () => {
  it('tiene ids únicos', () => {
    const ids = VOCAB.map((v) => v.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('cada entrada tiene lema y glosa no vacíos', () => {
    for (const v of VOCAB) {
      expect(v.lemma.trim().length).toBeGreaterThan(0)
      expect(v.gloss.trim().length).toBeGreaterThan(0)
      expect(v.tags.length).toBeGreaterThan(0)
    }
  })

  it('el índice por id cubre todas las entradas', () => {
    expect(vocabById.size).toBe(VOCAB.length)
    for (const v of VOCAB) expect(vocabById.get(v.id)).toBe(v)
  })
})
