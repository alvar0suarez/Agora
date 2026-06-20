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
  { id: 'skopein',   gr: 'σκοπεῖν',  translit: 'skopeîn',   forma: '-scopio',  gloss: 'observar' },
  { id: 'mikros',    gr: 'μικρός',   translit: 'mikrós',    forma: 'micro-',   gloss: 'pequeño' },
  { id: 'mega',      gr: 'μέγας',    translit: 'mégas',     forma: 'mega-',    gloss: 'grande', lemmaId: 'megas' },
  { id: 'hydor',     gr: 'ὕδωρ',     translit: 'hýdōr',     forma: 'hidro-',   gloss: 'agua' },
  { id: 'pyr',       gr: 'πῦρ',      translit: 'pŷr',       forma: 'piro-',    gloss: 'fuego' },
  { id: 'astron',    gr: 'ἄστρον',   translit: 'ástron',    forma: 'astro-',   gloss: 'astro, estrella' },
  { id: 'nautes',    gr: 'ναύτης',   translit: 'naútēs',    forma: '-nauta',   gloss: 'navegante' },
  { id: 'nomos',     gr: 'νόμος',    translit: 'nómos',     forma: '-nomía',   gloss: 'ley, norma' },
  { id: 'oikos',     gr: 'οἶκος',    translit: 'oîkos',     forma: 'eco-',     gloss: 'casa' },
  { id: 'pathos',    gr: 'πάθος',    translit: 'páthos',    forma: '-patía',   gloss: 'sentimiento, sufrimiento' },
  { id: 'onoma',     gr: 'ὄνομα',    translit: 'ónoma',     forma: '-ónimo',   gloss: 'nombre' },
  { id: 'metron',    gr: 'μέτρον',   translit: 'métron',    forma: '-metro',   gloss: 'medida' },
  { id: 'thermos',   gr: 'θερμός',   translit: 'thermós',   forma: 'termo-',   gloss: 'calor' },
  { id: 'monos',     gr: 'μόνος',    translit: 'mónos',     forma: 'mono-',    gloss: 'uno, único' },
  { id: 'gonia',     gr: 'γωνία',    translit: 'gōnía',     forma: '-gono',    gloss: 'ángulo' },
  { id: 'arche',     gr: 'ἀρχή',     translit: 'archḗ',     forma: '-arquía',  gloss: 'origen, mando', lemmaId: 'arche' },
  { id: 'theos',     gr: 'θεός',     translit: 'theós',     forma: 'teo-',     gloss: 'dios', lemmaId: 'theos' },
  { id: 'syn',       gr: 'σύν',      translit: 'sýn',       forma: 'sin-',     gloss: 'con, junto' },
  { id: 'a_priv',    gr: 'ἀ-, ἀν-',  translit: 'a-, an-',   forma: 'a-, an-',  gloss: 'sin, no (privativo)' },
  { id: 'kardia',    gr: 'καρδία',   translit: 'kardía',    forma: 'cardio-',  gloss: 'corazón' },
  { id: 'poly',      gr: 'πολύς',    translit: 'polýs',     forma: 'poli-',    gloss: 'mucho', lemmaId: 'polys' },
  { id: 'techne',    gr: 'τέχνη',    translit: 'téchnē',    forma: 'tecno-',   gloss: 'arte, técnica' },
  { id: 'phobos',    gr: 'φόβος',    translit: 'phóbos',    forma: '-fobia',   gloss: 'miedo' },
  { id: 'agora',     gr: 'ἀγορά',    translit: 'agorá',     forma: 'ágora',    gloss: 'plaza, mercado' },
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
  { word: 'microscopio',   roots: ['mikros', 'skopein'] },
  { word: 'telescopio',    roots: ['tele', 'skopein'] },
  { word: 'megáfono',      roots: ['mega', 'phone'] },
  { word: 'termómetro',    roots: ['thermos', 'metron'] },
  { word: 'geometría',     roots: ['ge', 'metron'],      nota: 'medida de la tierra' },
  { word: 'astronomía',    roots: ['astron', 'nomos'] },
  { word: 'astrología',    roots: ['astron', 'logos'] },
  { word: 'astronauta',    roots: ['astron', 'nautes'],  nota: 'navegante de los astros' },
  { word: 'economía',      roots: ['oikos', 'nomos'],    nota: 'norma de la casa' },
  { word: 'ecología',      roots: ['oikos', 'logos'] },
  { word: 'patología',     roots: ['pathos', 'logos'] },
  { word: 'telepatía',     roots: ['tele', 'pathos'],    nota: 'sentir a distancia' },
  { word: 'simpatía',      roots: ['syn', 'pathos'] },
  { word: 'ateo',          roots: ['a_priv', 'theos'],   nota: 'sin dios' },
  { word: 'teología',      roots: ['theos', 'logos'] },
  { word: 'politeísmo',    roots: ['poly', 'theos'],     nota: 'muchos dioses' },
  { word: 'sinónimo',      roots: ['syn', 'onoma'],      nota: 'mismo nombre' },
  { word: 'anónimo',       roots: ['a_priv', 'onoma'],   nota: 'sin nombre' },
  { word: 'monarquía',     roots: ['monos', 'arche'],    nota: 'mando de uno solo' },
  { word: 'anarquía',      roots: ['a_priv', 'arche'],   nota: 'sin mando' },
  { word: 'arqueología',   roots: ['arche', 'logos'] },
  { word: 'monólogo',      roots: ['monos', 'logos'] },
  { word: 'polígono',      roots: ['poly', 'gonia'],     nota: 'muchos ángulos' },
  { word: 'polifonía',     roots: ['poly', 'phone'] },
  { word: 'sinfonía',      roots: ['syn', 'phone'],      nota: 'sonidos juntos' },
  { word: 'cardiología',   roots: ['kardia', 'logos'] },
  { word: 'tecnología',    roots: ['techne', 'logos'] },
  { word: 'pirotecnia',    roots: ['pyr', 'techne'] },
  { word: 'hidrofobia',    roots: ['hydor', 'phobos'],   nota: 'miedo al agua' },
  { word: 'agorafobia',    roots: ['agora', 'phobos'],   nota: 'miedo a los espacios abiertos' },
]

export const rootById = new Map(ROOTS.map((r) => [r.id, r]))

/** Familia: palabras españolas que usan una raíz dada. */
export function wordsOfRoot(rootId: string): DerivedWord[] {
  return DERIVED.filter((d) => d.roots.includes(rootId))
}
