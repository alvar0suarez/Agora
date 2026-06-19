# Estado del proyecto (documento vivo)

Actualizar al cerrar cada sesión. Sirve para retomar tras un `/clear` o en otra
máquina sin releer toda la conversación.

## Última sesión — Fundación (Fase 1, S1–2)

### Hecho y verde
- Monorepo: Melos ^7 + Dart pub workspace. `flutter pub get` resuelve los 8
  packages juntos (93 deps, sin conflictos).
- Toolchain: Flutter 3.44.2 / Dart 3.12.2 instalado en `~/flutter`.
- `analysis_options.yaml` con `very_good_analysis`.
- `core`: 6 modelos freezed (`Word`, `Lesson`, `ReviewCard`, `ReviewLog`,
  `UserProgress`, `FsrsCardState`) + enums; 4 interfaces de repositorio
  (`Word/Lesson/Review/Progress`). Barrel `core.dart`.
- Tests: 20 unit tests en `core` (serialización, equality, copyWith) → **verdes**.
- `dart analyze` en `core` → **limpio**.
- `CLAUDE.md` lean + `docs/principios.md` + `docs/modo-colaboracion.md` +
  `docs/roadmap.md`.

### Decisiones tomadas
- **freezed 3.x** en vez del `^2.x` del master prompt: es lo que compila con
  Dart 3.12. (Sintaxis `abstract class X with _$X`.)
- Generados (`*.freezed.dart`/`*.g.dart`) y `pubspec.lock` SE committean.
- Packages no-core declaran solo su frontera + dep a `core`; las deps pesadas
  (drift, riverpod, etc.) se añaden cuando se implemente cada uno.
- `Lesson` referencia ejercicios/vocabulario por id (el modelo `Exercise`
  completo es de S5–7).

### Pendiente / próximos pasos
1. **(este o próximo)** Hook de SessionStart para instalar Flutter en sesiones web.
2. **Siguiente tarea (S1–2, resto):** schema Drift en `data/`, DAOs, repos
   concretos implementando las interfaces de `core`, seed `dcc_vocabulary.json`,
   test de migración. Luego go_router con las 5 rutas.

### A vigilar (deuda/riesgos)
- Apps (`apps/mobile`, `apps/desktop`) aún sin `main.dart` ni carpetas de
  plataforma (android/ etc.). Se generan al empezar el scaffolding de UI.
- Contenedor web es efímero: sin el hook de sesión, hay que reinstalar Flutter
  cada sesión.
