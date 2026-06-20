import type { GreekLetter } from '../greek'

/**
 * Qué se dice de una letra al pronunciarla:
 *  - `sound`: el SONIDO/fonema (p. ej. [a], [pʰ]). Es el objetivo de aprendizaje
 *    principal (pronunciación reconstruida ática).
 *  - `name`: el NOMBRE de la letra en griego (ἄλφα, βῆτα…).
 */
export type Utterance = 'sound' | 'name'

/** Ajustes de reproducción (relativos, 0..1 ≈ lento..normal). */
export interface SpeakOptions {
  /** Velocidad relativa de habla. */
  rate?: number
}

/**
 * Servicio de audio del núcleo. Vive en `core` (no en un feature) porque varios
 * features lo usarán y la arquitectura prohíbe que los features dependan entre
 * sí. El motor concreto (eSpeak-NG WASM en v1, clips humanos en el futuro) se
 * esconde detrás de esta interfaz: cambiarlo NO debe tocar ningún feature.
 */
export interface AudioService {
  /** ¿El motor está listo para producir sonido de verdad? (el stub: `false`). */
  readonly ready: boolean
  /** Dice un texto en griego en voz alta. */
  speak(text: string, opts?: SpeakOptions): Promise<void>
  /** Pronuncia una letra: su sonido (por defecto) o su nombre. */
  pronounce(
    letter: GreekLetter,
    what?: Utterance,
    opts?: SpeakOptions,
  ): Promise<void>
  /** Pronuncia una palabra del vocabulario por su id (clip en audio/vocab). */
  pronounceWord(id: string, opts?: SpeakOptions): Promise<void>
  /** Corta cualquier reproducción en curso. */
  stop(): void
}
