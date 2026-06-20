import { describe, it, expect } from 'vitest'
import { VERBS, verbById, VERB_FORMS } from './verbs'

describe('VERBS (datos)', () => {
  it('ids de verbo únicos', () => {
    const ids = VERBS.map((v) => v.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('cada verbo tiene 6 formas con forma no vacía', () => {
    for (const v of VERBS) {
      expect(v.forms).toHaveLength(6)
      for (const f of v.forms) expect(f.form.trim().length).toBeGreaterThan(0)
    }
  })

  it('los ids de forma son únicos en todo el corpus', () => {
    const ids = VERB_FORMS.map(({ form }) => form.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('el índice por id cubre todos los verbos', () => {
    expect(verbById.size).toBe(VERBS.length)
    for (const v of VERBS) expect(verbById.get(v.id)).toBe(v)
  })
})
