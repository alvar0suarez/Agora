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
 * "Cómo se pronuncia": deletrea la leyenda (RESPETANDO las palabras) y muestra,
 * por letra, su sonido reconstruido (AFI) reutilizando la fonética curada del
 * alfabeto. Debajo, un aviso solo de las letras que no suenan como uno esperaría
 * (p. ej. Θ = «t» aspirada, no «z»). Pronunciación ática reconstruida (Vox
 * Graeca). Pensado para ir DENTRO de la tarjeta de la pieza (sin caja propia).
 */
export function MuseoPronunciation({ text }: { text: string }) {
  // Una lista de letras por palabra, para no mezclar palabras en una fila.
  const words = text
    .trim()
    .split(/\s+/)
    .map((w) => spellOut(w))
    .filter((ls) => ls.length > 0)
  const letters = words.flat()
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
      <div className="museo__pron-words">
        {words.map((ls, wi) => (
          <ul key={wi} className="museo__pron-letters">
            {ls.map((l, i) => (
              <li key={i} className="museo__pron-chip">
                <span className="museo__pron-glyph">{l.upper}</span>
                <span className="museo__pron-ipa">{primaryIpa(l)}</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
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
