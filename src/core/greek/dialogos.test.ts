import { describe, it, expect } from 'vitest'
import { DIALOGOS, dialogoById, dialogLineId } from './dialogos'

describe('diálogos (datos)', () => {
  it('ids únicos y estructura completa', () => {
    const ids = DIALOGOS.map((d) => d.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const d of DIALOGOS) {
      expect(d.titulo.length).toBeGreaterThan(0)
      expect(d.escena.length).toBeGreaterThan(0)
      expect(d.personaje.nombre.length).toBeGreaterThan(0)
      expect(d.turnos.length).toBeGreaterThan(2)
      expect(dialogoById.get(d.id)).toBe(d)
    }
  })

  it('cada turno del usuario tiene EXACTAMENTE una opción correcta', () => {
    for (const d of DIALOGOS) {
      for (const t of d.turnos) {
        if (t.speaker === 'yo') {
          const oks = (t.opciones ?? []).filter((o) => o.ok)
          expect(oks, `${d.id}: «${t.gr}»`).toHaveLength(1)
          // La réplica correcta es la línea del turno (así el clip coincide).
          expect(oks[0].gr).toBe(t.gr)
          expect((t.opciones ?? []).length).toBeGreaterThanOrEqual(2)
        } else {
          expect(t.opciones).toBeUndefined()
        }
      }
    }
  })

  it('toda línea tiene griego, traducción y un id de clip estable', () => {
    for (const d of DIALOGOS) {
      d.turnos.forEach((t, i) => {
        expect(t.gr.trim().length).toBeGreaterThan(0)
        expect(t.es.trim().length).toBeGreaterThan(0)
        expect(dialogLineId(d.id, i)).toBe(`${d.id}-${i}`)
      })
    }
  })
})
