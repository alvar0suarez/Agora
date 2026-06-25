import { useState } from 'react'
import { Card } from '../../core/ui/Card'
import { LecturaReviewView } from './LecturaReviewView'
import { LecturaBrowseView } from './LecturaBrowseView'
import { ClozeView } from './ClozeView'
import { BuildView } from './BuildView'

type Screen = 'menu' | 'review' | 'cloze' | 'build' | 'browse'

/**
 * Lectura (Fase 3): leer aforismos y γνῶμαι reales —el corazón de la meta—.
 *  - Repasar: recuerdo activo con SRS + XP (leer cuenta para el progreso).
 *  - Completar: rellenar huecos escribiendo la palabra que falta (SRS + XP).
 *  - Construir: ordenar las palabras de la frase (banco, estilo Duolingo · XP).
 *  - Explorar: lectura libre, sin presión (input comprensible).
 */
export function LecturaScreen() {
  const [screen, setScreen] = useState<Screen>('menu')
  const back = () => setScreen('menu')

  if (screen === 'review') return <LecturaReviewView onExit={back} />
  if (screen === 'cloze') return <ClozeView onExit={back} />
  if (screen === 'build') return <BuildView onExit={back} />
  if (screen === 'browse') return <LecturaBrowseView onExit={back} />

  return (
    <div className="modes">
      <Card title="Lectura">
        <p>Aforismos y sentencias del griego clásico. Elige cómo:</p>
      </Card>
      <button
        className="btn btn--primary mode-btn"
        onClick={() => setScreen('review')}
      >
        <span className="mode-btn__title">Repasar</span>
        <span className="mode-btn__hint">
          Recuerda el sentido de memoria · suma XP
        </span>
      </button>
      <button className="btn mode-btn" onClick={() => setScreen('cloze')}>
        <span className="mode-btn__title">Completar</span>
        <span className="mode-btn__hint">
          Escribe la palabra que falta · suma XP
        </span>
      </button>
      <button className="btn mode-btn" onClick={() => setScreen('build')}>
        <span className="mode-btn__title">Construir</span>
        <span className="mode-btn__hint">
          Ordena las palabras de la frase · suma XP
        </span>
      </button>
      <button className="btn mode-btn" onClick={() => setScreen('browse')}>
        <span className="mode-btn__title">Explorar</span>
        <span className="mode-btn__hint">
          Lectura libre con traducción y desglose
        </span>
      </button>
    </div>
  )
}
