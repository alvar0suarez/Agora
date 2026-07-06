# Roadmap de Agora

> Documento vivo: estado y fases del proyecto. Se actualiza al cerrar cada tarea
> relevante.

## Qué es Agora

App para **aprender a leer y escribir griego antiguo** (ático clásico) de forma
interactiva, con métodos de eficacia probada (repetición espaciada, recuerdo
activo, input comprensible) y gamificación ligera. Pronunciación **reconstruida
ática** (referencia: *Vox Graeca*, W. S. Allen). Es para disfrutar, no para empollar.

## Meta y alcance

**Meta:** leer y comprender **aforismos y citas filosóficas** en ático clásico —el
griego que aparece citado (a menudo sin traducir) en los libros de filosofía— sin
depender de la traducción. Ejemplos del objetivo: γνῶθι σεαυτόν, ἓν οἶδα ὅτι
οὐδὲν οἶδα, πάντα ῥεῖ, y términos clave como λόγος, ἀρετή, ψυχή, εὐδαιμονία.

Esto fija el nivel y orienta las fases siguientes:

- **Vocabulario (Fase 2):** núcleo sesgado al **léxico filosófico** (Presocráticos,
  Platón, Aristóteles, estoicos) + las palabras-función de altísima frecuencia
  (artículo, καί, οὐ, partículas) presentes en cualquier frase.
- **Lectura (Fase 3):** **aforismos y γνῶμαι** (sentencias breves) reales, de menos
  a más — el formato natural de "lo que se ve en los libros": frases cortas y
  autocontenidas.
- **Morfología (Fase 4):** solo la necesaria para **parsear esas frases** (casos,
  participio e infinitivo —omnipresentes en filosofía—, formas verbales comunes).
  No gramática exhaustiva.

**Motivaciones concretas (del dueño):** leer griego "en la vida real" (una
inscripción en un museo, una frase en un libro), entender las citas filosóficas
sin traducción, y **aprender mejor el español a través del griego** (etimologías:
cada palabra muestra sus derivados españoles). A futuro, una app hermana de
**latín** reutilizaría esta misma metodología y núcleo (SRS, progreso, quiz).

**Horizonte de progreso:** el sistema de niveles (XP en `core/progress`) está
calibrado para un arco largo —de meses/años— hasta una banda de **lectura ~B2**
(leer prosa ática y filosofía con apoyo). Las bandas (Cimientos → A1 → A2 → B1 →
B2) miden **comprensión lectora**, no producción.

**Fuera de alcance:** producción libre y conversación (la app es de lectura y de
escritura por reconocimiento, no de redacción).

**Fuentes del contenido:** ver `docs/fuentes.md` — Perseus Digital Library
(textos, léxico LSJ, gramática de Smyth, morfología) y *Vox Graeca* (pronunciación).

## Estado actual

