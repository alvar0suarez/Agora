#!/usr/bin/env node
/**
 * Generador de clips de voz del VOCABULARIO (calidad, en build-time).
 *
 * Lee `scripts/vocab-pron.json` (id → { lemma, ipa }) y produce un `.wav` por
 * palabra en `public/audio/vocab/<id>.wav` con un motor TTS NEURAL al que se le
 * impone la pronunciación RECONSTRUIDA vía fonemas IPA (SSML <phoneme>), no la
 * del griego moderno. Los clips quedan en el repo: son TUYOS, archivados y
 * funcionan offline. Este script NO corre en el build de la app (como el de las
 * letras): se ejecuta a mano cuando hay palabras nuevas y se commitean los .wav.
 *
 * Backend por defecto: Azure Speech (capa gratuita generosa). Necesita:
 *   AZURE_TTS_KEY     clave del recurso Speech
 *   AZURE_TTS_REGION  región, p. ej. 'westeurope'
 *   AZURE_TTS_VOICE   (opcional) voz, por defecto 'el-GR-AthinaNeural'
 *
 * Uso:
 *   AZURE_TTS_KEY=xxx AZURE_TTS_REGION=westeurope node scripts/gen-vocab-audio.mjs
 *
 * (Alternativa equivalente: Amazon Polly, que también acepta <phoneme alphabet="ipa">.)
 */
import { readFile, mkdir, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')
const outDir = join(root, 'public', 'audio', 'vocab')

const KEY = process.env.AZURE_TTS_KEY
const REGION = process.env.AZURE_TTS_REGION
const VOICE = process.env.AZURE_TTS_VOICE || 'el-GR-AthinaNeural'

if (!KEY || !REGION) {
  console.error(
    'Faltan AZURE_TTS_KEY y/o AZURE_TTS_REGION.\n' +
      'Crea un recurso "Speech" en Azure (capa gratuita F0) y exporta la clave y la región.\n' +
      'Detalle en docs/audio.md.',
  )
  process.exit(1)
}

const endpoint = `https://${REGION}.tts.speech.microsoft.com/cognitiveservices/v1`

const escapeXml = (s) =>
  s.replace(/[<>&'"]/g, (c) =>
    ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[c],
  )

const pron = JSON.parse(await readFile(join(here, 'vocab-pron.json'), 'utf8'))
await mkdir(outDir, { recursive: true })

let ok = 0
for (const [id, { lemma, ipa }] of Object.entries(pron)) {
  const ssml =
    `<speak version="1.0" xml:lang="el-GR"><voice name="${VOICE}">` +
    `<phoneme alphabet="ipa" ph="${escapeXml(ipa)}">${escapeXml(lemma)}</phoneme>` +
    `</voice></speak>`

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Ocp-Apim-Subscription-Key': KEY,
      'Content-Type': 'application/ssml+xml',
      'X-Microsoft-OutputFormat': 'riff-24khz-16bit-mono-pcm',
      'User-Agent': 'agora-vocab-audio',
    },
    body: ssml,
  })

  if (!res.ok) {
    console.error(`✗ ${id}: ${res.status} ${await res.text()}`)
    process.exitCode = 1
    continue
  }
  const buf = Buffer.from(await res.arrayBuffer())
  await writeFile(join(outDir, `${id}.wav`), buf)
  console.log(`✓ ${id} (${lemma}) → ${buf.length} B`)
  ok++
}

console.log(`\nHecho: ${ok}/${Object.keys(pron).length} clips en public/audio/vocab/`)
