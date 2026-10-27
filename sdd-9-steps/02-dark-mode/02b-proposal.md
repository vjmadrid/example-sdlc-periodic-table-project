# Proposal - Dark Mode (`proposal.md`)

Exit: `PROPOSAL READY`. Artefacto real: `openspec/changes/add-dark-mode-toggle/proposal.md` (archivado en `openspec/changes/archive/2026-10-27-add-dark-mode-toggle/`)

Generado con `/opsx:propose Quiero anadir un boton en la zona superior que facilite cambiar entre el modo oscuro y el modo claro`.

## Why
La pagina solo tiene tema claro y no respeta la preferencia del sistema, aunque `DESIGN.md` ya define la paleta oscura.

## What changes
- Boton en la zona superior que alterna claro/oscuro.
- Paleta oscura de `DESIGN.md` aplicada a toda la interfaz, con pasteles legibles y distinguibles.
- Tema inicial segun `prefers-color-scheme`; eleccion manual recordada entre visitas.
- Boton accesible: nombre, estado no solo por color, teclado, foco visible.

## Capabilities
- Nuevas: ninguna.
- Modificadas: `periodic-table-web` (requisitos de alternancia y persistencia de tema).

## Impacto
`index.html` (control), `styles.css` (tokens oscuros y boton), `script.js` (logica). Sin dependencias ni red; sigue funcionando por `file://`.

## Supuestos
Almacenamiento local al navegador; sin tercer modo "automatico".