> Snapshot a junio 2026. La app está **desplegada** como PWA en GitHub Pages
> (https://alvar0suarez.github.io/Agora/), con auto-deploy en cada push a `main`.
> **Verde**: 65 tests (Vitest) y `npm run build` correcto; PWA con ~1,15 MiB
> precacheados (offline).

**Features enchufados (6)** — registrados en `src/app/features.ts`:

- **`inicio`** — pantalla de progreso de un vistazo + "Plan de hoy" adaptativo
  (`core/plan`): reúne lo pendiente de repaso de todos los features y lo prioriza.
- **`camino`** — mapa interactivo del progreso (Cimientos → B2); tocar una etapa
  lleva a su ejercicio.
- **`alfabeto`** — Fase 1 **completa**: reconocer (1a), escribir (1b),
  gamificación (1c: XP, racha, niveles, dominio, interleaving) y **audio** del
  alfabeto (clips pregenerados; ver `docs/audio.md`).
- **`vocabulario`** — Fase 2 en marcha: ~59 palabras, modos reconocer / producir /
  **teclear** (teclado griego en pantalla, `core/ui`), con SRS. Pipeline de
  **audio neural (AFI)** en build-time definido (ver `docs/audio.md`).
- **`lectura`** — Fase 3 (en marcha): aforismos y γνῶμαι reales (γνῶθι σεαυτόν,
  πάντα ῥεῖ…) con traducción y desglose palabra por palabra. Dos modos:
  **Repasar** (recuerdo activo con SRS + XP — leer ya cuenta para el progreso) y
  **Explorar** (lectura libre, input comprensible).
- **`gramatica`** — Fase 4 (en marcha): conjugación (presente de λύω, εἰμί) y
  declinación (λόγος 2.ª, ψυχή 1.ª; los 4 casos × sg/pl). Se estudia el paradigma
  y se **practica escribiendo** la forma pedida (teclado griego + SRS + XP).

**Núcleo (`core`)**: `srs` (Leitner v1), `progress` (XP/niveles/racha),
`quiz` (opciones), `plan` (entrenador adaptativo), `greek` (datos compartidos:
letras, vocab, verbos, sustantivos, aforismos, normalización), `audio`
(servicio + clips), `storage` (Dexie + persistencia blindada), `crypto`
(WebCrypto), `ui` (Card, teclado griego, cabeceras, navegación).

**Próximos pasos** (sin cambiar la meta): ampliar vocabulario y generar sus
clips de audio; más tiempos verbales y modelos de declinación; más aforismos en
lectura. La dirección **personal y local-first** se mantiene; cualquier idea de
abrirlo a más gente vive aparcada y por separado en `docs/exploracion-comunidad.md`.

## Cómo crecemos hacia B2 (prioridades)

> Acordado en sesión: el camino a B2 son tres esfuerzos distintos. No mezclarlos
> en una misma sesión; una tarea por sesión limpia. Orden por palanca:

1. **Cerrar agujeros del bucle de aprendizaje (mayor palanca).** Que toda
   actividad ancle al recuerdo real y sume al progreso, y añadir tipos de
   ejercicio que faltan para comprensión lectora B2: rellenar huecos (cloze),
   dictado por audio, emparejar, preguntas de comprensión, traducción inversa.
   *Hecho:* lectura y gramática suman XP al recuerdo real; **rellenar huecos
   (cloze)** sobre aforismos; **emparejar** palabra↔significado (calentamiento);
   **«Entrenar»**: sesión mixta que intercala tipos (reconocer/escribir/letras/
   huecos/construir + respiro de museo) entre áreas con SRS/XP/logros
   centralizados y prompts compartidos — combate la monotonía y unifica.
   Barra inferior simplificada a 5 (Inicio · Entrenar · Practicar · Camino ·
   Museo); las áreas enfocadas viven en el hub «Practicar».
   *Pendiente:* dictado por audio; preguntas de comprensión; traducción inversa.
2. **Ampliar contenido (el grano largo, en goteo).** Más léxico filosófico, más
   tiempos verbales y modelos de declinación, más aforismos y piezas de museo.
   Imprescindible para B2 pero es maratón: añadir de poco en poco, no de golpe.
   Incluye la **teoría explicada** (feature Teoría, mini-artículos intercalados
   en el Camino). *Hecho:* lecciones con tablas — «Los acentos», «Los casos»,
   «El presente del verbo», «El artículo» (género/número/caso de un vistazo).
   *Pendiente, en goteo:* más tiempos verbales, otras declinaciones, preposiciones…
   Ejercicios de FRASE estilo Duolingo: *hecho* «Construir» (ordenar las
   palabras de un aforismo, con banco); *pendiente* poner la palabra en su
   forma y traducir escribiendo.
3. **Unificar el diseño (cimiento, hacerlo pronto).** El CSS está coherente en
   color pero fragmentado en estructura (cada feature reinventa su BEM, colores
   de feedback y espaciado/tipografía sin escala). Conviene extraer tokens
   (`--color-success/-danger`, escala de espaciado y tipografía) y componentes
   comunes **antes** de añadir muchos features, para no acumular más deuda.

**Aparcado:** integración con apps hermanas por audio (YT-Extractor) y archivo en
Nous. Está declarada en `.claude/ficha.md` pero depende de esas otras apps; no
es accionable desde Agora ahora mismo.

**En marcha — Palabras de Nous (feature `nous`):** Agora importa el vocabulario
que el usuario guarda leyendo en Nous (fichero `nous-vocab.v1`, ver
`docs/formato-nous-vocab.md`). Hecho: importador + fichas (significado,
etimología, griego detectado por heurística testeada) y recepción por **Web
Share Target** («Estudiar en Agora» desde Nous: el SW guarda el fichero en la
bandeja y `?f=nous` abre la feature, que lo importa sola). También hecho: **mapa de
raíces** (las palabras conectadas por las raíces griegas que comparten, con
fusión manual persistida cuando la heurística no casa dos formas de la misma
raíz, y enriquecido con las raíces curadas de `core/greek`) y **repaso SRS**
(tarjetas autoevaluadas palabra↔significado, prefijo `nous:`, XP del núcleo).
Validado E2E en Chromium sobre la build real (23 comprobaciones, incluido el
POST del share target contra el service worker).

## El método (resumen)

- **Repetición espaciada** + **recuerdo activo**: los dos pilares con más evidencia.
- **Input comprensible / lectura graduada**: para leer de verdad (fases posteriores).
- **Mnemotecnia + interleaving**: para fijar y no aburrir.
- **Gamificación**: capa de motivación, anclada al recuerdo real (no a tocar botones).

## Fases

### Fase 0 — Cimiento ✅

Esqueleto PWA local-first, arquitectura modular, docs.

### Fase 1 — Alfabeto griego (en curso)

Leer y escribir las 24 letras desde cero, con SRS + gamificación ligera.
Ver `docs/fase-1.md`.

- [x] **1a** — Motor SRS (`core/srs`) + 24 letras + sesión de reconocimiento.
- [x] **1b** — Producción: te damos el sonido → eliges el glifo (elección
  múltiple). Cartas SRS separadas por dirección (`rec` / `prod`). Tests con Vitest.
- [x] **1c** — Gamificación (XP, racha, niveles hasta banda de lectura B2,
  dominio por letra, resumen, **logros**) + interleaving (sesión mixta
  reconocer/escribir).

### Fase 2 — Vocabulario núcleo

Palabras más frecuentes + núcleo filosófico, con SRS. Ver `docs/fase-2.md`.

### Fase 3 — Lectura graduada

Frases reales un punto por encima del nivel (input comprensible). **En marcha**:
feature `lectura` con aforismos célebres (γνῶθι σεαυτόν, πάντα ῥεῖ…), traducción
y desglose palabra por palabra, en dos modos: **Repasar** (recuerdo activo con
SRS + XP) y **Explorar** (lectura libre). Ver `docs/fase-3.md`.

### Fase 4 — Morfología

Casos y verbos con drills inteligentes. **En marcha**: feature `gramatica` con
**conjugación** (presente de λύω y εἰμί) y **declinación** (λόγος 2.ª y ψυχή 1.ª,
los cuatro casos × singular/plural). Estudiar el paradigma y **practicar
escribiendo** la forma pedida (teclado griego + SRS + XP). Siguiente: más
tiempos verbales y más modelos de declinación.

## Mejoras futuras (apuntadas, sin fase)

- **Audio/voz** de pronunciación reconstruida → **v1 hecho** (clips eSpeak con
  fonemas curados, robótico; plan y pendientes en `docs/audio.md`). Mejora futura:
  **clips de voz humana** (sustituibles archivo a archivo, sin tocar features).
- **Trazado a dedo** de las letras (escribir dibujándolas).
- Algoritmo SRS más avanzado (tipo SM-2) si hiciera falta.
- **Empaquetado nativo (APK) con Capacitor**: misma base web, pero con
  **notificaciones locales** (recordatorio de racha/repaso) y **datos más
  persistentes** (menos riesgo de que el sistema borre el progreso). No aporta
  más potencia de estudio; se plantea cuando haya contenido que merezca avisos.
- **Árbol de etimología (raíces griegas ↔ palabras españolas)**: añadir palabras
  (p. ej. *cineteca*) y explorar un grafo de morfemas y familias. Diseño en
  `docs/etimologia.md`. Refuerza "aprender español a través del griego".
- **Museo / textos reales**: galería de inscripciones/piezas reales (texto griego +
  traducción + descripción + fuente consultable), con un hito "a tu nivel ya puedes
  leer estas". Diseño en `docs/realia.md`. Es la meta del proyecto hecha pantalla.
  - *Ideas de futuro (en `docs/realia.md`)*: **overlay guía-lectura** que detecte
    las letras en la foto real y las realce con una capa translúcida suave; y
    **vídeos IA** de filósofos recitando en ático reconstruido con transcripción.
- **Revisión de diseño (UX/estética)**: pasada de "diseñador aséptico" que pula la
  coherencia visual SIN tocar funcionalidad ni la filosofía. Auditoría y plan en
  `docs/diseno.md`.

## Decisiones

- **PWA local-first** (no nativo): se desarrolla en Claude Code web, la seguridad
  es ligera, corre en Android e instalable desde el móvil. Crecer hacia nativo =
  envolver con Capacitor.
- **Pronunciación reconstruida ática** y **dialecto ático clásico**.
- **SRS en `core`** (lo comparten varios features); algoritmo Leitner v1, reemplazable.
- **Datos del alfabeto en `core/greek`** (no en el feature): los comparten los
  modos reconocer y escribir, y el contrato prohíbe que los features dependan
  entre sí.
- **Producción por elección múltiple Y por tecleo**: además de elegir, se puede
  **escribir** la palabra con un **teclado griego en pantalla** (`core/ui`), que
  resuelve la falta de teclado griego en el móvil. La comparación ignora acentos
  y mayúsculas (`core/greek/normalize`). El trazado a dedo sigue siendo futuro.
- **Tests con Vitest** (`npm test`): lógica pura (SRS, opciones). La verificación
  interactiva final en el móvil la hace el dueño.
- **Audio silenciado por defecto** (la voz v1 con eSpeak es robótica): hay un
  interruptor 🔇/🔊 en la cabecera para activarlo; la preferencia se guarda. El
  audio NO se elimina (será funcionalidad real con voz humana en el futuro).
