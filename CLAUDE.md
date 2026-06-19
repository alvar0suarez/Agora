# CLAUDE.md — Agora

> **Lee primero `docs/principios.md` y `docs/modo-colaboracion.md` y síguelos en
> cada interacción.** Eso es CÓMO trabajamos (estable, reutilizable). Lo de abajo
> son las decisiones específicas de ESTE proyecto (cambiantes). Mantén este
> fichero corto y denso: lo permanente va aquí; los planes y el estado de medio
> plazo viven en `docs/`; el código es la fuente de verdad, no lo repitas en prosa.

## Qué es Agora
App multiplataforma (Android + Desktop) para aprender **griego antiguo ático**
de cero a C2, desde una sola base de código **Flutter/Dart**. Offline-first.
Proyecto largo en 3 fases — ver `docs/roadmap.md`.

## Estado actual (actualizar al cerrar cada sesión)
- **Fase 1, Semanas 1–2 (Fundación).** En curso.
- Hecho: monorepo (Melos + pub workspace), 8 packages andamiados, modelos `core`
  con freezed + interfaces de repositorio, tests verdes, `dart analyze` limpio.
- Siguiente: schema Drift en `data/` + repos concretos (ver `docs/roadmap.md`).
- Detalle vivo de progreso/decisiones: `docs/estado.md`.

## Stack (fijado — no cambiar sin discutirlo)
- Flutter 3.44 / **Dart 3.12**. State: **Riverpod ^2.6**. Nav: **go_router ^14**.
- DB: **Drift** (SQLite, offline-first). HTTP: **dio ^5**. Audio: **just_audio**.
- Modelos: **freezed 3.x + json_serializable** (NOTA: el master prompt decía
  freezed ^2.x; con Dart 3.12 usamos 3.x, que es lo que resuelve y compila).
- SRS: paquete **fsrs**. Monorepo: **Melos ^7** + Dart pub workspaces.
- Tests: `test` / `flutter_test` + `mocktail`. Lint: `very_good_analysis`.

## Arquitectura — el contrato (invariantes; no romper)
1. **Dependencias apuntan a `core`.** `core` es Dart puro, sin Flutter, sin
   dependencias de nadie. Todos dependen de `core`; los demás packages NO
   dependen entre sí salvo vía interfaces de `core`.
2. **MVVM estricto.** Cero lógica de negocio en widgets.
3. **Acceso a datos solo por repositorios** (interfaces en `core/`,
   implementación en `data/`). La UI nunca toca DAOs/Drift directamente.
4. **Inyección por providers de Riverpod.** Nada de singletons globales.
5. **Pure-Dart cuando se pueda** (`core`, `srs_engine`, `ai_service`).

### Mapa de packages
- `core` — modelos (freezed) + interfaces de repositorio. **Sin Flutter.**
- `srs_engine` — FSRS (Dart puro). Depende de `core`.
- `ai_service` — cliente Claude (Fase 3). Dart puro. Depende de `core`.
- `audio_service` — just_audio + TTS (Fase 2).
- `data` — Drift: DB, DAOs, repos concretos.
- `ui_components` — widgets/tema/pantallas compartidas (Flutter).
- `apps/mobile`, `apps/desktop` — entry points.

> Las deps pesadas (drift, riverpod, go_router, fsrs, dio) se añaden al package
> en la sesión en que se implementa, no antes. Hoy los packages no-core solo
> declaran su frontera y dependen de `core`.

## Privacidad y seguridad (principios §1, §2 — prioritario)
- **Local-first, un solo usuario.** Datos en el dispositivo. Sin cuentas ni nube
  por defecto (la sync de Fase 2 es opcional y va sobre un núcleo ya maduro).
- **Sin secretos en el repo.** La API key de Claude (Fase 3) va por variable de
  entorno / almacenamiento seguro, nunca en código ni en git. Ver `.gitignore`.
- **Sin cripto a mano.** Si algo lo pide, PARA y avísame.

## Convenciones
- Ficheros `snake_case.dart`; clases `PascalCase`; constantes `kNombre`; privados `_x`.
- **Un fichero de test por fichero de `lib/`** (estructura espejo). Patrón
  Arrange-Act-Assert. Mocks con `mocktail`, nunca implementaciones reales.
- Cada test nombra qué verifica ("returns null when word not in DCC").
- Generados (`*.freezed.dart`, `*.g.dart`) SÍ se commitean; `pubspec.lock` también.
- Commits convencionales: `feat(srs): ...`, `test(data): ...`, `fix(reader): ...`.

## Comandos (toolchain en `~/flutter`; en web la instala el hook de sesión)
```bash
export PATH="$HOME/flutter/bin:$PATH"
flutter pub get                          # resuelve todo el workspace
dart run build_runner build              # codegen freezed/json/drift (en el package)
melos run test        # tests de todos los packages
melos run analyze     # análisis estático (--fatal-infos)
```

## Reglas de avance
- Una tarea = una sesión. Commit verde antes de cambiar de tema; luego `/clear`.
- Plan corto y mi OK antes de código no trivial (modo-colaboracion §3).
- No adelantar fases: si pido algo de una fase posterior, apúntalo en
  `docs/ideas.md` y seguimos con lo de ahora.
