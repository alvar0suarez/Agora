<!-- GENERADO por ecosistema/montar-mapa.py. NO editar a mano:
     edita la `.claude/ficha.md` de cada app (o ecosistema/ficha-plantilla.md para una nueva). -->

# Mapa de aplicaciones (el ecosistema)

> **Fuente de verdad única** de mi constelación de apps personales: qué hay, qué
> hace cada una, cómo se relacionan y en qué estado están. Vive **aquí**, en
> `claude-starter`.
>
> Por qué aquí: en Claude Code en la web cada sesión ve **un repo**. Para que,
> trabajando en una app, Claude *sepa* que existen las demás y cómo enlazan, esa
> información tiene que estar escrita y commiteada en un sitio estable. Ese sitio
> es este documento, y baja a cada repo como `.claude/ecosistema.md`.

## Cómo se mantiene (bidireccional y automático)

- **Cada app es dueña de SU ficha.** Declara lo suyo en `.claude/ficha.md` (qué
  expone, qué consume, relaciones, estado). Solo eso; nada de lógica interna.
- ⬆️ **Sube:** el sincronizador lee la ficha de cada app y reensambla este mapa.
- ⬇️ **Baja:** este mapa, ya ensamblado, vuelve a cada app como `.claude/ecosistema.md`.
- **Por construcción, una app solo puede tocar su propio hueco.** No puede
  reescribir la ficha de otra ni el mapa entero (ver `ecosistema/README.md`).

## Cómo se usa esto (el modelo mental)

- **Conocimiento, no acceso.** Esto hace que Claude *conozca* las apps hermanas
  (qué son, qué exponen, cómo enlazan). No da acceso a su código.
- **Una sola fuente.** Las apps no guardan una copia divergente: declaran su ficha
  y reciben el mapa ensamblado.
- **Opt-in.** Solo entran las apps del allowlist (`.github/constelacion.txt`).

## Convenciones

- **hub** — app central a la que enlazan las demás. Hoy: **Nous**.
- **expone** — datos/capacidades que otras apps pueden consumir.
- **consume** — lo que esta app toma de otra.
- **estado** — `idea` · `arrancando` · `en curso` · `usable` · `maduro`.
- **repo** — `owner/nombre` en GitHub.

## Resumen

| App | Qué es | Stack | Estado | Repo |
|---|---|---|---|---|
| 🧠 **Nous** (hub) | Cerebro digital: notas, libros y archivos, local-first en el móvil | Nativo (Kotlin/Compose) | en curso | `alvar0suarez/Nous` |
| 📚 **Agora** | App local-first para leer y escribir griego antiguo (ático clásico, pronunciación reconstruida) con repetición espaciada, lectura graduada, gramática y gamificación ligera | PWA (Vite+React+TS) · IndexedDB (Dexie) · WebCrypto · audio offline | usable | `alvar0suarez/Agora` |
| 🔥 **Prometeo** | App para aprender física de la fusión (de bachillerato a frontera), con mastery + repaso espaciado | Web app (Next.js + TS + Tailwind, MDX, KaTeX, BKT + FSRS); reutiliza el sistema de aprendizaje de Agora | arrancando | `alvar0suarez/Prometeo` |
| 🎬 **YT-Extractor** | De un enlace o canal de YouTube genera un Markdown con transcripción, capturas con OCR y resumen, todo on-device | Nativo (Android/Kotlin) | en curso | `alvar0suarez/YT-Extractor` |

---

## Fichas

### 🧠 Nous — Cerebro digital: notas, libros y archivos, local-first en el móvil

- **Stack:** Nativo (Kotlin/Compose)
- **Expone:** Destino natural de notas/archivos que generan las demás (transcripciones, material de estudio)
- **Consume:** —
- **Relaciones:** YT-Extractor y Agora pueden depositar contenido aquí
- **Estado:** en curso
- **Repo:** `alvar0suarez/Nous`

El centro del ecosistema. Datos masivos en el dispositivo → keystore con respaldo
por hardware (ver `docs/elegir-stack.md`).

### 📚 Agora — App local-first para leer y escribir griego antiguo (ático clásico, pronunciación reconstruida) con repetición espaciada, lectura graduada, gramática y gamificación ligera

