# Step 5: Tasks - Dark Mode (`tasks.md`)

Exit: `IMPLEMENTATION READY`. Artefacto real: `openspec/.../add-dark-mode-toggle/tasks.md` (4 grupos, 11 tareas).

| Grupo | Contenido | Req relacionado |
|-------|-----------|-----------------|
| 1 Tema oscuro en estilos | `:root[data-theme="dark"]`; `color-scheme`; sin colores literales; transicion + reduced motion | Light and dark theme toggle |
| 2 Boton de tema | boton en cabecera (SVG, etiqueta, `aria-pressed`); estilos de foco, objetivo tactil, movil | Accessible theme control |
| 3 Logica de tema | script en `<head>`; alternancia, `aria-pressed`, etiqueta y guardado; seguir el sistema sin eleccion manual | Theme initial choice and persistence |
| 4 Verificacion | contrastes AA; estabilidad al alternar; teclado/AT, persistencia, primer acceso, `file://`; actualizar `DESIGN.md` | todos |

## Estado al archivar
10 de 11 tareas `[x]`. **Pendiente 4.3**: prueba con teclado y tecnologia de asistencia, persistencia entre visitas, primer acceso con sistema claro/oscuro y apertura desde `file://`.

## Definition of Done
Todas las tareas completadas y verificadas manualmente (no cumplida del todo: ver 4.3).
