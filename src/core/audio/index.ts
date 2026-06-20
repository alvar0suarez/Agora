/**
 * Servicio de audio del núcleo: pronunciar letras y decir texto en griego.
 * El motor concreto se esconde tras `AudioService`; v1 usará eSpeak-NG (WASM)
 * cargado bajo demanda. Por ahora se exporta el stub silencioso.
 */
export * from './types'
export * from './resolve'
export { silentAudio } from './silent'
