#!/usr/bin/env node
/**
 * Muestras A/B de VOZ NEURONAL para elegir la voz de Agora (calidad primero).
 *
 * Genera las mismas palabras/frases con varias voces neuronales de Azure,
 * pronunciadas en ático reconstruido vía SSML `<phoneme alphabet="ipa">`. El IPA
 * NO está curado a mano: sale del G2P (`src/core/greek/g2p.ts`), así que esto
 * prueba el pipeline completo texto→IPA→voz que después leerá cualquier frase.
 *
 * Salida: public/audio/samples/<voz>--<id>.wav + un index.html para escucharlas
 * lado a lado (también contra el clip eSpeak actual) desde el móvil:
 *   https://alvar0suarez.github.io/Agora/audio/samples/
 *
 * Uso (necesita clave de Azure Speech; el tier F0 es gratuito):
 *   AZURE_TTS_KEY=xxx AZURE_TTS_REGION=westeurope node scripts/gen-neural-samples.mjs
 * o con .env en la raíz (AZURE_TTS_KEY=…, AZURE_TTS_REGION=…). Nunca al repo.
 *
 * Voces candidatas (override: AZURE_TTS_VOICES=a,b,c):
 *  - el-GR (griego moderno): prosodia griega natural.
 *  - de-DE: el alemán tiene aspiradas [pʰ tʰ kʰ], vocales largas y [y] nativas —
 *    puede rendir la fonología ática mejor que una voz griega moderna.
 */
import { readFile, mkdir, writeFile, rm } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { build } from 'esbuild'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')
const outDir = join(root, 'public', 'audio', 'samples')

// — .env manual (sin dependencia): KEY=VALOR por línea, # comenta. —
try {
  const env = await readFile(join(root, '.env'), 'utf8')
  for (const line of env.split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2]
  }
} catch {
  /* sin .env: se usan las variables de entorno */
}

const KEY = process.env.AZURE_TTS_KEY
const REGION = process.env.AZURE_TTS_REGION
if (!KEY || !REGION) {
  console.log(`Faltan AZURE_TTS_KEY / AZURE_TTS_REGION.

Cómo conseguirlas (gratis):
 1. portal.azure.com → crear recurso "Speech" (tier F0: 500k caracteres/mes gratis).
 2. En el recurso: "Keys and Endpoint" → copia KEY 1 y la región (p. ej. westeurope).
 3. En la raíz del repo crea .env (está gitignoreado):
      AZURE_TTS_KEY=tu-clave
      AZURE_TTS_REGION=westeurope
 4. Vuelve a ejecutar: node scripts/gen-neural-samples.mjs`)
  process.exit(1)
}

const VOICES = (
  process.env.AZURE_TTS_VOICES ||
  'el-GR-AthinaNeural,el-GR-NestorasNeural,de-DE-ConradNeural'
).split(',')

/** Muestras: palabras clave + frases (prueban entonación de frase). */
const SAMPLES = [
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

// — G2P: bundlear el módulo TS del core y usarlo aquí (una sola fuente). —
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

const escapeXml = (s) =>
  s.replace(/[<>&'"]/g, (c) =>
    ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[c],
  )

/** SSML de un texto: cada palabra griega con su IPA; separadores tal cual. */
function toSsml(text, voice) {
  const body = textToIpa(text)
    .map((t) =>
      t.ipa
        ? `<phoneme alphabet="ipa" ph="${escapeXml(t.ipa)}">${escapeXml(t.text)}</phoneme>`
        : escapeXml(t.text),
    )
    .join('')
  return (
    `<speak version="1.0" xml:lang="el-GR"><voice name="${voice}">` +
    `<prosody rate="-10%">${body}</prosody></voice></speak>`
  )
}

async function synth(ssml) {
  const res = await fetch(
    `https://${REGION}.tts.speech.microsoft.com/cognitiveservices/v1`,
    {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': KEY,
        'Content-Type': 'application/ssml+xml',
        'X-Microsoft-OutputFormat': 'riff-24khz-16bit-mono-pcm',
        'User-Agent': 'agora-neural-samples',
      },
      body: ssml,
    },
  )
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`)
  return Buffer.from(await res.arrayBuffer())
}

await mkdir(outDir, { recursive: true })
let ok = 0
for (const voice of VOICES) {
  const short = voice.replace(/Neural$/, '')
  for (const s of SAMPLES) {
    try {
      const wav = await synth(toSsml(s.text, voice))
      await writeFile(join(outDir, `${short}--${s.id}.wav`), wav)
      console.log(`✓ ${short.padEnd(16)} ${s.id.padEnd(12)} ${wav.length} B`)
      ok++
    } catch (err) {
      console.error(`✗ ${short} ${s.id}: ${err.message}`)
      process.exitCode = 1
    }
  }
}

// — index.html para el A/B desde el móvil —
const rows = SAMPLES.map((s) => {
  const cells = VOICES.map((voice) => {
    const short = voice.replace(/Neural$/, '')
    return `<div><small>${short}</small><br><audio controls preload="none" src="${short}--${s.id}.wav"></audio></div>`
  }).join('\n      ')
  const old = s.old
    ? `<div><small>eSpeak actual</small><br><audio controls preload="none" src="${s.old}"></audio></div>`
    : ''
  return `  <section>
    <h2 lang="grc">${s.text}</h2>
    <div class="voices">
      ${cells}
      ${old}
    </div>
  </section>`
}).join('\n')

await writeFile(
  join(outDir, 'index.html'),
  `<!doctype html>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Agora · muestras de voz (A/B)</title>
<style>
  body { font-family: system-ui, sans-serif; margin: 1rem; background:#0f172a; color:#e2e8f0 }
  h2 { margin: 1.2rem 0 0.4rem; font-weight: 600 }
  .voices { display: flex; flex-wrap: wrap; gap: 0.8rem }
  small { color: #94a3b8 }
  audio { width: 240px }
</style>
<h1>Muestras de voz · elige con el oído</h1>
<p>Mismo texto, pronunciación ática por IPA (G2P), varias voces.</p>
${rows}
`,
)
console.log(`\n${ok}/${VOICES.length * SAMPLES.length} muestras en public/audio/samples/ (+ index.html)`)
