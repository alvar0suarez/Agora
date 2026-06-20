# Plan: voz / audio del alfabeto (próxima tarea)

> Nota de decisión para retomar en sesión limpia. Resume el porqué y el cómo para
> no volver a derivarlo. Pendiente: plan corto + OK del dueño antes de codificar.

## Objetivo

Que la app **pronuncie** las letras (y, más adelante, vocabulario), para aprender
de oído la **pronunciación reconstruida ática**. Encaja sobre todo con el modo
**"Escribir"**, donde el estímulo natural es el sonido (hoy se muestra como texto:
transliteración + AFI + pista).

## El problema (importante)

**No existe un TTS bueno para griego ático reconstruido.** Y hay una trampa:

- ⚠️ **Descartado: TTS de griego MODERNO** (la voz "el" del sistema). El moderno
  pronuncia distinto al ático (β=v vs b; η=i vs e larga; φ/θ/χ fricativas vs
  aspiradas…). Enseñaría la pronunciación **equivocada**: justo lo contrario del
  objetivo.

## Opciones

| Opción | Calidad | Coste | Offline |
|---|---|---|---|
| **Clips pregrabados** (1 audio/letra) | La mejor (voz humana correcta) | Hay que conseguir/grabar 24 audios | ✅ |
| **eSpeak-NG (grc) por WASM** | Robótica, pero apunta a la reconstrucción | Dependencia nueva (~MB en la PWA) | ✅ |
| ~~TTS griego moderno~~ | Suena bien pero enseña mal | — | descartado |

## Recomendación

**eSpeak-NG (grc) vía WASM** como v1: funciona offline y apunta a los sonidos
correctos, sin depender de grabaciones. **Diseñar el contrato para poder
sustituirlo por clips pregrabados** cuando haya voz humana (mejor calidad).

## Encaje en la arquitectura (contrato de módulo)

- Servicio de audio en **`core`** (p. ej. `src/core/audio/`): interfaz tipo
  `pronounce(letter)` / `speak(...)`, con una implementación eSpeak-WASM detrás.
  Los features lo usan; el contrato se respeta (features → core, nunca entre sí).
- Los datos de la letra ya están en `core/greek` (incluyen `ipa`), útiles para
  alimentar al motor.

## Integración en la UI (feature alfabeto)

- **Reconocer**: botón de altavoz al revelar la respuesta.
- **Escribir**: el estímulo como **audio** (botón "oír de nuevo"), además del texto.

## Consideraciones / riesgos

- **Dependencia nueva y peso**: eSpeak-WASM pesa (datos de voz). Afecta al precache
  offline de la PWA. Requiere OK explícito (CLAUDE.md: no añadir libs sin justificar).
- **No se puede probar el audio aquí** (contenedor sin sonido): la prueba real la
  hace el dueño en el móvil. Aquí se deja verde (build + typecheck + tests de la
  lógica que no sea de reproducción).
- Empezar por un **espurio pequeño** (una letra) para validar que el WASM carga y
  suena en el móvil antes de cablear toda la UI.

## Pasos sugeridos

1. Plan corto + OK (qué paquete WASM exacto, tamaño, licencia).
2. Servicio de audio en `core` con interfaz + implementación eSpeak-WASM.
3. Probar con UNA letra (botón altavoz en "Reconocer").
4. Integrar en ambos modos. Tests de lo testeable.
5. Dejar el contrato listo para clips pregrabados (mejora futura).
