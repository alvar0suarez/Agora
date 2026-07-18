import { useEffect, useMemo, useState } from 'react'
import {
  normalizeGreek,
  sentencePron,
  wordPron,
  type VocabEntry,
  type GreekLetter,
  type Realia,
  type Aphorism,
} from '../greek'
import { Card } from './Card'
import { GreekKeypad } from './GreekKeypad'
import { audio } from '../audio'
import type { Grade } from '../srs'

/**
 * Prompts de ejercicio COMPARTIDOS (audio-first). Viven en `core/ui` porque los
 * usan varias features (Entrenar, Hoy…) y el contrato prohíbe que dependan
 * entre sí. Todos son presentacionales: la lógica de SRS/XP vive en quien los
 * monta y se califica con `onGrade` (o se avanza con `onContinue`).
 */

/** Reconocer una palabra: la OYES y la ves, recuerdas el sentido, te autocalificas. */
export function VocabRecallPrompt({
  entry,
  onGrade,
}: {
  entry: VocabEntry
  onGrade: (g: Grade) => void
}) {
  const [revealed, setRevealed] = useState(false)
  // Oído como estímulo: la palabra suena al aparecer (respeta el silenciador).
  useEffect(() => {
    void audio.pronounceWord(entry.id)
  }, [entry.id])
  return (
    <>
      <Card>
        <p className="alfabeto__prompt">¿Qué significa?</p>
        <p className="answer__name" lang="grc">
          {entry.lemma}
        </p>
        <button
          type="button"
          className="btn btn--ghost"
          onClick={() => void audio.pronounceWord(entry.id, { force: true })}
        >
          🔊 Oír
        </button>
      </Card>
      {!revealed ? (
        <button className="btn btn--primary" onClick={() => setRevealed(true)}>
          Mostrar
        </button>
      ) : (
        <>
          <Card>
            <p className="answer__name">{entry.gloss}</p>
            <p className="answer__line">
              <strong>{entry.pos}</strong> · {entry.pron ?? wordPron(entry.lemma)}
            </p>
          </Card>
          <div className="grade">
            <button className="btn btn--again" onClick={() => onGrade('again')}>
              No lo recordé
            </button>
            <button className="btn btn--good" onClick={() => onGrade('good')}>
              Lo recordé
            </button>
          </div>
        </>
      )}
    </>
  )
}

/** Reconocer una letra: ves el glifo, recuerdas nombre y sonido. */
export function LetterRecallPrompt({
  letter,
  onGrade,
}: {
  letter: GreekLetter
  onGrade: (g: Grade) => void
}) {
  const [revealed, setRevealed] = useState(false)
  useEffect(() => {
    if (revealed) void audio.pronounce(letter, 'sound')
  }, [revealed, letter])
  return (
    <>
      <div className="glyph">
        <span className="glyph__lower">{letter.lower}</span>
        <span className="glyph__upper">{letter.upper}</span>
      </div>
      {!revealed ? (
        <>
          <p className="alfabeto__prompt">¿Cómo se llama y cómo suena?</p>
          <button className="btn btn--primary" onClick={() => setRevealed(true)}>
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
            <button className="btn btn--again" onClick={() => onGrade('again')}>
              No la recordé
            </button>
            <button className="btn btn--good" onClick={() => onGrade('good')}>
              La recordé
            </button>
          </div>
        </>
      )}
    </>
  )
}

/** Escribir una palabra: te damos el sentido y la tecleas en griego. */
export function VocabTypePrompt({
  entry,
  onGrade,
}: {
  entry: VocabEntry
  onGrade: (g: Grade) => void
}) {
  const [typed, setTyped] = useState('')
  const [correct, setCorrect] = useState<boolean | null>(null)
  const accepted = useMemo(() => {
    const parts = entry.lemma.split(/[,/]/).map((p) => normalizeGreek(p))
    return new Set(parts.filter(Boolean))
  }, [entry])
  const answered = correct !== null
  return (
    <>
      <Card>
        <p className="alfabeto__prompt">Escribe en griego:</p>
        <p className="answer__name">{entry.gloss}</p>
        <p className="answer__line">
          <strong>{entry.pos}</strong>
        </p>
      </Card>
      <div className="typed" aria-live="polite">
        {typed || ' '}
      </div>
      {!answered ? (
        <>
          <GreekKeypad
            onInput={(l) => setTyped((t) => t + l)}
            onBackspace={() => setTyped((t) => t.slice(0, -1))}
          />
          <button
            className="btn btn--primary"
            disabled={typed.length === 0}
            onClick={() => setCorrect(accepted.has(normalizeGreek(typed)))}
          >
            Comprobar
          </button>
        </>
      ) : (
        <>
          <Card
            className={
              correct ? 'feedback feedback--correct' : 'feedback feedback--wrong'
            }
          >
            <p className="answer__name">{correct ? '✓ ¡Correcto!' : '✗ Casi'}</p>
            <p className="answer__line">
              Respuesta: <strong lang="grc">{entry.lemma}</strong> —{' '}
              {entry.gloss}
            </p>
          </Card>
          <button
            className="btn btn--primary"
            onClick={() => onGrade(correct ? 'good' : 'again')}
          >
            Siguiente
          </button>
        </>
      )}
    </>
  )
}

