import { useEffect, useMemo, useState } from 'react'
import {
  dialogLineId,
  sentencePron,
  type Dialogo,
  type DialogOption,
} from '../greek'
import { audio } from '../audio'
import { Card } from './Card'

/**
 * DIÁLOGO interactivo: el personaje te habla (voz + burbuja), tú respondes
 * eligiendo TU réplica en griego y la conversación avanza como un chat. Es el
 * formato "aprender interactuando": contexto y narrativa en vez de tarjeta.
 * Al elegir bien, tu réplica también suena (oyes lo que "dices").
 */
export function DialogoView({
  dialogo,
  onFinish,
}: {
  dialogo: Dialogo
  onFinish: () => void
}) {
  // Cuántos turnos son ya visibles (los 'p' se auto-revelan; los 'yo' esperan).
  const [visible, setVisible] = useState(0)
  const [wrongPick, setWrongPick] = useState<string | null>(null)
  const done = visible >= dialogo.turnos.length

  // Baraja estable de las opciones del turno activo (no siempre la buena arriba).
  const currentIdx = visible
  const current = dialogo.turnos[currentIdx]
  const options = useMemo(() => {
    if (!current || current.speaker !== 'yo') return []
    const opts = [...(current.opciones ?? [])]
    // Alternancia determinista y simple: los turnos pares invierten el orden.
    return currentIdx % 2 === 0 ? opts.reverse() : opts
  }, [current, currentIdx])

  // Los turnos del personaje se revelan solos: suena su voz y avanza.
  useEffect(() => {
    if (done || !current) return
    if (current.speaker === 'p') {
      void audio.pronounceDialog(dialogLineId(dialogo.id, currentIdx), {
        force: true,
      })
      const t = setTimeout(() => setVisible((v) => v + 1), 400)
      return () => clearTimeout(t)
    }
  }, [current, currentIdx, dialogo.id, done])

  const pick = (o: DialogOption) => {
    if (!o.ok) {
      setWrongPick(o.gr)
      return
    }
    setWrongPick(null)
    // Oyes tu propia réplica al decirla.
    void audio.pronounceDialog(dialogLineId(dialogo.id, currentIdx), {
      force: true,
    })
    setVisible((v) => v + 1)
  }

  return (
    <div className="dialogo">
      <Card title={`${dialogo.personaje.emoji} ${dialogo.titulo}`}>
        <p>{dialogo.escena}</p>
      </Card>

      <div className="dialogo__chat">
        {dialogo.turnos.slice(0, visible).map((t, i) => (
          <div
            key={i}
            className={`burbuja ${t.speaker === 'p' ? 'burbuja--p' : 'burbuja--yo'}`}
          >
            {t.speaker === 'p' ? (
              <span className="burbuja__avatar">{dialogo.personaje.emoji}</span>
            ) : null}
            <button
              type="button"
              className="burbuja__cuerpo"
              onClick={() =>
                void audio.pronounceDialog(dialogLineId(dialogo.id, i), {
                  force: true,
                })
              }
              title="Tocar para volver a oír"
            >
              <span className="burbuja__gr" lang="grc">
                {t.gr}
              </span>
              <span className="burbuja__pron">{sentencePron(t.gr)}</span>
              <span className="burbuja__es">{t.es}</span>
            </button>
          </div>
        ))}
      </div>

      {!done && current?.speaker === 'yo' ? (
        <div className="dialogo__opciones">
          <p className="alfabeto__prompt">Tu respuesta:</p>
          {options.map((o) => (
            <button
              key={o.gr}
              className={
                'btn mode-btn' + (wrongPick === o.gr ? ' dialogo__mal' : '')
              }
              onClick={() => pick(o)}
            >
              <span className="mode-btn__title" lang="grc">
                {o.gr}
              </span>
              <span className="mode-btn__hint">{o.es}</span>
            </button>
          ))}
          {wrongPick ? (
            <p className="dialogo__pista">
              Mmm… esa respuesta no encaja aquí. Prueba otra.
            </p>
          ) : null}
        </div>
      ) : null}

      {done ? (
        <>
          <Card>
            <p>
              🎉 Fin de la escena. Acabas de mantener tu primera conversación
              con {dialogo.personaje.nombre}.
            </p>
          </Card>
          <button className="btn btn--primary" onClick={onFinish}>
            Seguir
          </button>
        </>
      ) : null}
    </div>
  )
}
