import { db } from '../storage/db'
import { emptyProgress, type ProgressState } from './progress'

/**
 * Persistencia del progreso sobre la base de datos local (Dexie). Es un único
 * registro, así que reutilizamos la tabla clave/valor `kv` existente en vez de
 * crear una tabla nueva (sin migración de esquema).
 */
const PROGRESS_KEY = 'progress'

/** Carga el progreso guardado, o el estado inicial si no hay nada. */
export async function loadProgress(): Promise<ProgressState> {
  const entry = await db.kv.get(PROGRESS_KEY)
  return (entry?.value as ProgressState | undefined) ?? emptyProgress()
}

/** Guarda el progreso. */
export async function saveProgress(state: ProgressState): Promise<void> {
  await db.kv.put({ key: PROGRESS_KEY, value: state })
}
