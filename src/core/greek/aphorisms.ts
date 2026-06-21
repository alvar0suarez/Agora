/**
 * Aforismos y sentencias breves del griego clásico, con traducción y desglose
 * palabra por palabra. Son el corazón de la meta: leer las frases que aparecen
 * citadas en libros o inscripciones y entenderlas sin depender de la traducción.
 *
 * Viven en `core` (los comparten features: lectura hoy; quizá repaso mañana).
 * Texto en ático con ortografía estándar; atribuciones honestas ("atribuido a"
 * cuando la fuente es tradición y no un texto literal).
 */

/** Una palabra del aforismo con su glosa breve en español. */
export interface AphorismWord {
  gr: string
  gloss: string
  /**
   * Id del lema de vocabulario (`core/greek/vocab.ts`) al que corresponde esta
   * forma, si está en el vocabulario. Permite enlazar la lectura con la ficha
   * de la palabra (la forma del texto suele estar flexionada respecto al lema).
   */
  lemmaId?: string
}

/** Un aforismo: texto completo, traducción, fuente y desglose. */
export interface Aphorism {
  /** Identificador único y estable. */
  id: string
  /** Texto griego completo. */
  greek: string
  /** Traducción al español. */
  translation: string
  /** Autor u obra (o tradición), para dar contexto. */
  source: string
  /** Desglose palabra por palabra, en orden. */
  words: AphorismWord[]
}

