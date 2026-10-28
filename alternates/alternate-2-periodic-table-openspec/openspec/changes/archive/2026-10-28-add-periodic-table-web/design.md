# Design

## Context

Proyecto greenfield: solo existe `knowledge/` y la configuración de OpenSpec. Ver `proposal.md` para la motivación y `specs/periodic-table-web/spec.md` para los requisitos.

Restricción determinante: debe abrirse por `file://`. En ese contexto los módulos ES y `fetch` fallan en varios navegadores. Esto contradice las guías `knowledge/dev/languages/javascript.md` y `knowledge/dev/architecture/static-web-app.md` (módulos ES, `fetch`), pero coincide con `knowledge/product/` (prohíbe módulos ES y `fetch`). Se sigue lo de producto, que es la fuente de verdad del comportamiento; el resto de las guías de desarrollo (sin `innerHTML`, `addEventListener`, tokens CSS, Grid, `:focus-visible`, estado único) se aplica.

## Goals / Non-Goals

**Goals:**
- Cuatro ficheros planos, sin build: `index.html`, `styles.css`, `script.js`, `data/elements.js`.
- Separación Data / Logic / Rendering / Entry dentro de esos ficheros, con la lógica en funciones puras sin DOM.
- Geometría de la tabla independiente de búsqueda y selección.

**Non-Goals:**
- Framework de pruebas, linters o empaquetadores (el repositorio no los usa).
- Modo oscuro, persistencia en `localStorage`, animaciones.

## Decisions

**1. Scripts clásicos con `defer`, sin módulos.** `data/elements.js` declara `const PERIODIC_ELEMENTS = [...]` (global, nombre del glosario) y se carga antes que `script.js`; ambos con `<script defer src>`. `script.js` va envuelto en una IIFE para no añadir más globales. Alternativas: módulos ES (fallan en `file://`), `fetch` de JSON (bloqueado en `file://`), datos en línea en HTML (mezcla contenido y estructura).

**2. Posicionamiento explícito con CSS Grid.** La tabla principal es una rejilla de 18 columnas × 7 filas, y cada celda se coloca con `grid-column`/`grid-row` a partir de `group` y `period` (según la guía CSS: tabla con posiciones fijas no usa auto-fit). Columnas `grid-template-columns: repeat(18, var(--cell-size))` con tamaño fijo en `rem`; contenedor con `overflow-x: auto`. Alternativa: `<table>` (el HTML guía lo prefiere para datos tabulares, pero los huecos y las series internas complican la semántica; se usan botones dentro de un contenedor de rejilla CSS etiquetado con `aria-label`).

**3. Series internas en una segunda rejilla separada por una fila vacía.** Tras el período 7 hay una fila separadora vacía con etiqueta «Series internas»; debajo, dos filas de 15 celdas (57–71 y 89–103) alineadas a partir de la columna 3. Se garantiza ≥1 fila vacía entre la tabla principal y las series (requisito del usuario) mediante una fila de rejilla propia, no con margen. En la tabla principal, los grupos 3 de los períodos 6 y 7 muestran una celda de referencia no seleccionable («57–71», «89–103») para conservar el hueco IUPAC; es texto, no elemento.

**4. Celdas como `<button type="button">` con clase `element-tile`.** Foco y activación por teclado gratis; nombre accesible con `aria-label` («Hidrógeno, símbolo H, número atómico 1») y `aria-pressed` para la selección. Se generan con `createElement` y `textContent` (nunca `innerHTML`), dentro de un `DocumentFragment`. El catálogo se trata como dato no confiable al insertarlo.

**5. Estado único en memoria y vista derivada.** `state = { query: '', selectedAtomicNumber: null }`. `render()` deriva clases de las celdas (`is-match`, `is-dimmed`, `is-selected`), el mensaje de estado y la ficha. Los estados legales son los de las reglas de negocio (sin búsqueda / con coincidencias / sin resultados; sin selección / con selección), independientes.

