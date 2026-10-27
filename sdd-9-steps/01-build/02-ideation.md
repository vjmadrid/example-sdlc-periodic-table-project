# Step 2: Ideation - Periodic Table

Pregunta: que podriamos hacer. Salida: `SOLUTION DIRECTION READY`

## Alternativas (las recogidas en `design.md`)
| # | Opcion | Decision |
|---|--------|----------|
| A | HTML unico con CSS y JS embebidos | Descartada: dificulta evolucion y revision por capas |
| B | `index.html` + `styles.css` + `data/elements.js` + `script.js` | Elegida |
| C | Filtrar reconstruyendo la tabla (quitar nodos) | Descartada: provoca saltos de geometria |
| D | Marcar coincidencias con clases CSS sobre celdas fijas | Elegida |
| E | Datos via `fetch`/modulos ES | Descartada: rompe `file://` |

## Supuestos
- Los 118 elementos y sus datos pueden mantenerse en un unico array local.
- Desplazamiento horizontal es aceptable en pantallas estrechas.

## Experimentos / referencias
Investigacion visual registrada en `DESIGN.md` (seccion Research Log): referencias educativas y composicion con panel lateral, tabla centrada y bloque f separado.