/** Dictado (transcripción): OYES la palabra y la escribes en griego. */
export function VocabDictadoPrompt({
  entry,
  onGrade,
}: {
  entry: VocabEntry
  onGrade: (g: Grade) => void
}) {
  const [typed, setTyped] = useState('')
  const [correct, setCorrect] = useState<boolean | null>(null)
  // El sonido ES el ejercicio: suena siempre (aunque el auto-audio esté off).
  useEffect(() => {
    void audio.pronounceWord(entry.id, { force: true })
  }, [entry.id])
  const accepted = useMemo(() => {
    const parts = entry.lemma.split(/[,/]/).map((p) => normalizeGreek(p))
    return new Set(parts.filter(Boolean))
  }, [entry])
  const answered = correct !== null
  return (
    <>
      <Card>
        <p className="alfabeto__prompt">Escribe lo que oyes:</p>
        <button
          type="button"
          className="btn btn--ghost"
          onClick={() => void audio.pronounceWord(entry.id, { force: true })}
        >
          🔊 Oír de nuevo
        </button>
      </Card>
      <div className="typed" aria-live="polite">
        {typed || ' '}
      </div>
      {!answered ? (
        <>
          <GreekKeypad
            onInput={(l) => setTyped((t) => t + l)}
            onBackspace={() => setTyped((t) => t.slice(0, -1))}
          />
          <button
            className="btn btn--primary"
            disabled={typed.length === 0}
            onClick={() => setCorrect(accepted.has(normalizeGreek(typed)))}
          >
            Comprobar
          </button>
        </>
      ) : (
        <>
          <Card
            className={
              correct ? 'feedback feedback--correct' : 'feedback feedback--wrong'
            }
          >
            <p className="answer__name">{correct ? '✓ ¡Correcto!' : '✗ Casi'}</p>
            <p className="answer__line">
              Era: <strong lang="grc">{entry.lemma}</strong> — {entry.gloss}
            </p>
          </Card>
          <button
            className="btn btn--primary"
            onClick={() => onGrade(correct ? 'good' : 'again')}
          >
            Siguiente
          </button>
        </>
      )}
    </>
  )
}

/** Drill de morfología: escribe la forma pedida (conjugar/declinar). */
export function MorphPrompt({
  morph,
  onGrade,
}: {
  morph: { headword: string; gloss: string; prompt: string; answer: string }
  onGrade: (g: Grade) => void
}) {
  const [typed, setTyped] = useState('')
  const [correct, setCorrect] = useState<boolean | null>(null)
  const answered = correct !== null
  return (
    <>
      <Card>
        <p className="alfabeto__prompt">Escribe la forma:</p>
        <p className="answer__name" lang="grc">
          {morph.headword}{' '}
          <span className="verb__gloss">— {morph.gloss}</span>
        </p>
        <p className="answer__line">
          <strong>{morph.prompt}</strong>
        </p>
      </Card>
      <div className="typed" aria-live="polite">
        {typed || ' '}
      </div>
      {!answered ? (
        <>
          <GreekKeypad
            onInput={(l) => setTyped((t) => t + l)}
            onBackspace={() => setTyped((t) => t.slice(0, -1))}
          />
          <button
            className="btn btn--primary"
            disabled={typed.length === 0}
            onClick={() =>
              setCorrect(normalizeGreek(typed) === normalizeGreek(morph.answer))
            }
          >
            Comprobar
          </button>
        </>
      ) : (
        <>
          <Card
            className={
              correct ? 'feedback feedback--correct' : 'feedback feedback--wrong'
            }
          >
            <p className="answer__name">{correct ? '✓ ¡Correcto!' : '✗ Casi'}</p>
            <p className="answer__line">
              Respuesta: <strong lang="grc">{morph.answer}</strong>
            </p>
          </Card>
          <button
            className="btn btn--primary"
            onClick={() => onGrade(correct ? 'good' : 'again')}
          >
            Siguiente
          </button>
        </>
      )}
    </>
  )
}

/** Respiro de museo: una pieza real para mirar, sin nota. Rompe la rutina. */
export function MuseoBreatherCard({
  realia,
  onContinue,
}: {
  realia: Realia
  onContinue: () => void
}) {
  return (
    <>
      <Card title={`🏺 Un respiro · ${realia.title}`}>
        <p className="entrenar-museo__greek" lang="grc">
          {realia.greek}
        </p>
        <p className="entrenar-museo__translation">«{realia.translation}»</p>
        <p className="answer__line">
          <strong>{realia.tipo}</strong> · {realia.fecha} · {realia.origen}
        </p>
      </Card>
      <button className="btn btn--primary" onClick={onContinue}>
        Seguir
      </button>
    </>
  )
}

