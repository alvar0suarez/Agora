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

export class AgoraDB extends Dexie {
  kv!: Table<KvEntry, string>

  constructor() {
    super('agora')
    this.version(1).stores({
      kv: '&key',
    })
  }
}

export const db = new AgoraDB()