export const APHORISMS: Aphorism[] = [
  {
    id: 'gnothi-seauton',
    greek: 'γνῶθι σεαυτόν',
    translation: 'Conócete a ti mismo.',
    source: 'Máxima délfica',
    words: [
      { gr: 'γνῶθι', gloss: 'conoce (imperativo)' },
      { gr: 'σεαυτόν', gloss: 'a ti mismo' },
    ],
  },
  {
    id: 'meden-agan',
    greek: 'μηδὲν ἄγαν',
    translation: 'Nada en exceso.',
    source: 'Máxima délfica',
    words: [
      { gr: 'μηδέν', gloss: 'nada' },
      { gr: 'ἄγαν', gloss: 'demasiado, en exceso' },
    ],
  },
  {
    id: 'panta-rhei',
    greek: 'πάντα ῥεῖ',
    translation: 'Todo fluye.',
    source: 'Heráclito (atribuido)',
    words: [
      { gr: 'πάντα', gloss: 'todas las cosas, todo', lemmaId: 'pas' },
      { gr: 'ῥεῖ', gloss: 'fluye, corre' },
    ],
  },
  {
    id: 'hen-oida',
    greek: 'ἓν οἶδα ὅτι οὐδὲν οἶδα',
    translation: 'Solo sé que no sé nada.',
    source: 'Sócrates (tradición)',
    words: [
      { gr: 'ἓν', gloss: 'una (cosa)' },
      { gr: 'οἶδα', gloss: 'sé', lemmaId: 'oida' },
      { gr: 'ὅτι', gloss: 'que' },
      { gr: 'οὐδὲν', gloss: 'nada' },
      { gr: 'οἶδα', gloss: 'sé', lemmaId: 'oida' },
    ],
  },
  {
    id: 'speude-bradeos',
    greek: 'σπεῦδε βραδέως',
    translation: 'Apresúrate despacio.',
    source: 'Proverbio (atribuido a Augusto)',
    words: [
      { gr: 'σπεῦδε', gloss: 'apresúrate (imperativo)' },
      { gr: 'βραδέως', gloss: 'despacio, lentamente' },
    ],
  },
  {
    id: 'bios-brachys',
    greek: 'ὁ βίος βραχύς, ἡ δὲ τέχνη μακρή',
    translation: 'La vida es breve; el arte, largo.',
    source: 'Hipócrates, Aforismos',
    words: [
      { gr: 'ὁ', gloss: 'el (artículo)', lemmaId: 'ho' },
      { gr: 'βίος', gloss: 'vida', lemmaId: 'bios' },
      { gr: 'βραχύς', gloss: 'breve, corto' },
      { gr: 'ἡ', gloss: 'la (artículo)', lemmaId: 'ho' },
      { gr: 'δὲ', gloss: 'y, mas (contraste)' },
      { gr: 'τέχνη', gloss: 'arte, técnica' },
      { gr: 'μακρή', gloss: 'larga' },
    ],
  },
  {
    id: 'anexetastos-bios',
    greek: 'ὁ ἀνεξέταστος βίος οὐ βιωτὸς ἀνθρώπῳ',
    translation: 'Una vida sin examen no merece ser vivida por el hombre.',
    source: 'Platón, Apología de Sócrates',
    words: [
      { gr: 'ὁ', gloss: 'la (artículo)', lemmaId: 'ho' },
      { gr: 'ἀνεξέταστος', gloss: 'no examinada, sin reflexión' },
      { gr: 'βίος', gloss: 'vida', lemmaId: 'bios' },
      { gr: 'οὐ', gloss: 'no', lemmaId: 'ou' },
      { gr: 'βιωτὸς', gloss: 'digna de vivirse, vivible' },
      { gr: 'ἀνθρώπῳ', gloss: 'para el hombre', lemmaId: 'anthropos' },
    ],
  },
  {
    id: 'chalepa-ta-kala',
    greek: 'χαλεπὰ τὰ καλά',
    translation: 'Lo bello es difícil.',
    source: 'Platón (proverbial)',
    words: [
      { gr: 'χαλεπὰ', gloss: 'difíciles, arduas' },
      { gr: 'τὰ', gloss: 'las (cosas)', lemmaId: 'ho' },
      { gr: 'καλά', gloss: 'bellas, hermosas' },
    ],
  },
  {
    id: 'anthropos-politikon',
    greek: 'ὁ ἄνθρωπος φύσει πολιτικὸν ζῷον',
    translation: 'El hombre es por naturaleza un animal político.',
    source: 'Aristóteles, Política',
    words: [
      { gr: 'ὁ', gloss: 'el (artículo)', lemmaId: 'ho' },
      { gr: 'ἄνθρωπος', gloss: 'ser humano, hombre', lemmaId: 'anthropos' },
      { gr: 'φύσει', gloss: 'por naturaleza', lemmaId: 'physis' },
      { gr: 'πολιτικὸν', gloss: 'político, social' },
      { gr: 'ζῷον', gloss: 'animal, ser vivo' },
    ],
  },
  {
    id: 'chronos-panta-lyei',
    greek: 'ὁ χρόνος πάντα λύει',
    translation: 'El tiempo todo lo resuelve.',
    source: 'Proverbio griego',
    words: [
      { gr: 'ὁ', gloss: 'el (artículo)', lemmaId: 'ho' },
      { gr: 'χρόνος', gloss: 'tiempo', lemmaId: 'chronos' },
      { gr: 'πάντα', gloss: 'todas las cosas, todo', lemmaId: 'pas' },
      { gr: 'λύει', gloss: 'resuelve, disuelve' },
    ],
  },
  {
    id: 'hen-kai-pan',
    greek: 'ἓν καὶ πᾶν',
    translation: 'Uno y todo.',
    source: 'Tradición (panteísmo)',
    words: [
      { gr: 'ἓν', gloss: 'uno' },
      { gr: 'καὶ', gloss: 'y', lemmaId: 'kai' },
      { gr: 'πᾶν', gloss: 'todo', lemmaId: 'pas' },
    ],
  },
  {
    id: 'panton-metron-anthropos',
    greek: 'πάντων χρημάτων μέτρον ἄνθρωπος',
    translation: 'El hombre es la medida de todas las cosas.',
    source: 'Protágoras (Platón, Teeteto)',
    words: [
      { gr: 'πάντων', gloss: 'de todas las cosas', lemmaId: 'pas' },
      { gr: 'χρημάτων', gloss: 'de las cosas, de los asuntos', lemmaId: 'chrema' },
      { gr: 'μέτρον', gloss: 'medida', lemmaId: 'metron' },
      { gr: 'ἄνθρωπος', gloss: 'el hombre, el ser humano', lemmaId: 'anthropos' },
    ],
  },
  {
    id: 'physis-kryptesthai',
    greek: 'φύσις κρύπτεσθαι φιλεῖ',
    translation: 'La naturaleza gusta de ocultarse.',
    source: 'Heráclito',
    words: [
      { gr: 'φύσις', gloss: 'naturaleza', lemmaId: 'physis' },
      { gr: 'κρύπτεσθαι', gloss: 'ocultarse (infinitivo)' },
      { gr: 'φιλεῖ', gloss: 'gusta de, ama', lemmaId: 'phileo' },
    ],
  },
  {
    id: 'nous-hora-nous-akouei',
    greek: 'νοῦς ὁρᾷ καὶ νοῦς ἀκούει',
    translation: 'La mente ve y la mente oye.',
    source: 'Epicarmo',
    words: [
      { gr: 'νοῦς', gloss: 'mente, intelecto', lemmaId: 'nous' },
      { gr: 'ὁρᾷ', gloss: 've', lemmaId: 'horao' },
      { gr: 'καὶ', gloss: 'y', lemmaId: 'kai' },
      { gr: 'νοῦς', gloss: 'mente, intelecto', lemmaId: 'nous' },
      { gr: 'ἀκούει', gloss: 'oye', lemmaId: 'akouo' },
    ],
  },
  {
    id: 'arche-hemisy-pantos',
    greek: 'ἀρχὴ ἥμισυ παντός',
    translation: 'El comienzo es la mitad del todo.',
    source: 'Proverbio (cf. Platón, Leyes)',
    words: [
      { gr: 'ἀρχὴ', gloss: 'comienzo, principio', lemmaId: 'arche' },
      { gr: 'ἥμισυ', gloss: 'la mitad', lemmaId: 'hemisy' },
      { gr: 'παντός', gloss: 'del todo', lemmaId: 'pas' },
    ],
  },
]

/** Índice por id. */
export const aphorismById = new Map(APHORISMS.map((a) => [a.id, a]))
