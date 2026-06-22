import { Card } from '../../core/ui/Card'
import { WORD_CLASSES, POS_INFO } from '../../core/greek'

/**
 * Referencia «Las clases de palabra»: qué es y para qué sirve cada categoría
 * gramatical, repasables todas juntas. Misma fuente de datos que la nota
 * contextual «¿qué es?» de las tarjetas de vocabulario (core/greek/grammar).
 * Primero las palabras-herramienta (enlazan y matizan, las que más cuestan).
 */
export function WordClassesView({ onExit }: { onExit: () => void }) {
  return (
    <div className="wclasses">
      <button className="btn btn--ghost" onClick={onExit}>
        ← Gramática
      </button>
      <Card title="Las clases de palabra">
        <p>
          Para qué sirve cada tipo de palabra. Arriba, las «herramienta» (enlazan
          y matizan: las difíciles de memorizar); abajo, las que nombran y actúan.
        </p>
      </Card>
      {WORD_CLASSES.map((pos) => {
        const info = POS_INFO[pos]
        return (
          <Card key={pos} className="wclass">
            <h3 className="wclass__name">{pos}</h3>
            <p className="wclass__que">{info.que}</p>
            <p className="wclass__ej">Ej.: {info.ejemplo}</p>
          </Card>
        )
      })}
    </div>
  )
}
