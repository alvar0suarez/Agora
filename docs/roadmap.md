# Roadmap de Agora

> Documento vivo: estado y fases del proyecto. Se actualiza al cerrar cada tarea
> relevante.

## Qué es Agora

App para **aprender a leer y escribir griego antiguo** (ático clásico) de forma
interactiva, con métodos de eficacia probada (repetición espaciada, recuerdo
activo, input comprensible) y gamificación ligera. Pronunciación **reconstruida
ática** (referencia: *Vox Graeca*, W. S. Allen). Es para disfrutar, no para empollar.

## Meta y alcance

**Meta:** leer y comprender **aforismos y citas filosóficas** en ático clásico —el
griego que aparece citado (a menudo sin traducir) en los libros de filosofía— sin
depender de la traducción. Ejemplos del objetivo: γνῶθι σεαυτόν, ἓν οἶδα ὅτι
οὐδὲν οἶδα, πάντα ῥεῖ, y términos clave como λόγος, ἀρετή, ψυχή, εὐδαιμονία.

Esto fija el nivel y orienta las fases siguientes:

- **Vocabulario (Fase 2):** núcleo sesgado al **léxico filosófico** (Presocráticos,
  Platón, Aristóteles, estoicos) + las palabras-función de altísima frecuencia
  (artículo, καί, οὐ, partículas) presentes en cualquier frase.
- **Lectura (Fase 3):** **aforismos y γνῶμαι** (sentencias breves) reales, de menos
  a más — el formato natural de "lo que se ve en los libros": frases cortas y
  autocontenidas.
- **Morfología (Fase 4):** solo la necesaria para **parsear esas frases** (casos,
  participio e infinitivo —omnipresentes en filosofía—, formas verbales comunes).
  No gramática exhaustiva.

**Fuera de alcance:** producción libre y conversación (la app es de lectura y de
escritura por reconocimiento, no de redacción).

## Estado actual

**Fase 1 — Alfabeto.** Pasos **1a** (reconocer) y **1b** (escribir) completados,
más la **voz/audio** del alfabeto (v1: clips pregenerados con eSpeak + fonemas
reconstruidos; robótica pero correcta — ver `docs/audio.md`). La app está
**desplegada** como PWA en GitHub Pages
(https://alvar0suarez.github.io/Agora/), con auto-deploy en cada push a `main`.

**Próxima tarea: Fase 1c — gamificación ligera** (XP, racha, dominio, resumen,
interleaving). Plan en `docs/fase-1.md`.

## El método (resumen)

- **Repetición espaciada** + **recuerdo activo**: los dos pilares con más evidencia.
- **Input comprensible / lectura graduada**: para leer de verdad (fases posteriores).
- **Mnemotecnia + interleaving**: para fijar y no aburrir.
- **Gamificación**: capa de motivación, anclada al recuerdo real (no a tocar botones).

## Fases

### Fase 0 — Cimiento ✅

Esqueleto PWA local-first, arquitectura modular, docs.

### Fase 1 — Alfabeto griego (en curso)

Leer y escribir las 24 letras desde cero, con SRS + gamificación ligera.
Ver `docs/fase-1.md`.

- [x] **1a** — Motor SRS (`core/srs`) + 24 letras + sesión de reconocimiento.
- [x] **1b** — Producción: te damos el sonido → eliges el glifo (elección
  múltiple). Cartas SRS separadas por dirección (`rec` / `prod`). Tests con Vitest.
- [ ] **1c** — Gamificación (XP, racha, dominio, resumen) + interleaving (mezclar
  reconocer/escribir en una misma sesión).

### Fase 2 — Vocabulario núcleo

Palabras más frecuentes (lista de frecuencia) con SRS.

### Fase 3 — Lectura graduada

Frases reales un punto por encima del nivel (input comprensible).

### Fase 4 — Morfología

Casos y verbos con drills inteligentes.

## Mejoras futuras (apuntadas, sin fase)

- **Audio/voz** de pronunciación reconstruida → **v1 hecho** (clips eSpeak con
  fonemas curados, robótico; plan y pendientes en `docs/audio.md`). Mejora futura:
  **clips de voz humana** (sustituibles archivo a archivo, sin tocar features).
- **Trazado a dedo** de las letras (escribir dibujándolas).
- Algoritmo SRS más avanzado (tipo SM-2) si hiciera falta.

## Decisiones

- **PWA local-first** (no nativo): se desarrolla en Claude Code web, la seguridad
  es ligera, corre en Android e instalable desde el móvil. Crecer hacia nativo =
  envolver con Capacitor.
- **Pronunciación reconstruida ática** y **dialecto ático clásico**.
- **SRS en `core`** (lo comparten varios features); algoritmo Leitner v1, reemplazable.
- **Datos del alfabeto en `core/greek`** (no en el feature): los comparten los
  modos reconocer y escribir, y el contrato prohíbe que los features dependan
  entre sí.
- **Producción por elección múltiple**, no por teclado: la app es móvil y no hay
  teclado griego cómodo. El trazado/escritura a dedo queda como mejora futura.
- **Tests con Vitest** (`npm test`): lógica pura (SRS, opciones). La verificación
  interactiva final en el móvil la hace el dueño.
