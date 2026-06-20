import { describe, it, expect } from 'vitest'
import { letterMastery } from './mastery'

describe('letterMastery', () => {
  it('sin cartas: nivel 0 (sin empezar)', () => {
    expect(letterMastery([])).toBe(0)
  })

  it('una sola carta: su caja', () => {
    expect(letterMastery([3])).toBe(3)
  })

  it('dos cartas: la caja más baja (dominar = leer y escribir)', () => {
    expect(letterMastery([5, 2])).toBe(2)
    expect(letterMastery([1, 4])).toBe(1)
  })

  it('ambas en la caja máxima: nivel 5', () => {
    expect(letterMastery([5, 5])).toBe(5)
  })
})
