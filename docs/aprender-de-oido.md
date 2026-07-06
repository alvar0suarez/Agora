# Aprender de oído e interactuando (rector)

> Principio rector de Agora, acordado en sesión. El idioma se aprende primero por
> el **oído** —como de niño: se oye, se asocia, se responde, se repite en voz
> alta— y la escritura es **apoyo**, no la base. Este documento fija el principio,
> las decisiones y las etapas para llegar ahí. Es un documento vivo.

## El principio

La forma natural de aprender una lengua no es leyendo tablas: es **oyendo cómo
suena y cómo se usa**, e **interactuando**. Agora eleva esto a rector:

- **Input por el oído primero.** El sonido es el estímulo principal; el texto,
  el apoyo. Oír la palabra/frase antes (o en vez) de verla escrita.
- **Interacción activa.** No escuchar pasivo: oír → responder (elegir, escribir)
  → **repetir en voz alta**. El bucle cierra con producción hablada guiada.
- **La escritura acompaña.** Reconocer y escribir siguen ahí, pero al servicio de
  fijar lo que ya entró por el oído.

Esto **no sustituye** leer/escribir (la meta sigue siendo comprensión lectora ~B2):
lo **antecede y refuerza**. "Audio-first" es un invariante de diseño: todo
ejercicio nuevo debe poder tener el **sonido como estímulo**; el audio deja de
ser decoración (hoy solo suena al revelar) y pasa a **conducir**.

## Lo que ya tenemos (el problema difícil, resuelto)

- Servicio `core/audio` con interfaz limpia (`speak`, `pronounce`,
  `pronounceWord`, `pronounceAphorism`, `stop`).
- **Clips pregenerados offline** con **fonología ática reconstruida correcta**
  (no griego moderno, no erasmiano): eSpeak con fonemas **curados** en
  build-time. Scripts: `scripts/gen-{letter,vocab,aphorism}-audio.mjs`.
- Cobertura hoy: 24 letras ✅ · ~10 palabras · 5 aforismos. **Parcial.**
- Uso hoy: solo cue al *revelar*. **No dirige ningún ejercicio.**

**Pero la CALIDAD no basta** (feedback del dueño, jul-2026): el eSpeak curado
suena robótico y en palabras "no funciona" para el estándar de una app top. La
fonología es correcta, pero la naturalidad no está a la altura. → Se **repiensa
el motor** con **calidad como prioridad** (ver abajo).

## Decisiones fijadas

1. **Alcance del "hablar": shadowing.** Oír → **repetir en voz alta** →
   **autocalificarte** ("lo dije bien"). Honesto, sin puntuación falsa. Más
   adelante, opción de **grabarte y compararte** con el modelo (MediaRecorder,
   offline; te juzgas tú). **No** hay reconocimiento de voz para ático
   reconstruido, así que **no** se puntúa la pronunciación automáticamente.
2. **Voz: la MEJOR calidad posible** (revisado jul-2026, dueño). Se acepta lo
   que haga falta para lograrlo —incluida la **nube**— siempre que la
   pronunciación sea **ática correcta**. El offline sigue siendo deseable y la
   **voz propia entrenada** es la meta offline (la "joya"), pero **no** se
   sacrifica calidad por mantener offline a toda costa. Nunca griego moderno /
   erasmiano (enseñaría mal).
3. **Alcance ampliado hacia la conversación.** Antes "fuera de alcance". Ahora la
   ambición incluye: leer **texto arbitrario** en griego con entonación (un
   diálogo socrático que el dueño suba), y a futuro **conversar** con la app.
   Esto arrastra un **LLM** y TTS de texto libre → es un salto real respecto al
   local-first, asumido conscientemente. El entrenador de lectura sigue siendo la
   base; la conversación es una vía nueva encima.

## El motor, repensado (calidad primero)

**El nudo:** no existe voz neuronal natural para **ático reconstruido**. La
calidad top + ática correcta sale por uno de dos caminos:

1. **Voz neuronal de gama alta alimentada con IPA/SSML** (Azure, Google y otros
   aceptan `<phoneme>` IPA): le damos la pronunciación ática **correcta** y una
   voz **natural** la renderiza, con entonación de frase. Riesgo: aspiración
   [pʰ tʰ kʰ], cantidad vocálica y acento de altura pueden quedar aproximados.
2. **Voz a medida entrenada** (Piper/XTTS/StyleTTS2) sobre grabaciones de
   pronunciación reconstruida (Stratakis, Ranieri…): correcto + natural +
   **offline** + **texto arbitrario**. Es la "joya"; requiere dataset/licencias
   y entrenamiento.

**Trampa de física:** *máxima calidad + ática correcta + offline + texto
arbitrario*, las cuatro a la vez, hoy **no se puede**. Siempre cede una. Con
"calidad la mejor posible" como norte, se prioriza calidad y ática correcta, y se
cede (de momento) en offline puro para el texto arbitrario.

**Cimientos, hágase el camino que se haga:**

