# Step 9: Archive & Learn - Dark Mode (`closure.md`)

Exit: `CHANGE CLOSED` - archivado con una tarea abierta

## Current truth
- Change archivado como `openspec/changes/archive/2026-10-27-add-dark-mode-toggle/` con `/opsx:archive`.
- Spec principal `openspec/specs/periodic-table-web/spec.md` sincronizada: 8 requisitos (5 de `01-build` + 3 de tema).
- Tarea 4.3 sigue sin marcar: se archivo sin completar la verificacion manual.

## Lecciones
- Disenar el sistema visual con tokens desde `01-build` hizo que el tema oscuro fuera redefinir valores, sin tocar componentes.
- Un script sincrono en `<head>` evita el parpadeo de tema incorrecto.
- Un delta spec solo con `ADDED Requirements` mantiene el change pequeno y la spec base intacta.
- Archivar con tareas abiertas oculta deuda: completar o registrar 4.3 antes de archivar.

## Follow-up
- Completar 4.3 y guardar capturas/contrastes en el repo.
- Tests automatizados de tema y persistencia.
- Valorar tercer modo "sistema" explicito.
- Dividir `script.js` y `styles.css` si siguen creciendo.
- Verificar Safari. Mantener los pendientes de `01-build`.
