import { db } from '../storage/db'

/**
 * Persistencia de la posición en el camino (unidades completadas). Un único
 * registro en la tabla clave/valor `kv` (como el progreso): sin migración.
 */
const CURSO_KEY = 'curso'

export interface CursoState {
  /** Ids de unidades del syllabus ya completadas. */
  completed: string[]
}

/** Carga el estado del curso (o el inicial). */
export async function loadCurso(): Promise<CursoState> {
  const entry = await db.kv.get(CURSO_KEY)
  return (entry?.value as CursoState | undefined) ?? { completed: [] }
}

/** Marca una unidad como completada (idempotente) y persiste. */
export async function completeUnit(unitId: string): Promise<CursoState> {
  const state = await loadCurso()
  if (!state.completed.includes(unitId)) state.completed.push(unitId)
  await db.kv.put({ key: CURSO_KEY, value: state })
  return state
}
