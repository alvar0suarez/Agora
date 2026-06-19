# Principios de trabajo con Claude Code + GitHub

> Documento portable y agnóstico de proyecto. NO contiene decisiones de ninguna
> app concreta: contiene mi forma de trabajar. Cópialo (o referéncialo) desde el
> CLAUDE.md de cualquier repositorio nuevo para que Claude entienda cómo colaboro
> desde el primer commit. Es un documento vivo: edítalo cuando aprenda algo nuevo.

---

## 0. Sobre mí (contexto fijo)
Soy técnico (informático) pero NO soy desarrollador de apps profesional.
Desarrollo por "vibe coding": yo dirijo, Claude teclea. Mi papel es arquitecto y
revisor, no mecanógrafo. Prioriza enseñarme el porqué, no solo darme el resultado.

## 1. Local-first y privacidad por defecto
Salvo que diga lo contrario, mis proyectos son personales, de un solo usuario, y
los datos viven en mi dispositivo. Nada de multiusuario, cuentas o terceros por
defecto. La nube (si la hay) es solo réplica/backup cifrado, no el cerebro.

## 2. La seguridad es un cimiento, no un añadido
- Se construye el núcleo de seguridad ANTES que las funcionalidades.
- Nunca criptografía hecha a mano: solo librerías auditadas y primitivas de
  plataforma. Si una tarea parece pedir cripto custom, PARA y avísame.
- Nada de claves, tokens, contraseñas o secretos en el código ni en el repo
  (van a .gitignore / gestor seguro / variables de entorno).
- Compartimentación: separa por frontera de confianza, no por conveniencia.
- Lo más sensible y peligroso se construye al final, sobre un núcleo ya maduro.

## 3. Arquitectura modular y extensible desde el día uno
- Pienso cada proyecto como una base (`core`) + piezas enchufables (`features`).
- Defino un "contrato" que toda pieza nueva cumple, para poder añadir cosas más
  adelante describiéndoselas a Claude, sin reescribir el núcleo.
- Las piezas dependen del núcleo, nunca entre sí. Bajo acoplamiento, alta cohesión.
- Versiones fijadas y reproducibilidad (lockfiles / version catalogs / wrapper)
  para que el mismo código compile igual en otra máquina o en el futuro.

## 4. Pasos pequeños y verificables (el método anti-atasco)
- Un solo cambio cada vez. Una tarea = una sesión enfocada.
- Después de cada cambio: compilar, probar en el dispositivo real, y si funciona,
  `git commit`. Ese commit es la red de seguridad.
- Si algo lleva 3-4 intentos sin funcionar: PARAR, `git reset` al último commit
  verde, y probar un paso más pequeño. Nunca acumular parches.
- Mi enemigo no es el código difícil, es el bucle "toco-rompo-toco".

## 5. Plan antes que código (para lo no trivial)
Si la tarea no es trivial, primero un PLAN corto en markdown (qué archivos, en qué
orden, qué decisiones, qué puede salir mal). Espero mi OK antes de implementar.
Los planes grandes se guardan en `docs/` y se trabajan por trozos.

## 6. Gestión del contexto (qué va dónde)
- `CLAUDE.md`: lo permanente (stack, arquitectura, invariantes, contrato, cómo
  trabajamos). Corto y denso (~200 líneas), no un libro. Se carga siempre.
- Código del repo: la fuente de verdad. No describir en prosa lo que el código
  ya dice; Claude lo lee cuando lo necesita. Yo no pego código a mano.
- `docs/*.md`: planes y estado de medio plazo, para sobrevivir entre sesiones.
- Conversación: solo la tarea de ahora.
- `/clear` al cambiar de tarea. Si Claude se vuelve lento o despistado, es señal
  de contexto lleno: resumir el estado a un fichero, `/clear`, y retomar.
- Las decisiones importantes que surjan en una sesión se llevan al CLAUDE.md.

## 7. Cómo quiero que Claude colabore conmigo
- Párate y pregunta cuando haya ambigüedad real (máx. 3 preguntas útiles); no
  preguntes lo obvio ni lo deducible. Si está claro, confirma en una línea y hazlo.
- Detecta si mezclo tareas/fases distintas y proponme separarlas (commit + /clear).
- Dame feedback técnico honesto: si pido una mala idea o hay forma mejor, dímelo
  con el porqué; no me sigas la corriente. Señala complejidad, repetición o
  desvíos de la arquitectura. La seguridad es prioritaria: párate si la ves en riesgo.
- Enséñame: explica conceptos nuevos en 2-3 frases; explica el código no obvio
  para que no lo copie a ciegas; si pregunto "¿por qué?", razónamelo.
- Cuando algo falle, pídeme el error completo (no adivines) y explícame la causa,
  no solo el arreglo.
- Sé directo y constructivo; no hace falta adular ni disculparse de más.

## 8. Modelo de máquina y herramientas (mi setup)
- Desarrollo en un PC potente (Windows + WSL2); el dispositivo de pruebas es real.
- Acceso remoto seguro solo por VPN privada (Tailscale), nunca exponiendo puertos.
- Sesiones largas en tmux para que el trabajo sobreviva a cortes de red.
- Aprovecho mi suscripción Max: Sonnet/Haiku para andamiaje, Opus para
  arquitectura, seguridad y refactors.
- Aíslo experimentos (git worktrees) para no romper lo que funciona.

## 9. El primer paso de cualquier proyecto nuevo
Antes de funcionalidades: entorno que compila + "hola mundo" verde en el
dispositivo real + repo privado + commit verde + CLAUDE.md con invariantes y
contrato. Solo entonces empieza lo demás.

## 10. Documentos vivos
El CLAUDE.md, este documento y los planes se editan cuando algo no encaja.
Ajustarlos es parte del método, no una excepción. Revisión periódica: en sesión
limpia, pedir "revisa arquitectura, seguridad, deuda técnica y hábitos y dame
feedback honesto".

---

### Cómo usar este documento en un proyecto nuevo
1. Copia este fichero al repo como `docs/principios.md`.
2. En el `CLAUDE.md` del proyecto, añade al principio:
   "Lee `docs/principios.md` y síguelo en cada interacción. Lo de abajo son las
   decisiones específicas de ESTE proyecto."
3. Debajo, escribe solo lo propio del proyecto (stack concreto, módulos, dominios).
Así separas tu forma de trabajar (estable, reutilizable) de las decisiones de
cada proyecto (cambiantes).
