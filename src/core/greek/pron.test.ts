import { describe, it, expect } from 'vitest'
import { ipaToSpanish, wordPron, sentencePron } from './pron'

describe('pronunciación legible (derivada del G2P)', () => {
  it('sílabas con la tónica en mayúsculas', () => {
    expect(wordPron('λόγος')).toBe('LO-gos')
    expect(wordPron('πάντα')).toBe('PAN-ta')
    expect(wordPron('ἄνθρωπος')).toBe('AN-thrô-pos')
    expect(wordPron('ἡμέρα')).toBe('hê-ME-ra')
  })

  it('aspiradas, ü y largas con circunflejo', () => {
    expect(wordPron('ψυχή')).toBe('psü-KHÊ')
    expect(wordPron('φύσις')).toBe('PHÜ-sis')
    expect(wordPron('ῥεῖ')).toBe('RÊ')
    expect(wordPron('οὐ')).toBe('û')
  })

  it('frases enteras, palabra a palabra', () => {
    expect(sentencePron('πάντα ῥεῖ')).toBe('PAN-ta RÊ')
    expect(sentencePron('γνῶθι σεαυτόν')).toBe('GNÔ-thi se-au-TON')
  })

  it('robusto ante símbolos desconocidos', () => {
    expect(ipaToSpanish('')).toBe('')
    expect(ipaToSpanish('ˈlo?ɡos')).toBe('LO-gos')
  })
})
