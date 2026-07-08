import { useEffect, useMemo, useRef, useState } from 'react'
import { audio } from '../../core/audio'
import { wordToIpa } from '../../core/greek'
import type { NousWordRecord } from '../../core/storage/db'
import { Card } from '../../core/ui/Card'
import {
  buildRootGroups,
  canonicalKey,
  etiqueta,
  glosaDe,
  type RootMerges,
} from './map'
import { extractGreekFragments, greekKey, splitComment } from './parse'
import { RepasoView } from './RepasoView'
import {
  drainShareInbox,
  importNousFile,
  loadNousWords,
  loadRootMerges,
  purgeNonGreekWords,
  removeRootMerge,
  saveRootMerge,
} from './store'

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

type View =
  | { kind: 'list' }
  | { kind: 'word'; id: string }
  | { kind: 'roots' }
  | { kind: 'root'; key: string }
  | { kind: 'review' }

/**
 * Palabras de Nous: el vocabulario que guardas leyendo en Nous, importado en
 * Agora. Tres caras: FICHAS (significado, etimología, cita), MAPA de raíces
 * (las palabras conectadas por las raíces griegas que comparten, con fusión
 * manual cuando la heurística no las casa) y REPASO SRS. El fichero llega por
 * «Estudiar en Agora» desde Nous (share) o importándolo aquí a mano.
 * Formato: docs/formato-nous-vocab.md.
 */
