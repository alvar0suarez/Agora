/**
 * Las 24 letras del alfabeto griego con su pronunciación RECONSTRUIDA ÁTICA
 * (siglo V a.C.), referencia: "Vox Graeca" de W. S. Allen.
 *
 * Ojo a los rasgos del ático auténtico que lo diferencian del "erasmiano":
 *  - φ θ χ son oclusivas ASPIRADAS [pʰ tʰ kʰ], no fricativas (f / z / j).
 *  - β γ δ son oclusivas sonoras [b g d].
 *  - ζ = [zd]; υ = [y] (la "u" francesa).
 */

export interface GreekLetter {
  id: string
  /** Nombre de la letra en griego (con diacríticos). */
  name: string
  upper: string
  lower: string
  /** Transliteración latina habitual. */
  translit: string
  /** Sonido reconstruido en AFI (IPA). */
  ipa: string
  /** Pista del sonido, en lenguaje llano. */
  sound: string
}

export const LETTERS: GreekLetter[] = [
  { id: 'alpha',   name: 'ἄλφα',     upper: 'Α', lower: 'α', translit: 'a',  ipa: '[a] · [aː]', sound: 'Como la «a» española (breve o larga).' },
  { id: 'beta',    name: 'βῆτα',     upper: 'Β', lower: 'β', translit: 'b',  ipa: '[b]',        sound: 'Como la «b» de «bota» (oclusiva, cerrando los labios).' },
  { id: 'gamma',   name: 'γάμμα',    upper: 'Γ', lower: 'γ', translit: 'g',  ipa: '[g]',        sound: 'Como la «g» de «gato», siempre dura. Ante κ/γ/χ suena «n» nasal.' },
  { id: 'delta',   name: 'δέλτα',    upper: 'Δ', lower: 'δ', translit: 'd',  ipa: '[d]',        sound: 'Como la «d» oclusiva de «día».' },
  { id: 'epsilon', name: 'ἒ ψιλόν',  upper: 'Ε', lower: 'ε', translit: 'e',  ipa: '[e]',        sound: 'Una «e» breve y cerrada.' },
  { id: 'zeta',    name: 'ζῆτα',     upper: 'Ζ', lower: 'ζ', translit: 'z',  ipa: '[zd]',       sound: 'Como «sd» sonora (ático clásico), p. ej. «esde».' },
  { id: 'eta',     name: 'ἦτα',      upper: 'Η', lower: 'η', translit: 'ē',  ipa: '[ɛː]',       sound: 'Una «e» abierta y larga.' },
  { id: 'theta',   name: 'θῆτα',     upper: 'Θ', lower: 'θ', translit: 'th', ipa: '[tʰ]',       sound: '«t» aspirada: t + soplo de aire. NO es la «z» ni la «th» inglesa.' },
  { id: 'iota',    name: 'ἰῶτα',     upper: 'Ι', lower: 'ι', translit: 'i',  ipa: '[i] · [iː]', sound: 'Como la «i» española (breve o larga).' },
  { id: 'kappa',   name: 'κάππα',    upper: 'Κ', lower: 'κ', translit: 'k',  ipa: '[k]',        sound: 'Como la «k» de «casa», sin soplo.' },
  { id: 'lambda',  name: 'λάμβδα',   upper: 'Λ', lower: 'λ', translit: 'l',  ipa: '[l]',        sound: 'Como la «l» española.' },
  { id: 'mu',      name: 'μῦ',       upper: 'Μ', lower: 'μ', translit: 'm',  ipa: '[m]',        sound: 'Como la «m».' },
  { id: 'nu',      name: 'νῦ',       upper: 'Ν', lower: 'ν', translit: 'n',  ipa: '[n]',        sound: 'Como la «n».' },
  { id: 'xi',      name: 'ξῖ',       upper: 'Ξ', lower: 'ξ', translit: 'x',  ipa: '[ks]',       sound: 'Como «x» de «taxi» (k + s).' },
  { id: 'omicron', name: 'ὂ μικρόν', upper: 'Ο', lower: 'ο', translit: 'o',  ipa: '[o]',        sound: 'Una «o» breve y cerrada.' },
  { id: 'pi',      name: 'πῖ',       upper: 'Π', lower: 'π', translit: 'p',  ipa: '[p]',        sound: 'Como la «p», sin soplo.' },
  { id: 'rho',     name: 'ῥῶ',       upper: 'Ρ', lower: 'ρ', translit: 'r',  ipa: '[r]',        sound: 'Una «r» vibrante (como «rr»). Al inicio de palabra, aspirada (ῥ).' },
  { id: 'sigma',   name: 'σίγμα',    upper: 'Σ', lower: 'σ', translit: 's',  ipa: '[s]',        sound: 'Como la «s» sorda. A final de palabra se escribe «ς».' },
  { id: 'tau',     name: 'ταῦ',      upper: 'Τ', lower: 'τ', translit: 't',  ipa: '[t]',        sound: 'Como la «t» dental, sin soplo.' },
  { id: 'upsilon', name: 'ὖ ψιλόν',  upper: 'Υ', lower: 'υ', translit: 'y',  ipa: '[y] · [yː]', sound: 'Como la «u» francesa / «ü» alemana (labios de «u», lengua de «i»).' },
  { id: 'phi',     name: 'φῖ',       upper: 'Φ', lower: 'φ', translit: 'ph', ipa: '[pʰ]',       sound: '«p» aspirada: p + soplo. NO es «f».' },
  { id: 'chi',     name: 'χῖ',       upper: 'Χ', lower: 'χ', translit: 'ch', ipa: '[kʰ]',       sound: '«k» aspirada: k + soplo. NO es «j».' },
  { id: 'psi',     name: 'ψῖ',       upper: 'Ψ', lower: 'ψ', translit: 'ps', ipa: '[ps]',       sound: 'Como «ps» (pronunciando la p, como en «psicología»).' },
  { id: 'omega',   name: 'ὦ μέγα',   upper: 'Ω', lower: 'ω', translit: 'ō',  ipa: '[ɔː]',       sound: 'Una «o» abierta y larga.' },
]
