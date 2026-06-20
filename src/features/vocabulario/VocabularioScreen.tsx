import { useState } from 'react'
import { Card } from '../../core/ui/Card'
import { VocabSessionView } from './VocabSessionView'
import { VocabMasteryView } from './VocabMasteryView'
import type { VocabMode } from './useVocabSession'

type Screen = 'menu' | 'mixed' | 'rec' | 'prod' | 'mastery'

/** Direcciones de la sesión mixta (constante: referencia estable). */
const MIXED_MODES: VocabMode[] = ['rec', 'prod']

/**
 * Pantalla de vocabulario: practica el léxico núcleo en varias direcciones, con
 * el mismo SRS y la misma gamificación que el alfabeto.
 *  - Mixto: intercala reconocer y escribir (recomendado).
 *  - Reconocer: ves el griego → recuerdas el significado.
 *  - Escribir: te damos el significado → eliges la palabra.
 */
export function VocabularioScreen() {
  const [screen, setScreen] = useState<Screen>('menu')
  const back = () => setScreen('menu')

  if (screen === 'mixed')
    return <VocabSessionView modes={MIXED_MODES} onExit={back} />
  if (screen === 'rec') return <VocabSessionView modes="rec" onExit={back} />
  if (screen === 'prod') return <VocabSessionView modes="prod" onExit={back} />
  if (screen === 'mastery') return <VocabMasteryView onExit={back} />

  return (
    <div className="modes">
      <Card title="Vocabulario griego">
        <p>Aprende el léxico núcleo (frecuencia + filosofía). Elige cómo:</p>
      </Card>
      <button
        className="btn btn--primary mode-btn"
        onClick={() => setScreen('mixed')}
      >
        <span className="mode-btn__title">Mixto</span>
        <span className="mode-btn__hint">
          Intercala significado y palabra · recomendado
        </span>
      </button>
      <button className="btn mode-btn" onClick={() => setScreen('rec')}>
        <span className="mode-btn__title">Reconocer</span>
        <span className="mode-btn__hint">Ves el griego → recuerdas el sentido</span>
      </button>
      <button className="btn mode-btn" onClick={() => setScreen('prod')}>
        <span className="mode-btn__title">Escribir</span>
        <span className="mode-btn__hint">Te damos el sentido → eliges la palabra</span>
      </button>
      <button className="btn mode-btn" onClick={() => setScreen('mastery')}>
        <span className="mode-btn__title">Dominio</span>
        <span className="mode-btn__hint">Tu nivel en cada palabra</span>
      </button>
    </div>
  )
}
