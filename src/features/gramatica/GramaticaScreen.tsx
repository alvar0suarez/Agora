import { useState } from 'react'
import { Card } from '../../core/ui/Card'
import { VerbStudyView } from './VerbStudyView'
import { VerbDrillView } from './VerbDrillView'

type Screen = 'menu' | 'study' | 'drill'

/**
 * Gramática (Fase 4, semilla): morfología verbal. Estudiar los paradigmas y
 * practicarlos escribiendo la forma pedida. Por ahora, presente de indicativo
 * de λύω (modelo regular) y εἰμί (esencial).
 */
export function GramaticaScreen() {
  const [screen, setScreen] = useState<Screen>('menu')
  const back = () => setScreen('menu')

  if (screen === 'study') return <VerbStudyView onExit={back} />
  if (screen === 'drill') return <VerbDrillView onExit={back} />

  return (
    <div className="modes">
      <Card title="Gramática · verbos">
        <p>Aprende a conjugar. Empezamos por el presente de λύω y εἰμί.</p>
      </Card>
      <button className="btn btn--primary mode-btn" onClick={() => setScreen('drill')}>
        <span className="mode-btn__title">Practicar</span>
        <span className="mode-btn__hint">Te pedimos una forma → la escribes</span>
      </button>
      <button className="btn mode-btn" onClick={() => setScreen('study')}>
        <span className="mode-btn__title">Estudiar</span>
        <span className="mode-btn__hint">Lee los paradigmas completos</span>
      </button>
    </div>
  )
}
