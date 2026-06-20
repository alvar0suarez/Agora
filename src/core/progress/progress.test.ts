import { describe, it, expect } from 'vitest'
import {
  emptyProgress,
  addXp,
  registerActivity,
  dayIndex,
  XP_PER_RECALL,
} from './progress'

describe('emptyProgress', () => {
  it('empieza sin XP ni racha', () => {
    expect(emptyProgress()).toEqual({ xp: 0, streakDays: 0, lastActiveDay: null })
  })
})

describe('addXp', () => {
  it('suma la cantidad indicada', () => {
    const s = addXp(emptyProgress(), XP_PER_RECALL)
    expect(s.xp).toBe(XP_PER_RECALL)
  })

  it('acumula sobre el XP previo', () => {
    expect(addXp({ xp: 30, streakDays: 0, lastActiveDay: null }, 10).xp).toBe(40)
  })

  it('ignora cantidades negativas (no resta)', () => {
    expect(addXp({ xp: 30, streakDays: 0, lastActiveDay: null }, -5).xp).toBe(30)
  })

  it('no toca la racha', () => {
    const s = addXp({ xp: 0, streakDays: 3, lastActiveDay: 100 }, 10)
    expect(s.streakDays).toBe(3)
    expect(s.lastActiveDay).toBe(100)
  })
})

describe('registerActivity', () => {
  it('primer día: racha = 1', () => {
    const s = registerActivity(emptyProgress(), 100)
    expect(s.streakDays).toBe(1)
    expect(s.lastActiveDay).toBe(100)
  })

  it('mismo día: no cambia nada', () => {
    const prev = { xp: 0, streakDays: 2, lastActiveDay: 100 }
    expect(registerActivity(prev, 100)).toBe(prev)
  })

  it('día consecutivo: la racha crece', () => {
    const s = registerActivity({ xp: 0, streakDays: 2, lastActiveDay: 100 }, 101)
    expect(s.streakDays).toBe(3)
    expect(s.lastActiveDay).toBe(101)
  })

  it('hueco de más de un día: la racha se reinicia a 1', () => {
    const s = registerActivity({ xp: 0, streakDays: 5, lastActiveDay: 100 }, 103)
    expect(s.streakDays).toBe(1)
    expect(s.lastActiveDay).toBe(103)
  })
})

describe('dayIndex', () => {
  it('dos instantes del mismo día local comparten índice', () => {
    const morning = Date.UTC(2026, 5, 20, 8, 0)
    const evening = Date.UTC(2026, 5, 20, 23, 0)
    expect(dayIndex(morning, 0)).toBe(dayIndex(evening, 0))
  })

  it('el día siguiente es el índice + 1', () => {
    const today = Date.UTC(2026, 5, 20, 12, 0)
    const tomorrow = Date.UTC(2026, 5, 21, 12, 0)
    expect(dayIndex(tomorrow, 0)).toBe(dayIndex(today, 0) + 1)
  })

  it('respeta el desfase horario local (la medianoche local manda)', () => {
    // 23:30 UTC con desfase -120 min (UTC+2) ya es el día siguiente local.
    const lateUtc = Date.UTC(2026, 5, 20, 23, 30)
    expect(dayIndex(lateUtc, -120)).toBe(dayIndex(lateUtc, 0) + 1)
  })
})
