#!/usr/bin/env node
/**
 * Generador de clips de voz del VOCABULARIO (en build-time).
 *
 * Por defecto usa **eSpeak-NG local** (paquete `espeak-ng`, WASM en Node): 100%
 * OFFLINE, gratis, sin internet ni claves. Igual que el generador de letras, NO
 * le damos texto griego (la voz `grc` es erasmiana y enseña mal φ θ χ ζ): le
 * damos los FONEMAS reconstruidos (`phon`, notación `[[...]]`) de
 * `scripts/vocab-pron.json`. Voz robótica pero con pronunciación ÁTICA correcta.
 *
 * Salida: un `.wav` por palabra en `public/audio/vocab/<id>.wav`. Se commitean
 * (tuyos, archivados, offline). Este script NO corre en el build de la app.
 *
 * Uso (local, sin internet):
 *   node scripts/gen-vocab-audio.mjs
 *
 * Notación de fonemas (ver scripts/gen-letter-audio.mjs):
 *   aspiradas φ θ χ → p_#  t_#  k_#   ·   ζ → zd   ·   ρ → R (trino)
 *   η → E:   ω → O:   (vocales largas)
 *
 * — Alternativa de MÁS calidad (opcional, usa internet al generar) —
 * Backend neural Azure con el campo `ipa` por SSML <phoneme>:
 *   BACKEND=azure AZURE_TTS_KEY=xxx AZURE_TTS_REGION=westeurope node scripts/gen-vocab-audio.mjs
 */
import { readFile, mkdir, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')
const outDir = join(root, 'public', 'audio', 'vocab')
const BACKEND = process.env.BACKEND || 'espeak'
const WPM = '130' // lento y claro, para aprender

const pron = JSON.parse(await readFile(join(here, 'vocab-pron.json'), 'utf8'))
await mkdir(outDir, { recursive: true })

const escapeXml = (s) =>
  s.replace(/[<>&'"]/g, (c) =>
    ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[c],
  )

/** eSpeak-NG local (WASM): fonemas reconstruidos → WAV. Offline. */
async function synthEspeak(entry) {
  const { default: ESpeakNg } = await import('espeak-ng')
  const out = 'clip.wav'
  const espeak = await ESpeakNg({
    arguments: ['-s', WPM, '-w', out, `[[${entry.phon}]]`],
  })
  return Buffer.from(espeak.FS.readFile(out))
}

/** Azure Speech (neural) con IPA por SSML. Usa internet al generar. */
async function synthAzure(entry) {
  const KEY = process.env.AZURE_TTS_KEY
  const REGION = process.env.AZURE_TTS_REGION
  const VOICE = process.env.AZURE_TTS_VOICE || 'el-GR-AthinaNeural'
  if (!KEY || !REGION) throw new Error('Faltan AZURE_TTS_KEY / AZURE_TTS_REGION')
  const ssml =
    `<speak version="1.0" xml:lang="el-GR"><voice name="${VOICE}">` +
    `<phoneme alphabet="ipa" ph="${escapeXml(entry.ipa)}">${escapeXml(entry.lemma)}</phoneme>` +
    `</voice></speak>`
  const res = await fetch(
    `https://${REGION}.tts.speech.microsoft.com/cognitiveservices/v1`,
    {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': KEY,
        'Content-Type': 'application/ssml+xml',
        'X-Microsoft-OutputFormat': 'riff-24khz-16bit-mono-pcm',
        'User-Agent': 'agora-vocab-audio',
      },
      body: ssml,
    },
  )
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`)
  return Buffer.from(await res.arrayBuffer())
}

const synth = BACKEND === 'azure' ? synthAzure : synthEspeak

let ok = 0
for (const [id, entry] of Object.entries(pron)) {
  try {
    const wav = await synth(entry)
    await writeFile(join(outDir, `${id}.wav`), wav)
    console.log(`✓ ${id.padEnd(10)} ${entry.lemma.padEnd(10)} ${wav.length} B`)
    ok++
  } catch (err) {
    console.error(`✗ ${id}: ${err.message}`)
    process.exitCode = 1
  }
}
console.log(`\n[${BACKEND}] ${ok}/${Object.keys(pron).length} clips en public/audio/vocab/`)
