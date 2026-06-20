import { useState } from 'react'
import { Card } from '../../core/ui/Card'
import { RecognitionView } from './RecognitionView'
import { ProductionView } from './ProductionView'
import { MasteryView } from './MasteryView'

type Mode = 'menu' | 'rec' | 'prod' | 'mastery'

/**
 * Pantalla del alfabeto: ofrece dos formas de practicar las 24 letras, cada una
 * con su propio progreso en el SRS.
 *  - Reconocer (leer): ves el glifo, recuerdas el sonido.
 *  - Escribir (producir): te damos el sonido, eliges el glifo.
 */
export function AlfabetoScreen() {
  const [mode, setMode] = useState<Mode>('menu')

  if (mode === 'rec') return <RecognitionView onExit={() => setMode('menu')} />
  if (mode === 'prod') return <ProductionView onExit={() => setMode('menu')} />
  if (mode === 'mastery') return <MasteryView onExit={() => setMode('menu')} />

  return (
    <div className="modes">
      <Card title="Alfabeto griego">
        <p>Practica las 24 letras en dos direcciones. Elige cómo:</p>
      </Card>
      <button className="btn btn--primary mode-btn" onClick={() => setMode('rec')}>
        <span className="mode-btn__title">Reconocer</span>
        <span className="mode-btn__hint">Ves la letra → recuerdas el sonido</span>
      </button>
      <button className="btn mode-btn" onClick={() => setMode('prod')}>
        <span className="mode-btn__title">Escribir</span>
        <span className="mode-btn__hint">Te damos el sonido → eliges la letra</span>
      </button>
      <button className="btn mode-btn" onClick={() => setMode('mastery')}>
        <span className="mode-btn__title">Dominio</span>
        <span className="mode-btn__hint">Tu nivel en cada una de las 24 letras</span>
      </button>
    </div>
  )
}
