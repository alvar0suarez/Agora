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

export class AgoraDB extends Dexie {
  kv!: Table<KvEntry, string>
  srs!: Table<SrsRecord, string>

  constructor() {
    super('agora')
    this.version(1).stores({
      kv: '&key',
    })
    // v2: tabla de repetición espaciada (indexada por vencimiento `due`).
    this.version(2).stores({
      srs: '&id, due',
    })
  }
}

export const db = new AgoraDB()
