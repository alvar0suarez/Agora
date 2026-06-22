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
  | 'preposición'

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
  /**
   * Transcripción SENCILLA de cómo suena, legible para un hispanohablante
   * (pronunciación ática reconstruida). Curada a mano: el AFI por letra se deriva
   * solo, pero la aspiración (h), la cantidad vocálica y el acento necesitan mano.
   * Opcional; se siembra por tandas empezando por las palabras-función.
   */
  pron?: string
  /** Etiquetas para filtrar (p. ej. 'frecuencia', 'filosofia'). */
  tags: string[]
  /**
   * Palabras españolas derivadas de esta raíz griega. Objetivo doble: aprender
   * griego y, de paso, entender mejor el español que ya hablas.
   */
  derivados?: string[]
}

const ENTRIES: VocabEntry[] = [
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

  // — Partículas y preposiciones de altísima frecuencia —
  { id: 'de',    lemma: 'δέ',    gloss: 'y, pero (conector)',          pos: 'partícula',   tags: ['frecuencia'] },
  { id: 'men',   lemma: 'μέν',   gloss: 'por un lado (correlativo)',   pos: 'partícula',   tags: ['frecuencia'] },
  { id: 'oun',   lemma: 'οὖν',   gloss: 'así pues, por tanto',         pos: 'partícula',   tags: ['frecuencia'] },
  { id: 'en',    lemma: 'ἐν',    gloss: 'en (con dativo)',             pos: 'preposición', tags: ['frecuencia'] },
  { id: 'eis',   lemma: 'εἰς',   gloss: 'a, hacia (con acusativo)',    pos: 'preposición', tags: ['frecuencia'] },
  { id: 'ek',    lemma: 'ἐκ',    gloss: 'de, desde (con genitivo)',    pos: 'preposición', tags: ['frecuencia'] },

  // — Pronombres —
  { id: 'ego',    lemma: 'ἐγώ',    gloss: 'yo',                        pos: 'pronombre', tags: ['frecuencia'], derivados: ['ego', 'egoísmo'] },
  { id: 'houtos', lemma: 'οὗτος',  gloss: 'este, ese',                 pos: 'pronombre', tags: ['frecuencia'] },
  { id: 'tis_q',  lemma: 'τίς',    gloss: '¿quién?, ¿qué?',            pos: 'pronombre', tags: ['frecuencia'] },

  // — Adjetivos frecuentes —
  { id: 'polys', lemma: 'πολύς', gloss: 'mucho, numeroso',  pos: 'adjetivo', tags: ['frecuencia'], derivados: ['polígono', 'polifonía'] },
  { id: 'megas', lemma: 'μέγας', gloss: 'grande',           pos: 'adjetivo', tags: ['frecuencia'], derivados: ['megáfono', 'megalómano'] },
  { id: 'kalos', lemma: 'καλός', gloss: 'bello; bueno',     pos: 'adjetivo', tags: ['frecuencia', 'filosofia'], derivados: ['caligrafía', 'calidoscopio'] },

  // — Verbos frecuentes —
  { id: 'poieo',    lemma: 'ποιέω',     gloss: 'hacer, crear',            pos: 'verbo', tags: ['frecuencia'], derivados: ['poeta', 'poesía'] },
  { id: 'gignosko', lemma: 'γιγνώσκω',  gloss: 'conocer, llegar a saber', pos: 'verbo', tags: ['filosofia'], derivados: ['gnosis', 'diagnóstico'] },
  { id: 'oida',     lemma: 'οἶδα',      gloss: 'saber',                   pos: 'verbo', tags: ['frecuencia', 'filosofia'] },
  { id: 'horao',    lemma: 'ὁράω',      gloss: 'ver, mirar',              pos: 'verbo', tags: ['frecuencia'], derivados: ['panorama'] },
  { id: 'akouo',    lemma: 'ἀκούω',     gloss: 'oír, escuchar',           pos: 'verbo', tags: ['frecuencia'], derivados: ['acústica'] },

  // — Sustantivos comunes y filosóficos —
  { id: 'theos',    lemma: 'θεός',     gloss: 'dios',                pos: 'sustantivo', tags: ['filosofia'], derivados: ['teología', 'ateo', 'politeísmo'] },
  { id: 'chronos',  lemma: 'χρόνος',   gloss: 'tiempo',              pos: 'sustantivo', tags: ['frecuencia', 'filosofia'], derivados: ['cronología', 'anacronismo'] },
  { id: 'bios',     lemma: 'βίος',     gloss: 'vida',                pos: 'sustantivo', tags: ['frecuencia', 'filosofia'], derivados: ['biología', 'biografía'] },
  { id: 'polis',    lemma: 'πόλις',    gloss: 'ciudad, comunidad',   pos: 'sustantivo', tags: ['filosofia'], derivados: ['política', 'metrópoli'] },
  { id: 'doxa',     lemma: 'δόξα',     gloss: 'opinión; gloria',     pos: 'sustantivo', tags: ['filosofia'], derivados: ['ortodoxo', 'paradoja'] },
  { id: 'ergon',    lemma: 'ἔργον',    gloss: 'obra, trabajo',       pos: 'sustantivo', tags: ['frecuencia'], derivados: ['energía', 'ergonomía'] },
  { id: 'mythos',   lemma: 'μῦθος',    gloss: 'relato, mito',        pos: 'sustantivo', tags: ['filosofia'], derivados: ['mito', 'mitología'] },
  { id: 'arithmos', lemma: 'ἀριθμός',  gloss: 'número',              pos: 'sustantivo', tags: ['filosofia'], derivados: ['aritmética', 'algoritmo'] },

  // — Segunda tanda: más frecuencia + núcleo filosófico (Platón, Aristóteles) —
  { id: 'gignomai',    lemma: 'γίγνομαι',     gloss: 'llegar a ser, nacer; suceder', pos: 'verbo',      tags: ['frecuencia', 'filosofia'], derivados: ['génesis', '-geno'] },
  { id: 'phileo',      lemma: 'φιλέω',        gloss: 'amar, querer; gustar de',      pos: 'verbo',      tags: ['frecuencia'], derivados: ['filántropo', 'filia'] },
  { id: 'aner',        lemma: 'ἀνήρ',         gloss: 'hombre, varón',                pos: 'sustantivo', tags: ['frecuencia'], derivados: ['androide', 'andrógino'] },
  { id: 'gyne',        lemma: 'γυνή',         gloss: 'mujer',                        pos: 'sustantivo', tags: ['frecuencia'], derivados: ['ginecología', 'misoginia'] },
  { id: 'oudeis',      lemma: 'οὐδείς',       gloss: 'ninguno, nadie; nada',         pos: 'pronombre',  tags: ['frecuencia'] },
  { id: 'zoe',         lemma: 'ζωή',          gloss: 'vida',                         pos: 'sustantivo', tags: ['frecuencia', 'filosofia'], derivados: ['zoología', 'protozoo'] },
  { id: 'soma',        lemma: 'σῶμα',         gloss: 'cuerpo',                       pos: 'sustantivo', tags: ['filosofia'], derivados: ['somático', 'cromosoma', 'psicosomático'] },
  { id: 'thanatos',    lemma: 'θάνατος',      gloss: 'muerte',                       pos: 'sustantivo', tags: ['filosofia'], derivados: ['eutanasia', 'tanatorio'] },
  { id: 'nomos',       lemma: 'νόμος',        gloss: 'ley; costumbre',               pos: 'sustantivo', tags: ['filosofia'], derivados: ['autonomía', 'astronomía', 'economía'] },
  { id: 'dikaiosyne',  lemma: 'δικαιοσύνη',   gloss: 'justicia',                     pos: 'sustantivo', tags: ['filosofia'] },
  { id: 'telos',       lemma: 'τέλος',        gloss: 'fin, meta; propósito',         pos: 'sustantivo', tags: ['filosofia'], derivados: ['teleología'] },
  { id: 'aitia',       lemma: 'αἰτία',        gloss: 'causa, motivo',                pos: 'sustantivo', tags: ['filosofia'], derivados: ['etiología'] },
  { id: 'dynamis',     lemma: 'δύναμις',      gloss: 'poder, potencia; capacidad',   pos: 'sustantivo', tags: ['filosofia'], derivados: ['dinámica', 'dinamita', 'dinamo'] },
  { id: 'energeia',    lemma: 'ἐνέργεια',     gloss: 'actividad, acto',              pos: 'sustantivo', tags: ['filosofia'], derivados: ['energía', 'energético'] },
  { id: 'ousia',       lemma: 'οὐσία',        gloss: 'ser, esencia; sustancia',      pos: 'sustantivo', tags: ['filosofia'] },
  { id: 'eros',        lemma: 'ἔρως',         gloss: 'amor, deseo',                  pos: 'sustantivo', tags: ['filosofia'], derivados: ['erótico', 'erotismo'] },
  { id: 'philia',      lemma: 'φιλία',        gloss: 'amistad, afecto',              pos: 'sustantivo', tags: ['filosofia'], derivados: ['hemofilia', 'filia'] },
  { id: 'gnome',       lemma: 'γνώμη',        gloss: 'juicio, opinión; máxima',      pos: 'sustantivo', tags: ['filosofia'], derivados: ['gnómico'] },
  { id: 'chrema',      lemma: 'χρῆμα',        gloss: 'cosa, asunto; (pl.) bienes',   pos: 'sustantivo', tags: ['frecuencia'], derivados: ['crematístico'] },
  { id: 'metron',      lemma: 'μέτρον',       gloss: 'medida',                       pos: 'sustantivo', tags: ['filosofia'], derivados: ['metro', 'simetría', 'diámetro'] },
  { id: 'hemisy',      lemma: 'ἥμισυ',        gloss: 'mitad, medio',                 pos: 'adjetivo',   tags: ['frecuencia'], derivados: ['hemisferio', 'hemiciclo'] },
]

