import { describe, it, expect } from 'vitest'
import { wordToIpa, textToIpa, sentenceToIpa } from './g2p'

describe('g2p ático (texto → IPA reconstruida)', () => {
  it('acentúa la sílaba correcta (agudo)', () => {
    expect(wordToIpa('λόγος')).toBe('ˈloɡos')
    expect(wordToIpa('ψυχή')).toBe('psyˈkʰɛː')
    expect(wordToIpa('φύσις')).toBe('ˈpʰysis')
    expect(wordToIpa('εὐδαιμονία')).toBe('eu̯dai̯moˈnia')
  })

  it('acentúa con circunflejo y alarga la vocal', () => {
    expect(wordToIpa('γνῶθι')).toBe('ɡˈnɔːtʰi')
    expect(wordToIpa('πᾶς')).toBe('ˈpaːs')
    expect(wordToIpa('ζῷον')).toBe('ˈzdɔːon')
  })

  it('el grave NO acentúa (palabra "rebajada" en contexto)', () => {
    expect(wordToIpa('τὸν')).toBe('ton')
    expect(wordToIpa('χαλεπὰ')).toBe('kʰalepa')
  })

  it('aspiradas, espíritu áspero y rho inicial', () => {
    expect(wordToIpa('ἄνθρωπος')).toBe('ˈantʰrɔːpos')
    expect(wordToIpa('ἡμέρα')).toBe('hɛːˈmera')
    expect(wordToIpa('ὥρα')).toBe('ˈhɔːra')
    expect(wordToIpa('ὅτι')).toBe('ˈhoti')
    expect(wordToIpa('ῥεῖ')).toBe('ˈreː')
  })

  it('diptongos y dígrafos: ου=uː, ει=eː, αι/αυ/ευ con deslizamiento', () => {
    expect(wordToIpa('οὐ')).toBe('uː')
    expect(wordToIpa('εἰμί')).toBe('eːˈmi')
    expect(wordToIpa('καί')).toBe('ˈkai̯')
    expect(wordToIpa('αὐτός')).toBe('au̯ˈtos')
  })

  it('γ-nasal ante gutural y ζ=[zd]', () => {
    expect(wordToIpa('ἄγγελος')).toBe('ˈaŋɡelos')
    expect(wordToIpa('ἀνάγκη')).toBe('aˈnaŋkɛː')
  })

  it('iota suscrita → vocal larga (pragmático)', () => {
    expect(wordToIpa('ᾠδή')).toBe('ɔːˈdɛː')
  })

  it('las mayúsculas no cambian el resultado', () => {
    expect(wordToIpa('Λόγος')).toBe(wordToIpa('λόγος'))
  })

  it('textToIpa tokeniza frases conservando separadores', () => {
    const tokens = textToIpa('γνῶθι σεαυτόν')
    expect(tokens).toEqual([
      { text: 'γνῶθι', ipa: 'ɡˈnɔːtʰi' },
      { text: ' ', ipa: null },
      { text: 'σεαυτόν', ipa: 'seau̯ˈton' },
    ])
  })

  it('sentenceToIpa lee una frase entera', () => {
    expect(sentenceToIpa('πάντα ῥεῖ')).toBe('ˈpanta ˈreː')
    expect(sentenceToIpa('ὁ βίος βραχύς')).toBe('ho ˈbios braˈkʰys')
  })

  it('entrada vacía o no griega → vacío', () => {
    expect(wordToIpa('')).toBe('')
    expect(wordToIpa('hello')).toBe('')
  })
})
