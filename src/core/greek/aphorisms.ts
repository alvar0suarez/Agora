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
      { gr: 'πάντα', gloss: 'todas las cosas, todo' },
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
      { gr: 'οἶδα', gloss: 'sé' },
      { gr: 'ὅτι', gloss: 'que' },
      { gr: 'οὐδὲν', gloss: 'nada' },
      { gr: 'οἶδα', gloss: 'sé' },
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
      { gr: 'ὁ', gloss: 'el (artículo)' },
      { gr: 'βίος', gloss: 'vida' },
      { gr: 'βραχύς', gloss: 'breve, corto' },
      { gr: 'ἡ', gloss: 'la (artículo)' },
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
      { gr: 'ὁ', gloss: 'la (artículo)' },
      { gr: 'ἀνεξέταστος', gloss: 'no examinada, sin reflexión' },
      { gr: 'βίος', gloss: 'vida' },
      { gr: 'οὐ', gloss: 'no' },
      { gr: 'βιωτὸς', gloss: 'digna de vivirse, vivible' },
      { gr: 'ἀνθρώπῳ', gloss: 'para el hombre' },
    ],
  },
]

/** Índice por id. */
export const aphorismById = new Map(APHORISMS.map((a) => [a.id, a]))
