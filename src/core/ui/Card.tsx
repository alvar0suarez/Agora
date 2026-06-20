import type { ReactNode } from 'react'

/** Tarjeta base reutilizable del sistema de diseño. */
export function Card({
  title,
  children,
  className,
}: {
  title?: string
  children: ReactNode
  /** Clases extra (p. ej. para animar feedback de acierto/fallo). */
  className?: string
}) {
  return (
    <section className={className ? `card ${className}` : 'card'}>
      {title ? <h2>{title}</h2> : null}
      {children}
    </section>
  )
}
