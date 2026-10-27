# Step 4: Design - Periodic Table (`design.md`)

Exit: `DESIGN READY`. Artefactos reales: `openspec/.../design.md` y `DESIGN.md` (sistema visual).

## Decisiones
- Cuatro recursos locales: `index.html`, `styles.css`, `data/elements.js`, `script.js`.
- Catalogo en un unico array global cargado como script clasico antes de `script.js`.
- Cuadricula CSS de 18 columnas con celdas de tamano fijo; contenedor con scroll horizontal en pantallas pequenas.
- Series internas bajo una fila divisora de altura de una celda.
- Busqueda por estados visuales (match/dimmed), sin reconstruir la tabla; normalizacion sin mayusculas ni acentos.
- Celdas como `button` con nombre accesible y `aria-pressed`; regiones `aria-live` para resultados y detalles.
- Contenido insertado como texto.

## Sistema visual (`DESIGN.md`)
Tokens de color (10 categorias pastel, modo claro y oscuro), escala tipografica fluida (`clamp(40px, 5vw, 64px)`), celda compacta de 47px entre 1024 y 1290px, panel de detalle lateral, modo `?showcase=1` con estados default, disabled, empty y error.

## Riesgos
Mantenimiento de 118 registros, ancho en moviles, contraste de pasteles, compatibilidad `file://`, rendimiento del resaltado.