**6. Búsqueda como función pura.** `normalize(text)` = `toLowerCase()` + `normalize('NFD')` + eliminación de marcas diacríticas. `matchElement(element, normalizedQuery)` compara nombre (`includes`), símbolo (igualdad o prefijo, normalizado) y número atómico (igualdad exacta de la cadena). Alternativa de símbolo `includes`: ruidosa («n» coincidiría con muchos); se opta por igualdad/prefijo. Campo vacío → sin búsqueda. Se escucha el evento `input`; no se necesita debounce con 118 elementos.

**7. Estabilidad geométrica.** Celdas de tamaño fijo en `rem`; el estado seleccionado/coincidente/atenuado solo cambia `outline`/`box-shadow` (no afecta a layout), borde de ancho constante reservado de antemano, `opacity` y peso de fuente fijo. La ficha vive en un `<aside>` fuera del contenedor desplazable de la tabla, con `min-height` y `width` definidos y contenido de campos siempre presente (con «—» o «no definida»). Estados no solo por color: atenuado con `opacity` + patrón de texto en el mensaje, seleccionado con contorno grueso y `aria-pressed`, coincidente con contorno discontinuo.

**8. Colores pastel como tokens CSS.** 10 variables `--cat-<categoría>` en `:root` con tonos pastel y texto oscuro (contraste ≥ 4.5:1 a verificar); fondo de página claro. La categoría se asigna mediante `data-category` en cada celda y la leyenda reutiliza los mismos tokens. Alternativa: color en línea desde JS (no permitido por CSP estricta y viola la guía).

**9. Accesibilidad.** Un `<label>` visible para «Buscar un elemento», botón «Limpiar», enlace «Saltar al contenido», `role="status"`/`aria-live="polite"` para el mensaje de resultados y la ficha, `:focus-visible` con contorno claro, `prefers-reduced-motion` respetado (no se usan transiciones). «/» enfoca el buscador salvo que el foco ya esté en un campo de texto.

**10. Validación del catálogo y errores.** Al cargar se comprueba: 118 elementos, números únicos 1–118, categoría válida, posiciones sin colisión. Si falla, se muestra un mensaje en el área de estado (sin trazas) y `console.error` con detalle. `<noscript>` informa de que se requiere JavaScript.

**11. Estructura de `data/elements.js`.** Cada elemento: `{ atomicNumber, symbol, name, atomicMass, category, period, group, electronConfiguration, electronegativity }`; `electronegativity: null` cuando no está definida. Lantánidos y actínidos tienen `group: null` y se posicionan por orden en las series internas (campo `series` derivado en lógica, no en datos). Un comentario documenta la forma una sola vez. Los datos de masa/configuración/electronegatividad (escala de Pauling) deben transcribirse de una fuente fiable y citarla en un comentario.

## Risks / Trade-offs

- [Datos de 118 elementos transcritos a mano con errores] → Validación al cargar y revisión contra una fuente citada; comprobación de conteo y posiciones.
- [Comportamiento de `normalize('NFD')` / `file://` distinto entre navegadores] → Verificación manual en Chrome, Firefox y Safari por `file://`.
- [Contraste insuficiente en algunos pasteles] → Texto oscuro fijo y medición del contraste por categoría.
- [Globales por scripts clásicos] → IIFE en `script.js`; único global declarado: `PERIODIC_ELEMENTS`.
- [Ancho de la tabla (18 columnas) mayor que móviles] → Contenedor con `overflow-x: auto` y pista de deslizamiento; la ficha queda fuera del contenedor.
- [Sin framework de pruebas] → Lógica pura verificable en consola/navegador y comprobación manual guiada por escenarios; no se añade tooling.

## Migration Plan

No aplica (producto nuevo). Despliegue: copiar los ficheros a cualquier sitio o abrir `index.html`. Reversión: eliminar los ficheros.
