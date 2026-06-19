#!/bin/bash
set -euo pipefail

# SessionStart hook para Claude Code on the web.
# Deja el entorno listo al arrancar cada sesion: instala dependencias para que
# `npm run build` / `npm run typecheck` funcionen desde el primer momento.

# Solo en el entorno remoto (Claude Code on the web). En local no hace nada.
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

# Raiz del repo (con respaldo por si CLAUDE_PROJECT_DIR no estuviera definida).
ROOT="${CLAUDE_PROJECT_DIR:-"$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"}"
cd "$ROOT"

# npm install: idempotente y aprovecha el cacheo del contenedor.
npm install
