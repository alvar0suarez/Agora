import type { AudioService } from './types'

/**
 * Implementación por defecto SIN sonido (no-op). Mantiene la app verde y los
 * features cableados contra el contrato mientras el motor real (eSpeak-NG WASM)
 * se enchufa en un paso posterior. `ready: false` permite a la UI saber que aún
 * no hay audio y, por ejemplo, no mostrar el botón de oír.
 */
export const silentAudio: AudioService = {
  ready: false,
  async speak() {},
  async pronounce() {},
  async pronounceWord() {},
  async pronounceAphorism() {},
  stop() {},
}
