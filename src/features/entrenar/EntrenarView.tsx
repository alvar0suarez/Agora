import { SessionHeader } from '../../core/ui/SessionHeader'
import { ClozePrompt } from '../../core/ui/ClozePrompt'
import { BuildPrompt } from '../../core/ui/BuildPrompt'
import {
  VocabRecallPrompt,
  VocabTypePrompt,
  VocabDictadoPrompt,
  LetterRecallPrompt,
  MuseoBreatherCard,
} from '../../core/ui/prompts'
import { useEntrenar } from './useEntrenar'
import { EntrenarSummary } from './EntrenarSummary'

/**
 * «Entrenar»: la sesión mixta libre. Intercala reconocer (con voz), dictado,
 * escribir, letras, huecos, construir y algún respiro de museo en una sola
 * tarjeta común, con SRS/XP/logros compartidos. Los prompts viven en `core/ui`
 * (compartidos con «Hoy»).
 */
export function EntrenarView({ onExit }: { onExit: () => void }) {
  const s = useEntrenar()

  if (s.loading) return <p className="empty">Preparando tu sesión…</p>
  if (s.done) {
    return (
      <EntrenarSummary stats={s.stats} onRestart={s.restart} onExit={onExit} />
    )
  }

  const item = s.current
  if (!item) return null

  // Key estable por carta (el museo no tiene clave SRS) → estado limpio al pasar.
  const itemKey =
    item.type === 'museo' ? `museo:${item.realia.id}` : item.srsKey

  return (
    <div className="alfabeto">
      <SessionHeader
        onExit={onExit}
        label="Entrenar"
        remaining={s.remaining}
        total={s.total}
      />
      {/* key por carta → cada ejercicio arranca con su estado limpio */}
      <div key={itemKey}>
        {item.type === 'vocab-rec' && (
          <VocabRecallPrompt entry={item.entry} onGrade={s.grade} />
        )}
        {item.type === 'vocab-type' && (
          <VocabTypePrompt entry={item.entry} onGrade={s.grade} />
        )}
        {item.type === 'vocab-dictado' && (
          <VocabDictadoPrompt entry={item.entry} onGrade={s.grade} />
        )}
        {item.type === 'letter-rec' && (
          <LetterRecallPrompt letter={item.letter} onGrade={s.grade} />
        )}
        {item.type === 'cloze' && (
          <ClozePrompt item={item.cloze} onGrade={s.grade} />
        )}
        {item.type === 'build' && (
          <BuildPrompt item={item.build} onGrade={s.grade} />
        )}
        {item.type === 'museo' && (
          <MuseoBreatherCard realia={item.realia} onContinue={s.advance} />
        )}
      </div>
    </div>
  )
}