export function NousScreen() {
  const [words, setWords] = useState<NousWordRecord[] | null>(null)
  const [merges, setMerges] = useState<RootMerges>({})
  const [view, setView] = useState<View>({ kind: 'list' })
  const [query, setQuery] = useState('')
  const [aviso, setAviso] = useState('')
  const [fusionando, setFusionando] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  /** Navega entre vistas reseteando estados efímeros (modo fusión). */
  function go(v: View) {
    setFusionando(false)
    setView(v)
  }

  // Al montar: si el share target dejó un fichero en la bandeja (compartido
  // desde Nous), se importa solo; si no, solo cargamos lo guardado.
  useEffect(() => {
    void (async () => {
      // Limpieza: fuera las palabras sin griego (criterio de la sección).
      const purgadas = await purgeNonGreekWords()
      if (purgadas > 0) {
        setAviso(`Quitadas ${purgadas} palabras sin griego (en Nous siguen; aquí solo se estudia lo que trae griego).`)
      }
      const compartido = await drainShareInbox()
      if (compartido !== null) await importText(compartido)
      setMerges(await loadRootMerges())
      setWords(await loadNousWords())
    })()
  }, [])

  async function importText(raw: string) {
    try {
      const res = await importNousFile(raw)
      const omitidas = res.omitidas > 0 ? ` ${res.omitidas} sin griego omitidas.` : ''
      setAviso(
        `Importadas ${res.total} palabras (${res.nuevas} nuevas, ${res.actualizadas} actualizadas).${omitidas}`,
      )
    } catch (e) {
      setAviso(e instanceof Error ? e.message : 'No se pudo importar el fichero.')
    }
  }

  async function onFile(file: File) {
    await importText(await file.text())
    setWords(await loadNousWords())
  }

  const groups = useMemo(
    () => (words ? buildRootGroups(words, merges) : []),
    [words, merges],
  )
  const wordById = useMemo(
    () => new Map((words ?? []).map((w) => [w.id, w])),
    [words],
  )

  if (words === null) return null

  if (view.kind === 'review') {
    return <RepasoView onExit={() => go({ kind: 'list' })} />
  }

  if (view.kind === 'word') {
    const w = wordById.get(view.id)
    if (!w) return null
    const p = splitComment(w.comentario)
    const frags = extractGreekFragments(w.comentario)
    const significado = p.significado || p.resto
    return (
      <div className="nous">
        <button className="btn btn--ghost" onClick={() => go({ kind: 'list' })}>
          ← Palabras
        </button>
        <Card title={w.palabra}>
          {w.idioma ? <p className="nous-meta">{idiomaNombre(w.idioma)}</p> : null}
          {significado ? <p>{significado}</p> : null}
        </Card>
        {frags.length > 0 ? (
          <>
            <p className="etim-label">Raíces griegas (toca para ver su familia):</p>
            <ul className="nous-frags">
              {frags.map((f) => (
                <li key={f.gr}>
                  <button
                    className="etim-item"
                    onClick={() =>
                      go({ kind: 'root', key: canonicalKey(greekKey(f.gr), merges) })
                    }
                  >
                    <span className="nous-frag__gr">{f.gr}</span>
                    <span className="nous-frag__ipa">[{wordToIpa(f.gr)}]</span>
                    {f.translit ? <span className="nous-frag__tr">{f.translit}</span> : null}
                    {f.gloss ? <span className="nous-frag__gloss">«{f.gloss}»</span> : null}
                    <span className="etim-chevron">›</span>
                  </button>
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

  if (view.kind === 'root') {
    const g = groups.find((x) => x.key === view.key)
    if (!g) {
      return (
        <div className="nous">
          <button className="btn btn--ghost" onClick={() => go({ kind: 'roots' })}>
            ← Raíces
          </button>
          <p className="empty">Esa raíz ya no existe (¿deshiciste una fusión?).</p>
        </div>
      )
    }
    // Fusiones que apuntan (directa o indirectamente) a este grupo.
    const fusionadas = Object.keys(merges).filter(
      (from) => canonicalKey(from, merges) === g.key && from !== g.key,
    )
    return (
      <div className="nous">
        <button className="btn btn--ghost" onClick={() => go({ kind: 'roots' })}>
          ← Raíces
        </button>
        <Card title={etiqueta(g)}>
          <p className="nous-meta">
            Se pronuncia: <span className="nous-frag__ipa">[{wordToIpa(etiqueta(g))}]</span>
            {g.curated?.lemmaId ? (
              <>
                {' '}
                <button
                  type="button"
                  className="btn btn--ghost"
                  onClick={() => void audio.pronounceWord(g.curated!.lemmaId!, { force: true })}
                >
                  🔊 Oír
                </button>
              </>
            ) : null}
          </p>
          {glosaDe(g) ? <p className="etim-detail"><strong>{glosaDe(g)}</strong></p> : null}
          {g.curated ? (
            <p className="nous-meta">
              En español: <strong>{g.curated.forma}</strong> · {g.curated.translit}
            </p>
          ) : null}
          {g.formas.length > 1 ? (
            <p className="nous-meta">
              Formas vistas: {g.formas.map((f) => f.gr).join(' · ')}
            </p>
          ) : null}
        </Card>
        <p className="etim-label">Palabras de esta raíz:</p>
        <ul className="etim-list">
          {g.wordIds.map((id) => {
            const w = wordById.get(id)
            if (!w) return null
            return (
              <li key={id}>
                <button className="etim-item" onClick={() => go({ kind: 'word', id })}>
                  {w.palabra} <span className="etim-chevron">›</span>
                </button>
              </li>
            )
          })}
        </ul>
        {fusionadas.length > 0 ? (
          <Card title="Fusiones">
            {fusionadas.map((from) => (
              <p key={from} className="nous-meta">
                {from}{' '}
                <button
                  className="btn btn--ghost"
                  onClick={() => {
                    void removeRootMerge(from).then(setMerges)
                  }}
                >
                  Deshacer
                </button>
              </p>
            ))}
          </Card>
        ) : null}
        {fusionando ? (
          <>
            <p className="etim-label">Es la misma raíz que…</p>
            <ul className="etim-list">
              {groups
                .filter((x) => x.key !== g.key)
                .map((x) => (
                  <li key={x.key}>
                    <button
                      className="etim-item"
                      onClick={() => {
                        setFusionando(false)
                        void saveRootMerge(g.key, x.key).then((m) => {
                          setMerges(m)
                          setView({ kind: 'root', key: canonicalKey(x.key, m) })  // fusionando ya está a false
                        })
                      }}
                    >
                      {etiqueta(x)} <span className="etim-chevron">›</span>
                    </button>
                  </li>
                ))}
            </ul>
            <button className="btn btn--ghost" onClick={() => setFusionando(false)}>
              Cancelar
            </button>
          </>
        ) : groups.length > 1 ? (
          <button className="btn btn--ghost" onClick={() => setFusionando(true)}>
            ¿Es la misma raíz que otra? Fusionar…
          </button>
        ) : null}
      </div>
    )
  }

  if (view.kind === 'roots') {
    const compartidas = groups.filter((g) => g.wordIds.length > 1)
    const sueltas = groups.filter((g) => g.wordIds.length === 1)
    return (
      <div className="nous">
        <button className="btn btn--ghost" onClick={() => go({ kind: 'list' })}>
          ← Palabras
        </button>
        <Card title="Mapa de raíces">
          <p>
            Tus palabras, conectadas por las raíces griegas que comparten. Las
            conexiones aparecen solas al importar palabras nuevas.
          </p>
        </Card>
        {groups.length === 0 ? (
          <p className="empty">Aún no hay griego detectado en tus palabras.</p>
        ) : null}
        {compartidas.length > 0 ? (
          <>
            <p className="etim-label">Raíces compartidas:</p>
            <ul className="etim-list">
              {compartidas.map((g) => (
                <li key={g.key}>
                  <button className="etim-item" onClick={() => go({ kind: 'root', key: g.key })}>
                    <span className="nous-frag__gr">{etiqueta(g)}</span>
                    {glosaDe(g) ? <span className="nous-frag__gloss">«{glosaDe(g)}»</span> : null}
                    <span className="nous-count">{g.wordIds.length} palabras</span>
                    <span className="etim-chevron">›</span>
                  </button>
                </li>
              ))}
            </ul>
          </>
        ) : null}
        {sueltas.length > 0 ? (
          <>
            <p className="etim-label">El resto de raíces:</p>
            <ul className="etim-list">
              {sueltas.map((g) => (
                <li key={g.key}>
                  <button className="etim-item" onClick={() => go({ kind: 'root', key: g.key })}>
                    <span className="nous-frag__gr">{etiqueta(g)}</span>
                    {glosaDe(g) ? <span className="nous-frag__gloss">«{glosaDe(g)}»</span> : null}
                    <span className="etim-chevron">›</span>
                  </button>
                </li>
              ))}
            </ul>
          </>
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
          Tu vocabulario de lectura, traído desde Nous — solo las palabras que
          traen <strong>griego</strong> en su texto. En Nous: Vocabulario →
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
      {words.length > 0 ? (
        <div className="nous-actions">
          <button className="btn mode-btn" onClick={() => go({ kind: 'roots' })}>
            <span className="mode-btn__title">🌳 Mapa de raíces</span>
            <span className="mode-btn__hint">Palabras conectadas por raíz griega</span>
          </button>
          <button className="btn mode-btn" onClick={() => go({ kind: 'review' })}>
            <span className="mode-btn__title">🔁 Repasar</span>
            <span className="mode-btn__hint">SRS: palabra ↔ significado</span>
          </button>
        </div>
      ) : null}
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
                <button className="etim-item" onClick={() => go({ kind: 'word', id: w.id })}>
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
