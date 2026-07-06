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

Es decir: el motor de voz correcto y offline **ya existe**; falta cobertura y,
sobre todo, **hacer del oído el conductor**.

## Decisiones fijadas

1. **Alcance del "hablar": shadowing.** Oír → **repetir en voz alta** →
   **autocalificarte** ("lo dije bien"). Honesto, sin puntuación falsa. Más
   adelante, opción de **grabarte y compararte** con el modelo (MediaRecorder,
   offline; te juzgas tú). **No** hay reconocimiento de voz para ático
   reconstruido, así que **no** se puntúa la pronunciación automáticamente.
2. **Voz: offline-correcta por defecto.** eSpeak con fonemas curados (robótica
   pero fonológicamente correcta). Una voz **natural** es mejora **opcional**
   futura (nube, o voz a medida entrenada — la "joya"); nunca a costa de perder
   offline o de enseñar la pronunciación equivocada.
3. **Qué sigue fuera de alcance.** Conversación libre y redacción libre. La
   ampliación es acotada: **comprensión por el oído** + **repetición hablada
   guiada** (shadowing). No chatbots ni diálogo abierto.

## Etapas / proyectos

| # | Proyecto | Qué es |
|---|---|---|
| **A** | **Oído en todo (cimiento)** | Clips para **todo** el vocabulario, aforismos y formas; botón "oír" siempre presente y **auto-reproducción como estímulo** en los ejercicios (no solo al revelar). |
| **B** | **Ejercicios dirigidos por el oído** | **Dictado** (oír→escribir), **comprensión auditiva** (oír→elegir sentido), **emparejar de oído**. Voltear el estímulo de texto a **sonido**. Intercalarlos en «Entrenar». |
| **C** | **Interacción / hablar (shadowing)** | Oír → repetir en voz alta → autocalificarte. Opción posterior: grabarte y compararte. |
| **D** | **Input por diálogos/historias de oído** | Micro-diálogos/relatos cortos narrados en ático (habla conectada, prosodia): escuchar, pillar el sentido, responder. |
| **E** | **Calidad de voz (transversal, opcional)** | Voz más natural como mejora opcional; el offline-correcto sigue por defecto. |
| **F** | **Rector en los docs** | Este documento + roadmap + `CLAUDE.md`. Invariante "audio-first" para nuevos ejercicios. |

**Primer corte (alto impacto, bajo riesgo):** Etapa **A** (cobertura total de
audio) + el primer ejercicio de la **B**, **Dictado**, dentro de «Entrenar».
Reutiliza el pipeline existente y convierte el oído de adorno en conductor.

## Estado

- **Hecho:** motor de audio offline correcto (letras completas); este rector
  documentado (Etapa F, parcial).
- **Siguiente:** Etapa A — generar los clips que faltan (vocabulario y aforismos)
  y auto-reproducir el sonido como estímulo; luego **Dictado** en «Entrenar».
