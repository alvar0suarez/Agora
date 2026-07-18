#!/usr/bin/env node
/**
 * Vuelca a stdout (JSON) TODO el contenido con su IPA reconstruido, para que
 * gen-piper-clips.py regenere los clips de la app con voz neuronal:
 *  - letters: el SONIDO de cada letra (consonantes con «a» de apoyo, como los
 *    clips eSpeak originales; vocales solas, largas si toca).
 *  - names: el NOMBRE griego de cada letra (ἄλφα…), vía G2P.
 *  - vocab: los 71+ lemas, vía G2P (múltiples formas → pausas por coma).
 *  - aphorisms: los 15 textos completos, vía G2P.
 *
 * Uso: node scripts/dump-clips-ipa.mjs | python3 scripts/gen-piper-clips.py voices/
 */
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { rm } from 'node:fs/promises'
import { build } from 'esbuild'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

const bundle = join(root, 'node_modules', '.greek-bundle.mjs')
await build({
  entryPoints: [join(root, 'src', 'core', 'greek', 'index.ts')],
  bundle: true,
  format: 'esm',
  outfile: bundle,
  logLevel: 'silent',
})
const { LETTERS, VOCAB, APHORISMS, DIALOGOS, dialogLineId, textToIpa } =
  await import(bundle)
await rm(bundle, { force: true })

/**
 * Sonido de cada letra en IPA, con «a» de apoyo en las consonantes (una
 * consonante aislada no es pronunciable de forma natural). Mismo criterio que
 * los clips eSpeak a los que sustituyen.
 */
const LETTER_SOUND_IPA = {
  alpha: 'a',
  beta: 'ba',
  gamma: 'ɡa',
  delta: 'da',
  epsilon: 'e',
  zeta: 'zda',
  eta: 'ɛː',
  theta: 'tʰa',
  iota: 'i',
  kappa: 'ka',
  lambda: 'la',
  mu: 'ma',
  nu: 'na',
  xi: 'ksa',
  omicron: 'o',
  pi: 'pa',
  rho: 'ra',
  sigma: 'sa',
  tau: 'ta',
  upsilon: 'y',
  phi: 'pʰa',
  chi: 'kʰa',
  psi: 'psa',
  omega: 'ɔː',
}

const missing = LETTERS.filter((l) => !(l.id in LETTER_SOUND_IPA))
if (missing.length > 0) {
  console.error(`Faltan sonidos IPA para: ${missing.map((l) => l.id).join(', ')}`)
  process.exit(1)
}

const out = {
  letters: LETTERS.map((l) => ({ id: l.id, ipa: LETTER_SOUND_IPA[l.id] })),
  names: LETTERS.map((l) => ({ id: l.id, tokens: textToIpa(l.name) })),
  vocab: VOCAB.map((v) => ({ id: v.id, tokens: textToIpa(v.lemma) })),
  aphorisms: APHORISMS.map((a) => ({ id: a.id, tokens: textToIpa(a.greek) })),
  // Cada línea de diálogo (del personaje Y tuyas) tiene su clip.
  dialogos: DIALOGOS.flatMap((d) =>
    d.turnos.map((t, i) => ({
      id: dialogLineId(d.id, i),
      tokens: textToIpa(t.gr),
    })),
  ),
}
process.stdout.write(JSON.stringify(out))
