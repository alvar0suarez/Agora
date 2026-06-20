import { describe, it, expect } from 'vitest'
import { normalizeGreek } from './normalize'

describe('normalizeGreek', () => {
  it('quita acentos', () => {
    expect(normalizeGreek('λόγος')).toBe(normalizeGreek('λογος'))
  })

  it('iguala la sigma final con la normal', () => {
    expect(normalizeGreek('λόγος')).toBe('λογοσ')
  })

  it('ignora mayúsculas', () => {
    expect(normalizeGreek('ΨΥΧΉ')).toBe(normalizeGreek('ψυχή'))
  })

  it('descarta espacios y puntuación', () => {
    expect(normalizeGreek('  ψυχή! ')).toBe('ψυχη')
  })

  it('palabras distintas no coinciden', () => {
    expect(normalizeGreek('λόγος')).not.toBe(normalizeGreek('λύσις'))
  })
})
