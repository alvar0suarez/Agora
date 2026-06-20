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
const clipUrl = (letterId: string) =>
  `${import.meta.env.BASE_URL}audio/letters/${letterId}.wav`
const wordClipUrl = (wordId: string) =>
  `${import.meta.env.BASE_URL}audio/vocab/${wordId}.wav`
const aphorismClipUrl = (id: string) =>
  `${import.meta.env.BASE_URL}audio/aphorisms/${id}.wav`

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
    if (what !== 'sound') return // por ahora solo hay clips del sonido
    await this.playUrl(clipUrl(letter.id), opts)
  }

  async pronounceWord(id: string, opts?: SpeakOptions): Promise<void> {
    if (!isAudioEnabled() && !opts?.force) return
    // Si la palabra aún no tiene clip generado, playUrl resuelve sin sonar.
    await this.playUrl(wordClipUrl(id), opts)
  }

  async pronounceAphorism(id: string, opts?: SpeakOptions): Promise<void> {
    if (!isAudioEnabled() && !opts?.force) return
    await this.playUrl(aphorismClipUrl(id), opts)
  }

  stop(): void {
    if (!this.current) return
    this.current.pause()
    this.current.currentTime = 0
    this.current = null
  }

  private playUrl(url: string, opts?: SpeakOptions): Promise<void> {
    this.stop()
    return new Promise((resolve) => {
      const audio = new Audio(url)
      if (opts?.rate) audio.playbackRate = opts.rate
      this.current = audio
      const done = () => {
        if (this.current === audio) this.current = null
        resolve()
      }
      audio.onended = done
      audio.onerror = done
      // `play()` puede rechazar si el navegador bloquea autoplay; resolvemos
      // igualmente para no dejar la promesa colgada.
      void audio.play().catch(done)
    })
  }
}

/** Instancia única del motor de clips. */
export const clipAudio: AudioService = new ClipAudioService()
