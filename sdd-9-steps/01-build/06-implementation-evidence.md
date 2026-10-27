# Step 6: Implement - Periodic Table

Exit: `IMPLEMENTATION COMPLETE`

## Artefactos
| Fichero | Lineas |
|---------|--------|
| `index.html` | 112 |
| `styles.css` | 956 |
| `script.js` | 284 |
| `data/elements.js` | 122 |
| `DESIGN.md` | 209 |

## Puntos clave
- `validateCatalog()` protege el catalogo de 118 elementos.
- `createTile()` es la primitiva reutilizada para tabla principal y series.
- Seleccion y busqueda no reconstruyen la tabla.

## Alineacion
Sin dependencias externas. Desviacion: la propuesta cita `app.js` y se implemento `script.js`.

## Notas
`script.js` y `styles.css` superan ~250 lineas (aviso de mantenimiento, no criterio de aceptacion). El directorio no tiene commits en git.
