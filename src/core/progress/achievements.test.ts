import { describe, it, expect } from 'vitest'
import { ACHIEVEMENTS, unlockedAchievements } from './achievements'
import { xpToReachLevel } from './levels'
import { emptyProgress } from './progress'

describe('logros (achievements)', () => {
  it('los ids son únicos', () => {
    const ids = ACHIEVEMENTS.map((a) => a.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('cada logro tiene nombre, pista e icono', () => {
    for (const a of ACHIEVEMENTS) {
      expect(a.title.length).toBeGreaterThan(0)
      expect(a.hint.length).toBeGreaterThan(0)
      expect(a.icon.length).toBeGreaterThan(0)
    }
  })

  it('un progreso vacío no desbloquea nada', () => {
    expect(unlockedAchievements(emptyProgress())).toHaveLength(0)
  })

  it('el primer XP desbloquea "Primeros pasos" y nada más', () => {
    const got = unlockedAchievements({ ...emptyProgress(), xp: 1 })
    expect(got.map((a) => a.id)).toEqual(['first-xp'])
  })

  it('el nivel 5 desbloquea su hito (umbral exacto de XP)', () => {
    const xp = xpToReachLevel(5)
    const ids = unlockedAchievements({ ...emptyProgress(), xp }).map((a) => a.id)
    expect(ids).toContain('level-5')
    expect(ids).not.toContain('level-13')
  })

  it('la racha desbloquea por umbrales acumulativos', () => {
    const ids = unlockedAchievements({ ...emptyProgress(), streakDays: 7 }).map(
      (a) => a.id,
    )
    expect(ids).toContain('streak-3')
    expect(ids).toContain('streak-7')
    expect(ids).not.toContain('streak-30')
  })

  it('lo consigue todo quien va sobrado de nivel y racha', () => {
    const maxed = { ...emptyProgress(), xp: xpToReachLevel(40), streakDays: 365 }
    expect(unlockedAchievements(maxed)).toHaveLength(ACHIEVEMENTS.length)
  })
})
