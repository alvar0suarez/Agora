import { describe, it, expect } from 'vitest'
import { pickOptions, type Rng } from './options'

/** Pool mínimo de prueba: cualquier cosa con `id`. */
const pool = ['a', 'b', 'c', 'd', 'e'].map((id) => ({ id }))

/** RNG determinista (siempre 0): hace shuffle predecible para los tests. */
const zeroRng: Rng = () => 0

describe('pickOptions', () => {
  it('siempre incluye el correcto', () => {
    const target = pool[2]
    const opts = pickOptions(target, pool, 4, zeroRng)
    expect(opts.some((o) => o.id === target.id)).toBe(true)
  })

  it('devuelve exactamente `count` opciones cuando el pool da de sobra', () => {
    const opts = pickOptions(pool[0], pool, 4, zeroRng)
    expect(opts).toHaveLength(4)
  })

  it('no repite ítems', () => {
    const opts = pickOptions(pool[0], pool, 4, zeroRng)
    const ids = opts.map((o) => o.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('no incluye el correcto como distractor duplicado', () => {
    const target = pool[0]
    const opts = pickOptions(target, pool, 4, zeroRng)
    expect(opts.filter((o) => o.id === target.id)).toHaveLength(1)
  })

  it('si el pool es pequeño, devuelve lo que haya sin inventar', () => {
    const small = pool.slice(0, 2)
    const opts = pickOptions(small[0], small, 4, zeroRng)
    expect(opts).toHaveLength(2)
  })

  it('no muta el pool original', () => {
    const copy = [...pool]
    pickOptions(pool[0], pool, 4, zeroRng)
    expect(pool).toEqual(copy)
  })
})
