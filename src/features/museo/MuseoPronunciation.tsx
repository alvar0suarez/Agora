import { spellOut, type GreekLetter } from '../../core/greek'

/**
 * Letras cuya pronunciación reconstruida ática SORPRENDE a un hispanohablante
 * (aspiradas, vocales largas, sonidos raros): para ellas mostramos la pista en
 * lenguaje llano. El resto se entienden con su AFI. No es dato del núcleo: es
 * una decisión de presentación de este feature.
 */
const SURPRISING = new Set([
  'theta',
  'phi',
  'chi',
  'zeta',
  'upsilon',
  'eta',
  'omega',
  'rho',
  'gamma',
])

/** AFI principal de una letra (el primero, sin la variante larga). */
const primaryIpa = (l: GreekLetter) => l.ipa.split('·')[0].trim()

/**
 * "Cómo se pronuncia": deletrea la leyenda en sus letras y muestra, para cada
 * una, su sonido reconstruido (AFI) reutilizando la fonética curada del
 * alfabeto. Debajo, un aviso solo de las letras que no suenan como uno
 * esperaría (p. ej. Θ = «t» aspirada, no «z»). Pronunciación ática
 * reconstruida (Vox Graeca).
 */
export function MuseoPronunciation({ text }: { text: string }) {
  const letters = spellOut(text)
  if (letters.length === 0) return null

  // Letras distintivas presentes, sin repetir, en orden de aparición.
  const seen = new Set<string>()
  const ojo = letters.filter((l) => {
    if (!SURPRISING.has(l.id) || seen.has(l.id)) return false
    seen.add(l.id)
    return true
  })

  return (
    <section className="museo__pron">
      <h3 className="museo__pron-title">Cómo se pronuncia</h3>
      <ul className="museo__pron-letters">
        {letters.map((l, i) => (
          <li key={i} className="museo__pron-chip">
            <span className="museo__pron-glyph">{l.upper}</span>
            <span className="museo__pron-ipa">{primaryIpa(l)}</span>
          </li>
        ))}
      </ul>
      {ojo.length > 0 ? (
        <ul className="museo__pron-notes">
          {ojo.map((l) => (
            <li key={l.id} className="museo__pron-note">
              <span className="museo__pron-note-glyph">{l.upper}</span>
              <span className="museo__pron-note-text">{l.sound}</span>
            </li>
          ))}
        </ul>
      ) : null}
      <p className="museo__pron-foot">Pronunciación ática reconstruida (Vox Graeca).</p>
    </section>
  )
}
