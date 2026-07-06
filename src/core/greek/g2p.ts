/**
 * G2P ático: convierte texto griego politónico a IPA de la pronunciación
 * RECONSTRUIDA ática (Vox Graeca), palabra a palabra. Es el cerebro del audio de
 * calidad: con esto una voz neuronal (vía SSML `<phoneme alphabet="ipa">`) puede
 * leer CUALQUIER texto griego —palabras, frases, un diálogo— sin depender de
 * pronunciaciones curadas a mano.
 *
 * Listón acordado con el dueño: ~80% pragmático, no el 100% filológico. Se
 * simplifica lo que una voz neuronal no rinde bien:
 *  - Acento de altura → acento de intensidad (ˈ) en la sílaba del agudo o
 *    circunflejo. El grave (acento "rebajado" en contexto) NO acentúa.
 *  - Iota suscrita (ᾳ ῃ ῳ) → vocal larga sin el deslizamiento (aː ɛː ɔː).
 *  - ῥ (rho aspirada) → r simple.
 * Sí se conserva lo que enseña la pronunciación de verdad: aspiradas [pʰ tʰ kʰ],
 * largas η/ω [ɛː ɔː], diptongos ([ai̯ au̯ eu̯…], ου=[uː], ει=[eː]), υ=[y],
 * espíritu áspero [h], ζ=[zd] y γ-nasal [ŋ].
 *
 * Lógica PURA y testeada. Replicable: un `g2p` de latín seguiría este molde.
 */

// Marcas combinantes (tras NFD) que nos importan. El acento GRAVE (U+0300) se
// ignora a propósito: es un agudo "rebajado" en contexto y no acentúa.
const ACUTE = '́'
const CIRCUMFLEX = '͂'
const ROUGH = '̔'
const DIAERESIS = '̈'
const SUBSCRIPT = 'ͅ'
const MACRON = '̄'

/** Una letra griega con sus marcas (espíritus, acentos…). */
interface Seg {
  base: string
  marks: Set<string>
}

/** Una unidad fónica: vocal (mono/diptongo) o consonante, ya en IPA. */
interface Unit {
  ipa: string
  isVowel: boolean
  /** Lleva agudo o circunflejo (el grave no acentúa). */
  stressed: boolean
}

const VOWELS = new Set(['α', 'ε', 'η', 'ι', 'ο', 'υ', 'ω'])

/** Diptongos con segunda ι/υ (la clave es primera+segunda). */
const DIPHTHONGS: Record<string, string> = {
  αι: 'ai̯',
  ει: 'eː',
  οι: 'oi̯',
  υι: 'yi̯',
  αυ: 'au̯',
  ευ: 'eu̯',
  ηυ: 'ɛːu̯',
  ου: 'uː',
}

/** Monoptongos (sin marcas de longitud). */
const MONOPHTHONGS: Record<string, string> = {
  α: 'a',
  ε: 'e',
  η: 'ɛː',
  ι: 'i',
  ο: 'o',
  υ: 'y',
  ω: 'ɔː',
}

/** Alarga una vocal breve (por circunflejo, macron o iota suscrita). */
const LENGTHENED: Record<string, string> = {
  a: 'aː',
  i: 'iː',
  y: 'yː',
}

/** Consonantes simples (γ y σ llevan lógica de contexto aparte). */
const CONSONANTS: Record<string, string> = {
  β: 'b',
  δ: 'd',
  ζ: 'zd',
  θ: 'tʰ',
  κ: 'k',
  λ: 'l',
  μ: 'm',
  ν: 'n',
  ξ: 'ks',
  π: 'p',
  ρ: 'r',
  τ: 't',
  φ: 'pʰ',
  χ: 'kʰ',
  ψ: 'ps',
}

/** Trocea una palabra en letras griegas con sus marcas. */
function segment(word: string): Seg[] {
  const segs: Seg[] = []
  for (const ch of word.normalize('NFD').toLowerCase()) {
    if (/[̀-ͯ]/.test(ch)) {
      segs[segs.length - 1]?.marks.add(ch)
    } else if (/[α-ω]/.test(ch)) {
      segs.push({ base: ch === 'ς' ? 'σ' : ch, marks: new Set() })
    }
    // Cualquier otro carácter (latino, puntuación) se ignora dentro de palabra.
  }
  return segs
}

