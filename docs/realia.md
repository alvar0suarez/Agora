# Museo / Textos reales — galería de griego "de verdad" (idea / diseño)

> **Estado:** idea contemplada, sin implementar. Conecta con la meta original del
> dueño: **leer griego en la vida real** (una inscripción en un museo, una cita en
> un libro). Es el "para qué" del proyecto hecho pantalla.

## Objetivo

Una **galería de piezas reales** (inscripciones, papiros, monedas, citas de obras)
con su **texto griego**, **traducción**, **descripción** y **fuente consultable**.
Sirve de **hito de progreso**: a medida que subes de nivel, "desbloqueas" textos
que **ya puedes leer**. (Inspiración: la app "Ancient Greek Resources" y su ficha
de la *Jerusalem Temple Warning Inscription*.)

## Modelo de datos (propuesto: `core/greek/realia.ts`)

```
Realia (pieza real):
  id            // 'soreg-inscription'
  title         // 'Inscripción de advertencia del Templo'
  tipo          // 'inscripción' | 'papiro' | 'moneda' | 'cita de obra'…
  fecha         // 's. I d.C.'
  origen        // autoridad/autor o lugar
  dialecto      // 'koiné' | 'ático' | 'jónico'…  (realia abarca varios; el
                //   aprendizaje base sigue siendo ático clásico)
  greek         // el texto griego
  translation   // traducción al español
  descripcion   // contexto, qué es, por qué importa
  words?[]      // desglose palabra↔lema (como en aforismos), opcional
  nivel         // banda de lectura sugerida (Cimientos…B2) → para el "puedes leerla"
  fuente        // { publisher?, library?, url }  ← consultable ("Ver más")
  tags[]        // 'koiné', 'epigrafía', 'NT', 'Josefo'…
  imagen?       // ver nota de licencias abajo
```

## Vista (feature `museo` 🏺)

- **Galería**: tarjetas (título, fecha, tipo, banda). Filtro/orden por nivel.
- **Detalle**: (imagen si la hay) → **griego** → **traducción** → **desglose**
  palabra a palabra (reutiliza el patrón de `aphorisms`) → **descripción** →
  **fuente** ("Ver más", abre la web) → **tags**.
- **Progreso / "¿puedes leerla?"**: cada pieza tiene una **banda** (nivel). Según
  tu nivel (del Camino), se marca **"ya puedes leerla"** o **"sigue subiendo"**.
  Hito motivador anclado al nivel real.

## Licencias y offline (importante)

- **Texto griego** de inscripciones/obras antiguas = **dominio público**. ✅
- **Traducción/descripción**: propias o citadas (Perseus, museo). Citar la fuente.
- **Imágenes**: ⚠️ las fotos de museo suelen tener **derechos**. En v1: **sin imagen
  o solo dominio público / Creative Commons**, o **enlazar** a la fuente para verla.
  No empaquetar fotos con copyright en una app pública.
- **Fuente consultable** = enlace `url` (se abre con conexión; la app sigue offline).

## Curación

La hago yo (Claude), como la pronunciación y la etimología: textos verificados +
traducción + fuente (Perseus, Israel Antiquities Authority, museos…). Ejemplos de
arranque: inscripción del *soreg* (Templo de Jerusalén, koiné), una **inscripción
ática** clásica, un **óstrakon** de ostracismo (¡muy del ático y muy visual!), una
cita de Heráclito/Platón.

## Conexión con lo que ya hay

- Reutiliza el **desglose palabra↔lema** de `aphorisms` y las **bandas de nivel**
  del `Camino`/`progress`.
- Cierra el círculo del proyecto: del alfabeto → vocabulario → gramática → **leer
  una piedra de verdad**.

## Para la constelación

`core/greek/realia.ts` serían **datos reutilizables**; otra app del ecosistema
podría consumir el catálogo de textos reales.
