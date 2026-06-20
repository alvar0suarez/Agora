import { useState } from 'react'
import {
  ROOTS,
  DERIVED,
  rootById,
  wordsOfRoot,
  type DerivedWord,
} from '../../core/greek'
import { audio } from '../../core/audio'
import { Card } from '../../core/ui/Card'

type View =
  | { kind: 'roots' }
  | { kind: 'root'; id: string }
  | { kind: 'word'; word: string }

/**
 * Etimología: árbol navegable de raíces griegas ↔ palabras españolas. Tocas una
 * raíz y ves su familia (las palabras que la usan); tocas una palabra y ves sus
 * raíces. Bidireccional. 100% offline (datos curados, sin IA en runtime).
 */
export function EtimologiaScreen() {
  const [view, setView] = useState<View>({ kind: 'roots' })

  if (view.kind === 'root') {
    const r = rootById.get(view.id)
    if (!r) return null
    const family = wordsOfRoot(r.id)
    return (
      <div className="etim">
        <button className="btn btn--ghost" onClick={() => setView({ kind: 'roots' })}>
          ← Raíces
        </button>
        <Card title={`${r.forma} · ${r.gr}`}>
          <p className="etim-detail">
            {r.translit} — <strong>{r.gloss}</strong>
          </p>
          {r.lemmaId ? (
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => void audio.pronounceWord(r.lemmaId!, { force: true })}
            >
              🔊 Oír
            </button>
          ) : null}
        </Card>
        <p className="etim-label">Palabras españolas de esta raíz:</p>
        <ul className="etim-list">
          {family.map((d) => (
            <li key={d.word}>
              <button
                className="etim-item"
                onClick={() => setView({ kind: 'word', word: d.word })}
              >
                {d.word} <span className="etim-chevron">›</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  if (view.kind === 'word') {
    const d: DerivedWord | undefined = DERIVED.find((x) => x.word === view.word)
    if (!d) return null
    return (
      <div className="etim">
        <button className="btn btn--ghost" onClick={() => setView({ kind: 'roots' })}>
          ← Raíces
        </button>
        <Card title={d.word}>
          {d.nota ? <p>«{d.nota}»</p> : null}
        </Card>
        <p className="etim-label">Viene de:</p>
        <ul className="etim-list">
          {d.roots.map((rid) => {
            const r = rootById.get(rid)
            if (!r) return null
            return (
              <li key={rid}>
                <button
                  className="etim-item"
                  onClick={() => setView({ kind: 'root', id: rid })}
                >
                  <span className="etim-forma">{r.forma}</span>
                  <span className="etim-gr">{r.gr}</span>
                  <span className="etim-gloss">{r.gloss}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  // Lista de raíces.
  return (
    <div className="etim">
      <Card title="Raíces griegas en el español">
        <p>Toca una raíz para ver de qué palabras españolas es origen.</p>
      </Card>
      <ul className="etim-roots">
        {ROOTS.map((r) => (
          <li key={r.id}>
            <button
              className="etim-root"
              onClick={() => setView({ kind: 'root', id: r.id })}
            >
              <span className="etim-forma">{r.forma}</span>
              <span className="etim-gr">{r.gr}</span>
              <span className="etim-gloss">{r.gloss}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
