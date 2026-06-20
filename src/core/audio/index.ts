/**
 * Servicio de audio del núcleo: pronunciar letras y decir texto en griego.
 * El motor concreto se esconde tras `AudioService`; v1 usará eSpeak-NG (WASM)
 * cargado bajo demanda. Por ahora se exporta el stub silencioso.
 */
export * from './types'
export * from './resolve'
export { silentAudio } from './silent'
export { clipAudio } from './clipAudio'

import type { AudioService } from './types'
import { clipAudio } from './clipAudio'

/**
 * Servicio de audio activo que usan los features. Cambiar de motor (p. ej. a
 * grabaciones humanas o a un sintetizador runtime) es cambiar SOLO esta línea.
 */
export const audio: AudioService = clipAudio
