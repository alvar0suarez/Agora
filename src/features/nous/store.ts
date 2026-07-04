import { db, type NousWordRecord } from '../../core/storage/db'
import { parseNousFile } from './format'

/** Resultado de una importación, para informar al usuario. */
export interface ImportResult {
  total: number
  nuevas: number
  actualizadas: number
}

/**
 * Importa el contenido de un fichero `nous-vocab.v1`. Idempotente: el id de
 * Nous es estable, así que reimportar actualiza las palabras existentes en
 * lugar de duplicarlas.
 */
export async function importNousFile(raw: string, now = Date.now()): Promise<ImportResult> {
  const words = parseNousFile(raw, now)
  const existentes = await db.nousVocab.bulkGet(words.map((w) => w.id))
  const nuevas = existentes.filter((e) => e === undefined).length
  await db.nousVocab.bulkPut(words)
  return { total: words.length, nuevas, actualizadas: words.length - nuevas }
}

/** Todas las palabras importadas, alfabéticamente. */
export async function loadNousWords(): Promise<NousWordRecord[]> {
  const words = await db.nousVocab.toArray()
  return words.sort((a, b) => a.palabra.localeCompare(b.palabra, 'es'))
}

/** Borra una palabra importada (solo en Agora; en Nous sigue existiendo). */
export async function removeNousWord(id: string): Promise<void> {
  await db.nousVocab.delete(id)
}
