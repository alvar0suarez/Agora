/**
 * Museo / textos reales: piezas griegas auténticas (inscripciones, óstraka,
 * poemas en objetos) con su texto, traducción, descripción y fuente consultable.
 * Es la meta del proyecto hecha pantalla: leer griego "de verdad". Cada pieza
 * lleva una banda de nivel para el hito "a tu nivel ya puedes leerla".
 *
 * Texto griego antiguo = dominio público. Imágenes: SOLO con licencia libre
 * (dominio público / CC) y crédito. Diseño en docs/realia.md.
 */

export interface Realia {
  id: string
  title: string
  /** Tipo de pieza (óstrakon, inscripción, poema…). */
  tipo: string
  fecha: string
  /** Procedencia / autoridad. */
  origen: string
  /** Dialecto (el museo abarca varios; el aprendizaje base es ático clásico). */
  dialecto: string
  /** Texto griego. */
  greek: string
  /** Transcripción legible y BREVE para superponer sobre la imagen (opcional). */
  leyenda?: string
  /** Traducción al español. */
  translation: string
  /** Contexto: qué es y por qué importa. */
  descripcion: string
  /** Banda de lectura sugerida ('Cimientos'…'B2'), para el "¿puedes leerla?". */
  nivel: string
  /** Fuente consultable. */
  fuente: { titulo: string; url: string }
  /** Imagen empaquetada (en public/images/realia/), SOLO si es de licencia libre. */
  imagen?: string
  /** Crédito/atribución de la imagen. */
  creditos?: string
  tags: string[]
}

export const REALIA: Realia[] = [
  {
    id: 'ostrakon-themistokles',
    title: 'Óstrakon de Temístocles',
    tipo: 'óstrakon (cerámica)',
    fecha: 's. V a.C.',
    origen: 'Atenas, Ágora',
    dialecto: 'ático',
    greek: 'ΘΕΜΙΣΤΟΚΛΕΣ ΝΕΟΚΛΕΟΣ',
    leyenda: 'ΘΕΜΙΣΤΟΚΛΕΣ ΝΕΟΚΛΕΟΣ',
    translation: 'Temístocles, hijo de Neocles',
    descripcion:
      'Trozo de cerámica usado como papeleta en el ostracismo ateniense: se grababa el nombre del ciudadano que se quería desterrar. Temístocles, héroe de Salamina, fue condenado al ostracismo hacia el 471 a.C. (la fórmula completa solía añadir «ΝΕΟΚΛΕΟΣ ΦΡΕΑΡΡΙΟΣ», hijo de Neocles, del demo de Frearros).',
    nivel: 'Cimientos',
    fuente: {
      titulo: 'Wikimedia Commons',
      url: 'https://commons.wikimedia.org/wiki/File:Ostrakon_with_the_name_of_Themistokles.JPG',
    },
    imagen: 'ostrakon-themistokles.jpg',
    creditos: 'Foto: Han borg (dominio público), vía Wikimedia Commons',
    tags: ['ático', 'óstrakon', 'ostracismo', 'Atenas'],
  },
  {
    id: 'athens-tetradrachm',
    title: 'Tetradracma de Atenas (la lechuza)',
    tipo: 'moneda (plata)',
    fecha: 's. V–IV a.C.',
    origen: 'Atenas',
    dialecto: 'ático',
    greek: 'ΑΘΕ',
    leyenda: 'ΑΘΕ',
    translation: '«de los atenienses» (abrevia ΑΘΗΝΑΙΩΝ)',
    descripcion:
      'La moneda más famosa de la Antigüedad: en el anverso, la cabeza de Atenea; en el reverso, su lechuza (γλαύξ) con una ramita de olivo y la luna. Las tres letras ΑΘΕ abrevian «de los atenienses». Fue la divisa internacional del Mediterráneo durante siglos.',
    nivel: 'Cimientos',
    fuente: {
      titulo: 'Wikimedia Commons',
      url: 'https://commons.wikimedia.org/wiki/File:Athens_-_410-400_BC_-_bronze_tetradrachm_-_head_of_Athena_-_owl_-_Berlin_MK_AM.jpg',
    },
    imagen: 'athens-tetradrachm.jpg',
    creditos: 'Moneda de Atenas · CC BY-SA 4.0, vía Wikimedia Commons',
    tags: ['ático', 'moneda', 'Atenas', 'Atenea'],
  },
  {
    id: 'nestor-cup',
    title: 'Copa de Néstor',
    tipo: 'poema en una copa',
    fecha: 'c. 730 a.C.',
    origen: 'Pitecusas (Isquia), escritura eubea',
    dialecto: 'griego arcaico',
    greek:
      'Νέστορός εἰμι εὔποτον ποτήριον· ὃς δ’ ἂν τοῦδε πίῃσι ποτηρίου, αὐτίκα κῆνον ἵμερος αἱρήσει καλλιστεφάνου Ἀφροδίτης.',
    translation:
      'Soy la copa de Néstor, buena para beber. A quien beba de esta copa, al punto lo arrebatará el deseo de Afrodita, la de hermosa corona.',
    descripcion:
      'Una de las inscripciones griegas más antiguas: tres versos —un pequeño poema— grabados en una copa de arcilla, con un guiño humorístico a la copa de Néstor de la Ilíada. Testimonio tempranísimo del alfabeto griego y de la poesía escrita.',
    nivel: 'B2',
    fuente: {
      titulo: 'Wikipedia',
      url: 'https://es.wikipedia.org/wiki/Copa_de_N%C3%A9stor',
    },
    tags: ['poema', 'arcaico', 'alfabeto', 'épica', 'Pitecusas'],
  },
  {
    id: 'soreg-inscription',
    title: 'Inscripción de advertencia del Templo (soreg)',
    tipo: 'inscripción (mármol)',
    fecha: 's. I d.C.',
    origen: 'Jerusalén, Segundo Templo',
    dialecto: 'koiné',
    greek:
      'ΜΗΘΕΝΑ ΑΛΛΟΓΕΝΗ ΕΙΣΠΟΡΕΥΕΣΘΑΙ ΕΝΤΟΣ ΤΟΥ ΠΕΡΙ ΤΟ ΙΕΡΟΝ ΤΡΥΦΑΚΤΟΥ ΚΑΙ ΠΕΡΙΒΟΛΟΥ· ΟΣ Δ’ ΑΝ ΛΗΦΘΗ ΕΑΥΤΩΙ ΑΙΤΙΟΣ ΕΣΤΑΙ ΔΙΑ ΤΟ ΕΞΑΚΟΛΟΥΘΕΙΝ ΘΑΝΑΤΟΝ.',
    translation:
      'Que ningún extranjero entre dentro de la balaustrada y el recinto que rodea el templo. Quien sea sorprendido será responsable de la muerte que le seguirá.',
    descripcion:
      'Placa de mármol en griego koiné que prohibía a los no judíos pasar al patio interior del Templo de Jerusalén bajo pena de muerte. Confirma arqueológicamente lo que cuentan Josefo y las cartas de Pablo.',
    nivel: 'B1',
    fuente: {
      titulo: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Temple_Warning_inscription',
    },
    tags: ['koiné', 'epigrafía', 'Segundo Templo', 'Josefo', 'Pablo'],
  },
]

export const realiaById = new Map(REALIA.map((r) => [r.id, r]))
