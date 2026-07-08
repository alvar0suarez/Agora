import type { NousWordRecord } from '../../core/storage/db'
import { hasGreek } from './parse'

/**
 * Validación del fichero de intercambio `nous-vocab.v1` que exporta Nous
 * (contrato en docs/formato-nous-vocab.md; la copia canónica vive en el repo
 * de Nous, que es quien emite).
 *
 * Lógica PURA (sin tocar la base de datos) para poder testearla con Vitest.
 * Regla del contrato: ignorar campos desconocidos (compatibilidad hacia
 * delante); los opcionales ausentes se tratan como vacíos.
 */

const FORMATO = 'nous-vocab'
const VERSION_SOPORTADA = 1

function texto(v: unknown): string {
  return typeof v === 'string' ? v : ''
}

export interface ParsedFile {
  /** Palabras que entran (traen griego en palabra o comentario). */
  palabras: NousWordRecord[]
  /** Cuántas se omitieron por no traer nada de griego. */
  omitidas: number
}

/**
 * Parsea y valida el contenido del fichero. Devuelve los registros listos para
 * guardar — SOLO las palabras con griego en su texto (criterio de la feature);
 * las demás se cuentan como omitidas. Lanza `Error` con mensaje legible.
 */
export function parseNousFile(raw: string, now: number): ParsedFile {
  let data: unknown
  try {
    data = JSON.parse(raw)
  } catch {
    throw new Error('El fichero no es JSON válido.')
  }
  if (typeof data !== 'object' || data === null) {
    throw new Error('El fichero no tiene la estructura esperada.')
  }
  const d = data as Record<string, unknown>
  if (d.formato !== FORMATO) {
    throw new Error('No es un fichero de vocabulario de Nous (falta "formato": "nous-vocab").')
  }
  if (typeof d.version !== 'number' || d.version > VERSION_SOPORTADA) {
    throw new Error(
      `Versión del formato no soportada (${String(d.version)}); esta app entiende hasta la v${VERSION_SOPORTADA}.`,
    )
  }
  if (!Array.isArray(d.palabras)) {
    throw new Error('El fichero no contiene la lista "palabras".')
  }
  const out: NousWordRecord[] = []
  let omitidas = 0
  for (const item of d.palabras) {
    if (typeof item !== 'object' || item === null) continue
    const w = item as Record<string, unknown>
    const id = texto(w.id)
    const palabra = texto(w.palabra).trim()
    // Sin id o sin palabra la entrada no es utilizable: se salta, no rompe el import.
    if (!id || !palabra) continue
    if (!hasGreek(`${palabra} ${texto(w.comentario)}`)) {
      omitidas++
      continue
    }
    out.push({
      id,
      palabra,
      idioma: texto(w.idioma).toLowerCase(),
      comentario: texto(w.comentario),
      contexto: texto(w.contexto),
      libro: texto(w.libro),
      creadaEn: typeof w.creadaEn === 'number' ? w.creadaEn : 0,
      importadaEn: now,
    })
  }
  return { palabras: out, omitidas }
}
