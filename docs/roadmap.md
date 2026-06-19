# Roadmap — Agora

Resumen del plan de 3 fases. El detalle canónico original está en el master prompt
del proyecto; aquí queda la versión de trabajo. Se trabaja **una tarea por sesión**,
con commit verde entre tareas.

## Fase 1 — MVP (Semanas 1–10)
App funcional: leer griego con lookup de vocabulario, ejercicios básicos y SRS.
Sin AI, sin audio, sin cuentas.

- **S1–2 Fundación:** monorepo, modelos `core`, schema Drift, repos, seed DCC,
  go_router con 5 rutas. ← *estamos aquí*
- **S3–4 Reader + lookup:** tokenización politónica, `WordLookupSheet`, 5 textos.
- **S5–7 Ejercicios + lecciones:** 4 tipos de ejercicio, sesión de lección,
  10 unidades seed.
- **S8–10 SRS + progreso + pulido:** FSRS real, review UI, dashboard, tema
  claro/oscuro, onboarding.

## Fase 2 — Core features (Semanas 11–20)
Audio (S11–12), teclado politónico (S13–14), cuentas + sync opcional Firebase
(S15–16), 20 unidades de currículo (S17–18), gamificación completa + placement
test (S19–20).

## Fase 3 — App C2 completa (Semanas 21–40)
Tutor AI con Claude (S21–24), currículo C1–C2 + textos auténticos (S25–28),
layout desktop + modo lectura avanzado (S29–32), evaluaciones formales por nivel
con IRT/CAT (S33–36), pulido, accesibilidad y launch (S37–40).

## Design system (resumen — detalle al implementar UI)
Sensación de "manuscrito clásico digital". Paleta: azul ático `#2C3E7A`, pergamino
`#FAFAF7`, ocre `#C4862B`. Griego siempre en Noto Serif. Gamificación académica,
no infantil (Stellar Mastery Map, streak con "ember decay", XP que solo sube).
NUNCA: vidas, timers de presión, mensajes de vergüenza, comparaciones sociales.

## Docs por fase (a crear cuando toque)
- Fase 1: `architecture.md`, `database_schema.md`, `content_format.md`, READMEs.
- Fase 2: `audio_architecture.md`, `sync_protocol.md`, `curriculum_map.md`,
  `gamification_spec.md`.
- Fase 3: `api_integration.md`, `assessment_spec.md`, `desktop_layout.md`.
