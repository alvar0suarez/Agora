import { VERBS, NOUNS, CASE_LABEL, type GrammaticalCase } from '../../core/greek'
import { Card } from '../../core/ui/Card'

const CASES: GrammaticalCase[] = ['nom', 'gen', 'dat', 'acc']

/**
 * Estudiar: paradigmas completos de verbos (conjugación) y sustantivos
 * (declinación) para leerlos antes de practicar. Solo lectura.
 */
export function StudyView({ onExit }: { onExit: () => void }) {
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

      {NOUNS.map((n) => {
        const byKey = new Map(n.forms.map((f) => [`${f.case}-${f.number}`, f.form]))
        return (
          <Card key={n.id} title={`${n.lemma} — ${n.gloss}`}>
            <p className="verb__tense">
              {n.declension} · {n.gender}
            </p>
            <table className="verb-table">
              <thead>
                <tr>
                  <th className="verb-table__pron">caso</th>
                  <th className="verb-table__form">singular</th>
                  <th className="verb-table__form">plural</th>
                </tr>
              </thead>
              <tbody>
                {CASES.map((c) => (
                  <tr key={c}>
                    <td className="verb-table__pron">{CASE_LABEL[c]}</td>
                    <td className="verb-table__form">{byKey.get(`${c}-sg`)}</td>
                    <td className="verb-table__form">{byKey.get(`${c}-pl`)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        )
      })}

      <button className="btn" onClick={onExit}>
        Volver
      </button>
    </div>
  )
}
