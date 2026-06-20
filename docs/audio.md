# Plan: voz / audio del alfabeto (próxima tarea)

> Nota de decisión para retomar en sesión limpia. Resume el porqué y el cómo para
> no volver a derivarlo. Pendiente: plan corto + OK del dueño antes de codificar.

## Objetivo

Que la app **pronuncie** las letras (y, más adelante, vocabulario), para aprender
de oído la **pronunciación reconstruida ática**. Encaja sobre todo con el modo
**"Escribir"**, donde el estímulo natural es el sonido (hoy se muestra como texto:
transliteración + AFI + pista).

## El problema (importante)

**No existe un TTS bueno para griego ático reconstruido.** Y hay una trampa:

- ⚠️ **Descartado: TTS de griego MODERNO** (la voz "el" del sistema). El moderno
  pronuncia distinto al ático (β=v vs b; η=i vs e larga; φ/θ/χ fricativas vs
  aspiradas…). Enseñaría la pronunciación **equivocada**: justo lo contrario del
  objetivo.

## Opciones

| Opción | Calidad | Coste | Offline |
|---|---|---|---|
| **Clips pregrabados** (1 audio/letra) | La mejor (voz humana correcta) | Hay que conseguir/grabar 24 audios | ✅ |
| **eSpeak-NG (grc) por WASM** | Robótica, pero apunta a la reconstrucción | Dependencia nueva (~MB en la PWA) | ✅ |
| ~~TTS griego moderno~~ | Suena bien pero enseña mal | — | descartado |

## Decisión final (implementada)

**Clips pregenerados con eSpeak-NG en build-time**, NO el WASM en runtime.

Al investigar el paquete `espeak-ng` (npm, GPL-3.0) salieron dos problemas que
cambiaron el plan original (que era cargar el WASM en el móvil):

1. **Peso**: el WASM lleva los datos de TODOS los idiomas embebidos → ~18 MB.
   Muchísimo para pronunciar 24 letras en una PWA.
2. **Corrección**: la voz `grc` ("griego antiguo") de eSpeak usa la convención
   académica/erasmiana y **enseña mal las letras clave**: φ→[f], θ/χ fricativas,
   ζ→[z]. Justo lo que el proyecto quiere evitar. Acierta β γ δ η υ ρ, falla en
   las 4 que `letters.ts` marca como distintivas del ático auténtico.

**Solución**: no le damos texto griego a eSpeak (sus reglas grc son erasmianas);
le damos los **fonemas correctos** de la reconstrucción ([pʰ tʰ kʰ], [zd], trino
[r]…) vía su entrada `[[...]]`, verificados contra el AFI de `letters.ts`. eSpeak
corre **aquí, en build-time** (Node) y genera un `.wav` por letra. La app solo
embarca esos clips.

Ventajas: ligero (~850 KiB los 24 clips), 100% offline, y la app **no arrastra la
licencia GPL** (el audio que produce un programa GPL no es GPL, como con un
compilador). eSpeak queda como `devDependency`, solo para regenerar.

## Encaje en la arquitectura (contrato de módulo)

- Servicio de audio en **`core/audio`**: interfaz `AudioService`
  (`pronounce(letter, what)` / `speak(text)`); motor activo en `audio` (1 línea
  para cambiarlo). Implementación v1 = `clipAudio` (reproduce los `.wav`).
  Features → core, nunca entre sí.
- Generación: `scripts/gen-letter-audio.mjs` (mapa de fonemas curados → eSpeak).
  Salida en `public/audio/letters/<id>.wav` (commiteada, así el build no necesita
  eSpeak). Precache: se añadió `wav` a `workbox.globPatterns` en `vite.config.ts`.
- `letterText()` (puro, con tests) aísla "qué se dice" de cada letra.

## Integración en la UI (feature alfabeto)

- **Reconocer**: al **revelar** la respuesta suena el sonido (acción → audio),
  con un "🔊 Oír de nuevo". ← hecho.
- **Escribir / dictado**: pendiente de diseño (ver abajo).

## Pendiente (próximos pasos)

1. **Verificar el sonido en el móvil** (aquí no hay audio): si alguna letra suena
   rara, se ajusta su fonema en `scripts/gen-letter-audio.mjs` y se regenera.
   Vigilar: vocales largas η/ω, la `a` de apoyo de las consonantes, el trino ρ.
2. **Nombres de letra** (ἄλφα…) como audio, si se quieren: generar clips de
   nombre con fonemas correctos (¡los nombres con φ/θ/χ también deben aspirarse!).
3. **Modo dictado** (oír → escribir): es un modo de ejercicio NUEVO, no solo
   añadir audio. Diseñarlo aparte antes de codificar.
4. Audio en "Escribir" como estímulo, si encaja con el dictado.

## Voz del vocabulario (implementado · piloto)

> Decisión del dueño: quiere **calidad** pero **sin depender de la nube**. Como hoy
> no existe la combinación perfecta (offline + muy natural + ático correcto), se
> prioriza lo que importa en una app de pronunciación: **offline + correcto**, vía
> **eSpeak local**. Voz robótica pero con fonología ática correcta. La nube queda
> como mejora de calidad OPCIONAL; una voz a medida (entrenada) es la joya futura.

### Cómo funciona (por defecto: eSpeak local, sin internet)
- Fuente de verdad: `scripts/vocab-pron.json` (`id → {lemma, ipa, phon}`). `phon` =
  fonemas reconstruidos en notación eSpeak `[[...]]` (aspiradas `p_# t_# k_#`, `zd`,
  trino `R`, vocales largas `E:`/`O:`); `ipa` = AFI para el backend neural opcional.
  Es el activo duradero: independiente del motor (eSpeak, neural o voz humana).
- Generador: `scripts/gen-vocab-audio.mjs`. Por defecto usa **eSpeak-NG local**
  (paquete `espeak-ng`, WASM en Node): 100% offline, gratis, sin claves. Guarda un
  `.wav` por palabra en `public/audio/vocab/<id>.wav`. NO corre en el build de la
  app; se ejecuta a mano y se commitean los clips (igual que las letras).
- App: `core/audio.pronounceWord(id)` reproduce el clip (bajo el toggle 🔇/🔊).
  Botón "🔊 Oír" en el vocabulario (reconocer y teclear).

### Generar / regenerar
```
node scripts/gen-vocab-audio.mjs        # eSpeak local (offline) — por defecto
```
Piloto ya generado y commiteado: 10 palabras (εἰμί, ἔχω, λέγω, λόγος, ἄνθρωπος,
ψυχή, σοφία, θεός, ἀρετή, φύσις).

### Mejora de calidad OPCIONAL (usa internet solo al generar)
Backend neural Azure con el AFI por SSML (la app sigue 100% offline):
```
BACKEND=azure AZURE_TTS_KEY=xxx AZURE_TTS_REGION=westeurope node scripts/gen-vocab-audio.mjs
```
Capa gratuita F0 (≈ 0 €). Alternativa: Amazon Polly. Suena natural y correcto, pero
implica una llamada a la nube en la generación.

### Límites y siguientes pasos
- **eSpeak**: robótico; revisar/ajustar `phon` tras oír (ojo a υ = [y], η/ω largas,
  el trino ρ). Se regenera y se vuelve a commitear.
- **Acento musical** del ático: ningún motor estándar lo reproduce con fidelidad;
  el techo es **voz humana experta** (sustituible archivo a archivo, sin tocar la app).
- Ampliar `vocab-pron.json` al resto de palabras (y a los verbos) por tandas.
