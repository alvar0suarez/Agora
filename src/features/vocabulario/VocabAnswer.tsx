import { spellOut, POS_INFO, type GreekLetter, type VocabEntry } from '../../core/greek'
import { audio } from '../../core/audio'

/**
 * Bloque de respuesta enriquecido y reutilizable para las tres preguntas de
 * vocabulario (reconocer / producir / teclear). Reúne, en un sitio:
 *  - cómo suena: transcripción sencilla + 🔊 + AFI letra a letra (las dos vistas
 *    que pidió el dueño), con aviso de las letras que suenan distinto de lo
 *    esperado (θ, φ, χ, η, ω, υ…);
 *  - qué es: la categoría con una nota desplegable «¿qué es?» (genérica);
 *  - derivados españoles, si los hay.
 */

/** Letras cuya pronunciación reconstruida SORPRENDE a un hispanohablante. */
const SURPRISING = new Set([
  'theta',
  'phi',
  'chi',
  'zeta',
  'upsilon',
  'eta',
  'omega',
  'rho',
  'gamma',
])

/** AFI principal de una letra (el primero, sin la variante larga). */
const primaryIpa = (l: GreekLetter) => l.ipa.split('·')[0].trim()

export function VocabAnswer({ word }: { word: VocabEntry }) {
  const info = POS_INFO[word.pos]
  // El AFI por letra solo tiene sentido con un lema de una sola forma (sin comas
  // ni espacios; p. ej. el artículo «ὁ, ἡ, τό» se queda solo con la sencilla).
  const single = !/[\s,]/.test(word.lemma)
  const letters = single ? spellOut(word.lemma) : []

  // Letras distintivas presentes, sin repetir, en orden de aparición.
  const seen = new Set<string>()
  const ojo: GreekLetter[] = []
  for (const l of letters) {
    if (SURPRISING.has(l.id) && !seen.has(l.id)) {
      seen.add(l.id)
      ojo.push(l)
    }
  }

  return (
    <div className="vocab-answer">
      <p className="vocab-pron">
        <button
          type="button"
          className="btn btn--ghost vocab-pron__say"
          onClick={() => void audio.pronounceWord(word.id, { force: true })}
        >
          🔊 Oír
        </button>
        {word.pron ? (
          <span className="vocab-pron__say-as">
            se lee: <strong>{word.pron}</strong>
          </span>
        ) : null}
      </p>

      {letters.length > 0 ? (
        <ul className="phon">
          {letters.map((l, i) => (
            <li key={i} className="phon__chip">
              <span className="phon__glyph">{l.upper}</span>
              <span className="phon__ipa">{primaryIpa(l)}</span>
            </li>
          ))}
        </ul>
      ) : null}

      {ojo.length > 0 ? (
        <ul className="phon__notes">
          {ojo.map((l) => (
            <li key={l.id} className="phon__note">
              <span className="phon__note-glyph">{l.upper}</span>
              <span>{l.sound}</span>
            </li>
          ))}
        </ul>
      ) : null}

      <p className="answer__line">
        <strong>{word.pos}</strong>
        {info ? (
          <details className="pos-note">
            <summary>ⓘ ¿qué es?</summary>
            <span className="pos-note__que">{info.que}</span>
            <span className="pos-note__ej">Ej.: {info.ejemplo}</span>
          </details>
        ) : null}
      </p>

      {word.derivados && word.derivados.length > 0 ? (
        <p className="answer__line">En español: {word.derivados.join(', ')}</p>
      ) : null}
    </div>
  )
}
