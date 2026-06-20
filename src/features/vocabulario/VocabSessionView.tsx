import { useVocabSession, type VocabMode } from './useVocabSession'
import { VocabRecognitionPrompt } from './VocabRecognitionPrompt'
import { VocabProductionPrompt } from './VocabProductionPrompt'
import { VocabTypingPrompt } from './VocabTypingPrompt'
import { VocabSummary } from './VocabSummary'

/**
 * Corre una sesión de vocabulario en las direcciones dadas y pinta la pregunta
 * adecuada según `currentMode`. Reúne la barra superior, el resumen y los dos
 * tipos de pregunta; sirve para los modos sueltos y para el mixto.
 */
export function VocabSessionView({
  modes,
  onExit,
}: {
  modes: VocabMode | VocabMode[]
  onExit: () => void
}) {
  const s = useVocabSession(modes)

  if (s.loading) return <p className="empty">Cargando…</p>
  if (s.done) {
    return <VocabSummary stats={s.stats} onRestart={s.restart} onExit={onExit} />
  }

  const word = s.current
  if (!word) return null

  return (
    <div className="alfabeto">
      <div className="alfabeto__top">
        <button className="btn btn--ghost" onClick={onExit}>
          ← Menú
        </button>
        <span className="alfabeto__progress">
          {s.currentMode === 'rec'
            ? 'Significado'
            : s.currentMode === 'type'
              ? 'Escribir'
              : 'Palabra'}{' '}
          · Quedan {s.remaining}
        </span>
      </div>
      {s.currentMode === 'rec' ? (
        <VocabRecognitionPrompt word={word} onGrade={s.grade} />
      ) : s.currentMode === 'type' ? (
        <VocabTypingPrompt word={word} onGrade={s.grade} />
      ) : (
        <VocabProductionPrompt word={word} onGrade={s.grade} />
      )}
    </div>
  )
}
