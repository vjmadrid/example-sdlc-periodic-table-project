# Step 6: Implement - Dark Mode

Exit: `IMPLEMENTATION COMPLETE` (con la tarea 4.3 pendiente)

Ejecutado con `/opsx:apply add-dark-mode-toggle`.

## Artefactos
| Fichero | Lineas (antes -> despues) | Cambio |
|---------|---------------------------|--------|
| `index.html` | 112 -> 132 | script de tema en `<head>`; boton `#theme-toggle` con SVG luna/sol |
| `styles.css` | 956 -> 1038 | tokens `:root[data-theme="dark"]`, `color-scheme`, estilos del boton, transicion |
| `script.js` | 284 -> 333 | `currentTheme`, `applyTheme`, `toggleTheme`, `enableThemeToggle`, listener de `prefers-color-scheme` |
| `data/elements.js` | 122 -> 122 | sin cambios |
| `DESIGN.md` | 209 -> 219 | seccion "Theme Toggle" |

## Puntos clave
- Clave de almacenamiento `pt-theme`; solo se aceptan los valores `light` y `dark`.
- `toggleTheme()` anade la clase `theme-transition` 300ms y guarda la eleccion en `try/catch`.
- La logica de lectura del tema inicial esta duplicada (head y `script.js`) a proposito para evitar parpadeo.

## Alineacion
Sin dependencias externas. La tabla, la busqueda y la seleccion no se tocan.

## Notas
`styles.css` (1038) y `script.js` (333) siguen creciendo sobre el aviso de mantenimiento de `01-build`.
