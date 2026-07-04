import { describe, expect, it } from 'vitest'
import { extractGreekFragments, greekKey, splitComment } from './parse'
import { parseNousFile } from './format'

// Comentario REAL de Nous (palabra «exégeta»), tal cual lo escribe el usuario
// —incluye un U+200B colado antes de "Significado:", como en el original—.
const EXEGETA =
  'Etimología: Proviene del griego antiguo ἐξηγητής (exēgētēs), que significa ' +
  '"guía", "intérprete" o "expositor". Este término se compone del prefijo ex- (ἐξ), ' +
  'que significa "fuera" o "hacia afuera", y el verbo hēgeisthai (ἡγεῖσθαι), que ' +
  'significa "guiar", "conducir" o "liderar" (raíz que también da origen a la ' +
  'palabra hegemonía). En la Antigua Grecia, los exegetas eran funcionarios ' +
  'religiosos oficiales.\n' +
  '\u200bSignificado: Persona que interpreta o explica un texto, especialmente en ' +
  'el ámbito de la crítica literaria.'

describe('splitComment', () => {
  it('separa Etimología y Significado con la convención de Nous', () => {
    const p = splitComment(EXEGETA)
    expect(p.etimologia).toContain('Proviene del griego antiguo')
    expect(p.etimologia).toContain('hegemonía')
    expect(p.significado).toContain('Persona que interpreta o explica un texto')
    // La etiqueta con U+200B delante también se reconoce.
    expect(p.etimologia).not.toContain('Persona que interpreta')
    expect(p.resto).toBe('')
  })

  it('sin etiquetas, todo va a resto y nada se pierde', () => {
    const p = splitComment('viene del griego λόγος, "palabra"')
    expect(p.significado).toBe('')
    expect(p.etimologia).toBe('')
    expect(p.resto).toContain('λόγος')
  })
})

describe('extractGreekFragments', () => {
  const frags = extractGreekFragments(EXEGETA)
  const por = new Map(frags.map((f) => [f.gr, f]))

  it('detecta los tres fragmentos griegos del ejemplo', () => {
    expect(por.has('ἐξηγητής')).toBe(true)
    expect(por.has('ἐξ')).toBe(true)
    expect(por.has('ἡγεῖσθαι')).toBe(true)
    expect(frags).toHaveLength(3)
  })

  it('mina la transliteración del paréntesis posterior: ἐξηγητής (exēgētēs)', () => {
    expect(por.get('ἐξηγητής')?.translit).toBe('exēgētēs')
  })

  it('mina la transliteración previa cuando el griego va entre paréntesis', () => {
    // «el verbo hēgeisthai (ἡγεῖσθαι)»
    expect(por.get('ἡγεῖσθαι')?.translit).toBe('hēgeisthai')
    // «el prefijo ex- (ἐξ)»
    expect(por.get('ἐξ')?.translit).toBe('ex-')
  })

  it('mina la glosa de «que significa "…"»', () => {
    expect(por.get('ἐξηγητής')?.gloss).toBe('guía')
    expect(por.get('ἐξ')?.gloss).toBe('fuera')
    expect(por.get('ἡγεῖσθαι')?.gloss).toBe('guiar')
  })

  it('deduplica por forma normalizada', () => {
    const dos = extractGreekFragments('λόγος y de nuevo λόγος (lógos)')
    expect(dos).toHaveLength(1)
    expect(dos[0].translit).toBe('lógos')
  })

  it('greekKey agrupa formas con y sin diacríticos', () => {
    expect(greekKey('ἐξ')).toBe(greekKey('εξ'))
  })
})

describe('parseNousFile', () => {
  const AHORA = 1751630000000
  const valido = JSON.stringify({
    formato: 'nous-vocab',
    version: 1,
    app: 'nous',
    palabras: [
      {
        id: 'w1',
        palabra: 'exégeta',
        idioma: 'es',
        comentario: EXEGETA,
        contexto: 'una frase',
        libro: 'Un libro',
        creadaEn: 123,
        campoDesconocido: 'se ignora',
      },
      { id: 'w2', palabra: 'hegemonía', idioma: 'ES' },
      { id: '', palabra: 'sin-id-se-salta' },
    ],
  })

  it('acepta un fichero v1 y normaliza los opcionales ausentes', () => {
    const words = parseNousFile(valido, AHORA)
    expect(words).toHaveLength(2)
    expect(words[0]).toMatchObject({
      id: 'w1',
      palabra: 'exégeta',
      idioma: 'es',
      libro: 'Un libro',
      creadaEn: 123,
      importadaEn: AHORA,
    })
    expect(words[1]).toMatchObject({
      id: 'w2',
      idioma: 'es', // se normaliza a minúsculas
      comentario: '',
      contexto: '',
      libro: '',
      creadaEn: 0,
    })
  })

  it('rechaza con mensajes legibles lo que no es nous-vocab', () => {
    expect(() => parseNousFile('esto no es json', AHORA)).toThrow(/JSON válido/)
    expect(() => parseNousFile('{"formato":"otro"}', AHORA)).toThrow(/nous-vocab/)
    expect(() =>
      parseNousFile('{"formato":"nous-vocab","version":2,"palabras":[]}', AHORA),
    ).toThrow(/[Vv]ersión/)
    expect(() =>
      parseNousFile('{"formato":"nous-vocab","version":1}', AHORA),
    ).toThrow(/palabras/)
  })
})
