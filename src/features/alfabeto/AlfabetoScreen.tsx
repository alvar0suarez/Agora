import { useState } from 'react'
import { Card } from '../../core/ui/Card'
import { RecognitionView } from './RecognitionView'
import { ProductionView } from './ProductionView'
import { MixedView } from './MixedView'
import { MasteryView } from './MasteryView'

type Mode = 'menu' | 'mixed' | 'rec' | 'prod' | 'mastery'

/**
 * Pantalla del alfabeto: ofrece varias formas de practicar las 24 letras, cada
 * dirección con su propio progreso en el SRS.
 *  - Mixto: intercala reconocer y escribir (recomendado).
 *  - Reconocer (leer): ves el glifo, recuerdas el sonido.
 *  - Escribir (producir): te damos el sonido, eliges el glifo.
 *  - Dominio: tu nivel por letra.
 */
export function AlfabetoScreen() {
  const [mode, setMode] = useState<Mode>('menu')

  if (mode === 'mixed') return <MixedView onExit={() => setMode('menu')} />
  if (mode === 'rec') return <RecognitionView onExit={() => setMode('menu')} />
  if (mode === 'prod') return <ProductionView onExit={() => setMode('menu')} />
  if (mode === 'mastery') return <MasteryView onExit={() => setMode('menu')} />

  return (
    <div className="modes">
      <Card title="Alfabeto griego">
        <p>Practica las 24 letras. Elige cómo:</p>
      </Card>
      <button className="btn btn--primary mode-btn" onClick={() => setMode('mixed')}>
        <span className="mode-btn__title">Mixto</span>
        <span className="mode-btn__hint">
          Intercala leer y escribir · recomendado
        </span>
      </button>
      <button className="btn mode-btn" onClick={() => setMode('rec')}>
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
