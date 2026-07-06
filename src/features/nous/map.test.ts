import { describe, expect, it } from 'vitest'
import type { NousWordRecord } from '../../core/storage/db'
import { buildRootGroups, canonicalKey, etiqueta, glosaDe } from './map'

function palabra(id: string, palabra: string, comentario: string): NousWordRecord {
  return {
    id,
    palabra,
    idioma: 'es',
    comentario,
    contexto: '',
    libro: '',
    creadaEn: 0,
    importadaEn: 0,
  }
}

const EXEGETA = palabra(
  'w-exegeta',
  'exégeta',
  'Etimología: del griego ἐξηγητής (exēgētēs), del prefijo ex- (ἐξ), que ' +
    'significa "fuera", y el verbo hēgeisthai (ἡγεῖσθαι), que significa "guiar".',
)
const HEGEMONIA = palabra(
  'w-hegemonia',
  'hegemonía',
  'Etimología: de ἡγεμονία (hēgemonía), de ἡγεῖσθαι, "guiar, conducir".',
)
const TEOLOGIA = palabra(
  'w-teologia',
  'teología',
  'Etimología: de θεός ("dios") y λόγος (lógos, "palabra, estudio").',
)

describe('buildRootGroups', () => {
  it('conecta dos palabras que comparten un fragmento (ἡγεῖσθαι)', () => {
    const groups = buildRootGroups([EXEGETA, HEGEMONIA])
    const heg = groups.find((g) => g.formas.some((f) => f.gr === 'ἡγεῖσθαι'))
    expect(heg).toBeDefined()
    expect(heg!.wordIds).toEqual(['w-exegeta', 'w-hegemonia'])
    // Las raíces compartidas van primero.
    expect(groups[0]).toBe(heg)
  })

  it('las raíces no compartidas quedan como grupos de una palabra', () => {
    const groups = buildRootGroups([EXEGETA, HEGEMONIA])
    const ex = groups.find((g) => g.formas.some((f) => f.gr === 'ἐξ'))
    expect(ex?.wordIds).toEqual(['w-exegeta'])
  })

  it('enriquece con la raíz curada de Agora cuando casa (λόγος)', () => {
    const groups = buildRootGroups([TEOLOGIA])
    const logos = groups.find((g) => g.formas.some((f) => f.gr === 'λόγος'))
    expect(logos?.curated?.id).toBe('logos')
    expect(glosaDe(logos!)).toBe(logos!.curated!.gloss)
  })

  it('una fusión manual agrupa formas distintas bajo una sola raíz', () => {
    // Sin fusión: θεός y λόγος son grupos separados.
    const sin = buildRootGroups([TEOLOGIA])
    expect(sin.filter((g) => g.formas.length > 0).length).toBeGreaterThanOrEqual(2)

    // Con fusión (claves normalizadas): θεός pasa a vivir bajo λόγος.
    const con = buildRootGroups([TEOLOGIA], { θεοσ: 'λογοσ' })
    const grupo = con.find((g) => g.formas.some((f) => f.gr === 'θεός'))
    expect(grupo).toBeDefined()
    expect(grupo!.key).toBe('λογοσ')
    expect(grupo!.formas.map((f) => f.gr)).toEqual(
      expect.arrayContaining(['θεός', 'λόγος']),
    )
    expect(grupo!.curated?.id).toBe('logos')
  })

  it('etiqueta: prefiere la raíz curada; si no, la primera forma vista', () => {
    const groups = buildRootGroups([EXEGETA])
    const heg = groups.find((g) => g.formas.some((f) => f.gr === 'ἡγεῖσθαι'))
    expect(etiqueta(heg!)).toBe('ἡγεῖσθαι')
  })
})

describe('canonicalKey', () => {
  it('sigue cadenas de fusiones', () => {
    expect(canonicalKey('a', { a: 'b', b: 'c' })).toBe('c')
  })
  it('no se cuelga con ciclos', () => {
    expect(['a', 'b']).toContain(canonicalKey('a', { a: 'b', b: 'a' }))
  })
  it('sin fusiones devuelve la propia clave', () => {
    expect(canonicalKey('x', {})).toBe('x')
  })
})
