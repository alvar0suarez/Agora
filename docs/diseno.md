# Revisión de diseño (UX / estética)

> Encargo del dueño: *"imagina que le paso el proyecto, de forma aséptica, a un
> diseñador que solo es diseñador, y me dice: solo cambiaría esto y esto —sin
> tocar funcionalidad ni la filosofía de la app"*. Esto es esa lectura.
>
> **Reglas de la revisión:** no se cambia ninguna funcionalidad, ni la navegación,
> ni el contrato de módulos, ni la dirección local-first. Solo coherencia visual:
> color, espaciado, tipografía, ritmo y consistencia entre features. Cambios
> reversibles y de bajo riesgo. El dueño verifica en el móvil; aquí se deja verde.

## Contexto técnico (estado actual)

- Un solo `src/index.css` (~1.300 líneas), cascada global + BEM por feature.
- **Bien:** variables de color en `:root` (`--bg --surface --surface-2 --text
  --muted --accent`), modo oscuro coherente, componentes base reutilizables
  (`Card`, `SessionHeader`, teclado), `:focus-visible` consistente, animaciones
  de feedback (pop/shake) estables.
- **Flojo:** cada feature reinventa su propio BEM (`alfabeto__`, `vocab-*`,
  `museo-*`, `camino__`, `etim-*`, `aphorism__`…) con estilos parecidos
  duplicados; colores de feedback (verde/rojo) **hardcodeados** repetidos; sin
  escala de **espaciado** ni de **tipografía** (tamaños y gaps sueltos: 0.35,
  0.4, 0.5, 0.7, 0.9, 1, 1.2, 1.5, 2, 2.5rem…).

## Hallazgos y recomendaciones (priorizados)

Cada uno: **qué se ve · por qué importa · cambio mínimo**. Pensado para ejecutarse
de arriba abajo; los primeros no cambian nada visible (son cimiento), los
siguientes ya pulen.

### 1. Tokens de diseño (cimiento, sin cambio visual)
- **Qué:** no hay escala de espaciado ni de tipografía; los colores de feedback
  (éxito/error) son literales repetidos.
- **Por qué:** sin tokens, cada feature nuevo añade más deriva; con ellos, todo
  se vuelve coherente y ajustable desde un sitio.
- **Cambio:** añadir en `:root`:
  - Espaciado: `--space-1…6` (p. ej. 4/8/12/16/24/32px) y usarlos en gaps/padding.
  - Tipografía: `--text-xs/sm/base/lg/xl/2xl` (escala modular) + `--leading-*`.
  - Color semántico: `--success`, `--success-soft`, `--danger`, `--danger-soft`,
    `--accent-contrast`. Sustituir los `#14532d / #991b1b / #dcfce7…` por estos.
  - Radios: `--radius-sm/md/lg` (8/12/16) ya casi unificados.
  Es puramente interno: el aspecto no cambia, pero queda gobernado.

### 2. Ritmo vertical y consistencia de espaciado
- **Qué:** entre pantallas, los huecos varían sin patrón.
- **Cambio:** aplicar la escala `--space-*` a `.card`, `.modes`, `.grade`,
  cabeceras y listas. Un único "stack" vertical (gap fijo) por pantalla.

### 3. Botones (unificar y tamaño táctil)
- **Qué:** `.btn`, `.mode-btn`, `.keypad__key` con paddings dispares; en móvil
  conviene **altura mínima táctil ≥ 44px**.
- **Cambio:** una base `.btn` con tamaños (`--btn-pad`), y que las variantes
  (`--primary/--good/--again/--ghost`) solo cambien color, no geometría.

### 4. Jerarquía tipográfica
- **Qué:** muchos tamaños ad-hoc; los títulos de feature y los textos griegos no
  siguen una escala común.
- **Cambio:** mapear títulos/cuerpo/aux a `--text-*`. El **griego** (glifos,
  aforismos) merece su propio rol tipográfico (tamaño generoso, buen interlineado)
  para que respire y luzca — es el protagonista.

### 5. Navegación inferior (8 destinos)
- **Qué:** Inicio · Camino · Alfabeto · Vocabulario · Lectura · Gramática · Raíces
  · Museo. En pantallas estrechas, 8 iconos aprietan y el texto se corta.
- **Cambio (estético, sin quitar features):** revisar tamaño/scroll horizontal o
  agrupar visualmente; iconos con un set coherente (hoy son emojis de estilos
  distintos: 🏠🗺️🔤📚📜🏛️🌳🏺 — dispares en peso/relleno). *Nota:* unificar el
  set de iconos es lo único que rozaría "cambiar cosas"; se hace solo si el dueño
  quiere, manteniendo los mismos destinos.

### 6. Tarjetas y estados
- **Qué:** `.museo-card`, `.vocab-mastery__row`, `.plan__step`, `.etim-item`
  comparten forma pero con CSS distinto.
- **Cambio:** un patrón común "fila/tarjeta de lista" reutilizable (mismo radio,
  padding, borde, hover), parametrizado por color de acento.

### 7. Color de feedback semántico
- **Qué:** verde/rojo de acierto/fallo repetidos como literales en varios sitios.
- **Cambio:** unificar a `--success*/--danger*` (ver punto 1). Revisar contraste
  AA del texto sobre esos fondos.

## Plan de ejecución (seguro, por fases)

1. **Tokens** (punto 1): añadir variables, sin tocar valores visibles. Verde.
2. **Sustituir literales** por tokens feature a feature (color → spacing → type),
   un commit pequeño por bloque, comparando que no cambia el aspecto salvo lo
   buscado. El dueño revisa en el móvil entre fases.
3. **Pulidos** (puntos 2–7) ya con criterio, uno cada vez.

## Qué NO se toca

- Funcionalidad, lógica, SRS/XP, navegación, contrato `FeatureModule`,
  arquitectura `core`/`features`, dirección local-first. Solo la capa visual.

## Pendiente de decidir (dueño)

- ¿Unificar el **set de iconos** de la barra inferior (único cambio que altera un
  pelín lo visible más allá de pulir)? 
- ¿Algún **color de marca** distinto del azul actual, o se mantiene la paleta?
