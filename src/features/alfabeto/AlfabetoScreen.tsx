import { Card } from '../../core/ui/Card'
import { useAlfabetoSession } from './useAlfabetoSession'

export function AlfabetoScreen() {
  const s = useAlfabetoSession()

  if (s.loading) {
    return <p className="empty">Cargando…</p>
  }

  if (s.done) {
    const { reviewed, recalled } = s.stats
    return (
      <Card title="¡Sesión completada! 🎉">
        {reviewed === 0 ? (
          <p>No hay nada que repasar ahora mismo. Vuelve más tarde 👋</p>
        ) : (
          <p>
            Repasadas: <strong>{reviewed}</strong> · Acertadas:{' '}
            <strong>{recalled}</strong>
          </p>
        )}
        <button className="btn btn--primary" onClick={s.restart}>
          Otra ronda
        </button>
      </Card>
    )
  }

  const letter = s.current
  if (!letter) return null

  return (
    <div className="alfabeto">
      <div className="alfabeto__progress">Quedan {s.remaining}</div>

      <div className="glyph">
        <span className="glyph__lower">{letter.lower}</span>
        <span className="glyph__upper">{letter.upper}</span>
      </div>

      {!s.revealed ? (
        <>
          <p className="alfabeto__prompt">¿Cómo se llama y cómo suena?</p>
          <button className="btn btn--primary" onClick={s.reveal}>
            Mostrar
          </button>
        </>
      ) : (
        <>
          <Card>
            <p className="answer__name">{letter.name}</p>
            <p className="answer__line">
              Translit.: <strong>{letter.translit}</strong> · AFI:{' '}
              <strong>{letter.ipa}</strong>
            </p>
            <p className="answer__sound">{letter.sound}</p>
          </Card>
          <div className="grade">
            <button className="btn btn--again" onClick={() => s.grade('again')}>
              No la recordé
            </button>
            <button className="btn btn--good" onClick={() => s.grade('good')}>
              La recordé
            </button>
          </div>
        </>
      )}
    </div>
  )
}
