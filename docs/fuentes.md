# Fuentes y referencias

> Recursos de autoridad para el **contenido** de Agora (textos, léxico, gramática,
> pronunciación). Sirven para curar vocabulario, aforismos/lecturas y paradigmas
> con rigor, y para citar de dónde sale cada cosa.

## Perseus Digital Library (Tufts) — fuente principal de textos

**Enlace:** https://www.perseus.tufts.edu/hopper/ · Lector moderno:
https://scaife.perseus.org/

La referencia digital de los clásicos. Acceso libre a textos griegos y latinos
con herramientas filológicas. Útil para casi todas las fases del proyecto.

**Qué ofrece (griego antiguo):**

- **Corpus de textos** — ~1.600 obras en griego (Homero, Heródoto, Platón,
  Jenofonte, los trágicos…), con traducción alineada. En el **Scaife Viewer**
  (visor nuevo) y el **Hopper** (clásico).
- **Léxico LSJ** — *Liddell–Scott–Jones, A Greek–English Lexicon*: el diccionario
  de referencia. Cada palabra del texto enlaza a su entrada. Base para las
  **glosas** del vocabulario.
- **Gramática de Smyth** — *Greek Grammar* (H. W. Smyth): la gramática de
  referencia en inglés. Apoyo para los **paradigmas** (declinaciones, conjugación)
  de la Fase 4.
- **Analizador morfológico (Morpheus)** — analiza cualquier forma flexionada
  (caso, número, tiempo, persona). Útil para validar las formas de los drills y
  para enlazar la lectura con los lemas.
- **Frecuencia y vocabulario** — estadísticas de palabras por obra/autor; ayudan
  a priorizar el **núcleo de vocabulario** (Fase 2) por frecuencia real.
- **Beyond Translation** — explicaciones sintácticas palabra a palabra, métrica y
  **lecturas grabadas** enlazadas al texto.

**Licencia (importante si incrustamos texto):** Perseus es sin ánimo de lucro y
participa en **Open Greek and Latin**. La mayoría de sus textos se publican bajo
**Creative Commons BY-SA 3.0 (United States)**; hay que **atribuir** y compartir
igual. Antes de **incluir un texto** en la app conviene verificar la licencia de
esa edición concreta y citar la fuente. Para *aforismos* breves y de dominio
público (máximas, Presocráticos) el riesgo es mínimo, pero se cita igualmente.

**Cómo lo usamos por fase:**

| Fase | Uso de Perseus |
|---|---|
| 2 · Vocabulario | LSJ para glosas; frecuencia para priorizar palabras |
| 3 · Lectura | corpus de aforismos/textos graduados; alineación y traducción |
| 4 · Morfología | Smyth (paradigmas) + Morpheus (validar formas) |

## Pronunciación

- **W. S. Allen, *Vox Graeca*** — referencia del proyecto para la **pronunciación
  reconstruida ática** (la que usan `core/greek/letters.ts` y
  `scripts/vocab-pron.json`).
- **Luke Ranieri / *Polymathy*** (vídeos) y materiales de ático reconstruido —
  apoyo audible para la fonología (aspiradas, vocales largas, acento musical).

## Otras referencias útiles (abiertas)

- **Logeion** (https://logeion.uchicago.edu/) — agregador de diccionarios
  (incluye LSJ, Middle Liddell), cómodo para consultas rápidas.
- **Open Greek and Latin / First1KGreek** — ediciones abiertas, base de buena
  parte del corpus de Perseus.

> Nota: estas fuentes son para **curar y verificar** el contenido; no se llaman en
> tiempo de ejecución (la app es local-first y offline). Lo que entre en la app se
> revisa y se cita aquí o en el commit correspondiente.
