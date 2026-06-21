import { useEffect, useState } from 'react'
import { REALIA, realiaById } from '../../core/greek'
import {
  loadProgress,
  levelFromXp,
  READING_BANDS,
  emptyProgress,
  type ProgressState,
} from '../../core/progress'
import { Card } from '../../core/ui/Card'
import { MuseoPronunciation } from './MuseoPronunciation'

const bandIndex = (code: string) => READING_BANDS.findIndex((b) => b.code === code)
const imgUrl = (file: string) => `${import.meta.env.BASE_URL}images/realia/${file}`

/**
 * Museo: galería de textos/piezas reales en griego (inscripciones, óstraka,
 * poemas) con su traducción, descripción y fuente consultable. Cada pieza tiene
 * una banda de nivel; según tu nivel se marca si "ya puedes leerla". Es la meta
 * del proyecto hecha pantalla: leer griego de verdad.
 */
export function MuseoScreen() {
  const [progress, setProgress] = useState<ProgressState>(emptyProgress())
  const [openId, setOpenId] = useState<string | null>(null)

  useEffect(() => {
    let alive = true
    void (async () => {
      const p = await loadProgress()
      if (alive) setProgress(p)
    })()
    return () => {
      alive = false
    }
  }, [])

  const myBand = bandIndex(levelFromXp(progress.xp).band)
  const canRead = (nivel: string) => myBand >= bandIndex(nivel)

  // — Detalle —
  if (openId) {
    const r = realiaById.get(openId)
    if (!r) return null
    const readable = canRead(r.nivel)
    return (
      <div className="museo">
        <button className="btn btn--ghost" onClick={() => setOpenId(null)}>
          ← Museo
        </button>
        <h2 className="museo__title">{r.title}</h2>
        <p className="museo__meta">
          {r.tipo} · {r.fecha} · {r.origen} · <em>{r.dialecto}</em>
        </p>

        {r.imagen ? (
          <figure className="museo__figure">
            <div className="museo__imgwrap">
              <img className="museo__img" src={imgUrl(r.imagen)} alt={r.title} loading="lazy" />
              {r.leyenda ? (
                <div className="museo__overlay">
                  <span className="museo__overlay-label">Lo que pone</span>
                  <span className="museo__overlay-text">{r.leyenda}</span>
                </div>
              ) : null}
            </div>
            {r.creditos ? <figcaption className="museo__credit">{r.creditos}</figcaption> : null}
          </figure>
        ) : null}

        <p className={`museo__badge${readable ? ' museo__badge--ok' : ''}`}>
          {readable ? '✅ A tu nivel ya puedes leerla' : `🔒 Sube a ${r.nivel} para leerla`}
        </p>

        <Card>
          <p className="museo__greek">{r.greek}</p>
          <p className="museo__trans">{r.translation}</p>
        </Card>

        {r.leyenda ? <MuseoPronunciation text={r.leyenda} /> : null}

        <p className="museo__desc">{r.descripcion}</p>

        <div className="museo__tags">
          {r.tags.map((t) => (
            <span key={t} className="museo__tag">
              {t}
            </span>
          ))}
        </div>

        <a className="btn" href={r.fuente.url} target="_blank" rel="noopener noreferrer">
          Ver más en {r.fuente.titulo} ↗
        </a>
      </div>
    )
  }

  // — Galería —
  return (
    <div className="museo">
      <Card title="Museo · textos reales">
        <p>Griego de verdad: inscripciones, óstraka y poemas. A tu nivel verás cuáles ya puedes leer.</p>
      </Card>
      <ul className="museo-grid">
        {REALIA.map((r) => (
          <li key={r.id}>
            <button className="museo-card" onClick={() => setOpenId(r.id)}>
              {r.imagen ? (
                <img className="museo-card__thumb" src={imgUrl(r.imagen)} alt="" loading="lazy" />
              ) : (
                <span className="museo-card__thumb museo-card__thumb--none">🏺</span>
              )}
              <span className="museo-card__body">
                <span className="museo-card__title">{r.title}</span>
                <span className="museo-card__meta">{r.tipo} · {r.fecha}</span>
                <span className={`museo-card__lvl${canRead(r.nivel) ? ' museo-card__lvl--ok' : ''}`}>
                  {canRead(r.nivel) ? `✅ ${r.nivel}` : `🔒 ${r.nivel}`}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
