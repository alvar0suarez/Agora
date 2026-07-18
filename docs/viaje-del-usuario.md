# El viaje del usuario (replanteamiento)

> Rediseño profundo pedido por el dueño (jul-2026): la app está "dispersa" —
> muchas pestañas, ejercicios sueltos, y al final siempre haces los mismos—.
> Este documento replantea Agora ENTERA como un único viaje guiado: el de una
> persona que empieza de cero y quiere llegar a leer (y oír, y decir) griego
> antiguo. Documento de diseño: se implementa por fases, cada una un PR.

## Diagnóstico (por qué se siente dispersa)

1. **No hay "lección"**: hay ÁREAS (alfabeto, vocab, lectura…) con MODOS dentro,
   pero nada que diga "hoy te toca esto, en este orden, por esta razón".
2. **«Entrenar» mezcla, pero no guía**: intercala tipos sobre lo vencido del
   SRS; no introduce contenido nuevo con intención ni varía según el momento.
   Resultado: sesiones parecidas un día tras otro (lo que notas).
3. **La teoría está aparcada** en una pestaña: no aparece cuando toca (los
   casos ANTES del primer drill de declinación, no cuando te acuerdes).
4. **El oído no dirige** (aunque ya tenemos voz neuronal para todo): el audio
   acompaña, no es el estímulo.

## La visión: unidades con arco, como se aprende de verdad

La columna vertebral pasa a ser una **secuencia de UNIDADES** pequeñas (5-8
min), cada una con el mismo ARCO pedagógico (el del rector "aprender de oído"):

```
1 OÍR      lo nuevo entra por el oído: suena la palabra/letra/frase,
           luego se ve escrita, luego el significado (input comprensible)
2 ASOCIAR  reconocimiento rápido de lo recién oído + repasos SRS intercalados
3 USAR     producción: teclear · hueco (cloze) · construir frase · DICTADO
4 DECIR    shadowing: óyelo y repítelo en voz alta (autocalificado)
5 PREMIO   cierre: un aforismo leído por la voz, una pieza de museo, XP/logros
```

Y **paradas de teoría** intercaladas en la secuencia, justo antes de la unidad
que las necesita (acentos antes de leer; casos antes de declinar; artículo
antes de las frases con artículo…).

## Estructura propuesta

- **`core/curso` (nuevo, en el núcleo):**
  - **Syllabus declarativo**: lista ordenada de unidades. Cada unidad declara
    qué introduce (ids de letras/palabras/aforismos/formas), qué teoría abre,
    y su tipo (aprender / repaso / hito). Añadir contenido = añadir unidades.
  - **Constructor de sesión**: funde posición en el syllabus + vencidos del SRS
    + reglas de variedad (nunca dos veces seguidas el mismo tipo; el estímulo
    es SONORO en al menos la mitad de los pasos). Puro y testeado.
- **«Hoy» (UI principal)**: un botón grande «Continuar» que corre la siguiente
  unidad. Sustituye el papel de Inicio+Entrenar como puerta de entrada. Si hay
  mucho vencido, la unidad de hoy es de repaso (el syllabus espera).
- **«Camino»** pasa a ser el MAPA del syllabus: las unidades como paradas (con
  las de teoría visibles), tu posición, lo ya dominado. Tocar una parada hecha
  = repasarla; la actual = continuar.
- **«Practicar»** queda como práctica libre por áreas (lo de hoy). «Museo» y
  «Nous» siguen igual (premios/consulta).
- **Se conserva TODO el motor**: SRS, XP/racha/logros, prompts compartidos.
  Las unidades REUTILIZAN los prompts existentes; no se reescriben ejercicios.

## Fases (cada una un PR pequeño, verde)

- **F1 — Dictado (transcripción) + oído como estímulo** ✅
  Nuevo tipo «dictado»: OYES la palabra (voz neuronal) y la escribes con el
  teclado griego. Y el reconocer de vocabulario auto-reproduce la palabra.
- **F2 — `core/curso` + «Hoy»** ✅ (OK del dueño: "unificarlo todo")
  Syllabus v1 (~45 unidades: 6 de letras + 18 de palabras + 15 de lectura +
  5 paradas de teoría, todo el contenido existente reaprovechado) +
  constructor de sesión con el arco (intro sonora → reconocer → dictado/
  teclear → repasos SRS → museo) + pantalla «Hoy» con «Continuar» y posición
  persistida. Barra: **Hoy · Camino · Practicar · Museo** (Inicio y Entrenar
  siguen accesibles desde Hoy). Los prompts y el catálogo de ejercicios
  subieron a `core` (una sola fuente para Entrenar y Hoy).
  *Pendiente de F2.x:* unidades de morfología (conjugar/declinar) en el
  syllabus cuando exista su tipo de ejercicio en el catálogo.
- **F3 — Camino = mapa del syllabus** con paradas de teoría en su sitio.
- **F4 — DECIR (shadowing) y premios**: paso de repetir en voz alta al final de
  cada unidad; cierre con aforismo leído/pieza de museo.
- **F5 — Simplificar**: «Entrenar» se convierte en «sesión libre» (o se retira
  si «Hoy» lo cubre); limpiar navegación al resultado final:
  **Hoy · Camino · Practicar · Museo** (+ Nous dentro de Practicar).

## Qué necesita OK del dueño

- La estructura de navegación final (F5): ¿te cuadra «Hoy · Camino · Practicar
  · Museo»?
- El tamaño de unidad (5-8 min, ~10-14 pasos): ¿bien para tu ritmo?
- F2 reordena la puerta de entrada de la app: confirma antes de que lo toque.
