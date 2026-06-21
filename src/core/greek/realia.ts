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
  /**
   * Marcas guía-lectura: TRAZOS que calcan las hendiduras de las letras sobre la
   * foto, dibujados como líneas rojas translúcidas que siguen la forma de cada
   * letra (sin cajas ni etiquetas). Curado a mano (no hay detección automática
   * offline). Opcional.
   */
  marcas?: Trazo[]
  tags: string[]
}

/**
 * Un trazo que sigue una hendidura de la pieza: una polilínea como secuencia de
 * puntos `[x, y]` en FRACCIÓN (0..1) del tamaño de la imagen (independiente de la
 * pantalla). Una letra puede necesitar VARIOS trazos (p. ej. Θ = un círculo y una
 * barra). Se dibuja como una línea roja translúcida sobre la foto.
 */
export type Trazo = Array<[number, number]>

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
    // Marcas guía-lectura: TRAZO de muestra de la Θ del fondo (círculo + barra),
    // calcado a ojo de una captura para enseñar el ESTILO (línea roja que sigue
    // la forma de la letra). Las posiciones finas se afinan iterando con el dueño
    // (no puedo ver el render desde aquí). El resto de letras se calcan luego.
    marcas: [
      // Θ — círculo
      [
        [0.306, 0.734], [0.297, 0.764], [0.275, 0.776], [0.253, 0.764],
        [0.244, 0.734], [0.253, 0.704], [0.275, 0.692], [0.297, 0.704],
        [0.306, 0.734],
      ],
      // Θ — barra central
      [[0.246, 0.734], [0.304, 0.734]],
    ],
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
  {
    id: 'horos-agora',
    title: 'Mojón del Ágora',
    tipo: 'inscripción (piedra)',
    fecha: 'c. 500 a.C.',
    origen: 'Atenas, Ágora',
    dialecto: 'ático arcaico',
    greek: 'ΗΟΡΟΣ ΕΙΜΙ ΤΗΣ ΑΓΟΡΑΣ',
    leyenda: 'ΗΟΡΟΣ ΕΙΜΙ ΤΗΣ ΑΓΟΡΑΣ',
    translation: 'Soy el límite del Ágora',
    descripcion:
      'Piedra plantada en el borde de la plaza pública ateniense: marcaba dónde empezaba el Ágora, espacio sagrado y cívico del que quedaban excluidos quienes habían perdido sus derechos. Habla en primera persona, como solían hacer los objetos griegos («soy…»). La Η inicial no es una vocal: en el ático arcaico representa la aspiración (la «h» de hóros).',
    nivel: 'Cimientos',
    fuente: {
      titulo: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Ancient_Agora_of_Athens',
    },
    tags: ['ático', 'epigrafía', 'Ágora', 'Atenas', 'mojón'],
  },
  {
    id: 'maximas-delficas',
    title: 'Máximas délficas',
    tipo: 'inscripción (templo)',
    fecha: 's. VI–V a.C.',
    origen: 'Delfos, templo de Apolo',
    dialecto: 'griego clásico',
    greek: 'ΓΝΩΘΙ ΣΑΥΤΟΝ · ΜΗΔΕΝ ΑΓΑΝ',
    leyenda: 'ΓΝΩΘΙ ΣΑΥΤΟΝ',
    translation: 'Conócete a ti mismo · Nada en exceso',
    descripcion:
      'Dos de las máximas grabadas en el pronaos del templo de Apolo en Delfos, atribuidas a los Siete Sabios. «Conócete a ti mismo» y «Nada en exceso» resumen la sabiduría griega: medida, autoconocimiento y límite. Pausanias y Platón las citan una y otra vez; siguen siendo el lema más famoso de la Antigüedad.',
    nivel: 'Cimientos',
    fuente: {
      titulo: 'Wikipedia',
      url: 'https://es.wikipedia.org/wiki/M%C3%A1ximas_d%C3%A9lficas',
    },
    tags: ['filosofía', 'Delfos', 'Apolo', 'sabiduría', 'Siete Sabios'],
  },
  {
    id: 'leagros-kalos',
    title: '«Leagro es hermoso»',
    tipo: 'inscripción en vaso',
    fecha: 'c. 510 a.C.',
    origen: 'Atenas, cerámica ática',
    dialecto: 'ático',
    greek: 'ΛΕΑΓΡΟΣ ΚΑΛΟΣ',
    leyenda: 'ΛΕΑΓΡΟΣ ΚΑΛΟΣ',
    translation: 'Leagro es hermoso',
    descripcion:
      'Las «inscripciones kalós» son piropos pintados en miles de vasos áticos: alaban la belleza de un joven de moda. Leagro fue el más célebre; su nombre aparece en más de un centenar de piezas. Son un testimonio directo de la cultura de la pederastia ritual y el aprecio griego por la belleza juvenil.',
    nivel: 'Cimientos',
    fuente: {
      titulo: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Kalos_inscription',
    },
    tags: ['ático', 'cerámica', 'kalós', 'simposio', 'Atenas'],
  },
  {
    id: 'dipylon-inscription',
    title: 'Inscripción del Dípilon',
    tipo: 'verso en una jarra',
    fecha: 'c. 740 a.C.',
    origen: 'Atenas, cementerio del Dípilon',
    dialecto: 'ático arcaico',
    greek: 'ὃς νῦν ὀρχηστῶν πάντων ἀταλώτατα παίζει, τοῦ τόδε …',
    translation:
      'Quien de todos los danzantes baile ahora con más gracia, suyo será esto… (el resto está dañado)',
    descripcion:
      'Una de las inscripciones alfabéticas griegas más antiguas que se conservan: un verso —probablemente el premio de un concurso de baile— rasgado sobre una jarra de vino con la escritura más temprana del alfabeto. El final no se ha descifrado del todo. Junto con la Copa de Néstor, marca el nacimiento de la escritura griega.',
    nivel: 'B1',
    fuente: {
      titulo: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Dipylon_inscription',
    },
    tags: ['arcaico', 'alfabeto', 'Atenas', 'verso', 'Dípilon'],
  },
  {
    id: 'epitafio-termopilas',
    title: 'Epitafio de las Termópilas',
    tipo: 'epigrama funerario',
    fecha: 's. V a.C.',
    origen: 'Termópilas (citado por Heródoto)',
    dialecto: 'griego clásico',
    greek:
      'ὦ ξεῖν’, ἀγγέλλειν Λακεδαιμονίοις ὅτι τῇδε κείμεθα τοῖς κείνων ῥήμασι πειθόμενοι.',
    translation:
      'Extranjero, anuncia a los lacedemonios que aquí yacemos, obedientes a sus palabras.',
    descripcion:
      'El dístico que Simónides compuso para los trescientos espartanos caídos en las Termópilas, grabado en el lugar de la batalla y transmitido por Heródoto. Dos versos secos y enormes: los muertos hablan al caminante y le piden solo que cuente, en casa, que cumplieron la ley hasta el final.',
    nivel: 'B1',
    fuente: {
      titulo: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Battle_of_Thermopylae',
    },
    tags: ['epigrama', 'Simónides', 'Termópilas', 'Esparta', 'Heródoto'],
  },
]

export const realiaById = new Map(REALIA.map((r) => [r.id, r]))
