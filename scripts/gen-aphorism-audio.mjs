#!/usr/bin/env node
/**
 * Genera audio de los AFORISMOS (frases) con eSpeak-NG local (offline, gratis,
 * sin claves). Como en letras/vocabulario, no le damos texto griego: le damos
 * los FONEMAS reconstruidos de `scripts/aphorism-pron.json` (notación `[[...]]`,
 * palabras separadas por espacio). Voz robótica, pronunciación ática correcta.
 *
 * Salida: `public/audio/aphorisms/<id>.wav` (commiteados, offline).
 * Uso:  node scripts/gen-aphorism-audio.mjs
 */
import { readFile, mkdir, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const outDir = join(here, '..', 'public', 'audio', 'aphorisms')
const WPM = '130'

const pron = JSON.parse(
  await readFile(join(here, 'aphorism-pron.json'), 'utf8'),
)
await mkdir(outDir, { recursive: true })

const { default: ESpeakNg } = await import('espeak-ng')

let ok = 0
for (const [id, { greek, phon }] of Object.entries(pron)) {
  const out = 'clip.wav'
  const espeak = await ESpeakNg({
    arguments: ['-s', WPM, '-w', out, `[[${phon}]]`],
  })
  const wav = Buffer.from(espeak.FS.readFile(out))
  await writeFile(join(outDir, `${id}.wav`), wav)
  console.log(`✓ ${id.padEnd(16)} ${greek.padEnd(22)} ${wav.length} B`)
  ok++
}
console.log(`\n${ok}/${Object.keys(pron).length} clips en public/audio/aphorisms/`)
