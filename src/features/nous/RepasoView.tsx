import { useState } from 'react'
import { Card } from '../../core/ui/Card'
import { SessionHeader } from '../../core/ui/SessionHeader'
import { useNousSession } from './useNousSession'

/**
 * Repaso SRS de las palabras de Nous: tarjetas de autoevaluación en dos
 * direcciones (palabra→significado y significado→palabra). Recordar → destapar
 * → calificarse («Otra vez» reencola; «Bien» sube de caja Leitner).
 */
export function RepasoView({ onExit }: { onExit: () => void }) {
  const { loading, done, current, hasWords, remaining, total, grade, restart, stats } =
    useNousSession()
  const [revealed, setRevealed] = useState(false)

  if (loading) return null

  if (!hasWords) {
    return (
      <div className="nous">
        <button className="btn btn--ghost" onClick={onExit}>
          ← Palabras de Nous
        </button>
        <Card title="Nada que repasar aún">
          <p>
            Importa palabras desde Nous (con su significado en el comentario) y
            aparecerán aquí como tarjetas de repaso.
          </p>
        </Card>
      </div>
    )
  }

  if (done) {
    return (
      <div className="nous">
        <SessionHeader onExit={onExit} label="Nous" remaining={0} total={total} exitLabel="← Salir" />
        <Card title="Sesión terminada">
          <p>
            {stats.recalled} de {stats.reviewed} recordadas
            {stats.xpGained > 0 ? ` · +${stats.xpGained} XP` : ''}.
          </p>
          {total === 0 ? (
            <p className="nous-meta">
              No había cartas vencidas: vuelve más tarde (así funciona la
              repetición espaciada).
            </p>
          ) : null}
          <button className="btn btn--primary" onClick={() => void restart()}>
            Otra sesión
          </button>
        </Card>
      </div>
    )
  }

  if (!current) return null
  const pregunta = current.dir === 'rec' ? current.word.palabra : current.significado
  const respuesta = current.dir === 'rec' ? current.significado : current.word.palabra

  return (
    <div className="nous">
      <SessionHeader onExit={onExit} label="Nous" remaining={remaining} total={total} exitLabel="← Salir" />
      <Card title={current.dir === 'rec' ? '¿Qué significa?' : '¿Qué palabra es?'}>
        <p className={current.dir === 'rec' ? 'nous-prompt-word' : 'nous-prompt-text'}>
          {pregunta}
        </p>
        {revealed ? (
          <>
            <hr className="nous-sep" />
            <p className={current.dir === 'rec' ? 'nous-prompt-text' : 'nous-prompt-word'}>
              {respuesta}
            </p>
          </>
        ) : null}
      </Card>
      {revealed ? (
        <div className="grade">
          <button
            className="btn btn--again"
            onClick={() => {
              setRevealed(false)
              grade('again')
            }}
          >
            Otra vez
          </button>
          <button
            className="btn btn--good"
            onClick={() => {
              setRevealed(false)
              grade('good')
            }}
          >
            Bien
          </button>
        </div>
      ) : (
        <button className="btn btn--primary" onClick={() => setRevealed(true)}>
          Mostrar
        </button>
      )}
    </div>
  )
}
