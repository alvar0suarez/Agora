import { useState } from 'react'
import { Card } from '../../core/ui/Card'
import { EntrenarView } from './EntrenarView'

/**
 * Entrenar: la forma principal de practicar. Una pantalla de inicio simple y, al
 * empezar, la sesión mixta que intercala tipos de ejercicio entre áreas.
 */
export function EntrenarScreen() {
  const [started, setStarted] = useState(false)

  if (started) return <EntrenarView onExit={() => setStarted(false)} />

  return (
    <div className="modes">
      <Card title="Entrenar">
        <p>
          Una sesión variada: reconocer, <strong>escribir</strong> y letras,
          todo intercalado. Lo que toque repasar y algo nuevo, mezclado para que
          no se haga monótono.
        </p>
      </Card>
      <button
        className="btn btn--primary mode-btn"
        onClick={() => setStarted(true)}
      >
        <span className="mode-btn__title">Empezar</span>
        <span className="mode-btn__hint">Sesión corta · suma XP</span>
      </button>
    </div>
  )
}
