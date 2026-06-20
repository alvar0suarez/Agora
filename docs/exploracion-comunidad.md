# Exploración: Agora para más gente (vía aparcada)

> ⚠️ **ESTO NO ES LA DIRECCIÓN ACTUAL.** Agora es —y seguirá siendo— una app
> **personal, privada y local-first** para que su dueño aprenda griego antiguo
> muy bien. Este documento **no cambia** la meta, ni los invariantes de
> seguridad, ni el contrato de módulo del `CLAUDE.md`.
>
> Es un **cuaderno de opcionalidad**: guarda el razonamiento de una posible vía
> futura —abrir Agora a otras personas como producto— para no perderlo. Se
> trabaja **solo si** algún día el dueño decide explorarlo, y nunca antes de que
> la app sea excelente para él. Documento vivo, especulativo, sin compromiso.

## La tesis (en orden)

1. **Primero, para mí.** Madurar Agora como herramienta personal y validar, con
   el propio uso, que la pedagogía funciona (SRS, recuerdo activo, input
   comprensible, audio reconstruido).
2. **Si es muy buena para mí, puede ayudar a más gente.** Solo entonces se
   plantea abrirla. El producto no es el problema; lo difícil viene después
   (distribución, comunidad, soporte a datos de terceros).
3. **El contenido excelente y probado es el activo.** Una app que de verdad
   enseña, sin publicidad invasiva ni cortes artificiales, hecha por un filólogo.

## Por qué podría tener sentido (resumen del informe de mercado)

El análisis de mercado adjunto en la investigación inicial concluye:

- **Hay un hueco real.** El griego *clásico* (ático, no koiné/bíblico) está mal
  cubierto: Duolingo no lo ofrece y lo existente es bíblico o anticuado. Ninguna
  app combina aprendizaje desde cero + pedagogía moderna + (eventualmente)
  comunidad.
- **Nicho pequeño pero apasionado y con alta disposición a pagar** (filología,
  filosofía, teología, autodidactas cultos): decenas a bajos cientos de miles a
  nivel mundial. Suficiente para un producto de nicho rentable; insuficiente para
  un efecto-red al estilo Duolingo.
- **El foso NO es el código** (clonable en un fin de semana con IA). El foso real
  es **contenido curado por experto + marca + comunidad + datos propietarios**.
- **Crecimiento orgánico obligatorio** (vídeo corto: etimologías, "cómo sonaba
  Homero"), no publicidad pagada (el CAC no sale a precios de nicho).

## Principio arquitectónico clave: lo online sería ADITIVO

La intuición del dueño es correcta y conviene fijarla:

- **El `core` se reutiliza tal cual** (SRS, progreso, quiz, datos de griego,
  audio, pedagogía). Es el 80% del valor y no se reescribe.
- Abrir a otros = **añadir features + un backend fino servidor-autoritativo**
  (cuentas, rankings, ligas), no un refactor del núcleo. El contrato de módulo lo
  permite: una variante "Agora Cloud" se enchufaría como features nuevos.
- **Advertencia honesta (no minimizar):** la red **no es un feature más**, es una
  **nueva frontera de confianza**. En cuanto hay datos de terceros, la seguridad
  deja de ser "ligera por diseño": aparecen RGPD, consentimiento, borrado,
  responsabilidad legal, un servidor que mantener. Eso colisiona con los
  invariantes actuales (local-first, datos solo en el dispositivo) → por eso esta
  vía vive **separada** y solo se abre con una decisión explícita.
- Para rankings/ligas, el modelo simple es **app local + backend autoritativo**
  (el servidor calcula la puntuación), no sincronización local-first completa
  (CRDTs), que sería mucho más cara.

## Pricing (si algún día se cobra)

- **Premium, no barato.** El nicho clásico tolera más que los 5 €/mes habituales
  (referencia: institutos de lenguas clásicas cobran cientos). Plausible ~20 €/mes
  a un nicho pequeño que de verdad aprende.
- Anclaje: a ese precio el usuario no compara con Duolingo, compara con un
  profesor particular → el argumento es la **pedagogía probada**, no el "acceso".
- Cobrar vía web cuando se pueda (evita la comisión 15–30 % de las tiendas).

## Contenido por IA, revisado por filólogo (el diferenciador)

El dueño es filólogo: la IA **genera/escala**, él **valida**. Reglas:

- **Todo griego pasa por revisión experta antes de publicarse.** Un LLM alucina
  griego con facilidad (acentos, formas inexistentes, sintaxis imposible); en un
  nicho culto, un solo error destruye la credibilidad. La IA **propone**, nunca
  publica sola.
- **Dos tipos de contenido, riesgos distintos:**
  - *Texto atestiguado* (Sófocles, Hesíodo, Homero real): texto canónico, riesgo
    de alucinación cero. La IA solo hace G2P + prosodia; el dueño revisa. Es
    también el contenido más viral ("cómo sonaba realmente Homero").
  - *Escenas/diálogos nuevos "al estilo de"*: la IA compone griego → riesgo alto;
    es **autoría del filólogo** con la IA de borrador.
- **Audio reconstruido = el foso técnico.** El pipeline de audio ya existe
  (`docs/audio.md`): la fuente de verdad es el **AFI/IPA**, independiente del
  motor; clips pregenerados en build-time, propios y offline.
  - Límite honesto que la IA **no** resuelve y el experto **sí**: el **acento
    musical (de tono)** del ático y, en verso, la **cantidad silábica y el metro**
    (hexámetro en Hesíodo, trímetro yámbico en Sófocles). Ningún TTS neural
    comercial lo reproduce con fidelidad → es justo lo que hace el contenido
    difícil de copiar.
  - Vía de máxima calidad: **clonar la voz del propio dueño** leyendo en
    reconstruida (con tono y metro correctos), y escalar desde ahí; revisión suya.
    Para el contenido "héroe" (trailer, shorts), grabarlo él directamente —su voz
    de filólogo es marca, no un coste a automatizar.
- **Pregenerar y cachear** todo el contenido estático (lo recomienda el informe
  para los unit economics); IA en vivo solo si hiciera falta, con modelos baratos.

## Notas sueltas (para no perderlas)

- **Gamificación con tope diario** (p.ej. máx. ~1000 pts/día): fuerza retención
  (volver mañana) y, de paso, aplana al tramposo contra el mismo techo que al
  humano. Patrón tipo Duolingo.
- **Anti-bots / anti-cheating** (pregunta del dueño): no se *detecta* al bot, se
  **diseña para que no importe**, por capas:
  1. Que no valga la pena (premios cosméticos, no dinero).
  2. **Validación servidor-autoritativa**: el servidor calcula la puntuación; un
     bot tendría que acertar griego de verdad (y entonces… está aprendiendo).
  3. Tope diario (ya citado).
  4. Detección de **anomalías de comportamiento** (latencia demasiado constante,
     actividad imposible 90 días sin fallar, curva de aprendizaje sin la "S" del
     olvido) → marcar como sospechoso, no probar.
  5. **Ligas separadas / shadow-leagues**: los sospechosos compiten entre ellos.
  6. Prueba de humanidad ligera solo si hace falta (en compra o al top con premio).
  La perfección no existe (nadie la tiene); se gestiona, no se resuelve.
- **Expansión natural** si despega: latín y otras lenguas clásicas "huérfanas",
  reutilizando el mismo núcleo y método (ya previsto como app hermana de latín).

## Si algún día se abre esta vía: primer paso

Según el informe, **no** construir comunidad ni IA primero, sino **validar
retención y disposición a pagar** con el contenido que ya existe. La comunidad es
una fase posterior, no la primera.
