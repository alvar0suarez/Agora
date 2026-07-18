/**
 * DIÁLOGOS: aprender conversando con un personaje. La app te habla en griego
 * (voz + burbuja de chat), tú respondes eligiendo TU réplica en griego, y la
 * historia avanza. Es el formato "aprender interactuando" del rector, frente a
 * la tarjeta suelta: contexto, personaje y narrativa.
 *
 * Griego deliberadamente SIMPLE (ático, frases de manual A0-A1) apoyado en el
 * vocabulario del curso. Contenido erudito: revisable por el dueño. Cada línea
 * tiene clip de voz pregenerado (audio/dialogos/<dialogoId>-<turno>.wav).
 */

/** Una opción de respuesta del usuario. */
export interface DialogOption {
  gr: string
  es: string
  /** ¿Es la respuesta que hace avanzar la historia? */
  ok: boolean
}

/** Un turno del diálogo: habla el personaje ('p') o te toca a ti ('yo'). */
export interface DialogTurn {
  speaker: 'p' | 'yo'
  /** La línea en griego (en 'yo', la réplica correcta). */
  gr: string
  /** Traducción al español. */
  es: string
  /** Solo en turnos 'yo': las réplicas entre las que eliges. */
  opciones?: DialogOption[]
}

export interface Dialogo {
  id: string
  titulo: string
  /** Quién te habla. */
  personaje: { nombre: string; emoji: string }
  /** Contexto de la escena, en español (se muestra al empezar). */
  escena: string
  turnos: DialogTurn[]
}

export const DIALOGOS: Dialogo[] = [
  {
    id: 'agora',
    titulo: 'ἐν τῇ ἀγορᾷ',
    personaje: { nombre: 'Σωκράτης', emoji: '🧔' },
    escena:
      'Atenas, mediodía. Un hombre descalzo se te acerca en el ágora. Es Sócrates.',
    turnos: [
      { speaker: 'p', gr: 'χαῖρε, ὦ φίλε.', es: 'Hola, amigo.' },
      {
        speaker: 'yo',
        gr: 'χαῖρε, ὦ Σώκρατες.',
        es: 'Hola, Sócrates.',
        opciones: [
          { gr: 'χαῖρε, ὦ Σώκρατες.', es: 'Hola, Sócrates.', ok: true },
          { gr: 'οὔ.', es: 'No.', ok: false },
        ],
      },
      { speaker: 'p', gr: 'τίς εἶ σύ;', es: '¿Quién eres tú?' },
      {
        speaker: 'yo',
        gr: 'ἄνθρωπός εἰμι.',
        es: 'Soy un ser humano.',
        opciones: [
          { gr: 'θεός εἰμι.', es: 'Soy un dios.', ok: false },
          { gr: 'ἄνθρωπός εἰμι.', es: 'Soy un ser humano.', ok: true },
        ],
      },
      {
        speaker: 'p',
        gr: 'καλῶς. ἐγὼ δὲ φιλόσοφός εἰμι.',
        es: 'Bien. Yo, por mi parte, soy filósofo.',
      },
      {
        speaker: 'p',
        gr: 'ἆρα φιλεῖς τὴν σοφίαν;',
        es: '¿Amas la sabiduría?',
      },
      {
        speaker: 'yo',
        gr: 'ναί, φιλῶ τὴν σοφίαν.',
        es: 'Sí, amo la sabiduría.',
        opciones: [
          { gr: 'ναί, φιλῶ τὴν σοφίαν.', es: 'Sí, amo la sabiduría.', ok: true },
          { gr: 'οὔ, φιλῶ τὸν ἵππον.', es: 'No, amo al caballo.', ok: false },
        ],
      },
      {
        speaker: 'p',
        gr: 'ἄριστα. καὶ σὺ φιλόσοφος εἶ.',
        es: 'Excelente. Tú también eres filósofo.',
      },
    ],
  },
]

/** Índice por id. */
export const dialogoById = new Map(DIALOGOS.map((d) => [d.id, d]))

/** Id del clip de voz de un turno (audio/dialogos/<id>.wav). */
export const dialogLineId = (dialogoId: string, turnIndex: number) =>
  `${dialogoId}-${turnIndex}`