- **G2P ático** (texto griego → IPA reconstruida): hoy la pronunciación está
  curada palabra a palabra; para **frases y texto arbitrario** hace falta
  convertir cualquier texto a fonemas. Módulo **puro y testeable**, y
  **replicable** (un G2P de latín mañana). Es el primer ladrillo, sirva el motor
  que sirva.
- **Motor desacoplado:** `core/audio` esconde el motor tras `AudioService`;
  cambiarlo es **una línea** y es **agnóstico de idioma**. Justo lo que se quiere
  para reutilizarlo en **latín** u otra lengua.

**Plan de motor (dos vías, no excluyentes):**

- *Ya:* subir la calidad del **contenido fijo** generando clips con voz neuronal
  de gama alta **vía IPA en build-time** (runtime sigue offline; clips
  commiteados). Reutiliza los fonemas curados.
- *La joya:* voz propia entrenada para **texto arbitrario + conversación**,
  offline y replicable.

**Listón acordado (dueño, jul-2026): ~80% pragmático.** No hace falta el 100%
filológico: sí que λόγος y los acentos suenen bien y natural, que las frases se
lean con entonación, y que el enfoque sea replicable (latín mañana). Se pulirá
por iteración con el oído del dueño.

**Estado del pipeline (hecho):**

- **G2P ático** (`src/core/greek/g2p.ts`): texto politónico → IPA reconstruida,
  puro y testeado. Acentos (agudo/circunflejo → sílaba tónica; el grave no),
  aspiradas, largas, diptongos, [h], ζ=[zd], γ-nasal. Simplificaciones al 80%
  documentadas en el propio módulo. Lee **palabras y frases arbitrarias**.
- **Muestras A/B** (`npm run audio:samples`): genera las mismas palabras/frases
  con varias voces neuronales de Azure vía IPA (el-GR y de-DE — el alemán tiene
  aspiradas, largas y [y] nativas) y publica `public/audio/samples/index.html`
  para elegir voz con el oído desde el móvil, comparando también contra el
  eSpeak actual. Azure confirmado con soporte IPA en `<phoneme>` (y léxicos
  custom como vía de máxima consistencia).

**Qué necesito para avanzar en calidad de verdad:**

- Una **API key de Azure Speech** (tier F0 gratuito: 500k caracteres/mes):
  portal.azure.com → recurso "Speech" → Keys and Endpoint. En `.env` (ignorado):
  `AZURE_TTS_KEY=…` y `AZURE_TTS_REGION=…`. **Nunca** al repo.
- **Tu oído**: ejecutar `npm run audio:samples`, commitear `public/audio/samples/`
  y escuchar el A/B en el móvil. Con la voz elegida, se regeneran TODOS los
  clips (letras, vocab, aforismos) con el mismo pipeline.

## Etapas / proyectos

| # | Proyecto | Qué es |
|---|---|---|
| **A** | **Oído en todo (cimiento)** | Clips para **todo** el vocabulario, aforismos y formas; botón "oír" siempre presente y **auto-reproducción como estímulo** en los ejercicios (no solo al revelar). |
| **B** | **Ejercicios dirigidos por el oído** | **Dictado** (oír→escribir), **comprensión auditiva** (oír→elegir sentido), **emparejar de oído**. Voltear el estímulo de texto a **sonido**. Intercalarlos en «Entrenar». |
| **C** | **Interacción / hablar (shadowing)** | Oír → repetir en voz alta → autocalificarte. Opción posterior: grabarte y compararte. |
| **D** | **Input por diálogos/historias de oído** | Micro-diálogos/relatos cortos narrados en ático (habla conectada, prosodia): escuchar, pillar el sentido, responder. |
| **E** | **Calidad de voz (transversal, opcional)** | Voz más natural como mejora opcional; el offline-correcto sigue por defecto. |
| **F** | **Rector en los docs** | Este documento + roadmap + `CLAUDE.md`. Invariante "audio-first" para nuevos ejercicios. |

**Primer corte (revisado, calidad primero):**

1. **G2P ático** (texto → IPA correcta): ladrillo puro y testeable, sirve para
   cualquier motor y es replicable a otros idiomas. Se puede empezar **sin key**.
2. **Pipeline de voz neuronal (build-time, vía IPA)** + **muestra A/B** para que
   el dueño juzgue la calidad en el móvil y elija voz. Necesita **API key**.
3. Con la voz buena elegida: **cobertura total** del contenido fijo y
   auto-reproducir el sonido como **estímulo**; luego **Dictado** en «Entrenar».

## Estado

- **Hecho:** rector documentado; motor repensado con calidad primero (listón
  ~80% pragmático); **G2P ático** puro y testeado (lee frases arbitrarias);
  **pipeline de muestras A/B** con voces neuronales listo (`npm run audio:samples`).
- **Bloqueado en el dueño:** API key de Azure Speech (F0 gratuito) para generar
  las muestras y elegir voz con el oído.
- **Después:** regenerar todos los clips con la voz elegida; auto-reproducir el
  sonido como estímulo; **Dictado** en «Entrenar»; texto arbitrario en runtime
  (diálogos subidos) y shadowing.