/**
 * Transcripción sencilla «cómo suena» (ática reconstruida, Vox Graeca), en grafía
 * pseudo-española: el acento marca la sílaba fuerte; «h» = aspiración soplada;
 * θ/φ/χ son t/p/k SOPLADAS (no «z/f/j»); η/ω son e/o LARGAS; υ ≈ «u» francesa.
 * El acento original era musical (tono), no de intensidad; lo marcamos como
 * sílaba fuerte solo como guía práctica. Sembrado por tandas (función primero).
 */
const PRON: Record<string, string> = {
  // Palabras-función y de altísima frecuencia
  ho: 'ho · hē · tó',
  kai: 'kái',
  ou: 'u',
  eimi: 'eimí',
  lego: 'lég-o',
  echo: 'ék-ho',
  gar: 'gár',
  alla: 'allá',
  hos: 'hos',
  ei: 'ei',
  autos: 'autós',
  pas: 'pas',
  de: 'de',
  men: 'men',
  oun: 'un',
  en: 'en',
  eis: 'eis',
  ek: 'ek',
  ego: 'egó',
  houtos: 'hútos',
  tis_q: 'tis',
  oudeis: 'udéis',
  hemisy: 'hémisü',
  // Adjetivos y pronombres frecuentes
  polys: 'polüs',
  megas: 'mégas',
  kalos: 'kalós',
  // Núcleo muy frecuente (para las citas)
  logos: 'lógos',
  kosmos: 'kósmos',
  theos: 'theós',
  psyche: 'psükhé',
  sophia: 'sophía',
  anthropos: 'ánthrōpos',
}

/**
 * Vocabulario expuesto: las entradas con su transcripción sencilla fusionada
 * (donde está sembrada). Donde no la hay, la tarjeta cae al AFI por letra.
 */
export const VOCAB: VocabEntry[] = ENTRIES.map((e) =>
  PRON[e.id] ? { ...e, pron: PRON[e.id] } : e,
)

/** Índice por id, para resolver una entrada rápido. */
export const vocabById = new Map(VOCAB.map((v) => [v.id, v]))
