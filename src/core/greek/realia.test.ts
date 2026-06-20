import { describe, it, expect } from 'vitest'
import { REALIA, realiaById } from './realia'
import { READING_BANDS } from '../progress'

describe('REALIA (datos)', () => {
  it('ids únicos', () => {
    const ids = REALIA.map((r) => r.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('cada pieza tiene griego, traducción, descripción y fuente', () => {
    for (const r of REALIA) {
      expect(r.greek.trim().length).toBeGreaterThan(0)
      expect(r.translation.trim().length).toBeGreaterThan(0)
      expect(r.descripcion.trim().length).toBeGreaterThan(0)
      expect(r.fuente.url).toMatch(/^https?:\/\//)
    }
  })

  it('el nivel de cada pieza es una banda válida', () => {
    const bandas = new Set(READING_BANDS.map((b) => b.code))
    for (const r of REALIA) expect(bandas.has(r.nivel)).toBe(true)
  })

  it('toda imagen empaquetada lleva créditos', () => {
    for (const r of REALIA) if (r.imagen) expect(r.creditos).toBeTruthy()
  })

  it('el índice cubre todas las piezas', () => {
    expect(realiaById.size).toBe(REALIA.length)
  })
})
