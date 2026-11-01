# Design

## Context

Proyecto greenfield: solo existe `knowledge/`. Los requisitos de producto están en `specs/periodic-table-web/spec.md` (ver `proposal.md` para la motivación).

Hay un conflicto entre fuentes que se resuelve aquí: las guías `knowledge/dev/` recomiendan ES modules y `fetch`, pero `knowledge/product/` exige abrir por `file://` sin módulos ES ni `fetch`. **Prevalece el producto**: scripts clásicos con `defer`. Se conservan de las guías la separación datos/lógica/render, el uso de `textContent`, tokens CSS y `:focus-visible`.

## Goals / Non-Goals

**Goals:**
- Aplicación estática de 4 archivos que funciona por `file://`.
- Lógica (normalización, búsqueda, validación) en funciones puras sin DOM.
- Geometría de la tabla independiente del estado de búsqueda y selección.

**Non-Goals:**
- Build, framework de tests, servidor, persistencia (`localStorage`), modo oscuro, internacionalización.

## Decisions

**1. Estructura de archivos** (la de `product.md`): `index.html`, `styles.css`, `script.js`, `data/elements.js`. Alternativa descartada: `css/` y `js/` con varios módulos; sin módulos ES no aportan aislamiento real.

**2. Scripts clásicos con `defer`, orden `data/elements.js` → `script.js`.** `elements.js` declara `PERIODIC_ELEMENTS` (global, nombre del glosario). Alternativa descartada: JSON + `fetch` (bloqueado en `file://`).
`script.js` se organiza en una IIFE con tres bloques: lógica pura (`normalizeText`, `matchElements`, `validateCatalog`), render (crea celdas con `createElement`/`textContent`) y entrada (eventos y estado). Sin handlers inline.

**3. Modelo de datos.** Cada elemento: `{ atomicNumber, symbol, name, atomicMass, category, period, group, electronConfiguration, electronegativity }`. `category` ∈ `alkali, alkaline, transition, post-transition, metalloid, nonmetal, halogen, noble, lanthanide, actinide`. `electronegativity` es `null` si no está definida. Para lantánidos y actínidos, `group` es `null` y se les asigna posición en las series internas por número atómico (57–71, 89–103). Un comentario al inicio documenta la forma.

**4. Disposición con CSS Grid y posiciones explícitas.** Tabla principal: rejilla de 18 columnas × 7 filas con `grid-column`/`grid-row` por elemento (el patrón auto-fit queda descartado por las guías para tablas de posición fija). Las series internas ocupan las filas 9 y 10 de la misma rejilla, con la fila 8 vacía como separador y el rótulo «Series internas» en la fila 8; las series empiezan en la columna 3. Celdas de tamaño fijo en `rem` (p. ej. `4rem × 4.5rem`) con `flex: none`; el contenedor tiene `overflow-x: auto` y la tabla un `min-width` natural, de modo que en ventanas estrechas se desliza dentro del contenedor y la página no tiene scroll horizontal. Las cabeceras de grupo (1–18) y período (1–7) se incluyen en la rejilla.

**5. Celdas como `<button type="button">`** con `aria-label` («Hierro, símbolo Fe, número atómico 26») y `aria-pressed` para la selección. Se elige `<button>` frente a `<table>` por ser la celda una acción, y por el glosario (celda = botón). Los contenedores llevan `role="group"` con nombre accesible. Orden de foco: enlace «Saltar al contenido» → búsqueda → «Limpiar» → celdas en orden de número atómico.

**6. Estado en memoria y vista derivada.** `state = { query, selectedNumber }`. Una función `render()` aplica clases/atributos a las celdas existentes; nunca crea ni elimina celdas tras la carga (garantiza geometría estable). Máquina de estados: búsqueda {sin búsqueda, con coincidencias, sin resultados} y selección {ninguna, una}, independientes.

**7. Búsqueda.** `normalizeText` = `trim` + `toLowerCase` + `normalize('NFD')` + eliminar `̀-ͯ`. Coincide si el nombre normalizado incluye la consulta, el símbolo normalizado es igual a la consulta, o el número atómico (como cadena) es igual a la consulta. Se usa igualdad para símbolo y número para evitar que «1» o «c» coincidan con casi todo. Se ejecuta en cada evento `input` (118 elementos: sin debounce).

**8. Estados no cromáticos.** Coincidencia: borde grueso + el resto con opacidad reducida; selección: borde doble y `aria-pressed="true"`; foco: `:focus-visible` con contorno de alto contraste. Colores pastel como tokens `--cat-*` en `:root`, con texto oscuro (contraste ≥ 4.5:1, verificado en el asistente de contraste del navegador). Las celdas atenuadas usan opacidad 0.75 (contraste ≥ 4.5:1 calculado sobre el peor pastel), y la coincidencia se distingue además por borde y negrita.

**9. Ficha de detalles.** Región `<section aria-labelledby>` con altura mínima y ancho fijos, bajo la barra de búsqueda y **no** dentro de la rejilla; siempre renderizada con una ficha vacía («Selecciona un elemento»). Los 9 campos se actualizan con `textContent`. Electronegatividad ausente → «No definida».

**10. Regiones vivas.** Un `<p role="status" aria-live="polite">` para el estado de búsqueda («12 coincidencias», «Sin resultados») y otro para el anuncio de selección. La ficha en sí no es región viva para no duplicar anuncios.

**11. Validación del catálogo al cargar.** `validateCatalog` comprueba 118 elementos, números únicos 1–118, categoría válida y posición válida; si falla, se muestra un `role="alert"` y no se pinta la tabla.

**12. Atajo «/»** en `keydown` de `document`, ignorado si el foco está en `input`, `textarea` o elemento editable; `preventDefault` evita escribir el carácter.

**13. Sin red ni CSP inline.** Sin `<style>` ni `<script>` inline ni handlers inline. Se añade `<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'self'; script-src 'self'; img-src 'self'">`. Si el CSP por `file://` diera problemas en Safari, se retira (ver riesgos).

**Pruebas.** Sin framework de tests (las guías lo prohíben sin petición). Las funciones puras se verifican con un script de Node de usar y tirar ejecutado desde la línea de comandos sobre una copia temporal (no se añade al repo), más una comprobación manual en el navegador.

## Risks / Trade-offs

- [Datos de 118 elementos escritos a mano con errores] → `validateCatalog` en carga y verificación cruzada de una muestra (H, Fe, U, Og, grupos y períodos) contra una fuente fiable.
- [CSP meta o `file://` se comporta distinto entre navegadores] → verificar en Chrome, Firefox y Safari; si falla, retirar el meta y documentarlo.
- [Rejilla con celdas fijas desborda móviles] → es el comportamiento exigido: scroll horizontal interno con pista visible.
- [Pastel con poco contraste] → texto oscuro y verificación de contraste por categoría.
- [Scripts clásicos exponen un global `PERIODIC_ELEMENTS`] → aceptado por exigencia de `file://`; el resto del código queda en una IIFE.

## Open Questions

- Valores exactos de electronegatividad (Pauling) y configuración para elementos superpesados (≈ 104–118): se usarán valores publicados o «No definida»; no cambia specs ni tareas.
