import { Card } from '../../core/ui/Card'
import type { Lesson } from '../../core/greek'

/** Lector de una lección: pinta sus bloques en orden, según su tipo. */
export function LessonReader({
  lesson,
  onExit,
}: {
  lesson: Lesson
  onExit: () => void
}) {
  return (
    <div className="teoria">
      <Card title={`${lesson.icon} ${lesson.title}`}>
        {lesson.blocks.map((b, i) => {
          switch (b.kind) {
            case 'titulo':
              return (
                <h3 key={i} className="lesson__h">
                  {b.text}
                </h3>
              )
            case 'parrafo':
              return (
                <p key={i} className="lesson__p">
                  {b.text}
                </p>
              )
            case 'ejemplo':
              return (
                <p key={i} className="lesson__ej">
                  <span className="lesson__gr" lang="grc">
                    {b.gr}
                  </span>
                  {b.pron && <span className="lesson__pron">/{b.pron}/</span>}
                  <span className="lesson__gloss">{b.gloss}</span>
                </p>
              )
            case 'tip':
              return (
                <p key={i} className="lesson__tip">
                  💡 {b.text}
                </p>
              )
            case 'tabla':
              return (
                <figure key={i} className="lesson__tabla">
                  <table>
                    <thead>
                      <tr>
                        {b.headers.map((h, j) => (
                          <th key={j}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {b.rows.map((row, r) => (
                        <tr key={r}>
                          {row.map((cell, c) => (
                            <td key={c} lang={c === 0 ? undefined : 'grc'}>
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <figcaption>{b.caption}</figcaption>
                </figure>
              )
          }
        })}
      </Card>
      <button className="btn" onClick={onExit}>
        Volver
      </button>
    </div>
  )
}
