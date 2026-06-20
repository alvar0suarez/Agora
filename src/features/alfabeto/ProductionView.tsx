import { useLetterSession } from './useLetterSession'
import { ProductionPrompt } from './ProductionPrompt'
import { SessionSummary } from './SessionSummary'

/**
 * Modo ESCRIBIR / PRODUCIR (1b): te damos el sonido y eliges el glifo correcto.
 * Recuerdo activo en dirección escritura. La pregunta la pinta `ProductionPrompt`.
 */
export function ProductionView({ onExit }: { onExit: () => void }) {
  const s = useLetterSession('prod')

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
      <ProductionPrompt letter={letter} onGrade={s.grade} />
    </div>
  )
}