- **Stack:** PWA (Vite+React+TS) · IndexedDB (Dexie) · WebCrypto · audio offline
- **Expone:** App PWA instalable y offline (URL pública en GitHub Pages); un usuario, móvil; Datos de griego curados (TS/JSON en src/core/greek), reutilizables por otras apps de lenguas clásicas, 24 letras con AFI ático, ~50 palabras (glosa ES, categoría, derivados españoles), ~11 aforismos (traducción + desglose palabra↔lema), paradigmas de verbos y casos; Pronunciación reconstruida por unidad en JSON id→{lemma, ipa, phon} + clips de audio WAV offline en public/audio/{letters,vocab,aphorisms}; Pipeline build-time pronunciación→audio (scripts/gen-*-audio.mjs): eSpeak local por defecto, backend neural opcional; Núcleo reutilizable de lógica pura, SRS Leitner, progreso/XP/niveles (bandas Cimientos→B2), quiz, planificador "Plan de hoy", contrato FeatureModule; Material/notas de estudio que podrían archivarse en Nous
- **Consume:** Audio + transcripción de YT-Extractor → para construir VOZ HUMANA natural (alineación forzada + troceo de clips), sustituyendo al eSpeak robótico; requiere permiso/licencia del hablante; (potencial) textos o recortes guardados en Nous; Fuentes para curar contenido (no en runtime), Perseus (textos/léxico/gramática) y Vox Graeca (pronunciación); ver docs/fuentes.md
- **Relaciones:** Hub Nous, patrón estudio→cerebro, archiva material/progreso en Nous; YT-Extractor, su salida (audio+transcripción) es la fuente candidata para la voz humana de Agora (integración pendiente; gating, permiso del hablante); Futura app de latín, reutilizaría el núcleo (SRS, progress, quiz, contrato FeatureModule, pipeline de audio)
- **Estado:** usable
- **Repo:** `alvar0suarez/Agora`

App personal de **lectura de griego antiguo**, autónoma y **offline**: no ofrece una
API de red, sino **datos, contenido y herramientas reutilizables** a nivel de repo,
más un **núcleo de aprendizaje** (SRS, progreso/niveles, quiz, planificador) portable
a otras lenguas clásicas.

**Cómo integrarse:** reutilizar contenido/motor importando de `src/core/greek/*` y
`src/core/{srs,progress,quiz,plan}` (todo local, sin servidor); darle voz aportando
`audio+transcripción` (YT-Extractor) al pipeline de alineación, o clips humanos
licenciados a `public/audio/**` (esquema `<id>.wav`); o clonar el núcleo para una app
hermana (p. ej. latín) con sus propios datos `id→{lemma, ipa, phon}`.

### 🔥 Prometeo — App para aprender física de la fusión (de bachillerato a frontera), con mastery + repaso espaciado

- **Stack:** Web app (Next.js + TS + Tailwind, MDX, KaTeX, BKT + FSRS); reutiliza el sistema de aprendizaje de Agora
- **Expone:** Resúmenes y notas de estudio de fusión/plasma
- **Consume:** (potencial) material guardado en Nous
- **Relaciones:** Archiva sus resúmenes de plasma en Nous (hub); mismo patrón estudio→cerebro que Agora
- **Estado:** arrancando
- **Repo:** `alvar0suarez/Prometeo`

Primera app incorporada a la constelación tras crear el mapa. La línea de
Relaciones es su "contrato" inicial.

### 🎬 YT-Extractor — De un enlace o canal de YouTube genera un Markdown con transcripción, capturas con OCR y resumen, todo on-device

- **Stack:** Nativo (Android/Kotlin)
- **Expone:** "Un Markdown por vídeo (`<base>/<Canal>/<Título>/<Título>.md`) con cabecera de metadatos (canal, duración, enlace) y secciones: Resumen ejecutivo · Capturas · Transcripción · Descripción"; "Transcripción con marcas de tiempo: de los subtítulos de YouTube o, si el vídeo no tiene, por voz on-device (Vosk) como fallback"; "Capturas inteligentes por cambio de escena en `capturas/cap_NNN.jpg` con su texto OCR (ML Kit) embebido en el .md"; "Resúmenes ejecutivos como ficheros aparte junto al .md: `resumen-5min.md` y `resumen-20min.md`"; "Carpeta de salida elegible por el usuario (selector del sistema): la raíz de los .md/capturas puede apuntarse a cualquier ruta del móvil"; "Vigilancia de canales: detecta vídeos nuevos y los procesa en segundo plano (WorkManager), depositando su .md en esa misma carpeta"
- **Consume:** "API key de Claude (opcional, la pone el usuario) para los resúmenes; sin ella usa un resumen extractivo local"
- **Relaciones:** "Su salida (carpeta de .md + capturas + resúmenes) es candidata a ser ingerida por Nous (carpeta → cerebro); con el selector de carpeta puede escribir directamente en una ruta vigilada por Nous"
- **Estado:** en curso
- **Repo:** `alvar0suarez/YT-Extractor`

Alias *Pájaro*. Pide capacidades del sistema (guardar en carpetas públicas,
trabajo en segundo plano) → por eso nativo y no PWA. Todo el procesamiento
(extracción, OCR, transcripción por voz, resumen local) es **on-device**; lo
único que puede salir del móvil es el texto enviado a la API de Claude si el
usuario activa el resumen con su propia clave. El formato de intercambio es
**Markdown + JPG en carpetas**, pensado para que otra app lo lea sin acoplarse a
esta.

## Añadir una app a la constelación

1. Añade su `owner/repo` a `.github/constelacion.txt`.
2. En su repo, copia `ecosistema/ficha-plantilla.md` a `.claude/ficha.md` y rellénala.
El sincronizador hace el resto: integra su ficha aquí y baja el mapa a todas.
