import { describe, it, expect } from 'vitest'
import { ROOTS, DERIVED, rootById, wordsOfRoot } from './roots'

describe('ROOTS / DERIVED (datos)', () => {
  it('ids de raíz únicos', () => {
    const ids = ROOTS.map((r) => r.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('palabras derivadas únicas', () => {
    const ws = DERIVED.map((d) => d.word)
    expect(new Set(ws).size).toBe(ws.length)
  })

  it('cada palabra referencia raíces existentes (mín. una)', () => {
    for (const d of DERIVED) {
      expect(d.roots.length).toBeGreaterThan(0)
      for (const r of d.roots) expect(rootById.has(r)).toBe(true)
    }
  })

  it('wordsOfRoot devuelve la familia de una raíz', () => {
    const teca = wordsOfRoot('theke').map((d) => d.word)
    expect(teca).toContain('biblioteca')
    expect(teca).toContain('cineteca')
  })
})
