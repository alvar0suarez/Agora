# Etimología — árbol de raíces griegas ↔ palabras españolas

> **Estado:** v1 implementado (feature `etimologia`, pestaña 🌳 Raíces): grafo
> navegable raíz↔palabra con un primer set curado (familias `-teca`, `-logía`,
> `-grafía`, `bio-`, `geo-`…). Datos en `core/greek/roots.ts`. Encaja con la meta
> "aprender mejor el español a través del griego".
>
> **Texto ≠ audio (no confundir):** "interpretar" aquí = descomponer una PALABRA en
> raíces (problema de texto, 100% offline). NO tiene nada que ver con "cazar una
> palabra dentro de un audio" (alineación de voz), que es el hilo de YT-Extractor
> (ver `docs/audio.md`). Son dos cosas distintas; esta es solo texto.

## Objetivo

Una vista de **árbol/grafo navegable** que conecta **morfemas griegos** (raíces,
prefijos, sufijos) con las **palabras españolas** que derivan de ellos. Poder
**añadir palabras** (p. ej. *cineteca*) y verlas descompuestas en sus raíces, y
explorar las "familias" (todas las palabras que comparten una raíz).

Ejemplo guía (el del dueño):
- **cineteca** = **cine-** (de κίνημα *kínēma*, "movimiento") + **-teca** (de θήκη
  *thḗkē*, "caja, depósito").
- Familia de **-teca** (θήκη): biblioteca (libros), hemeroteca (periódicos),
  pinacoteca (pinturas), discoteca (discos).
- Familia de **cine-** (κίνημα): cine, cinemática, cinematógrafo.

## Modelo de datos (propuesto: `core/greek/roots.ts`)

```
Root (morfema griego):
  id            // 'theke', 'kinema'
  gr            // 'θήκη', 'κίνημα'
  translit      // 'thēkē'
  forma         // cómo aparece en español: '-teca', 'cine-'
  gloss         // 'caja, depósito' · 'movimiento'
  lemmaId?      // enlace al vocabulario si la raíz ya es una palabra (audio/ficha)

DerivedWord (palabra española):
  word          // 'cineteca', 'biblioteca'
  roots[]       // ['kinema','theke']  (puede ser compuesta = varias raíces)
  nota?         // explicación breve
```

El **árbol** se deriva de estas dos tablas: una raíz → muchas palabras; una palabra
→ una o varias raíces (las compuestas son las que enriquecen el grafo).

## Vista (feature `etimologia`)

- Grafo/árbol **bidireccional y navegable**:
  - tocas una **raíz** → ves su griego, su significado, (su 🔊 si tiene lema con audio)
    y **todas las palabras españolas** que la usan;
  - tocas una **palabra** → ves **sus raíces** y saltas a sus familias.
- Reutiliza el contrato `FeatureModule` + el contexto de navegación ya existentes.

## "Interpretar / generar" — la decisión de arquitectura (igual que la voz)

Descomponer una palabra en sus raíces es el "interpretar" que pides. Regla del
proyecto (local-first, offline, sin claves):

- **En runtime**, descomposición por **morfemas conocidos**: emparejar prefijos/
  sufijos/raíces de la tabla `Root` contra la palabra (p. ej. detectar `-teca`,
  `bio-`, `-logía`). Cubre lo curado; **sin IA, offline**.
- **La curación de calidad la genera Claude en build/curación** (como la
  pronunciación o las glosas): yo descompongo y verifico las palabras, y se commitean
  como datos. Así el contenido es bueno sin coste ni conexión.
- **Auto-descomponer CUALQUIER palabra nueva en el momento** sí necesitaría IA en
  vivo → rompería el offline. Queda fuera del runtime; se hace en curación. (Mismo
  principio que la voz: la inteligencia va en la preparación, no en la app.)

## Conexión con lo que ya hay

- Extiende el campo **`derivados`** del vocabulario (`vocab.ts`: λόγος → lógica,
  biología…). El árbol añade **la capa de morfema/raíz** y, sobre todo, las palabras
  **compuestas** (dos raíces), que `derivados` hoy no modela.
- Refuerza la meta: leer griego **y** entender mejor el español que ya hablas.

## Para la constelación

Las tablas `Root`/`DerivedWord` serían **datos reutilizables** (como el resto de
`core/greek`): otra app del ecosistema podría consumir el mapa de raíces.
