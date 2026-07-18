#!/usr/bin/env node
/**
 * Vuelca a stdout (JSON) las muestras de voz con su IPA por palabra, usando el
 * G2P del core (una sola fuente de verdad). Lo consume gen-piper-samples.py:
 *   node scripts/dump-sample-ipa.mjs | python3 scripts/gen-piper-samples.py
 */
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { rm } from 'node:fs/promises'
import { build } from 'esbuild'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

/** Muestras: palabras clave + frases (prueban entonación) + mini-diálogo. */
export const SAMPLES = [
  { id: 'logos', text: 'λόγος', old: '../vocab/logos.wav' },
  { id: 'psyche', text: 'ψυχή' },
  { id: 'anthropos', text: 'ἄνθρωπος', old: '../vocab/anthropos.wav' },
  { id: 'panta-rhei', text: 'πάντα ῥεῖ', old: '../aphorisms/panta-rhei.wav' },
  { id: 'gnothi', text: 'γνῶθι σεαυτόν', old: '../aphorisms/gnothi-seauton.wav' },
  { id: 'bios', text: 'ὁ βίος βραχύς, ἡ δὲ τέχνη μακρή' },
  {
    id: 'dialogo',
    text: 'τί ἐστιν ἀρετή; ἡ ἀρετὴ ἐπιστήμη ἐστίν. πῶς λέγεις;',
  },
]

const bundle = join(root, 'node_modules', '.g2p-bundle.mjs')
await build({
  entryPoints: [join(root, 'src', 'core', 'greek', 'g2p.ts')],
  bundle: true,
  format: 'esm',
  outfile: bundle,
  logLevel: 'silent',
})
const { textToIpa } = await import(bundle)
await rm(bundle, { force: true })

const out = SAMPLES.map((s) => ({
  ...s,
  tokens: textToIpa(s.text),
}))
process.stdout.write(JSON.stringify(out, null, 1))
