import { SessionHeader } from '../../core/ui/SessionHeader'
import { BuildPrompt } from '../../core/ui/BuildPrompt'
import { useBuildSession } from './useBuildSession'
import { BuildSummary } from './BuildSummary'

/**
 * Corre una sesión de "construir la frase": cabecera, el prompt compartido
 * (`BuildPrompt`) y, al terminar, el resumen con XP/racha/nivel/logros.
 */
export function BuildView({ onExit }: { onExit: () => void }) {
  const s = useBuildSession()

  if (s.loading) return <p className="empty">Cargando…</p>
  if (s.done) {
    return <BuildSummary stats={s.stats} onRestart={s.restart} onExit={onExit} />
  }

  const item = s.current
  if (!item) return null

  return (
    <div className="alfabeto">
      <SessionHeader
        onExit={onExit}
        label="Construir"
        remaining={s.remaining}
        total={s.total}
      />
      {/* key por ítem → el banco se reparte de nuevo en cada frase */}
      <BuildPrompt key={item.id} item={item} onGrade={s.grade} />
    </div>
  )
}
