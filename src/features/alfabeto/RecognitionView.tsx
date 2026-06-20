import { useLetterSession } from './useLetterSession'
import { RecognitionPrompt } from './RecognitionPrompt'
import { SessionSummary } from './SessionSummary'

/**
 * Modo RECONOCER (1a): ves el glifo y recuerdas su nombre y sonido. Recuerdo
 * activo en dirección lectura. La pregunta la pinta `RecognitionPrompt`.
 */
export function RecognitionView({ onExit }: { onExit: () => void }) {
  const s = useLetterSession('rec')

  if (s.loading) return <p className="empty">Cargando…</p>
  if (s.done) {
    return <SessionSummary stats={s.stats} onRestart={s.restart} onExit={onExit} />
  }

  const letter = s.current
  if (!letter) return null

  return (
    <div className="alfabeto">
      <div className="alfabeto__top">
        <button className="btn btn--ghost" onClick={onExit}>
          ← Menú
        </button>
        <span className="alfabeto__progress">Quedan {s.remaining}</span>
      </div>
      <RecognitionPrompt letter={letter} onGrade={s.grade} />
    </div>
  )
}
