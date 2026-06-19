# Roadmap de Agora

> Documento vivo: estado y fases del proyecto. Se actualiza al cerrar cada tarea
> relevante.

## Qué es Agora

App para **aprender a leer y escribir griego antiguo** (ático clásico) de forma
interactiva, con métodos de eficacia probada (repetición espaciada, recuerdo
activo, input comprensible) y gamificación ligera. Pronunciación **reconstruida
ática** (referencia: *Vox Graeca*, W. S. Allen). Es para disfrutar, no para empollar.

## Estado actual

**Fase 1 — Alfabeto.** En curso (paso **1a** completado).

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
- [ ] **1b** — Producción (escribir/elegir la letra) + interleaving.
- [ ] **1c** — Gamificación (XP, racha, dominio, resumen).

### Fase 2 — Vocabulario núcleo

Palabras más frecuentes (lista de frecuencia) con SRS.

### Fase 3 — Lectura graduada

Frases reales un punto por encima del nivel (input comprensible).

### Fase 4 — Morfología

Casos y verbos con drills inteligentes.

## Mejoras futuras (apuntadas, sin fase)

- **Audio** de pronunciación reconstruida (clips grabados; no hay buen TTS).
- **Trazado a dedo** de las letras (escribir dibujándolas).
- Algoritmo SRS más avanzado (tipo SM-2) si hiciera falta.

## Decisiones

- **PWA local-first** (no nativo): se desarrolla en Claude Code web, la seguridad
  es ligera, corre en Android e instalable desde el móvil. Crecer hacia nativo =
  envolver con Capacitor.
- **Pronunciación reconstruida ática** y **dialecto ático clásico**.
- **SRS en `core`** (lo comparten varios features); algoritmo Leitner v1, reemplazable.
