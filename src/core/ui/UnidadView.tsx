import { SessionHeader } from './SessionHeader'
import { LessonReader } from './LessonReader'
import { ClozePrompt } from './ClozePrompt'
import { BuildPrompt } from './BuildPrompt'
import {
  IntroLetter,
  IntroVocab,
  IntroAphorism,
  DecirPrompt,
  VocabRecallPrompt,
  VocabTypePrompt,
  VocabDictadoPrompt,
  LetterRecallPrompt,
  MuseoBreatherCard,
} from './prompts'
import { audio } from '../audio'
import { UnlockedBadges } from './UnlockedBadges'
import { Card } from './Card'
import { levelFromXp } from '../progress'
import type { Unit, Step } from '../curso'
import { useUnidad } from '../curso/useUnidad'

/** Key estable de un paso (para montar cada uno con estado limpio). */
function stepKey(step: Step): string {
  switch (step.kind) {
    case 'ejercicio':
      return step.item.srsKey
    case 'intro-letter':
      return `il:${step.letter.id}`
    case 'intro-vocab':
      return `iv:${step.entry.id}`
    case 'intro-aforismo':
      return `ia:${step.aphorism.id}`
    case 'teoria':
      return `t:${step.lesson.id}`
    case 'decir':
      return `d:${step.play}:${step.playId}`
    case 'museo':
      return `m:${step.realia.id}`
  }
}

/**
 * Corre una UNIDAD del camino: cabecera con progreso, cada paso con su prompt
 * compartido y, al terminar, el resumen (XP/racha/nivel/logros) con «Seguir».
 */
export function UnidadView({
  unit,
  onFinish,
  onExit,
}: {
  unit: Unit
  /** La unidad se ha completado (todos los pasos hechos). */
  onFinish: () => void
  onExit: () => void
}) {
  const s = useUnidad(unit)

  if (s.loading) return <p className="empty">Preparando la unidad…</p>

  if (s.done) {
    const { reviewed, recalled, xpGained, totalXp, streakDays, newAchievements } =
      s.stats
    const lvl = levelFromXp(totalXp)
    return (
      <Card title="¡Unidad completada! 🎉">
        {reviewed > 0 ? (
          <p>
            Ejercicios: <strong>{reviewed}</strong> · Acertados:{' '}
            <strong>{recalled}</strong> · XP: <strong>+{xpGained}</strong>
          </p>
        ) : null}
        <p className="level__head">
          Nivel <strong>{lvl.level}</strong> · Lectura <strong>{lvl.band}</strong>
          {streakDays > 0 && (
            <>
              {' '}
              · Racha: <strong>🔥 {streakDays}</strong>
            </>
          )}
        </p>
        <UnlockedBadges items={newAchievements} />
        <div className="grade">
          <button className="btn btn--primary" onClick={onFinish}>
            Seguir
          </button>
        </div>
      </Card>
    )
  }

  const step = s.current
  if (!step) return null

  return (
    <div className="alfabeto">
      <SessionHeader
        onExit={onExit}
        label={unit.title}
        remaining={s.remaining}
        total={s.total}
      />
      <div key={stepKey(step)}>
        {step.kind === 'intro-letter' && (
          <IntroLetter letter={step.letter} onContinue={s.advance} />
        )}
        {step.kind === 'intro-vocab' && (
          <IntroVocab entry={step.entry} onContinue={s.advance} />
        )}
        {step.kind === 'intro-aforismo' && (
          <IntroAphorism aphorism={step.aphorism} onContinue={s.advance} />
        )}
        {step.kind === 'teoria' && (
          <LessonReader lesson={step.lesson} onExit={s.advance} />
        )}
        {step.kind === 'decir' && (
          <DecirPrompt
            text={step.text}
            onPlay={() =>
              step.play === 'word'
                ? void audio.pronounceWord(step.playId, { force: true })
                : void audio.pronounceAphorism(step.playId, { force: true })
            }
            onContinue={s.advance}
          />
        )}
        {step.kind === 'museo' && (
          <MuseoBreatherCard realia={step.realia} onContinue={s.advance} />
        )}
        {step.kind === 'ejercicio' && step.item.type === 'vocab-rec' && (
          <VocabRecallPrompt entry={step.item.entry} onGrade={s.grade} />
        )}
        {step.kind === 'ejercicio' && step.item.type === 'vocab-type' && (
          <VocabTypePrompt entry={step.item.entry} onGrade={s.grade} />
        )}
        {step.kind === 'ejercicio' && step.item.type === 'vocab-dictado' && (
          <VocabDictadoPrompt entry={step.item.entry} onGrade={s.grade} />
        )}
        {step.kind === 'ejercicio' && step.item.type === 'letter-rec' && (
          <LetterRecallPrompt letter={step.item.letter} onGrade={s.grade} />
        )}
        {step.kind === 'ejercicio' && step.item.type === 'cloze' && (
          <ClozePrompt item={step.item.cloze} onGrade={s.grade} />
        )}
        {step.kind === 'ejercicio' && step.item.type === 'build' && (
          <BuildPrompt item={step.item.build} onGrade={s.grade} />
        )}
      </div>
    </div>
  )
}
