import { db, type NousWordRecord } from '../../core/storage/db'
import { parseNousFile } from './format'
import type { RootMerges } from './map'
import { hasGreek } from './parse'

/** Resultado de una importación, para informar al usuario. */
export interface ImportResult {
  total: number
  nuevas: number
  actualizadas: number
  /** Palabras del fichero sin nada de griego: no entran en esta sección. */
  omitidas: number
}

/**
 * Importa el contenido de un fichero `nous-vocab.v1`. Idempotente: el id de
 * Nous es estable, así que reimportar actualiza las palabras existentes en
 * lugar de duplicarlas. Solo entran palabras con griego en su texto.
 */
export async function importNousFile(raw: string, now = Date.now()): Promise<ImportResult> {
  const { palabras, omitidas } = parseNousFile(raw, now)
  const existentes = await db.nousVocab.bulkGet(palabras.map((w) => w.id))
  const nuevas = existentes.filter((e) => e === undefined).length
  await db.nousVocab.bulkPut(palabras)
  return { total: palabras.length, nuevas, actualizadas: palabras.length - nuevas, omitidas }
}

/**
 * Limpieza: borra de Agora las palabras guardadas SIN griego (entraron antes
 * de que existiera el criterio). Devuelve cuántas quitó. En Nous siguen
 * existiendo: aquí solo se estudia lo griego.
 */
export async function purgeNonGreekWords(): Promise<number> {
  const all = await db.nousVocab.toArray()
  const fuera = all.filter((w) => !hasGreek(`${w.palabra} ${w.comentario}`)).map((w) => w.id)
  if (fuera.length > 0) await db.nousVocab.bulkDelete(fuera)
  return fuera.length
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

// ── Fusiones manuales de raíces (mapa de palabras) ───────────────────────
// Cuando la heurística no casa dos formas de la misma raíz (ἡγεῖσθαι/ἡγεμών),
// el usuario las fusiona a mano y la decisión persiste aquí (kv).
const MERGES_KEY = 'nous:root-merges'

export async function loadRootMerges(): Promise<RootMerges> {
  const e = await db.kv.get(MERGES_KEY)
  return (e?.value as RootMerges | undefined) ?? {}
}

/** Registra «la raíz `from` es la misma que `into`» (claves normalizadas). */
export async function saveRootMerge(from: string, into: string): Promise<RootMerges> {
  const merges = await loadRootMerges()
  if (from !== into) {
    merges[from] = into
    await db.kv.put({ key: MERGES_KEY, value: merges })
  }
  return merges
}

/** Deshace la fusión de `from`. */
export async function removeRootMerge(from: string): Promise<RootMerges> {
  const merges = await loadRootMerges()
  delete merges[from]
  await db.kv.put({ key: MERGES_KEY, value: merges })
  return merges
}

// ── Bandeja del Web Share Target ─────────────────────────────────────────
// El service worker (src/sw.ts) deja aquí el fichero recibido al compartir
// («Estudiar en Agora» desde Nous) y redirige a `?f=nous`; la pantalla la
// vacía al montarse. Claves espejo de las de sw.ts.
const INBOX_CACHE = 'nous-inbox'
const INBOX_KEY = '/nous-inbox.json'

/**
 * Si hay un fichero compartido esperando, lo consume (leer + borrar) y
 * devuelve su texto; si no, null. Tolerante: sin Cache API devuelve null.
 */
export async function drainShareInbox(): Promise<string | null> {
  if (!('caches' in window)) return null
  try {
    const cache = await caches.open(INBOX_CACHE)
    const res = await cache.match(INBOX_KEY)
    if (!res) return null
    const text = await res.text()
    await cache.delete(INBOX_KEY)
    return text
  } catch {
    return null
  }
}
