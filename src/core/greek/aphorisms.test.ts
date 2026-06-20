import { describe, it, expect } from 'vitest'
import { APHORISMS, aphorismById } from './aphorisms'

describe('APHORISMS (datos)', () => {
  it('tiene ids únicos', () => {
    const ids = APHORISMS.map((a) => a.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('cada aforismo tiene griego, traducción y desglose no vacíos', () => {
    for (const a of APHORISMS) {
      expect(a.greek.trim().length).toBeGreaterThan(0)
      expect(a.translation.trim().length).toBeGreaterThan(0)
      expect(a.source.trim().length).toBeGreaterThan(0)
      expect(a.words.length).toBeGreaterThan(0)
      for (const w of a.words) {
        expect(w.gr.trim().length).toBeGreaterThan(0)
        expect(w.gloss.trim().length).toBeGreaterThan(0)
      }
    }
  })

  it('el índice por id cubre todas las entradas', () => {
    expect(aphorismById.size).toBe(APHORISMS.length)
    for (const a of APHORISMS) expect(aphorismById.get(a.id)).toBe(a)
  })
})
