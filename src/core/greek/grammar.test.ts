import { describe, it, expect } from 'vitest'
import { POS_INFO, WORD_CLASSES } from './grammar'
import { VOCAB } from './vocab'

describe('clases de palabra (gramática)', () => {
  it('toda categoría usada en el vocabulario tiene su nota', () => {
    for (const w of VOCAB) {
      expect(POS_INFO[w.pos], `falta POS_INFO para ${w.pos}`).toBeDefined()
      expect(POS_INFO[w.pos].que.length).toBeGreaterThan(0)
      expect(POS_INFO[w.pos].ejemplo.length).toBeGreaterThan(0)
    }
  })

  it('la referencia lista cada categoría exactamente una vez', () => {
    const keys = Object.keys(POS_INFO).sort()
    expect([...WORD_CLASSES].sort()).toEqual(keys)
    expect(new Set(WORD_CLASSES).size).toBe(WORD_CLASSES.length)
  })

  it('la transcripción sembrada no deja palabras vacías', () => {
    for (const w of VOCAB) {
      if (w.pron !== undefined) expect(w.pron.trim().length).toBeGreaterThan(0)
    }
  })
})