/** ¿Este par de segmentos forma diptongo? (la diéresis en la 2.ª lo rompe). */
function isDiphthong(a: Seg, b: Seg | undefined): b is Seg {
  if (!b || b.marks.has(DIAERESIS)) return false
  return `${a.base}${b.base}` in DIPHTHONGS
}

/** Convierte una PALABRA griega politónica a IPA reconstruida ática. */
export function wordToIpa(word: string): string {
  const segs = segment(word)
  if (segs.length === 0) return ''

  const units: Unit[] = []
  let rough = false

  for (let i = 0; i < segs.length; i++) {
    const s = segs[i]

    if (VOWELS.has(s.base)) {
      const next = segs[i + 1]
      let marks = s.marks
      let ipa: string
      if (isDiphthong(s, next)) {
        ipa = DIPHTHONGS[`${s.base}${next.base}`]
        marks = new Set([...s.marks, ...next.marks])
        i++
      } else {
        ipa = MONOPHTHONGS[s.base]
        const long =
          marks.has(CIRCUMFLEX) || marks.has(MACRON) || marks.has(SUBSCRIPT)
        if (long && ipa in LENGTHENED) ipa = LENGTHENED[ipa]
      }
      if (marks.has(ROUGH)) rough = true
      units.push({
        ipa,
        isVowel: true,
        stressed: marks.has(ACUTE) || marks.has(CIRCUMFLEX),
      })
      continue
    }

    // Consonantes con contexto.
    if (s.base === 'γ') {
      const nb = segs[i + 1]?.base
      units.push({
        ipa: nb && 'γκξχ'.includes(nb) ? 'ŋ' : 'ɡ',
        isVowel: false,
        stressed: false,
      })
      continue
    }
    if (s.base === 'σ') {
      const nb = segs[i + 1]?.base
      units.push({
        ipa: nb && 'βγδμν'.includes(nb) ? 'z' : 's',
        isVowel: false,
        stressed: false,
      })
      continue
    }
    const ipa = CONSONANTS[s.base]
    if (ipa) units.push({ ipa, isVowel: false, stressed: false })
  }

  // Espíritu áspero → h inicial (también si la palabra empieza por vocal única).
  if (rough) units.unshift({ ipa: 'h', isVowel: false, stressed: false })

  // Acento: ˈ antes de la sílaba de la vocal acentuada. Sílaba pragmática:
  // la vocal más UNA consonante previa (una consonante siempre abre sílaba).
  const accIdx = units.findIndex((u) => u.stressed)
  let out = ''
  for (let i = 0; i < units.length; i++) {
    if (i === accIdx) {
      const prev = units[i - 1]
      if (prev && !prev.isVowel) {
        out = out.slice(0, out.length - prev.ipa.length) + 'ˈ' + prev.ipa
      } else {
        out += 'ˈ'
      }
    }
    out += units[i].ipa
  }
  return out
}

/** Un trozo de texto: palabra griega (con su IPA) o separador (tal cual). */
export interface IpaToken {
  text: string
  /** IPA de la palabra, o null si el trozo es separador/no-griego. */
  ipa: string | null
}

/**
 * Convierte un TEXTO (frase, diálogo) en tokens palabra-a-palabra con su IPA.
 * Los separadores (espacios, puntuación) se conservan para poder reconstruir la
 * frase (p. ej. al montar el SSML con `<phoneme>` por palabra).
 */
export function textToIpa(text: string): IpaToken[] {
  const parts = text.split(/([Ͱ-Ͽἀ-῿]+)/)
  const tokens: IpaToken[] = []
  for (const part of parts) {
    if (part === '') continue
    const isGreek = /[Ͱ-Ͽἀ-῿]/.test(part)
    tokens.push({ text: part, ipa: isGreek ? wordToIpa(part) : null })
  }
  return tokens
}

/** IPA de una frase entera, con las palabras separadas por espacio. */
export function sentenceToIpa(text: string): string {
  return textToIpa(text)
    .map((t) => t.ipa)
    .filter((x): x is string => x !== null && x.length > 0)
    .join(' ')
}
