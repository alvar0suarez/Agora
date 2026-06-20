import { describe, it, expect } from 'vitest'
import { masteryLevel } from './mastery'

describe('masteryLevel', () => {
  it('sin cartas: nivel 0 (sin empezar)', () => {
    expect(masteryLevel([])).toBe(0)
  })

  it('una sola carta: su caja', () => {
    expect(masteryLevel([3])).toBe(3)
  })

  it('dos cartas: la caja más baja (dominar = leer y escribir)', () => {
    expect(masteryLevel([5, 2])).toBe(2)
    expect(masteryLevel([1, 4])).toBe(1)
  })

  it('ambas en la caja máxima: nivel 5', () => {
    expect(masteryLevel([5, 5])).toBe(5)
  })
})
