# Anotador de realia 🏺

Herramienta **local** (sin red, sin dependencias) para mapear el texto griego
sobre la foto de una pieza del Museo: calcas cada letra como uno o varios
**trazos** y exporta el JSON `marcas` para pegar en
[`src/core/greek/realia.ts`](../../src/core/greek/realia.ts).

No es un módulo de la app: vive en `tools/` y se usa **al preparar contenido**.
La app móvil solo PINTA esos trazos (offline); aquí se GENERAN.

## Uso

1. Abre `index.html` en un navegador (doble clic, o sírvelo: `npx serve tools/realia-anotador`).
2. **Foto**: carga la imagen de la pieza (la misma que va al Museo).
3. Escribe el **texto de referencia** (lo que pone) para guiarte.
4. **Calca**: toca/clica los puntos de una letra siguiendo la hendidura. Cuando
   termines esa línea, pulsa **Terminar trazo** (o Enter) y sigue con la
   siguiente. Una letra puede llevar varios trazos (p. ej. Θ = círculo + barra).
5. Baja la **opacidad de la foto** si te ayuda a ver los trazos rojos.
6. Pulsa **Copiar** y pega el bloque `marcas: [ … ]` en la entrada de esa pieza
   en `realia.ts`.

Atajos: **Enter** termina el trazo · **Z** deshace el último punto.

## Formato de salida

```ts
marcas: [
  [[0.31, 0.73], [0.30, 0.76], [0.28, 0.78], ...], // un trazo (polilínea)
  [[0.25, 0.73], [0.30, 0.73]],                     // otro trazo
],
```

Cada punto es `[x, y]` en **fracción 0..1** del tamaño de la imagen, así que
encaja en cualquier pantalla (la app usa SVG `viewBox 0..100`, sin deformar el
trazo).

## Futuro (enchufable)

El flujo está pensado para añadir luego un botón **"pre-proponer"** que use un
modelo de visión **local** (en el navegador) para situar las letras y que la
persona solo corrija. Ver `docs/realia-anotador.md`.
