/**
 * Cabecera de sesión reutilizable: botón de volver, etiqueta opcional y el conteo
 * de lo que queda, con una BARRA DE PROGRESO de la sesión. Unifica el aspecto de
 * todos los drills (alfabeto, vocabulario, gramática) y evita duplicar markup.
 */
export function SessionHeader({
  onExit,
  label,
  remaining,
  total,
  exitLabel = '← Menú',
}: {
  onExit: () => void
  label?: string
  remaining: number
  total: number
  exitLabel?: string
}) {
  const done = Math.max(0, total - remaining)
  const pct = total > 0 ? Math.round((done / total) * 100) : 0
  return (
    <div className="session-head">
      <div className="session-head__row">
        <button className="btn btn--ghost" onClick={onExit}>
          {exitLabel}
        </button>
        <span className="alfabeto__progress">
          {label ? `${label} · ` : ''}Quedan {remaining}
        </span>
      </div>
      <div
        className="session-bar"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Progreso de la sesión"
      >
        <span className="session-bar__fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
