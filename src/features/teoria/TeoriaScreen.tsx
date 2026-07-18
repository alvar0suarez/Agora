import { useState } from 'react'
import { LESSONS, lessonById } from '../../core/greek'
import { READING_BANDS } from '../../core/progress'
import { Card } from '../../core/ui/Card'
import { LessonReader } from '../../core/ui/LessonReader'

/**
 * Teoría: mini-artículos que explican cómo funciona el griego (acentos, casos,
 * verbos…), agrupados por la banda del camino a la que pertenecen. Es lectura
 * libre —entender el sistema—, complementa a los ejercicios. Solo lee.
 */
export function TeoriaScreen() {
  const [openId, setOpenId] = useState<string | null>(null)

  const open = openId ? lessonById.get(openId) ?? null : null
  if (open) return <LessonReader lesson={open} onExit={() => setOpenId(null)} />

  return (
    <div className="teoria">
      <Card title="Teoría">
        <p>
          Cómo funciona el griego, explicado pieza a pieza. Lee para{' '}
          <strong>entender</strong> lo que practicas en los ejercicios.
        </p>
      </Card>

      {READING_BANDS.map((band) => {
        const lessons = LESSONS.filter((l) => l.band === band.code)
        if (lessons.length === 0) return null
        return (
          <div key={band.code} className="teoria__band">
            <p className="teoria__band-name">{band.code}</p>
            {lessons.map((l) => (
              <button
                key={l.id}
                className="btn mode-btn"
                onClick={() => setOpenId(l.id)}
              >
                <span className="mode-btn__title">
                  {l.icon} {l.title}
                </span>
                <span className="mode-btn__hint">{l.summary}</span>
              </button>
            ))}
          </div>
        )
      })}
    </div>
  )
}
