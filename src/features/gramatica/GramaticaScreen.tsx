import { useState } from 'react'
import { Card } from '../../core/ui/Card'
import { StudyView } from './StudyView'
import { MorphDrillView } from './MorphDrillView'

type Screen = 'menu' | 'study' | 'drill'

/**
 * Gramática (Fase 4): morfología. Estudiar los paradigmas y practicarlos
 * escribiendo la forma pedida. Verbos (presente de λύω y εἰμί) y sustantivos
 * (declinación de λόγος y ψυχή, los cuatro casos).
 */
export function GramaticaScreen() {
  const [screen, setScreen] = useState<Screen>('menu')
  const back = () => setScreen('menu')

  if (screen === 'study') return <StudyView onExit={back} />
  if (screen === 'drill') return <MorphDrillView onExit={back} />

  return (
    <div className="modes">
      <Card title="Gramática">
        <p>Conjuga verbos y declina sustantivos (los casos). Modelos: λύω, εἰμί, λόγος, ψυχή.</p>
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
