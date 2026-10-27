# Proposal - Periodic Table (`proposal.md`)

Exit: `PROPOSAL READY`. Artefacto real: `openspec/changes/build-periodic-table-web-app/proposal.md`

## Why
Tabla periodica interactiva, clara y explorable, utilizable sin servidor, con experiencia visual atractiva.

## What changes
- App estatica (HTML, CSS3, JS Vanilla) con los 118 elementos.
- Fondo claro y colores pastel por categoria.
- Lantanidos y actinidos en filas separadas, con al menos una fila visual de separacion.
- Buscador en tiempo real por nombre, simbolo y numero atomico.
- Panel de detalles estable.

## Capabilities nuevas
`periodic-table-display`, `element-search`, `element-details-panel`.

## Impacto
Sin APIs, backend, framework ni dependencias externas.

## Nota de trazabilidad
La propuesta menciona `app.js`; el diseno y la implementacion usan `script.js`.
