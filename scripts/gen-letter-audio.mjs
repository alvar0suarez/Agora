/**
 * Genera los clips de audio del alfabeto (el SONIDO de cada letra) usando
 * eSpeak-NG en build-time. NO se ejecuta en la app ni en el build de la PWA:
 * es una herramienta de desarrollo. Los .wav resultantes se commitean en
 * `public/audio/letters/` y son lo único que embarca la app (offline, ligero).
 *
 * Punto CLAVE del proyecto: la voz `grc` de eSpeak usa la pronunciación
 * académica (erasmiana) y enseña MAL φ θ χ ζ. Por eso NO le damos texto griego:
 * le damos los FONEMAS correctos de la reconstrucción ática (Vox Graeca),
 * verificados contra `src/core/greek/letters.ts`. eSpeak es solo el sintetizador.
 *
 * Notación de fonemas (entrada `[[...]]` de eSpeak):
 *  - Aspiradas φ θ χ → `p_#` `t_#` `k_#` (la `#` tras el separador `_` añade el
 *    soplo: [pʰ tʰ kʰ]), NO las fricativas f/θ/x del griego moderno/erasmiano.
 *  - ζ → `zd` ([zd], ático clásico), no [z].
 *  - ρ → `R` (vibrante/trino [r]), no la aproximante inglesa [ɹ].
 *  - Las consonantes llevan una `a` de apoyo para que el sonido (y el soplo de
 *    las aspiradas) sea audible. Las vocales van solas, con su duración.
 *  - υ es la excepción: el token de la vocal [y] no está expuesto vía `[[...]]`
 *    en este build, pero la voz `grc` SÍ vocaliza el glifo «υ» como [y]; se usa
 *    esa vía solo para esta letra.
 *
 * Uso:  node scripts/gen-letter-audio.mjs
 */
import { mkdir, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import ESpeakNg from 'espeak-ng'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT_DIR = join(ROOT, 'public', 'audio', 'letters')

/**
 * Cómo se sintetiza el SONIDO de cada letra. `phon` = fonemas `[[...]]`;
 * `grcGlyph` = glifo vocalizado con la voz grc (solo upsilon).
 */
const SOUNDS = {
  alpha: { phon: 'a' },
  beta: { phon: 'ba' },
  gamma: { phon: 'ga' },
  delta: { phon: 'da' },
  epsilon: { phon: 'e' },
  zeta: { phon: 'zda' },
  eta: { phon: 'E:' },
  theta: { phon: 't_#a' },
  iota: { phon: 'i' },
  kappa: { phon: 'ka' },
  lambda: { phon: 'la' },
  mu: { phon: 'ma' },
  nu: { phon: 'na' },
  xi: { phon: 'ksa' },
  omicron: { phon: 'o' },
  pi: { phon: 'pa' },
  rho: { phon: 'Ra' },
  sigma: { phon: 'sa' },
  tau: { phon: 'ta' },
  upsilon: { grcGlyph: 'υ' },
  phi: { phon: 'p_#a' },
  chi: { phon: 'k_#a' },
  psi: { phon: 'psa' },
  omega: { phon: 'O:' },
}

/** Velocidad lenta y clara, pensada para aprender (palabras por minuto). */
const WPM = '130'

async function synth(spec) {
  const out = 'clip.wav'
  const args = spec.grcGlyph
    ? ['-v', 'grc', '-s', WPM, '-w', out, spec.grcGlyph]
    : ['-s', WPM, '-w', out, `[[${spec.phon}]]`]
  const espeak = await ESpeakNg({ arguments: args })
  return espeak.FS.readFile(out) // Uint8Array con el WAV
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true })
  let total = 0
  for (const [id, spec] of Object.entries(SOUNDS)) {
    const wav = await synth(spec)
    await writeFile(join(OUT_DIR, `${id}.wav`), wav)
    total += wav.length
    console.log(`${id.padEnd(9)} ${String(wav.length).padStart(6)} B  ${spec.phon ? `[[${spec.phon}]]` : `grc:${spec.grcGlyph}`}`)
  }
  console.log(`\n${Object.keys(SOUNDS).length} clips · ${(total / 1024).toFixed(0)} KiB en total`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
