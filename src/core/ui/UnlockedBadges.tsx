import type { Achievement } from '../progress'

/**
 * Aviso celebratorio de los logros recién desbloqueados al terminar una sesión.
 * Presentacional y compartido por los resúmenes de todas las fases (vive en
 * `core/ui` porque los features no pueden depender entre sí). No muestra nada si
 * no hay logros nuevos.
 */
export function UnlockedBadges({ items }: { items: Achievement[] }) {
  if (items.length === 0) return null
  return (
    <div className="unlocked" role="status">
      <p className="unlocked__head">
        {items.length === 1
          ? '¡Logro desbloqueado!'
          : '¡Logros desbloqueados!'}
      </p>
      <ul className="unlocked__list">
        {items.map((a) => (
          <li key={a.id} className="unlocked__item">
            <span className="unlocked__icon">{a.icon}</span>
            <span className="unlocked__title">{a.title}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
