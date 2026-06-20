import { db } from '../storage/db'

/**
 * Ajuste de audio: ¿suena la pronunciación? Por defecto **NO** (la voz v1 con
 * eSpeak es robótica; mejor silenciosa hasta tener voz humana). El usuario lo
 * activa con un interruptor y la preferencia se guarda en la BD local.
 *
 * Es un store mínimo, síncrono y reactivo: el motor de audio lo consulta antes
 * de sonar y la UI se suscribe para reflejar el estado del botón.
 */
const KEY = 'settings:audioEnabled'

let enabled = false
const listeners = new Set<(value: boolean) => void>()

/** ¿Está el audio activado ahora mismo? (consulta síncrona). */
export function isAudioEnabled(): boolean {
  return enabled
}

/** Activa/desactiva el audio, lo persiste y avisa a los suscriptores. */
export function setAudioEnabled(value: boolean): void {
  enabled = value
  void db.kv.put({ key: KEY, value })
  for (const fn of listeners) fn(enabled)
}

/** Se suscribe a los cambios del ajuste. Devuelve la función para cancelar. */
export function subscribeAudioEnabled(fn: (value: boolean) => void): () => void {
  listeners.add(fn)
  return () => {
    listeners.delete(fn)
  }
}

/** Carga la preferencia guardada (llamar al arrancar la app). */
export async function loadAudioSetting(): Promise<void> {
  const entry = await db.kv.get(KEY)
  if (entry && typeof entry.value === 'boolean') {
    enabled = entry.value
    for (const fn of listeners) fn(enabled)
  }
}
