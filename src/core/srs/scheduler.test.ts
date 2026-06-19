import { describe, it, expect } from 'vitest'
import { newCard, isDue, review } from './scheduler'

const MINUTE = 60_000
const DAY = 24 * 60 * MINUTE
const NOW = 1_000_000_000_000

describe('newCard', () => {
  it('empieza en la caja 1 y lista para repasar ya', () => {
    const c = newCard(NOW)
    expect(c).toEqual({
      box: 1,
      due: NOW,
      reps: 0,
      lapses: 0,
      lastReviewed: null,
    })
  })
})

describe('isDue', () => {
  it('vence cuando due <= now', () => {
    expect(isDue(newCard(NOW), NOW)).toBe(true)
    expect(isDue({ ...newCard(NOW), due: NOW + 1 }, NOW)).toBe(false)
  })
})

describe('review', () => {
  it("'good' sube de caja y aleja el próximo repaso", () => {
    const next = review(newCard(NOW), 'good', NOW)
    expect(next.box).toBe(2)
    expect(next.due).toBe(NOW + 10 * MINUTE)
    expect(next.reps).toBe(1)
    expect(next.lapses).toBe(0)
    expect(next.lastReviewed).toBe(NOW)
  })

  it("'good' no supera la caja máxima (5)", () => {
    const maxed = { box: 5, due: NOW, reps: 9, lapses: 0, lastReviewed: NOW }
    const next = review(maxed, 'good', NOW)
    expect(next.box).toBe(5)
    expect(next.due).toBe(NOW + 10 * DAY)
  })

  it("'again' vuelve a la caja 1, cuenta lapso y reaparece enseguida", () => {
    const box3 = { box: 3, due: NOW, reps: 4, lapses: 0, lastReviewed: NOW }
    const next = review(box3, 'again', NOW)
    expect(next.box).toBe(1)
    expect(next.due).toBe(NOW) // intervalo de la caja 1 = 0
    expect(next.reps).toBe(5)
    expect(next.lapses).toBe(1)
  })

  it("'good' no incrementa los lapsos", () => {
    const next = review(newCard(NOW), 'good', NOW)
    expect(next.lapses).toBe(0)
  })
})
