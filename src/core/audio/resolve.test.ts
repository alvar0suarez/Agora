import { describe, it, expect } from 'vitest'
import { LETTERS } from '../greek'
import { letterText } from './resolve'

const byId = (id: string) => {
  const l = LETTERS.find((x) => x.id === id)
  if (!l) throw new Error(`letra desconocida: ${id}`)
  return l
}

describe('letterText', () => {
  it('name → nombre griego con diacríticos', () => {
    expect(letterText(byId('alpha'), 'name')).toBe('ἄλφα')
    expect(letterText(byId('omega'), 'name')).toBe('ὦ μέγα')
  })

  it('sound → glifo en minúscula', () => {
    expect(letterText(byId('alpha'), 'sound')).toBe('α')
    expect(letterText(byId('phi'), 'sound')).toBe('φ')
  })

  it('devuelve texto no vacío para las 24 letras en ambos modos', () => {
    for (const l of LETTERS) {
      expect(letterText(l, 'sound').length).toBeGreaterThan(0)
      expect(letterText(l, 'name').length).toBeGreaterThan(0)
    }
  })
})
