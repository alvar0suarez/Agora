# Formato `nous-vocab` (v1) — lado receptor

> **La spec canónica vive en el repo de Nous** (`docs/formato-nous-vocab.md` de
> `alvar0suarez/Nous`): Nous es quien emite y, si las copias divergen, manda la
> suya. Este doc resume el contrato desde el punto de vista de Agora.

## Qué es

El fichero JSON con el que **Nous exporta su vocabulario** (las palabras que el
usuario guarda leyendo, con su significado/etimología en texto libre) para que
**Agora lo importe**: fichas de estudio, mapa de raíces griegas y repaso SRS.

**Cómo llega:** en Nous, Vocabulario → compartir → **«Estudiar en Agora»** (el
JSON se regenera fresco en ese momento). Fallback: botón «Importar fichero» en
la feature `nous`. Una PWA en Android no puede vigilar carpetas en segundo
plano; por eso el gesto lo da el usuario.

## Contrato (lo que Agora debe cumplir como importador)

- Validar `formato === "nous-vocab"` y `version <= 1`; rechazar con mensaje
  legible lo demás.
- **Ignorar campos desconocidos** (compatibilidad hacia delante); opcionales
  ausentes = vacíos.
- **Idempotencia:** `id` es la clave. Reimportar actualiza, no duplica.
- Entradas sin `id` o sin `palabra` se saltan sin romper el import.

Campos por palabra: `id`, `palabra`, `idioma` (código base: `es`, `el`, `grc`…),
`comentario` (texto libre: significado/etimología), `contexto`, `libro`,
`creadaEn` (epoch ms), y —reservado, aún no emitido— `etimologia` estructurada
(lema + componentes). Cuando Nous la emita (su Fase 4), **tendrá prioridad**
sobre la heurística de `comentario`.

## Qué hace Agora con el comentario

`src/features/nous/parse.ts` (puro, testeado con un comentario real):

- Separa las secciones por las etiquetas de la convención
  (`Etimología:` / `Significado:`), tolerando caracteres invisibles (U+200B).
- Extrae los **fragmentos griegos** (bloques Unicode griego + politónico) y mina
  transliteración y glosa de los patrones habituales: `ἐξηγητής (exēgētēs)`,
  `hēgeisthai (ἡγεῖσθαι)`, `…que significa "guiar"`.
- Deduplica por forma normalizada (sin diacríticos, vía `normalizeGreek`).
- Si el texto no coopera, la ficha muestra el comentario entero: **no se pierde
  nada**; la heurística solo añade.

Estos fragmentos son la materia prima del **mapa de palabras** (agrupar palabras
que comparten raíz) — siguiente paso de la feature.

## Almacenamiento y privacidad

- Tabla Dexie `nousVocab` (v3 del esquema), registro = entrada del fichero tal
  cual + `importadaEn`. El análisis del comentario se deriva al vuelo, no se
  persiste.
- La feature es `security: 'normal'`: el export es un acto consciente del
  usuario y va en claro por diseño (decisión documentada en la spec de Nous);
  la fuente de verdad cifrada sigue siendo Nous. Borrar una palabra en Agora no
  toca Nous.
