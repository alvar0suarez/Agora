import type { Aphorism } from '../../core/greek'
import { audio } from '../../core/audio'

/** Aforismos con clip de voz pregenerado (offline). */
export const AUDIO_IDS = new Set([
  'gnothi-seauton',
  'panta-rhei',
  'meden-agan',
  'speude-bradeos',
  'hen-oida',
])

/**
 * La "señal" de un aforismo: el texto griego, el botón de oírlo (si tiene clip)
 * y la fuente. Es lo que se muestra ANTES de revelar la traducción, tanto en
 * Explorar como en Repasar.
 */
export function AphorismCue({ aphorism }: { aphorism: Aphorism }) {
  return (
    <>
      <p className="aphorism__greek">{aphorism.greek}</p>
      {AUDIO_IDS.has(aphorism.id) ? (
        <button
          type="button"
          className="btn btn--ghost"
          onClick={() => void audio.pronounceAphorism(aphorism.id, { force: true })}
        >
          🔊 Oír
        </button>
      ) : null}
      <p className="aphorism__source">{aphorism.source}</p>
    </>
  )
}
