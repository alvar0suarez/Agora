import { wordToIpa, textToIpa } from './g2p'

/**
 * Transcripción fonética LEGIBLE para hispanohablantes, derivada del IPA del
 * G2P: sílabas separadas por guiones, la TÓNICA en mayúsculas y las vocales
 * largas con circunflejo ("PAN-ta RÊ", "an-THRÔ-pos"). Es la ayuda visual que
 * acompaña al botón «Oír»: ves cómo suena mientras lo escuchas.
 *
 * Convenciones (siguen a letters.ts / vocab.ts): ph/th/kh = aspiradas,
 * ü = la u francesa [y], h = aspirada, sd = ζ. Lógica PURA y testeada;
 * replicable a otro idioma cambiando solo las tablas.
 */

/** Unidades del IPA propio, de más larga a más corta (greedy). */
const TOKENS: [string, string, boolean][] = [
  // [ipa, legible, esVocal]
  ['ɛːu̯', 'êu', true],
  ['au̯', 'au', true],
  ['eu̯', 'eu', true],
  ['ai̯', 'ai', true],
  ['oi̯', 'oi', true],
  ['yi̯', 'üi', true],
  ['aː', 'â', true],
  ['eː', 'ê', true],
  ['ɛː', 'ê', true],
  ['iː', 'î', true],
  ['ɔː', 'ô', true],
  ['uː', 'û', true],
  ['yː', 'ü', true],
  ['pʰ', 'ph', false],
  ['tʰ', 'th', false],
  ['kʰ', 'kh', false],
  ['zd', 'sd', false],
  ['ks', 'ks', false],
  ['ps', 'ps', false],
  ['a', 'a', true],
  ['e', 'e', true],
  ['i', 'i', true],
  ['o', 'o', true],
  ['u', 'u', true],
  ['y', 'ü', true],
  ['ɡ', 'g', false],
  ['ŋ', 'n', false],
  ['b', 'b', false],
  ['d', 'd', false],
  ['h', 'h', false],
  ['k', 'k', false],
  ['l', 'l', false],
  ['m', 'm', false],
  ['n', 'n', false],
  ['p', 'p', false],
  ['r', 'r', false],
  ['s', 's', false],
  ['t', 't', false],
  ['z', 's', false],
]

interface Tok {
  text: string
  vowel: boolean
}

/** Trocea el IPA en unidades legibles; devuelve también la vocal tónica. */
function tokenize(ipa: string): { toks: Tok[]; stressedVowel: number } {
  const toks: Tok[] = []
  let stressedVowel = -1
  let vowels = 0
  let i = 0
  while (i < ipa.length) {
    if (ipa[i] === 'ˈ') {
      stressedVowel = vowels // la siguiente vocal es la tónica
      i++
      continue
    }
    const hit = TOKENS.find(([t]) => ipa.startsWith(t, i))
    if (hit) {
      toks.push({ text: hit[1], vowel: hit[2] })
      if (hit[2]) vowels++
      i += hit[0].length
    } else {
      i++ // símbolo desconocido: se ignora (robustez)
    }
  }
  return { toks, stressedVowel }
}

interface Syllable {
  onset: string[]
  nucleus: string
  coda: string[]
}

/** Convierte el IPA de UNA palabra en sílabas legibles ("an-THRÔ-pos"). */
export function ipaToSpanish(ipa: string): string {
  const { toks, stressedVowel } = tokenize(ipa)
  // Sílabas con núcleo vocálico explícito.
  const syllables: Syllable[] = []
  let pending: string[] = []
  for (const t of toks) {
    if (t.vowel) {
      syllables.push({ onset: pending, nucleus: t.text, coda: [] })
      pending = []
    } else {
      pending.push(t.text)
    }
  }
  if (syllables.length === 0) return pending.join('')
  syllables[syllables.length - 1].coda.push(...pending)
  // Entre vocales: una consonante abre sílaba (le-ge); de un grupo de 2+, la
  // primera cierra la anterior y el resto abre (pan-ta, an-thrô-pos).
  for (let s = 1; s < syllables.length; s++) {
    if (syllables[s].onset.length >= 2) {
      const moved = syllables[s].onset.shift()
      if (moved) syllables[s - 1].coda.push(moved)
    }
  }
  return syllables
    .map((sy, idx) => {
      const text = [...sy.onset, sy.nucleus, ...sy.coda].join('')
      return idx === stressedVowel ? text.toUpperCase() : text
    })
    .join('-')
}

/** Transcripción legible de una palabra griega. */
export function wordPron(word: string): string {
  return ipaToSpanish(wordToIpa(word))
}

/** Transcripción legible de una frase entera ("PAN-ta RÊ"). */
export function sentencePron(text: string): string {
  return textToIpa(text)
    .map((t) => (t.ipa ? ipaToSpanish(t.ipa) : null))
    .filter((x): x is string => x !== null && x.length > 0)
    .join(' ')
}
