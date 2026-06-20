/**
 * Vocabulario núcleo del griego ático, en `core` porque lo comparten varios
 * features (vocabulario hoy; lectura graduada mañana). Cada palabra está en su
 * FORMA DE DICCIONARIO (lema); flexionarla es cosa de la Fase 4 (morfología).
 *
 * Seed inicial EQUILIBRADO: palabras-función de altísima frecuencia (para leer
 * la estructura de cualquier frase) + núcleo filosófico (para entender los
 * términos de las citas). La lista crece por tandas revisadas (ver docs/fase-2.md).
 */

/** Categoría gramatical (simplificada para mostrar). */
export type PartOfSpeech =
  | 'artículo'
  | 'sustantivo'
  | 'verbo'
  | 'adjetivo'
  | 'pronombre'
  | 'conjunción'
  | 'adverbio'
  | 'partícula'

/** Una entrada del vocabulario. */
export interface VocabEntry {
  /** Identificador único y estable (slug latino). */
  id: string
  /** Lema en griego (con diacríticos). */
  lemma: string
  /** Significado en español, breve (acepción principal). */
  gloss: string
  /** Categoría gramatical. */
  pos: PartOfSpeech
  /** Etiquetas para filtrar (p. ej. 'frecuencia', 'filosofia'). */
  tags: string[]
  /**
   * Palabras españolas derivadas de esta raíz griega. Objetivo doble: aprender
   * griego y, de paso, entender mejor el español que ya hablas.
   */
  derivados?: string[]
}

export const VOCAB: VocabEntry[] = [
  // — Palabras-función y de altísima frecuencia —
  { id: 'ho',       lemma: 'ὁ, ἡ, τό', gloss: 'el, la, lo (artículo)',        pos: 'artículo',   tags: ['frecuencia'] },
  { id: 'kai',      lemma: 'καί',       gloss: 'y; también; incluso',          pos: 'conjunción', tags: ['frecuencia'] },
  { id: 'ou',       lemma: 'οὐ',        gloss: 'no (negación)',                pos: 'adverbio',   tags: ['frecuencia'] },
  { id: 'eimi',     lemma: 'εἰμί',      gloss: 'ser, estar; existir',          pos: 'verbo',      tags: ['frecuencia'], derivados: ['ontología', 'ente'] },
  { id: 'lego',     lemma: 'λέγω',      gloss: 'decir, hablar',                pos: 'verbo',      tags: ['frecuencia'], derivados: ['léxico', 'diálogo'] },
  { id: 'echo',     lemma: 'ἔχω',       gloss: 'tener; (con inf.) poder',      pos: 'verbo',      tags: ['frecuencia'], derivados: ['esquema', 'epoché'] },
  { id: 'gar',      lemma: 'γάρ',       gloss: 'pues, porque (explicativo)',   pos: 'partícula',  tags: ['frecuencia'] },
  { id: 'alla',     lemma: 'ἀλλά',      gloss: 'pero, sino',                   pos: 'conjunción', tags: ['frecuencia'] },
  { id: 'hos',      lemma: 'ὡς',        gloss: 'como; que; cuando',            pos: 'conjunción', tags: ['frecuencia'] },
  { id: 'ei',       lemma: 'εἰ',        gloss: 'si (condicional)',             pos: 'conjunción', tags: ['frecuencia'] },
  { id: 'autos',    lemma: 'αὐτός',     gloss: 'él mismo; el mismo',           pos: 'pronombre',  tags: ['frecuencia'], derivados: ['automóvil', 'autónomo', 'autógrafo'] },
  { id: 'pas',      lemma: 'πᾶς',       gloss: 'todo, cada; entero',           pos: 'adjetivo',   tags: ['frecuencia'], derivados: ['panorama', 'pandemia', 'panteón'] },

  // — Núcleo filosófico —
  { id: 'logos',     lemma: 'λόγος',        gloss: 'razón; palabra; discurso',     pos: 'sustantivo', tags: ['filosofia'], derivados: ['lógica', 'biología', '-logía'] },
  { id: 'arete',     lemma: 'ἀρετή',        gloss: 'excelencia, virtud',           pos: 'sustantivo', tags: ['filosofia'] },
  { id: 'psyche',    lemma: 'ψυχή',         gloss: 'alma; vida',                   pos: 'sustantivo', tags: ['filosofia'], derivados: ['psique', 'psicología', 'psiquiatría'] },
  { id: 'sophia',    lemma: 'σοφία',        gloss: 'sabiduría',                    pos: 'sustantivo', tags: ['filosofia'], derivados: ['filosofía', 'sofisma'] },
  { id: 'aletheia',  lemma: 'ἀλήθεια',      gloss: 'verdad',                       pos: 'sustantivo', tags: ['filosofia'] },
  { id: 'physis',    lemma: 'φύσις',        gloss: 'naturaleza',                   pos: 'sustantivo', tags: ['filosofia'], derivados: ['física', 'fisiología'] },
  { id: 'kosmos',    lemma: 'κόσμος',       gloss: 'orden; mundo, universo',       pos: 'sustantivo', tags: ['filosofia'], derivados: ['cosmos', 'cosmética', 'cosmología'] },
  { id: 'idea',      lemma: 'ἰδέα',         gloss: 'idea, forma',                  pos: 'sustantivo', tags: ['filosofia'], derivados: ['idea', 'ideal', 'ideología'] },
  { id: 'agathon',   lemma: 'ἀγαθόν',       gloss: 'el bien; lo bueno',            pos: 'sustantivo', tags: ['filosofia'] },
  { id: 'nous',      lemma: 'νοῦς',         gloss: 'mente, intelecto',             pos: 'sustantivo', tags: ['filosofia'] },
  { id: 'arche',     lemma: 'ἀρχή',         gloss: 'principio, origen; poder',     pos: 'sustantivo', tags: ['filosofia'], derivados: ['arcaico', 'monarquía', 'arqueología'] },
  { id: 'eudaimonia', lemma: 'εὐδαιμονία',  gloss: 'felicidad, plenitud',          pos: 'sustantivo', tags: ['filosofia'] },
  { id: 'anthropos', lemma: 'ἄνθρωπος',     gloss: 'ser humano, hombre',           pos: 'sustantivo', tags: ['frecuencia', 'filosofia'], derivados: ['antropología', 'filántropo', 'misántropo'] },
]

/** Índice por id, para resolver una entrada rápido. */
export const vocabById = new Map(VOCAB.map((v) => [v.id, v]))
