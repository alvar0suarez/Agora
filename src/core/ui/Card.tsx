import type { ReactNode } from 'react'

/** Tarjeta base reutilizable del sistema de diseño. */
export function Card({
  title,
  children,
}: {
  title?: string
  children: ReactNode
}) {
  return (
    <section className="card">
      {title ? <h2>{title}</h2> : null}
      {children}
    </section>
  )
}
