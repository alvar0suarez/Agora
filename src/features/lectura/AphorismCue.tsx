import { sentencePron, type Aphorism } from '../../core/greek'
import { audio } from '../../core/audio'

/**
 * La "señal" de un aforismo: el texto griego, el botón de oírlo y la fuente.
 * Es lo que se muestra ANTES de revelar la traducción, tanto en Explorar como
 * en Repasar. TODOS los aforismos tienen clip (voz neuronal generada con el
 * G2P), así que el botón está siempre.
 */
export function AphorismCue({ aphorism }: { aphorism: Aphorism }) {
  return (
    <>
      <p className="aphorism__greek">{aphorism.greek}</p>
      <p className="aphorism__pron">{sentencePron(aphorism.greek)}</p>
      <button
        type="button"
        className="btn btn--ghost"
        onClick={() => void audio.pronounceAphorism(aphorism.id, { force: true })}
      >
        🔊 Oír
      </button>
      <p className="aphorism__source">{aphorism.source}</p>
    </>
  )
}
