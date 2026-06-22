import { useState } from 'react'
import { Card } from '../../core/ui/Card'
import { StudyView } from './StudyView'
import { MorphDrillView } from './MorphDrillView'
import { WordClassesView } from './WordClassesView'

type Screen = 'menu' | 'study' | 'drill' | 'classes'

/**
 * Gramática: morfología (conjugar/declinar) y una referencia de las clases de
 * palabra (qué es una conjunción, una preposición…). Modelos de paradigmas:
 * λύω, εἰμί, λόγος, ψυχή.
 */
export function GramaticaScreen() {
  const [screen, setScreen] = useState<Screen>('menu')
  const back = () => setScreen('menu')

  if (screen === 'study') return <StudyView onExit={back} />
  if (screen === 'drill') return <MorphDrillView onExit={back} />
  if (screen === 'classes') return <WordClassesView onExit={back} />

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
      <button className="btn mode-btn" onClick={() => setScreen('classes')}>
        <span className="mode-btn__title">Las clases de palabra</span>
        <span className="mode-btn__hint">Qué es una conjunción, preposición, partícula…</span>
      </button>
    </div>
  )
}
