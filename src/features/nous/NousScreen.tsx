import { useEffect, useRef, useState } from 'react'
import type { NousWordRecord } from '../../core/storage/db'
import { Card } from '../../core/ui/Card'
import { extractGreekFragments, splitComment } from './parse'
import { importNousFile, loadNousWords } from './store'

/** Nombre legible de los códigos de idioma que llegan de Nous. */
function idiomaNombre(code: string): string {
  switch (code) {
    case 'es': return 'Español'
    case 'el': return 'Griego'
    case 'grc': return 'Griego antiguo'
    case 'la': return 'Latín'
    case 'en': return 'Inglés'
    case '': return ''
    default: return code
  }
}

type View = { kind: 'list' } | { kind: 'word'; id: string }

/**
 * Palabras de Nous: el vocabulario que guardas leyendo en Nous, importado en
 * Agora para estudiarlo. Cada palabra es una ficha (significado, etimología,
 * griego detectado, cita del libro). El fichero llega por «Estudiar en Agora»
 * desde Nous (share) o importándolo aquí a mano. Formato:
 * docs/formato-nous-vocab.md.
 */
export function NousScreen() {
  const [words, setWords] = useState<NousWordRecord[] | null>(null)
  const [view, setView] = useState<View>({ kind: 'list' })
  const [query, setQuery] = useState('')
  const [aviso, setAviso] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    void loadNousWords().then(setWords)
  }, [])

  async function onFile(file: File) {
    try {
      const res = await importNousFile(await file.text())
      setAviso(
        `Importadas ${res.total} palabras (${res.nuevas} nuevas, ${res.actualizadas} actualizadas).`,
      )
      setWords(await loadNousWords())
    } catch (e) {
      setAviso(e instanceof Error ? e.message : 'No se pudo importar el fichero.')
    }
  }

  if (words === null) return null

  if (view.kind === 'word') {
    const w = words.find((x) => x.id === view.id)
    if (!w) return null
    const p = splitComment(w.comentario)
    const frags = extractGreekFragments(w.comentario)
    const significado = p.significado || p.resto
    return (
      <div className="nous">
        <button className="btn btn--ghost" onClick={() => setView({ kind: 'list' })}>
          ← Palabras
        </button>
        <Card title={w.palabra}>
          {w.idioma ? <p className="nous-meta">{idiomaNombre(w.idioma)}</p> : null}
          {significado ? <p>{significado}</p> : null}
        </Card>
        {frags.length > 0 ? (
          <>
            <p className="etim-label">Griego detectado:</p>
            <ul className="nous-frags">
              {frags.map((f) => (
                <li key={f.gr} className="nous-frag">
                  <span className="nous-frag__gr">{f.gr}</span>
                  {f.translit ? <span className="nous-frag__tr"> {f.translit}</span> : null}
                  {f.gloss ? <span className="nous-frag__gloss"> «{f.gloss}»</span> : null}
                </li>
              ))}
            </ul>
          </>
        ) : null}
        {p.etimologia ? (
          <Card title="Etimología">
            <p className="nous-etim">{p.etimologia}</p>
          </Card>
        ) : null}
        {w.contexto ? (
          <Card title="Donde la encontraste">
            <blockquote className="nous-quote">«{w.contexto}»</blockquote>
            {w.libro ? <p className="nous-meta">— {w.libro}</p> : null}
          </Card>
        ) : w.libro ? (
          <p className="nous-meta">Libro: {w.libro}</p>
        ) : null}
      </div>
    )
  }

  const q = query.trim().toLowerCase()
  const filtered = q
    ? words.filter(
        (w) =>
          w.palabra.toLowerCase().includes(q) || w.comentario.toLowerCase().includes(q),
      )
    : words

  return (
    <div className="nous">
      <Card title="Palabras de Nous">
        <p>
          Tu vocabulario de lectura, traído desde Nous. En Nous: Vocabulario →
          compartir → <strong>Estudiar en Agora</strong>. O importa aquí el
          fichero <code>nous-vocab.json</code>.
        </p>
        <button className="btn btn--primary" onClick={() => fileRef.current?.click()}>
          Importar fichero
        </button>
        <input
          ref={fileRef}
          type="file"
          accept=".json,application/json"
          hidden
          onChange={(e) => {
            const f = e.target.files?.[0]
            if (f) void onFile(f)
            e.target.value = ''
          }}
        />
        {aviso ? <p className="nous-meta">{aviso}</p> : null}
      </Card>
      {words.length === 0 ? null : (
        <>
          <input
            className="nous-search"
            type="search"
            placeholder="Buscar palabra o definición"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <ul className="etim-list">
            {filtered.map((w) => (
              <li key={w.id}>
                <button className="etim-item" onClick={() => setView({ kind: 'word', id: w.id })}>
                  {w.palabra}
                  {w.idioma && w.idioma !== 'es' ? (
                    <span className="nous-meta"> · {idiomaNombre(w.idioma)}</span>
                  ) : null}
                  <span className="etim-chevron">›</span>
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}
