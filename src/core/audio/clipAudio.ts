import type { GreekLetter } from '../greek'
import { isAudioEnabled } from '../settings'
import type { AudioService, SpeakOptions, Utterance } from './types'

/**
 * Motor de audio v1: reproduce CLIPS pregrabados (uno por letra) generados en
 * build-time con eSpeak-NG y fonemas de la reconstrucción ática (ver
 * `scripts/gen-letter-audio.mjs`). Ventajas: ligero (~1 MB), offline, y la app
 * NO arrastra la licencia GPL del sintetizador (solo embarca el audio).
 *
 * Los clips cubren el SONIDO de cada letra. El nombre y el texto libre no tienen
 * clip todavía; el contrato los deja preparados para un motor futuro o para
 * grabaciones humanas (sustituibles archivo a archivo, sin tocar features).
 */
/**
 * Candidatos de clip por unidad, en orden de PREFERENCIA: primero `.m4a` (voz
 * HUMANA grabada, calidad original) y, si no existe, `.wav` (el clip eSpeak de
 * respaldo). Así una grabación humana sustituye al robótico solo con dejar el
 * fichero `<id>.m4a` en su carpeta; no hay que tocar código.
 */
const base = import.meta.env.BASE_URL
const clipUrls = (folder: string, id: string) => [
  `${base}audio/${folder}/${id}.m4a`,
  `${base}audio/${folder}/${id}.wav`,
]

class ClipAudioService implements AudioService {
  readonly ready = true
  private current: HTMLAudioElement | null = null

  async speak(_text: string, _opts?: SpeakOptions): Promise<void> {
    // v1 basado en clips: no sintetiza texto arbitrario (lo cubriría un motor
    // futuro en Fase 2+). No-op silencioso para respetar el contrato.
  }

  async pronounce(
    letter: GreekLetter,
    what: Utterance = 'sound',
    opts?: SpeakOptions,
  ): Promise<void> {
    // Silenciado solo afecta al sonido AUTOMÁTICO; con `force` (botón explícito) suena.
    if (!isAudioEnabled() && !opts?.force) return
    const folder = what === 'name' ? 'letters-names' : 'letters'
    await this.playUrls(clipUrls(folder, letter.id), opts)
  }

  async pronounceWord(id: string, opts?: SpeakOptions): Promise<void> {
    if (!isAudioEnabled() && !opts?.force) return
    // Si la palabra no tiene ningún clip, playUrls resuelve sin sonar.
    await this.playUrls(clipUrls('vocab', id), opts)
  }

  async pronounceAphorism(id: string, opts?: SpeakOptions): Promise<void> {
    if (!isAudioEnabled() && !opts?.force) return
    await this.playUrls(clipUrls('aphorisms', id), opts)
  }

  stop(): void {
    if (!this.current) return
    this.current.pause()
    this.current.currentTime = 0
    this.current = null
  }

  /**
   * Intenta reproducir el primer `url` que cargue (p. ej. `.m4a` y, si falla,
   * `.wav`). Resuelve al terminar o cuando se agotan los candidatos.
   */
  private playUrls(urls: string[], opts?: SpeakOptions): Promise<void> {
    this.stop()
    return new Promise((resolve) => {
      const tryAt = (i: number) => {
        if (i >= urls.length) {
          resolve()
          return
        }
        const audio = new Audio(urls[i])
        if (opts?.rate) audio.playbackRate = opts.rate
        this.current = audio
        let moved = false
        const next = () => {
          if (moved) return
          moved = true
          if (this.current === audio) this.current = null
          tryAt(i + 1) // candidato siguiente (p. ej. .wav si no había .m4a)
        }
        const finish = () => {
          if (moved) return
          moved = true
          if (this.current === audio) this.current = null
          resolve()
        }
        audio.onended = finish
        audio.onerror = next
        void audio.play().catch(next)
      }
      tryAt(0)
    })
  }
}

/** Instancia única del motor de clips. */
export const clipAudio: AudioService = new ClipAudioService()
