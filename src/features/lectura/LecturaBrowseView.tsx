import { useState } from 'react'
import { APHORISMS } from '../../core/greek'
import { SessionHeader } from '../../core/ui/SessionHeader'
import { AphorismCue } from './AphorismCue'
import { AphorismDetail } from './AphorismDetail'

/**
 * Modo Explorar: lectura libre, sin SRS. Lees la frase en griego, intentas
 * entenderla y revelas la traducción + desglose. Aquí prima la EXPOSICIÓN
 * (input comprensible); el progreso medible está en Repasar.
 */
export function LecturaBrowseView({ onExit }: { onExit: () => void }) {
  const [index, setIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)

  const total = APHORISMS.length
  const aphorism = APHORISMS[index]

  const go = (delta: number) => {
    setIndex((i) => (i + delta + total) % total)
    setRevealed(false)
  }

  return (
    <div className="lectura">
      <SessionHeader
        onExit={onExit}
        label="Explorar"
        remaining={total - index}
        total={total}
      />

      <AphorismCue aphorism={aphorism} />

      {!revealed ? (
        <button className="btn btn--primary" onClick={() => setRevealed(true)}>
          Ver traducción
        </button>
      ) : (
        <AphorismDetail aphorism={aphorism} />
      )}

      <div className="grade">
        <button className="btn" onClick={() => go(-1)}>
          ← Anterior
        </button>
        <button className="btn" onClick={() => go(1)}>
          Siguiente →
        </button>
      </div>
    </div>
  )
}
