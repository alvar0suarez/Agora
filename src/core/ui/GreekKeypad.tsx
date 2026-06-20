import { LETTERS } from '../greek'

/** Vibración táctil breve al pulsar (si el dispositivo la soporta). */
function tap() {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    navigator.vibrate(8)
  }
}

/**
 * Teclado griego en pantalla: las 24 letras minúsculas + borrar. Pensado para el
 * móvil, donde no hay teclado griego cómodo. Es controlado: avisa de cada pulsación
 * y de borrar; el estado del texto lo lleva quien lo usa. Reutilizable.
 */
export function GreekKeypad({
  onInput,
  onBackspace,
}: {
  onInput: (letter: string) => void
  onBackspace: () => void
}) {
  return (
    <div className="keypad">
      {LETTERS.map((l) => (
        <button
          key={l.id}
          type="button"
          className="keypad__key"
          onClick={() => {
            tap()
            onInput(l.lower)
          }}
        >
          {l.lower}
        </button>
      ))}
      <button
        type="button"
        className="keypad__key keypad__key--action"
        aria-label="Borrar"
        onClick={() => {
          tap()
          onBackspace()
        }}
      >
        ⌫
      </button>
    </div>
  )
}
