import { describe, it, expect } from 'vitest'
import { spellOut, letterByLower } from './letters'

describe('spellOut (deletrear para pronunciación)', () => {
  it('deletrea una leyenda en mayúsculas en sus letras, en orden', () => {
    const ids = spellOut('ΑΘΕ').map((l) => l.id)
    expect(ids).toEqual(['alpha', 'theta', 'epsilon'])
  })

  it('ignora espacios y signos, y conserva el orden con repeticiones', () => {
    const ids = spellOut('ΝΕΟΚΛΕΟΣ').map((l) => l.id)
    expect(ids).toEqual([
      'nu',
      'epsilon',
      'omicron',
      'kappa',
      'lambda',
      'epsilon',
      'omicron',
      'sigma',
    ])
    // El espacio entre dos palabras no añade letras.
    expect(spellOut('ΑΘ Ε')).toHaveLength(3)
  })

  it('normaliza acentos, espíritus y sigma final', () => {
    // minúsculas con diacríticos y ς final → mismas letras base
    expect(spellOut('λόγος').map((l) => l.id)).toEqual([
      'lambda',
      'omicron',
      'gamma',
      'omicron',
      'sigma',
    ])
  })

  it('el índice por minúscula cubre las 24 letras', () => {
    expect(letterByLower.size).toBe(24)
  })
})
