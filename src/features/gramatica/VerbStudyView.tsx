import { VERBS } from '../../core/greek'
import { Card } from '../../core/ui/Card'

/**
 * Estudiar: muestra los paradigmas completos para leerlos antes de practicar
 * (input comprensible). Solo lectura.
 */
export function VerbStudyView({ onExit }: { onExit: () => void }) {
  return (
    <div className="gramatica">
      {VERBS.map((v) => (
        <Card key={v.id} title={`${v.lemma} — ${v.gloss}`}>
          <p className="verb__tense">{v.tense}</p>
          <table className="verb-table">
            <tbody>
              {v.forms.map((f) => (
                <tr key={f.id}>
                  <td className="verb-table__pron">{f.pronoun}</td>
                  <td className="verb-table__form">{f.form}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      ))}
      <button className="btn" onClick={onExit}>
        Volver
      </button>
    </div>
  )
}
