import { describe, it, expect } from 'vitest'
import { xpToReachLevel, bandForLevel, levelFromXp } from './levels'

describe('xpToReachLevel', () => {
  it('el nivel 1 está en 0 XP', () => {
    expect(xpToReachLevel(1)).toBe(0)
  })

  it('cada nivel cuesta más que el anterior (curva creciente)', () => {
    expect(xpToReachLevel(2)).toBe(100)
    expect(xpToReachLevel(3)).toBe(300)
    expect(xpToReachLevel(5)).toBe(1000)
  })

  it('el techo B2 (nivel 36) ronda los 63 000 XP', () => {
    expect(xpToReachLevel(36)).toBe(63_000)
  })
})

describe('bandForLevel', () => {
  it('asigna la banda de lectura por tramos', () => {
    expect(bandForLevel(1)).toBe('Cimientos')
    expect(bandForLevel(4)).toBe('Cimientos')
    expect(bandForLevel(5)).toBe('A1')
    expect(bandForLevel(13)).toBe('A2')
    expect(bandForLevel(23)).toBe('B1')
    expect(bandForLevel(36)).toBe('B2')
    expect(bandForLevel(99)).toBe('B2')
  })
})

describe('levelFromXp', () => {
  it('XP 0 → nivel 1, banda Cimientos, 0/100 hacia el siguiente', () => {
    expect(levelFromXp(0)).toEqual({
      level: 1,
      band: 'Cimientos',
      totalXp: 0,
      xpIntoLevel: 0,
      xpForNextLevel: 100,
    })
  })

  it('sube de nivel al alcanzar el umbral', () => {
    expect(levelFromXp(100).level).toBe(2)
    expect(levelFromXp(99).level).toBe(1)
  })

  it('reporta el progreso dentro del nivel actual', () => {
    const info = levelFromXp(150)
    expect(info.level).toBe(2)
    expect(info.xpIntoLevel).toBe(50)
    expect(info.xpForNextLevel).toBe(200) // del nivel 2 al 3
  })

  it('XP negativa o fraccionaria se sanea', () => {
    expect(levelFromXp(-50).level).toBe(1)
    expect(levelFromXp(105.9).totalXp).toBe(105)
  })

  it('al llegar a ~63 000 XP entra en banda B2', () => {
    expect(levelFromXp(63_000).band).toBe('B2')
  })
})
