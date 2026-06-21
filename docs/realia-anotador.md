# Anotador de realia — sistema para mapear texto griego sobre fotos

> Objetivo (dueño): que añadir una pieza al Museo con su **overlay guía-lectura**
> (líneas que calcan las letras sobre la foto) sea **escalable**, sin dirigir foto
> a foto. Un **sistema dentro del repo, en una carpeta `tools/`, NO un módulo** de
> la app. Restricciones: **local, offline, sin APIs de pago**; los datos viven en
> el repo/app y son **migratables**; si hace falta IA, **local**.

## Separar dos cosas (importante)

1. **Runtime (ya hecho):** la app (`features/museo`) pinta trazos rojos sobre la
   foto a partir de `marcas` en `core/greek/realia.ts`. Offline, local, ligero.
   El móvil NO ejecuta IA ni cálculo pesado: solo dibuja datos. Esto se queda.
2. **Autoría (esto es lo que falta):** el pipeline que, dada **foto + texto
   conocido**, genera esos `marcas`. Vive en `tools/` y se ejecuta al PREPARAR el
   contenido (en el repo), no en el móvil. Su salida (JSON de trazos) se commitea.

Esta separación es la que mantiene la app local y migratable: por pesado que sea
el autor, el resultado son unos pocos números que la app ya sabe pintar.

## La verdad sobre la dificultad

Alinear automáticamente un texto **conocido** sobre la foto de una inscripción es
un problema real de visión: hay que **localizar** dónde está cada letra (grabados
desgastados, irregulares, en espiral, con sombras). No es OCR (el texto ya lo
tenemos): es **registro/segmentación**.

- **Totalmente automático y bueno, offline, hoy:** no es realista. Es nivel
  investigación; los modelos buenos no son ligeros ni fiables en epigrafía
  variada. Prometerlo sería deshonesto.
- **Asistido por humano con herramienta rápida:** fiable y escalable **ya**. La
  persona que ve la foto hace una pasada de ~1 min (no dirige por voz).
- **IA local como AYUDA (no magia):** un modelo ligero puede PRE-proponer y el
  humano corrige. Encaja como mejora futura **enchufable** al tool, sin reescribir.

## Opciones de arquitectura

| Opción | Qué es | Local/offline | Escala | Fiabilidad hoy | Esfuerzo |
|---|---|---|---|---|---|
| **A. Anotador asistido** | Página local en `tools/`: cargas foto, ves el texto, marcas el recorrido de las letras (clic/arrastre); exporta el JSON de trazos | Sí (todo en el navegador, sin red) | Alta (1 pasada corta por foto) | Alta | Medio |
| **B. CV clásica de asistencia** | Detectar incisiones por contraste/bordes y proponer trazos a confirmar | Sí | Media | Baja-media (frágil entre fotos) | Medio-alto |
| **C. IA local auto** | Modelo de visión que coloca las letras solo | Sí pero pesado | Alta si funciona | Baja hoy | Alto / I+D |

## Recomendación

**Construir A ahora**, diseñado para **enchufar B/C después** (que pre-rellenen y
el humano corrija). Razón: es lo único que da resultados **buenos y escalables ya**,
cumple local/offline/sin-API, y deja el camino abierto a la IA local cuando sea
fiable — sin tirar nada.

Matiz honesto: en A, la pasada visual la hace **quien ve la foto** (el dueño),
porque yo no veo imágenes. Pero es **una herramienta de clics**, no dirigirme por
voz: cargas, marcas, exporta. Para muchas fotos eso sí escala.

## Plan por fases (si se aprueba A)

1. **`tools/realia-anotador/`** (HTML+TS suelto, fuera del build de la app):
   carga una imagen local, muestra el texto a colocar, permite trazar cada letra
   (puntos normalizados 0..1) y **exporta `marcas` JSON** listo para pegar en
   `realia.ts`. Sin red, sin dependencias nuevas pesadas.
2. **Acabado de trazo:** varios trazos por letra, deshacer, mover puntos, fondo
   con opacidad para calcar cómodo.
3. **Flujo de pieza nueva:** documentar "foto libre → anotador → pegar JSON →
   aparece en el Museo".
4. **(Futuro) Gancho de IA local:** botón "pre-proponer" que llame a un modelo
   en el navegador (ONNX Runtime Web / transformers.js) para situar letras, que
   el humano corrige. Opcional y enchufable.

## Fuera de alcance / a vigilar

- Nada de APIs de pago. Nada de subir fotos a terceros.
- Imágenes solo de licencia libre (igual que el resto del Museo).
- La app móvil sigue sin ejecutar IA: solo pinta los trazos ya calculados.
