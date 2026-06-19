# Principios de trabajo con Claude Code

> Documento portable y agnóstico de proyecto. NO contiene decisiones de ninguna
> app concreta: contiene mi forma de trabajar. El `CLAUDE.md` lo referencia para
> que Claude entienda cómo colaboro desde el primer commit. Es un documento vivo:
> edítalo cuando aprenda algo nuevo.
>
> Adaptado al desarrollo en **Claude Code en la web** (contenedor en la nube,
> efímero). La versión original estaba pensada para desarrollo nativo en un PC.

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
  plataforma (WebCrypto). Si una tarea parece pedir cripto custom, PARA y avísame.
- Nada de claves, tokens o secretos en el código ni en el repo (van a
  `.gitignore` / variables de entorno).
- Compartimentación: separa por frontera de confianza, no por conveniencia.
- Lo más sensible y peligroso se construye al final, sobre un núcleo ya maduro.

## 3. Arquitectura modular y extensible desde el día uno

- Pienso cada proyecto como una base (`core`) + piezas enchufables (`features`).
- Defino un "contrato" que toda pieza nueva cumple, para poder añadir cosas más
  adelante describiéndoselas a Claude, sin reescribir el núcleo.
- Las piezas dependen del núcleo, nunca entre sí. Bajo acoplamiento, alta cohesión.
- Versiones fijadas y reproducibilidad (lockfile commiteado) para que el mismo
  código se comporte igual en otra máquina o en el futuro.

## 4. Pasos pequeños y verificables (el método anti-atasco)

- Un solo cambio cada vez. Una tarea = una sesión enfocada.
- Después de cada cambio: comprobar que compila (`npm run build` / `typecheck`
  verde) y, si funciona, `git commit`. Ese commit es la red de seguridad.
- Si algo lleva 3-4 intentos sin funcionar: PARAR, volver al último commit verde,
  y probar un paso más pequeño. Nunca acumular parches.
- Mi enemigo no es el código difícil, es el bucle "toco-rompo-toco".

## 5. Plan antes que código (para lo no trivial)

Si la tarea no es trivial, primero un PLAN corto en markdown (qué archivos, en qué
orden, qué decisiones, qué puede salir mal). Espero mi OK antes de implementar.
Los planes grandes se guardan en `docs/` y se trabajan por trozos.

## 6. Gestión del contexto (qué va dónde)

- `CLAUDE.md`: lo permanente (stack, arquitectura, invariantes, contrato, cómo
  trabajamos). Corto y denso, no un libro. Se carga siempre.
- Código del repo: la fuente de verdad. No describir en prosa lo que el código
  ya dice; Claude lo lee cuando lo necesita.
- `docs/*.md`: planes y estado de medio plazo, para sobrevivir entre sesiones.
- Conversación: solo la tarea de ahora.
- Empezar una sesión/tarea limpia al cambiar de tema. Si Claude se vuelve lento o
  despistado, es señal de contexto lleno: resumir el estado a un fichero y retomar.
- Las decisiones importantes que surjan en una sesión se llevan al `CLAUDE.md`.

## 7. Cómo quiero que Claude colabore conmigo

- Párate y pregunta cuando haya ambigüedad real (máx. 3 preguntas útiles); no
  preguntes lo obvio ni lo deducible. Si está claro, confirma en una línea y hazlo.
- Detecta si mezclo tareas/fases distintas y proponme separarlas.
- Dame feedback técnico honesto: si pido una mala idea o hay forma mejor, dímelo
  con el porqué; no me sigas la corriente. Señala complejidad, repetición o
  desvíos de la arquitectura. La seguridad es prioritaria: párate si la ves en riesgo.
- Enséñame: explica conceptos nuevos en 2-3 frases; explica el código no obvio
  para que no lo copie a ciegas; si pregunto "¿por qué?", razónamelo.
- Cuando algo falle, pídeme el error completo (no adivines) y explícame la causa,
  no solo el arreglo.
- Sé directo y constructivo; no hace falta adular ni disculparse de más.

## 8. Entorno y herramientas (Claude Code en la web)

- El desarrollo ocurre en un **contenedor en la nube, efímero**: nace limpio y se
  recicla. Lo que no se commitea y se pushea, se pierde. **Persistir = `git push`.**
- La fuente de verdad es **Git/GitHub**, no la máquina. Eso es lo que hace el
  proyecto portable: puedo seguirlo desde el ordenador o desde otro sitio.
- El acceso a internet depende de la política de red del entorno.
- No hay dispositivo físico conectado: la verificación final en el móvil la hago
  yo. Claude deja el trabajo verde hasta donde el entorno permite.

## 9. El primer paso de cualquier proyecto nuevo

Antes de funcionalidades: entorno que compila + "hola mundo" verde + repo +
commit verde + `CLAUDE.md` con invariantes y contrato. Solo entonces empieza lo demás.

## 10. Documentos vivos

El `CLAUDE.md`, este documento y los planes se editan cuando algo no encaja.
Ajustarlos es parte del método, no una excepción. Revisión periódica: en sesión
limpia, pedir "revisa arquitectura, seguridad, deuda técnica y hábitos y dame
feedback honesto".
