# Step 4: Design - Dark Mode (`design.md`)

Exit: `DESIGN READY`. Artefactos reales: `openspec/.../add-dark-mode-toggle/design.md` y `DESIGN.md` (seccion "Theme Toggle").

## Decisiones
- `data-theme` en `<html>`; tokens oscuros bajo `:root[data-theme="dark"]`.
- Script sincrono en `<head>` fija el tema (guardado o `prefers-color-scheme`) antes del primer pintado, evitando parpadeo.
- Persistencia en `localStorage` (clave `pt-theme`) dentro de `try/catch`; degrada a tema de sesion.
- Boton `<button type="button">` en la cabecera con `aria-pressed`, etiqueta textual ("Modo oscuro"/"Modo claro") e iconos SVG decorativos (`aria-hidden`).
- `color-scheme` por tema para que input y scrollbars nativos coincidan.
- Transicion de color de 240ms, anulada con `prefers-reduced-motion`.
- Seguimiento de `prefers-color-scheme` solo mientras no haya eleccion manual.

## Sistema visual
Se reutiliza la columna "Dark" de `DESIGN.md`; solo cambian valores de color, nunca tamanos.

## Riesgos
| Riesgo | Mitigacion |
|--------|------------|
| Pasteles oscuros pierden contraste | Verificar 4.5:1 por categoria y ajustar token + `DESIGN.md` |
| Script en `<head>` duplica logica | Mantenerlo minimo; `script.js` lee el estado ya aplicado |
| `localStorage` bloqueado | `try/catch` y tema de sesion |
| El cambio altera el layout | Solo colores; comprobar estabilidad de la tabla |
