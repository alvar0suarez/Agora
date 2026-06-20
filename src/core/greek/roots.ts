/**
 * Etimología: raíces griegas (morfemas) y palabras españolas derivadas. Sirve a
 * la meta "aprender mejor el español a través del griego": ves de qué raíz griega
 * sale cada palabra y exploras su familia. Las palabras COMPUESTAS enlazan varias
 * raíces (p. ej. cineteca = κίνημα + θήκη), que es lo que forma el árbol.
 *
 * Es contenido CURADO (datos), 100% offline: la app solo navega el grafo. La
 * "descomposición automática" de palabras nuevas se deja para más adelante.
 * Diseño en docs/etimologia.md.
 */

/** Un morfema griego (raíz, prefijo o sufijo) presente en el español. */
export interface Root {
  /** Id único y estable. */
  id: string
  /** Forma griega. */
  gr: string
  /** Transliteración. */
  translit: string
  /** Cómo aparece en español (p. ej. '-teca', 'cine-', 'bio-'). */
  forma: string
  /** Significado en español. */
  gloss: string
  /** Id del lema en el vocabulario, si la raíz es además una palabra (para audio/ficha). */
  lemmaId?: string
}

/** Una palabra española y las raíces griegas que la componen. */
export interface DerivedWord {
  word: string
  /** Ids de las raíces (varias = palabra compuesta). */
  roots: string[]
  nota?: string
}

export const ROOTS: Root[] = [
  { id: 'theke',     gr: 'θήκη',     translit: 'thḗkē',     forma: '-teca',    gloss: 'caja, depósito' },
  { id: 'kinema',    gr: 'κίνημα',   translit: 'kínēma',    forma: 'cine-',    gloss: 'movimiento' },
  { id: 'biblion',   gr: 'βιβλίον',  translit: 'biblíon',   forma: 'biblio-',  gloss: 'libro' },
  { id: 'diskos',    gr: 'δίσκος',   translit: 'dískos',    forma: 'disco-',   gloss: 'disco' },
  { id: 'hemera',    gr: 'ἡμέρα',    translit: 'hēméra',    forma: 'hemero-',  gloss: 'día' },
  { id: 'pinax',     gr: 'πίναξ',    translit: 'pínax',     forma: 'pinaco-',  gloss: 'cuadro, tabla' },
  { id: 'bios',      gr: 'βίος',     translit: 'bíos',      forma: 'bio-',     gloss: 'vida', lemmaId: 'bios' },
  { id: 'logos',     gr: 'λόγος',    translit: 'lógos',     forma: '-logía',   gloss: 'palabra, estudio', lemmaId: 'logos' },
  { id: 'graphein',  gr: 'γράφειν',  translit: 'gráphein',  forma: '-grafía',  gloss: 'escribir' },
  { id: 'ge',        gr: 'γῆ',       translit: 'gê',        forma: 'geo-',     gloss: 'tierra' },
  { id: 'psyche',    gr: 'ψυχή',     translit: 'psychḗ',    forma: 'psico-',   gloss: 'alma, mente', lemmaId: 'psyche' },
  { id: 'anthropos', gr: 'ἄνθρωπος', translit: 'ánthrōpos', forma: 'antropo-', gloss: 'ser humano', lemmaId: 'anthropos' },
  { id: 'philos',    gr: 'φίλος',    translit: 'phílos',    forma: 'filo-',    gloss: 'amor, amigo' },
  { id: 'sophia',    gr: 'σοφία',    translit: 'sophía',    forma: '-sofía',   gloss: 'sabiduría', lemmaId: 'sophia' },
  { id: 'tele',      gr: 'τῆλε',     translit: 'têle',      forma: 'tele-',    gloss: 'lejos' },
  { id: 'phone',     gr: 'φωνή',     translit: 'phōnḗ',     forma: '-fonía',   gloss: 'sonido, voz' },
  { id: 'chronos',   gr: 'χρόνος',   translit: 'chrónos',   forma: 'crono-',   gloss: 'tiempo', lemmaId: 'chronos' },
  { id: 'demos',     gr: 'δῆμος',    translit: 'dêmos',     forma: 'demo-',    gloss: 'pueblo' },
  { id: 'kratos',    gr: 'κράτος',   translit: 'krátos',    forma: '-cracia',  gloss: 'poder' },
]

export const DERIVED: DerivedWord[] = [
  { word: 'cineteca',      roots: ['kinema', 'theke'],   nota: 'depósito de películas' },
  { word: 'biblioteca',    roots: ['biblion', 'theke'],  nota: 'depósito de libros' },
  { word: 'discoteca',     roots: ['diskos', 'theke'] },
  { word: 'hemeroteca',    roots: ['hemera', 'theke'],   nota: 'depósito de periódicos' },
  { word: 'pinacoteca',    roots: ['pinax', 'theke'],    nota: 'depósito de cuadros' },
  { word: 'biología',      roots: ['bios', 'logos'],     nota: 'estudio de la vida' },
  { word: 'biografía',     roots: ['bios', 'graphein'],  nota: 'escribir una vida' },
  { word: 'geografía',     roots: ['ge', 'graphein'] },
  { word: 'geología',      roots: ['ge', 'logos'] },
  { word: 'cinematógrafo', roots: ['kinema', 'graphein'], nota: 'registrar el movimiento' },
  { word: 'psicología',    roots: ['psyche', 'logos'] },
  { word: 'antropología',  roots: ['anthropos', 'logos'] },
  { word: 'filosofía',     roots: ['philos', 'sophia'],  nota: 'amor a la sabiduría' },
  { word: 'filántropo',    roots: ['philos', 'anthropos'], nota: 'que ama al ser humano' },
  { word: 'teléfono',      roots: ['tele', 'phone'],     nota: 'sonido a distancia' },
  { word: 'cronología',    roots: ['chronos', 'logos'] },
  { word: 'democracia',    roots: ['demos', 'kratos'],   nota: 'poder del pueblo' },
]

export const rootById = new Map(ROOTS.map((r) => [r.id, r]))

/** Familia: palabras españolas que usan una raíz dada. */
export function wordsOfRoot(rootId: string): DerivedWord[] {
  return DERIVED.filter((d) => d.roots.includes(rootId))
}
