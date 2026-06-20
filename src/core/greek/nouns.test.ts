import { describe, it, expect } from 'vitest'
import { NOUNS, nounById, NOUN_FORMS } from './nouns'

describe('NOUNS (datos)', () => {
  it('ids de sustantivo únicos', () => {
    const ids = NOUNS.map((n) => n.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('cada sustantivo tiene 8 formas (4 casos × 2 números) no vacías', () => {
    for (const n of NOUNS) {
      expect(n.forms).toHaveLength(8)
      for (const f of n.forms) expect(f.form.trim().length).toBeGreaterThan(0)
    }
  })

  it('los ids de forma son únicos en todo el corpus', () => {
    const ids = NOUN_FORMS.map(({ form }) => form.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('el índice por id cubre todos los sustantivos', () => {
    expect(nounById.size).toBe(NOUNS.length)
    for (const n of NOUNS) expect(nounById.get(n.id)).toBe(n)
  })
})
