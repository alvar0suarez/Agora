import { SessionHeader } from '../../core/ui/SessionHeader'
import { useLetterSession, type SessionMode } from './useLetterSession'
import { RecognitionPrompt } from './RecognitionPrompt'
import { ProductionPrompt } from './ProductionPrompt'
import { SessionSummary } from './SessionSummary'

/** Direcciones de la sesión mixta (constante: referencia estable). */
const MIXED_MODES: SessionMode[] = ['rec', 'prod']

/**
 * Modo MIXTO (1c): intercala reconocer y escribir en la misma sesión
 * (interleaving). Cada carta lleva su dirección; `currentMode` decide qué
 * pregunta se muestra. Reusa las mismas piezas que los modos sueltos.
 */
export function MixedView({ onExit }: { onExit: () => void }) {
  const s = useLetterSession(MIXED_MODES)

  if (s.loading) return <p className="empty">Cargando…</p>
  if (s.done) {
    return <SessionSummary stats={s.stats} onRestart={s.restart} onExit={onExit} />
  }

  const letter = s.current
  if (!letter) return null

  return (
    <div className="alfabeto">
      <SessionHeader
        onExit={onExit}
        label={s.currentMode === 'rec' ? 'Leer' : 'Escribir'}
        remaining={s.remaining}
        total={s.total}
      />
      {s.currentMode === 'rec' ? (
        <RecognitionPrompt letter={letter} onGrade={s.grade} />
      ) : (
        <ProductionPrompt letter={letter} onGrade={s.grade} />
      )}
    </div>
  )
}
