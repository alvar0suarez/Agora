import { db } from '../storage/db'
import type { SrsState } from './scheduler'

/**
 * Persistencia del SRS sobre la base de datos local (Dexie). Las cartas se
 * identifican por una clave de cadena (p. ej. "alfabeto:rec:alpha").
 */

/** Carga los estados de las cartas indicadas (solo las que ya existan). */
export async function loadStates(
  ids: string[],
): Promise<Map<string, SrsState>> {
  const records = await db.srs.bulkGet(ids)
  const map = new Map<string, SrsState>()
  records.forEach((rec, i) => {
    if (rec) {
      map.set(ids[i], {
        box: rec.box,
        due: rec.due,
        reps: rec.reps,
        lapses: rec.lapses,
        lastReviewed: rec.lastReviewed,
      })
    }
  })
  return map
}

/** Guarda el estado de una carta. */
export async function saveState(id: string, state: SrsState): Promise<void> {
  await db.srs.put({ id, ...state })
}
