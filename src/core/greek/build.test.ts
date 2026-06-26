import { describe, it, expect } from 'vitest'
import {
  buildSentenceItems,
  isBuildCorrect,
  shuffledBank,
  buildId,
  BUILD_ITEMS,
  MIN_TOKENS,
} from './build'
import type { Aphorism } from './aphorisms'

const aph = (id: string, words: string[]): Aphorism => ({
  id,
  greek: words.join(' '),
  translation: `t-${id}`,
  source: 's',
  words: words.map((gr) => ({ gr, gloss: `g-${gr}` })),
})

const sample = [aph('corto', ['α', 'β']), aph('largo', ['α', 'β', 'γ'])]

describe('construir la frase (build)', () => {
  it('solo toma aforismos con suficientes palabras', () => {
    const items = buildSentenceItems(sample)
    expect(items).toHaveLength(1)
    expect(items[0].aphorismId).toBe('largo')
    expect(items[0].id).toBe(buildId('largo'))
    expect(items[0].tokens).toEqual(['α', 'β', 'γ'])
  })

  it('corrige por orden exacto', () => {
    const [item] = buildSentenceItems(sample)
    expect(isBuildCorrect(item, ['α', 'β', 'γ'])).toBe(true)
    expect(isBuildCorrect(item, ['β', 'α', 'γ'])).toBe(false)
    expect(isBuildCorrect(item, ['α', 'β'])).toBe(false)
  })

  it('el banco contiene exactamente las mismas fichas', () => {
    const [item] = buildSentenceItems(sample)
    const bank = shuffledBank(item, () => 0)
    expect(bank.map((c) => c.text).sort()).toEqual(['α', 'β', 'γ'])
    expect(bank.map((c) => c.key).sort()).toEqual([0, 1, 2])
  })

  it('el corpus real produce ejercicios (todos con >= MIN_TOKENS palabras)', () => {
    expect(BUILD_ITEMS.length).toBeGreaterThan(0)
    for (const it of BUILD_ITEMS) {
      expect(it.tokens.length).toBeGreaterThanOrEqual(MIN_TOKENS)
    }
    const ids = BUILD_ITEMS.map((i) => i.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})
