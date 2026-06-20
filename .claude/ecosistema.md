<!-- GENERADO por ecosistema/montar-mapa.py. NO editar a mano:
     edita la `.claude/ficha.md` de cada app (o ecosistema/ficha-plantilla.md para una nueva). -->

# Mapa de aplicaciones (el ecosistema)

> **Fuente de verdad única** de mi constelación de apps personales: qué hay, qué
> hace cada una, cómo se relacionan y en qué estado están. Vive **aquí**, en
> `claude-starter`.
>
> Por qué aquí: en Claude Code en la web cada sesión ve **un repo**. Para que,
> trabajando en una app, Claude *sepa* que existen las demás y cómo enlazan, esa
> información tiene que estar escrita y commiteada en un sitio estable. Ese sitio
> es este documento, y baja a cada repo como `.claude/ecosistema.md`.

## Cómo se mantiene (bidireccional y automático)

- **Cada app es dueña de SU ficha.** Declara lo suyo en `.claude/ficha.md` (qué
  expone, qué consume, relaciones, estado). Solo eso; nada de lógica interna.
- ⬆️ **Sube:** el sincronizador lee la ficha de cada app y reensambla este mapa.
- ⬇️ **Baja:** este mapa, ya ensamblado, vuelve a cada app como `.claude/ecosistema.md`.
- **Por construcción, una app solo puede tocar su propio hueco.** No puede
  reescribir la ficha de otra ni el mapa entero (ver `ecosistema/README.md`).

## Cómo se usa esto (el modelo mental)

- **Conocimiento, no acceso.** Esto hace que Claude *conozca* las apps hermanas
  (qué son, qué exponen, cómo enlazan). No da acceso a su código.
- **Una sola fuente.** Las apps no guardan una copia divergente: declaran su ficha
  y reciben el mapa ensamblado.
- **Opt-in.** Solo entran las apps del allowlist (`.github/constelacion.txt`).

## Convenciones

- **hub** — app central a la que enlazan las demás. Hoy: **Nous**.
- **expone** — datos/capacidades que otras apps pueden consumir.
- **consume** — lo que esta app toma de otra.
- **estado** — `idea` · `arrancando` · `en curso` · `usable` · `maduro`.
- **repo** — `owner/nombre` en GitHub.

## Resumen

| App | Qué es | Stack | Estado | Repo |
|---|---|---|---|---|
| 🧠 **Nous** (hub) | Cerebro digital: notas, libros y archivos, local-first en el móvil | Nativo (Kotlin/Compose) | en curso | `alvar0suarez/Nous` |
| 📚 **Agora** | Flashcards de griego antiguo (tipo Anki) | PWA (Vite+React+TS) | usable | `alvar0suarez/Agora` |
| 🔥 **Prometeo** | App personal para aprender plasma (estudio/contenido) | PWA (probable) | arrancando | `alvar0suarez/Prometeo` |
| 🎬 **YT-Extractor** | Descarga transcripciones de YouTube a una carpeta del móvil | Nativo (Android/Kotlin) | en curso | `alvar0suarez/YT-Extractor` |

---

## Fichas

### 🧠 Nous — Cerebro digital: notas, libros y archivos, local-first en el móvil

- **Stack:** Nativo (Kotlin/Compose)
- **Expone:** Destino natural de notas/archivos que generan las demás (transcripciones, material de estudio)
- **Consume:** —
- **Relaciones:** YT-Extractor y Agora pueden depositar contenido aquí
- **Estado:** en curso
- **Repo:** `alvar0suarez/Nous`

El centro del ecosistema. Datos masivos en el dispositivo → keystore con respaldo
por hardware (ver `docs/elegir-stack.md`).

### 📚 Agora — Flashcards de griego antiguo (tipo Anki)

- **Stack:** PWA (Vite+React+TS)
- **Expone:** Material/notas de estudio que podrían archivarse en Nous
- **Consume:** (potencial) textos o recortes guardados en Nous
- **Relaciones:** Patrón estudio→cerebro: archiva material en Nous
- **Estado:** usable
- **Repo:** `alvar0suarez/Agora`

Origen del método. PWA desplegada por URL (GitHub Pages); si la quieres en el
cajón de apps, se envuelve en APK sin reescribir.

### 🔥 Prometeo — App personal para aprender plasma (estudio/contenido)

- **Stack:** PWA (probable)
- **Expone:** Resúmenes y notas de estudio de plasma
- **Consume:** (potencial) material guardado en Nous
- **Relaciones:** Archiva sus resúmenes de plasma en Nous (hub); mismo patrón estudio→cerebro que Agora
- **Estado:** arrancando
- **Repo:** `alvar0suarez/Prometeo`

Primera app incorporada a la constelación tras crear el mapa. La línea de
Relaciones es su "contrato" inicial.

### 🎬 YT-Extractor — Descarga transcripciones de YouTube a una carpeta del móvil

- **Stack:** Nativo (Android/Kotlin)
- **Expone:** Ficheros de transcripción en una carpeta vigilable
- **Consume:** —
- **Relaciones:** Su salida es candidata a ser ingerida por Nous (carpeta → cerebro)
- **Estado:** en curso
- **Repo:** `alvar0suarez/YT-Extractor`

Alias *Pájaro*. Pide capacidades del sistema (guardar en carpetas, segundo plano)
→ por eso nativo y no PWA.

## Añadir una app a la constelación

1. Añade su `owner/repo` a `.github/constelacion.txt`.
2. En su repo, copia `ecosistema/ficha-plantilla.md` a `.claude/ficha.md` y rellénala.
El sincronizador hace el resto: integra su ficha aquí y baja el mapa a todas.
