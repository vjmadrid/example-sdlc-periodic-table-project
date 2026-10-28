# Fase 2: Preparación del proyecto periodic-table-openspec

- [Fase 2: Preparación del proyecto periodic-table-openspec](#fase-2-preparación-del-proyecto-periodic-table-openspec)
  - [Paso 1: Crear la estructura del proyecto](#paso-1-crear-la-estructura-del-proyecto)
  - [Paso 2: Inicializar Node.js](#paso-2-inicializar-nodejs)
  - [Paso 3: Inicializar OpenSpec](#paso-3-inicializar-openspec)
  - [Paso 4: Verificación de la inicialización de OpenSpec](#paso-4-verificación-de-la-inicialización-de-openspec)

---

## Paso 1: Crear la estructura del proyecto

Pasos a seguir:

* Crear la estructura básica del proyecto:

```bash
# Comando
mkdir periodic-table-openspec && cd periodic-table-openspec
```

* Verificar que se ha creado la carpeta y que nos encontramos dentro de ella

---

## Paso 2: Inicializar Node.js

Pasos a seguir:

* Ejecutar el siguiente comando para inicializar un proyecto Node.js:

```bash
# Comando
npm init -y
```

* Verificar que se ha creado el archivo `package.json`:

```bash
# Comando
ls -la package.json
```

---

## Paso 3: Inicializar OpenSpec

Pasos a seguir:

* Verificar que nos encontramos en la carpeta del proyecto:

```bash
# Comando
pwd
```

* Ejecutar el siguiente comando para inicializar OpenSpec en el proyecto:

```bash
# Comando
openspec init
```

* Verificar que se levante una interfaz TUI (Text User Interface)

* Seleccionaremos las herramientas

>En mi caso seleccionaré: Claude, Codex y GitHub Copilot

* Confirmar la selección y esperar a que se complete la inicialización

* Verificar que Openspect confirma la inizialización

```bash
# Texto que se mostró el día de la ejecución (Puede variar con la versión utilizada)
✔ Select tools to set up (50 available) Claude Code, Codex, GitHub Copilot
✔ Set up GitHub Copilot cloud coding-agent files? This is for the GitHub-hosted
Copilot coding agent (github.com), not Copilot in your editor. It writes two fil
es: .github/workflows/copilot-setup-steps.yml and .github/agents/openspec.agent.
md. Yes
▌ OpenSpec structure created
✔ Setup complete for Claude Code
✔ Setup complete for Codex
✔ Setup complete for GitHub Copilot

OpenSpec Setup Complete

Created: Claude Code, Codex, GitHub Copilot
6 skills and 6 commands in .claude, .agents, .github/
Commands skipped for: codex (uses skills)
GitHub Copilot cloud files: .github/workflows/copilot-setup-steps.yml, .github/agents/openspec.agent.md
Config: openspec/config.yaml (schema: spec-driven)

Getting started:
  Start your first change: /opsx:propose "your idea" (Claude Code)
  Start your first change: $openspec-propose "your idea" (Codex CLI or IDE); in the Codex desktop app, select openspec-propose from Skills in the sidebar (Codex)
  Start your first change: /opsx-propose "your idea" (GitHub Copilot)

Note: 6 more workflows are available (new, continue, ff, bulk-archive, verify, onboard).
Add them with `openspec config profile`.

Learn more: https://github.com/Fission-AI/OpenSpec
Feedback:   https://github.com/Fission-AI/OpenSpec/issues

Restart your IDE to refresh commands.
```

Se generará uan estructura de proyecto como la siguiente:

```bash
periodic-table-openspec/
├── .agents/             # (Si usas Codex)
│   └── skills/          # Skills de OpenSpec
├── .claude/             # (Si usas Claude Code)
│   ├── commands/opsx/   # Slash commands: propose, explore, apply, archive
│   └── skills/          # Skills de OpenSpec
├── .github/             # (Si usas GitHub Copilot)
│   ├── agents/          # Custom agent for OpenSpec
│   ├── prompts/         # Slash commands: propose, explore, apply, archive
│   ├── skills/          # Skills de OpenSpec
│   └── workflows/       # Workflows
├── openspec/
│   ├── specs/           # Fuente de verdad del sistema
│   ├── changes/         # Cambios propuestos (aislados)
│   └── config.yaml      # Configuracion del proyecto
└── package.json         # Tu proyecto existente
```

Esta estructura y los archivos de configuracións erán creados por openspec en función de las herramientas detectadas o especificadas

---

## Paso 4: Verificación de la inicialización de OpenSpec

Pasos a seguir:

* Verificar la estructura del proyecto:

```bash
# Comando
ls -la openspec/
```

* Listar los cambios propuestos:

```bash
# Comando
openspec list
```

Debería de confirmar que está vacío, ya que no se ha propuesto ningún cambio todavía

* Ver el dashboard interactivo

```bash
# Comando
openspec view
```

Verificar que se muestra el resultado de la ejecución de un comando en la consola tipo TUI
