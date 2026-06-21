# Museo / Textos reales — galería de griego "de verdad"

> **Estado:** v1 implementado (feature `museo` 🏺). Galería con piezas reales:
> óstrakon de Temístocles (ático, con foto de dominio público), copa de Néstor
> (poema arcaico) e inscripción del soreg (koiné). Cada pieza con texto, traducción,
> descripción, fuente y un sello "¿puedes leerla?" según tu nivel. Datos en
> `core/greek/realia.ts`. Conecta con la meta: **leer griego en la vida real**.

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

## Pendiente / notas (para retomar tras un clear)

- **Imágenes para las piezas que aún no la tienen**: Copa de Néstor e Inscripción
  del soreg muestran el marcador 🏺 (sin foto). Conseguir imágenes de **licencia
  libre** (Wikimedia PD/CC), reducirlas (`Special:FilePath/...?width=800`),
  empaquetarlas con **crédito + licencia** y su **leyenda** superpuesta.
- **Más piezas variadas**: un vaso con escena firmada (p. ej. firma de Exequias),
  una estela ática, un papiro, la inscripción del Dipylon. Mantener legibles
  (leyenda) y con su banda de nivel.
- **Cobertura visual**: idealmente toda pieza con foto debe llevar `leyenda` para
  que las letras se lean claras sobre la imagen (el usuario lo pidió: "que se vean
  bien"). Para fotos poco legibles, preferir dibujos/facsímiles.
- Recordatorio: imágenes servidas a ~800 px (ligeras), siempre con atribución;
  nada de fotos con "todos los derechos reservados".

## Hecho recientemente

- **Legibilidad de la leyenda sobre la foto**: la transcripción dejó de ser un
  degradado tenue y pasó a un **chip sólido** (fondo opaco + desenfoque + borde +
  sombra de texto), legible sobre cualquier imagen.
- **"Cómo se pronuncia"**: bloque que deletrea la leyenda y muestra el **AFI por
  letra** (reutiliza la fonética curada del alfabeto, helper `spellOut` en
  `core/greek/letters.ts`), más un aviso de las letras que sorprenden a un
  hispanohablante (Θ = «t» aspirada, no «z»).
- **Overlay guía-lectura (v3, a calibrar)**: toggle **🔦 Resaltar letras** que
  **calca las hendiduras** de la inscripción con **líneas rojas translúcidas**
  (SVG) que SIGUEN la forma de cada letra — sin cajas ni etiquetas (eso es el
  *bounding box* de visión por computador antiguo, descartado). Datos:
  `marcas?: Trazo[]` en `core/greek/realia.ts` = lista de **trazos**, cada uno
  una polilínea de puntos `[x,y]` en fracción 0..1 de la imagen (una letra puede
  tener varios trazos, p. ej. Θ = círculo + barra). Apagado por defecto.
  - **Por qué a mano:** no hay detección de glifos en epigrafía viable offline en
    una PWA; se cura a mano.
  - **Cómo calibrar (clave):** el dueño **dibuja los trazos sobre una captura**
    (puede anotar la pantalla) y Claude los **codifica** a coordenadas. Así la
    persona que SÍ ve la foto pone las líneas y Claude solo las traduce a datos.
  - **Estado:** el óstrakon lleva 3 trazos de muestra (placeholder) solo para
    enseñar el estilo; faltan las posiciones reales y el resto de letras/piezas.

## Visión: "Lee la pieza real" (flashcards en el Camino)

> Idea del dueño, muy potente, a desarrollar con tiempo cuando el overlay salga
> fino. Si el trazado funciona bien sobre una pieza, se convierte en un **tipo de
> ejercicio**: dentro del Camino, flashcards con una **imagen de griego real**
> (óstrakon, inscripción, moneda…) donde el usuario tiene que **leer directamente
> lo que pone**, usando el overlay como ayuda graduada (primero sin líneas →
> intenta leer → revela los trazos y la transcripción). Es "encontrar la realidad":
> aplicar lo aprendido a un objeto auténtico. Encaja con la meta del proyecto y
> sería una experiencia muy chula (p. ej. de cara a una visita a Atenas). Depende
> de: (1) overlay calibrado y bonito, (2) un modo de ejercicio que reutilice el
> SRS/XP del núcleo, (3) más piezas con sus trazos.

## Ideas de futuro (apuntadas por el dueño, sin fase)

- **Overlay guía-lectura sobre la imagen real**: en vez de (o además de) la
  leyenda en un chip, un modelo de **detección de letras** identificaría DÓNDE
  está cada letra/palabra en la foto, y se dibujaría encima una capa **muy suave
  y translúcida** (líneas/realces tenues) que resalte el trazado real sin tapar
  la pieza. Objetivo: que se vea la imagen auténtica y, a la vez, ayudar a
  interpretar y leer el texto sobre ella. Reto: la detección/segmentación de
  glifos en epigrafía es difícil; valdría una **anotación curada a mano** de
  cajas (bounding boxes letra↔posición) por pieza como primer paso, sin IA en
  tiempo real. Encaja con "leer una piedra de verdad".
- **Vídeos IA de filósofos hablando en griego**: clips generados (p. ej. Platón /
  Aristóteles) recitando una frase en **ático reconstruido**, con su
  **transcripción** sincronizada. Fase MUY avanzada; depende de TTS de ático de
  calidad (hoy no existe bueno) y de generación de vídeo. Apuntado como norte
  lejano, no como tarea.
