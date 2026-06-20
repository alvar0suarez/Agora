---
nombre: Agora
emoji: 📚
repo: alvar0suarez/Agora
que_es: App local-first para leer y escribir griego antiguo (ático clásico, pronunciación reconstruida) con repetición espaciada, lectura graduada, gramática y gamificación ligera
stack: PWA (Vite+React+TS) · IndexedDB (Dexie) · WebCrypto · audio offline
estado: usable
expone:
  - App PWA instalable y offline (URL pública en GitHub Pages); un usuario, móvil
  - Datos de griego curados (TS/JSON en src/core/greek), reutilizables por otras apps de lenguas clásicas, 24 letras con AFI ático, ~50 palabras (glosa ES, categoría, derivados españoles), ~11 aforismos (traducción + desglose palabra↔lema), paradigmas de verbos y casos
  - Pronunciación reconstruida por unidad en JSON id→{lemma, ipa, phon} + clips de audio WAV offline en public/audio/{letters,vocab,aphorisms}
  - Pipeline build-time pronunciación→audio (scripts/gen-*-audio.mjs): eSpeak local por defecto, backend neural opcional
  - Núcleo reutilizable de lógica pura, SRS Leitner, progreso/XP/niveles (bandas Cimientos→B2), quiz, planificador "Plan de hoy", contrato FeatureModule
  - Material/notas de estudio que podrían archivarse en Nous
consume:
  - Clips de audio de palabras griegas de YT-Extractor (para el botón de audio de las tarjetas)
  - (potencial) textos/recortes guardados en Nous
relaciones:
  - Consume audio de YT-Extractor para el botón de audio; archiva material en Nous
---
App personal de **lectura de griego antiguo**, autónoma y **offline**: no ofrece una
API de red, sino **datos, contenido y herramientas reutilizables** a nivel de repo,
más un **núcleo de aprendizaje** (SRS, progreso/niveles, quiz, planificador) portable
a otras lenguas clásicas.

**Cómo integrarse:** reutilizar contenido/motor importando de `src/core/greek/*` y
`src/core/{srs,progress,quiz,plan}` (todo local, sin servidor); darle voz aportando
`audio+transcripción` (YT-Extractor) al pipeline de alineación, o clips humanos
licenciados a `public/audio/**` (esquema `<id>.wav`); o clonar el núcleo para una app
hermana (p. ej. latín) con sus propios datos `id→{lemma, ipa, phon}`.
