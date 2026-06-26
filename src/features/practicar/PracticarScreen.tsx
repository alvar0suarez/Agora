import { Card } from '../../core/ui/Card'
import { useNavigate } from '../../core/ui/navigation'

/** Áreas de estudio enfocado, agrupadas aquí para aligerar la barra. */
const AREAS: { id: string; icon: string; title: string; hint: string }[] = [
  { id: 'alfabeto', icon: '🔠', title: 'Alfabeto', hint: 'Leer y escribir las letras griegas' },
  { id: 'vocabulario', icon: '📚', title: 'Vocabulario', hint: 'El léxico núcleo, en varias direcciones' },
  { id: 'lectura', icon: '📜', title: 'Lectura', hint: 'Aforismos: recordar, completar, construir' },
  { id: 'gramatica', icon: '🏛️', title: 'Gramática', hint: 'Conjugar y declinar formas' },
  { id: 'teoria', icon: '📖', title: 'Teoría', hint: 'Cómo funciona el griego, explicado' },
  { id: 'etimologia', icon: '🌳', title: 'Raíces', hint: 'Las palabras griegas en el español' },
]

/**
 * Practicar: un hub que reúne las áreas de estudio enfocado. La forma principal
 * de practicar es «Entrenar» (mezcla todo); aquí entras cuando quieres trabajar
 * UN área concreta. Existe para que la barra inferior quede simple.
 */
export function PracticarScreen() {
  const { goTo } = useNavigate()
  return (
    <div className="modes">
      <Card title="Practicar">
        <p>
          Para una sesión variada usa <strong>Entrenar</strong>. Aquí entras a
          trabajar un área concreta:
        </p>
      </Card>
      {AREAS.map((a) => (
        <button
          key={a.id}
          className="btn mode-btn"
          onClick={() => goTo(a.id)}
        >
          <span className="mode-btn__title">
            {a.icon} {a.title}
          </span>
          <span className="mode-btn__hint">{a.hint}</span>
        </button>
      ))}
    </div>
  )
}
