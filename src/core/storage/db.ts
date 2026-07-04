import Dexie, { type Table } from 'dexie'

/**
 * Base de datos local (IndexedDB vía Dexie). Es la FUENTE DE VERDAD de
 * Agora: los datos viven en el dispositivo, no en un servidor.
 *
 * Cada feature puede añadir sus propias tablas creando una versión nueva del
 * esquema. De momento incluimos una tabla `kv` (clave/valor) de uso general.
 */
export interface KvEntry {
  key: string
  value: unknown
}

/**
 * Estado persistido de una carta del sistema de repetición espaciada (SRS).
 * Es genérico: lo usa cualquier feature (alfabeto, vocabulario, gramática…).
 */
export interface SrsRecord {
  id: string
  box: number
  due: number
  reps: number
  lapses: number
  lastReviewed: number | null
}

/**
 * Palabra de vocabulario importada de Nous (fichero `nous-vocab.v1`, ver
 * docs/formato-nous-vocab.md). Se guarda tal cual llega; el análisis del
 * comentario (significado/etimología/griego) se deriva al vuelo, sin persistir.
 */
export interface NousWordRecord {
  /** Id estable de Nous: reimportar actualiza, no duplica. */
  id: string
  palabra: string
  /** Código de idioma base (es, el, grc…) o ''. */
  idioma: string
  /** Texto libre del usuario en Nous: significado/etimología. */
  comentario: string
  /** Frase del libro donde apareció. */
  contexto: string
  /** Título del libro de origen. */
  libro: string
  /** Epoch ms de creación en Nous (0 si no vino). */
  creadaEn: number
  /** Epoch ms de la última importación en Agora. */
  importadaEn: number
}

export class AgoraDB extends Dexie {
  kv!: Table<KvEntry, string>
  srs!: Table<SrsRecord, string>
  nousVocab!: Table<NousWordRecord, string>

  constructor() {
    super('agora')
    this.version(1).stores({
      kv: '&key',
    })
    // v2: tabla de repetición espaciada (indexada por vencimiento `due`).
    this.version(2).stores({
      srs: '&id, due',
    })
    // v3: vocabulario importado de Nous (feature `nous`).
    this.version(3).stores({
      nousVocab: '&id, palabra, idioma',
    })
  }
}

export const db = new AgoraDB()
