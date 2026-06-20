/**
 * Pide al navegador almacenamiento PERSISTENTE: que el sistema operativo no
 * borre los datos locales (progreso, SRS, ajustes) bajo presión de espacio.
 *
 * Agora es local-first: los datos viven en el dispositivo y son la fuente de
 * verdad, así que conviene blindarlos. Es best-effort: si el navegador no
 * soporta la API o no concede el permiso, la app funciona igual (solo con menos
 * garantías de retención). No guarda nada sensible aquí; solo cambia la política
 * de retención del almacenamiento que ya usamos.
 */
export async function requestPersistentStorage(): Promise<boolean> {
  if (!navigator.storage?.persist) return false
  try {
    // Si ya es persistente, no hace falta volver a pedirlo.
    if (await navigator.storage.persisted?.()) return true
    return await navigator.storage.persist()
  } catch {
    return false
  }
}
