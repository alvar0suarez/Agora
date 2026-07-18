import { describe, it, expect } from 'vitest'
import { ALL_ITEMS, TYPE_ORDER, earnsXp, museoBreather } from './items'
import { VOCAB, LETTERS, REALIA, CLOZE_ITEMS, BUILD_ITEMS } from '../greek'

describe('entrenar · catálogo de ítems', () => {
  it('cubre vocabulario (rec + escribir + dictado), letras, huecos y construir', () => {
    const byType = (t: string) => ALL_ITEMS.filter((i) => i.type === t).length
    expect(byType('vocab-rec')).toBe(VOCAB.length)
    expect(byType('vocab-type')).toBe(VOCAB.length)
    expect(byType('vocab-dictado')).toBe(VOCAB.length)
    expect(byType('letter-rec')).toBe(LETTERS.length)
    expect(byType('cloze')).toBe(CLOZE_ITEMS.length)
    expect(byType('build')).toBe(BUILD_ITEMS.length)
  })

  it('las claves SRS coinciden con las de los modos enfocados (progreso compartido)', () => {
    const v = VOCAB[0]
    const l = LETTERS[0]
    const key = (t: string) => ALL_ITEMS.find((i) => i.type === t)
    expect(ALL_ITEMS.find((i) => i.type === 'vocab-rec' && i.srsKey === `vocab:rec:${v.id}`)).toBeTruthy()
    expect(ALL_ITEMS.find((i) => i.type === 'vocab-type' && i.srsKey === `vocab:type:${v.id}`)).toBeTruthy()
    expect(ALL_ITEMS.find((i) => i.type === 'letter-rec' && i.srsKey === `alfabeto:rec:${l.id}`)).toBeTruthy()
    expect(key('vocab-rec')).toBeTruthy()
  })

  it('las claves SRS son únicas', () => {
    const keys = ALL_ITEMS.map((i) => i.srsKey)
    expect(new Set(keys).size).toBe(keys.length)
  })

  it('todos los tipos del catálogo dan XP y están en el orden de intercalado', () => {
    for (const t of TYPE_ORDER) expect(earnsXp(t)).toBe(true)
    const present = new Set(ALL_ITEMS.map((i) => i.type))
    for (const t of TYPE_ORDER) expect(present.has(t)).toBe(true)
  })

  it('el respiro de museo trae una pieza real (sin clave SRS)', () => {
    const m = museoBreather(() => 0)
    expect(m.type).toBe('museo')
    if (m.type === 'museo') expect(m.realia).toBe(REALIA[0])
    expect('srsKey' in m).toBe(false)
  })
})
