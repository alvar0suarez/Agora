/**
 * Notas de clase de palabra: qué es y cómo se usa cada categoría gramatical,
 * en lenguaje llano. GENÉRICAS por categoría (una conjunción es una conjunción),
 * no por palabra. Sirven para dos sitios con una sola fuente de verdad: la nota
 * contextual «¿qué es?» en la tarjeta de vocabulario y la referencia «Las clases
 * de palabra» de la pestaña Gramática. Pensadas para las palabras-herramienta
 * (conjunciones, preposiciones, partículas…), las que más cuesta interiorizar.
 */
import type { PartOfSpeech } from './vocab'

/** Explicación breve de una clase de palabra. */
export interface PosInfo {
  /** Qué es y cómo se usa, en una o dos frases llanas. */
  que: string
  /** Un ejemplo concreto y conocido. */
  ejemplo: string
}

export const POS_INFO: Record<PartOfSpeech, PosInfo> = {
  artículo: {
    que: 'Acompaña al sustantivo y concuerda con él en género, número y caso (como «el / la / lo»). En griego, además, convierte cualquier palabra en sustantivo: τὸ ἀγαθόν = «lo bueno».',
    ejemplo: 'ὁ λόγος = «la palabra»',
  },
  sustantivo: {
    que: 'Nombra cosas, personas o ideas. Cambia de terminación según su caso (la función que hace en la frase: sujeto, complemento…). Se aprende junto a su artículo.',
    ejemplo: 'λόγος = «palabra, razón»',
  },
  verbo: {
    que: 'Expresa una acción o un estado. Se conjuga: cambia según la persona, el tiempo y el modo.',
    ejemplo: 'λέγω = «(yo) digo»',
  },
  adjetivo: {
    que: 'Dice cómo es un sustantivo y concuerda con él en género, número y caso.',
    ejemplo: 'καλός = «bello»',
  },
  pronombre: {
    que: 'Sustituye a un nombre para no repetirlo (yo, este, quién…).',
    ejemplo: 'ἐγώ = «yo»',
  },
  conjunción: {
    que: 'Enlaza palabras o frases enteras (y, pero, si, como…). Es invariable —no se declina ni se conjuga— y su posición en la frase puede moverse.',
    ejemplo: 'καί = «y»',
  },
  adverbio: {
    que: 'Matiza a un verbo, un adjetivo u otro adverbio: dice cómo, cuándo, cuánto, o niega. Es invariable.',
    ejemplo: 'οὐ = «no»',
  },
  partícula: {
    que: 'Palabrita breve e invariable que da matiz, énfasis o hilvana el discurso (marca un contraste, una conclusión, una objeción…). Muchas veces no se traduce con una sola palabra: se «siente». El griego las usa muchísimo.',
    ejemplo: 'γάρ = «pues, porque»',
  },
  preposición: {
    que: 'Va delante de un nombre e indica una relación: lugar, dirección, tiempo, causa… Rige un caso, y el caso cambia el matiz (ἐν + dativo = «en»; εἰς + acusativo = «hacia»).',
    ejemplo: 'ἐν = «en»',
  },
}

/**
 * Orden para la referencia: primero las palabras-herramienta (las que enlazan y
 * matizan, las difíciles), luego las que nombran y actúan.
 */
export const WORD_CLASSES: readonly PartOfSpeech[] = [
  'artículo',
  'conjunción',
  'partícula',
  'preposición',
  'adverbio',
  'pronombre',
  'adjetivo',
  'sustantivo',
  'verbo',
]