/**
 * Paso OÍR: presentación de una letra nueva. Suena su sonido al aparecer (el
 * sonido es el objetivo de aprendizaje) y se puede oír también su nombre.
 */
export function IntroLetter({
  letter,
  onContinue,
}: {
  letter: GreekLetter
  onContinue: () => void
}) {
  useEffect(() => {
    void audio.pronounce(letter, 'sound', { force: true })
  }, [letter])
  return (
    <>
      <p className="alfabeto__prompt">Letra nueva</p>
      <div className="glyph">
        <span className="glyph__lower">{letter.lower}</span>
        <span className="glyph__upper">{letter.upper}</span>
      </div>
      <Card>
        <p className="answer__name">{letter.name}</p>
        <p className="answer__line">
          Translit.: <strong>{letter.translit}</strong> · AFI:{' '}
          <strong>{letter.ipa}</strong>
        </p>
        <p className="answer__sound">{letter.sound}</p>
        <button
          type="button"
          className="btn btn--ghost"
          onClick={() => void audio.pronounce(letter, 'sound', { force: true })}
        >
          🔊 Sonido
        </button>
        <button
          type="button"
          className="btn btn--ghost"
          onClick={() => void audio.pronounce(letter, 'name', { force: true })}
        >
          🔊 Nombre
        </button>
      </Card>
      <button className="btn btn--primary" onClick={onContinue}>
        Seguir
      </button>
    </>
  )
}

/** Paso OÍR: presentación de una palabra nueva (suena al aparecer). */
export function IntroVocab({
  entry,
  onContinue,
}: {
  entry: VocabEntry
  onContinue: () => void
}) {
  useEffect(() => {
    void audio.pronounceWord(entry.id, { force: true })
  }, [entry.id])
  return (
    <>
      <p className="alfabeto__prompt">Palabra nueva</p>
      <Card>
        <p className="answer__name" lang="grc">
          {entry.lemma}
        </p>
        <p className="answer__line">
          <strong>{entry.gloss}</strong>
        </p>
        <p className="answer__line">
          {entry.pos} · suena: {entry.pron ?? wordPron(entry.lemma)}
        </p>
        {entry.derivados && entry.derivados.length > 0 ? (
          <p className="answer__line">
            En español: {entry.derivados.join(', ')}
          </p>
        ) : null}
        <button
          type="button"
          className="btn btn--ghost"
          onClick={() => void audio.pronounceWord(entry.id, { force: true })}
        >
          🔊 Oír de nuevo
        </button>
      </Card>
      <button className="btn btn--primary" onClick={onContinue}>
        Seguir
      </button>
    </>
  )
}

/**
 * Paso DECIR (shadowing): óyelo y repítelo EN VOZ ALTA imitando a la voz.
 * Autoevaluación honesta, sin nota ni puntuación falsa (no hay reconocimiento
 * de voz para ático): «Otra vez» vuelve a sonar; «Me salió» avanza.
 */
export function DecirPrompt({
  text,
  onPlay,
  onContinue,
}: {
  text: string
  /** Reproduce el clip modelo (se llama también al montar). */
  onPlay: () => void
  onContinue: () => void
}) {
  useEffect(() => {
    onPlay()
    // Solo al montar: cada paso DECIR se monta con key propia.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <p className="alfabeto__prompt">Escúchalo y dilo EN VOZ ALTA 🗣️</p>
      <Card>
        <p className="answer__name" lang="grc">
          {text}
        </p>
        <p className="aphorism__pron">{sentencePron(text)}</p>
        <p className="answer__line">
          Imita el sonido y la melodía. Repítelo las veces que quieras.
        </p>
      </Card>
      <div className="grade">
        <button className="btn" onClick={onPlay}>
          🔊 Otra vez
        </button>
        <button className="btn btn--good" onClick={onContinue}>
          Me salió 💪
        </button>
      </div>
    </>
  )
}

/** Paso OÍR: un aforismo entero — se oye, se ve y se entiende. */
export function IntroAphorism({
  aphorism,
  onContinue,
}: {
  aphorism: Aphorism
  onContinue: () => void
}) {
  useEffect(() => {
    void audio.pronounceAphorism(aphorism.id, { force: true })
  }, [aphorism.id])
  return (
    <>
      <p className="alfabeto__prompt">Escucha y lee</p>
      <Card>
        <p className="aphorism__greek" lang="grc">
          {aphorism.greek}
        </p>
        <p className="aphorism__pron">{sentencePron(aphorism.greek)}</p>
        <p className="entrenar-museo__translation">«{aphorism.translation}»</p>
        <p className="answer__line">{aphorism.source}</p>
        <button
          type="button"
          className="btn btn--ghost"
          onClick={() =>
            void audio.pronounceAphorism(aphorism.id, { force: true })
          }
        >
          🔊 Oír de nuevo
        </button>
      </Card>
      <button className="btn btn--primary" onClick={onContinue}>
        Seguir
      </button>
    </>
  )
}
