import { SessionHeader } from '../../core/ui/SessionHeader'
import { ClozePrompt } from '../../core/ui/ClozePrompt'
import { useClozeSession } from './useClozeSession'
import { ClozeSummary } from './ClozeSummary'

/**
 * Corre una sesión de "rellenar huecos": cabecera, el prompt compartido
 * (`ClozePrompt`) y, al terminar, el resumen con XP/racha/nivel/logros.
 */
export function ClozeView({ onExit }: { onExit: () => void }) {
  const s = useClozeSession()

  if (s.loading) return <p className="empty">Cargando…</p>
  if (s.done) {
    return <ClozeSummary stats={s.stats} onRestart={s.restart} onExit={onExit} />
  }

  const item = s.current
  if (!item) return null

  return (
    <div className="alfabeto">
      <SessionHeader
        onExit={onExit}
        label="Completar"
        remaining={s.remaining}
        total={s.total}
      />
      {/* key por ítem → el prompt arranca con su estado limpio en cada hueco */}
      <ClozePrompt key={item.id} item={item} onGrade={s.grade} />
    </div>
  )
}
