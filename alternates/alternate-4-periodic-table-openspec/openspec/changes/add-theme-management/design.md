# Design

## Context

Estado actual (ver `proposal.md` para la motivación):

- `styles.css` define todos los colores como custom properties en `:root` (`--bg`, `--surface`, `--text`, `--text-muted`, `--border`, `--focus`, `--accent`, `--cat-*`) y los consume con `var()` (`styles.css:1-26`). Hay un único tema claro. Quedan literales sueltos: el error usa `#9b1c1c`/`#7a1010` (`styles.css:306-307`).
- `index.html` carga `data/elements.js` y `script.js` con `defer` (`index.html:9-10`) y declara una CSP con `script-src 'self'` (sin scripts en línea).
- `script.js` es un script clásico (IIFE, sin módulos ES) que expone lógica pura en `PeriodicTableLogic` y deja el DOM tras `typeof document === 'undefined'` (`script.js:95-104`), lo que permite probar la lógica en Node.
- La cabecera es `.page-header` con `<h1>` y una `.toolbar` (`index.html:16-25`); el selector irá en la esquina superior derecha.
- Restricciones del proyecto: funcionar por `file://` sin build, módulos ES, `fetch` ni red; texto en español; `localStorage` permitido para preferencias de tema y sin datos personales, tratando su contenido como no confiable (`knowledge/dev/architecture/static-web-app.md`, `knowledge/dev/languages/javascript.md`); tokens de color en un solo sitio y sin `!important` (`knowledge/dev/languages/css.md`); respetar `prefers-reduced-motion`.
- Conflicto con el conocimiento de producto: `knowledge/product/` afirma «sin persistencia» y «color pastel sobre fondo claro». ED-44 exige persistir la elección; se actualiza ese conocimiento en las tareas.

## Goals / Non-Goals

**Goals:**
- Resolver el tema con una función pura (elección guardada → programación nocturna → sistema) probable en Node.
- Aplicar el tema antes del primer pintado para evitar un parpadeo del tema equivocado.
- Cumplir WCAG 2.2 AA y mantener la geometría estable de la tabla.

**Non-Goals:**
- Más de tres temas, ajustes por usuario de la ventana nocturna u horario configurable.
- Sincronizar entre dispositivos o guardar en servidor.
- Introducir un framework, build, módulos ES o una biblioteca de pruebas.

## Decisions

### 1. Un `theme.js` aparte, cargado sin `defer` en `<head>`
La lógica de tema va en un nuevo `theme.js` (script clásico, IIFE, mismo patrón que `script.js`) cargado de forma síncrona antes de la hoja de estilos. Lee el almacenamiento y fija `data-theme` en `<html>` antes del primer pintado.
- **Alternativa A:** poner la lógica en `script.js` (`defer`). Descartada: el atributo se fijaría después del pintado y habría un parpadeo del tema claro.
- **Alternativa B:** script en línea en `<head>`. Descartada: la CSP del proyecto prohíbe scripts en línea.
- **Alternativa C:** solo CSS con `prefers-color-scheme`. Descartada: no admite elección manual, ni persistencia, ni programación horaria.

`theme.js` es pequeño y síncrono; su coste es una petición local (0 red). Separa la responsabilidad de tema de la de tabla (límites del documento de arquitectura: Lógica sin DOM / Entrada con DOM).

### 2. Función pura de resolución
`resolveTheme({ choice, hour, systemDark })` devuelve `'light' | 'dark' | 'nocturnal'`:
1. `choice` válido (`light`, `dark`, `nocturnal`) → ese tema.
2. Si no (`auto` o ausente/inválido): hora local ≥ 22 o < 6 → `nocturnal`.
3. Si no: `systemDark ? 'dark' : 'light'`.

Se expone como `window.PeriodicTableTheme` con `resolveTheme`, `normalizeChoice` y constantes, bajo el mismo guardado `typeof document === 'undefined'` que `script.js`, para probarla con `node` sin DOM. El enlace al DOM (leer/escribir almacenamiento, `matchMedia`, `storage`, selector) queda en la misma IIFE tras ese guardado.

### 3. Modelo de estado: elección vs tema resuelto
Se guardan solo dos conceptos: la **elección** (`auto | light | dark | nocturnal`) y el **tema resuelto** derivado. En `localStorage` se persiste solo la elección, en la clave `periodic-table-theme`; «Automático» borra la clave. Así la programación nunca sobrescribe una elección manual (regla de borde de ED-44) y cada pestaña puede recalcular el tema resuelto por su cuenta.

Lectura: `try { getItem } catch` → valor no válido o error ⇒ `auto`. Escritura: `try { setItem/removeItem } catch` ignora el fallo; la elección vive en memoria durante la sesión.

### 4. Tokens CSS por tema
`styles.css` mantiene un único juego de nombres de tokens. `:root` conserva los valores del tema Claro; `:root[data-theme="dark"]` y `:root[data-theme="nocturnal"]` solo redefinen valores (incluidos `--cat-*`, `--focus` y un nuevo `--error`/`--error-text` que sustituye los literales del aviso de error). Cada bloque declara `color-scheme` (`light` / `dark`) para controles nativos y barras de desplazamiento. No se usa `!important`; la especificidad es plana (un atributo + `:root`).

Sin JavaScript no hay `data-theme` y se mantiene el tema Claro; la página ya indica que requiere JavaScript (`<noscript>`).

Paleta: Oscuro = fondos gris azulado oscuro con texto claro (evitar negro puro y blanco puro para limitar el deslumbramiento); Nocturno = fondos marrón oscuro y texto crema, con categorías de tendencia cálida y baja saturación. Los valores concretos se fijan en implementación y se validan con una comprobación de contraste (ver tareas): texto/fondo ≥ 4,5:1, indicadores y foco ≥ 3:1, y 10 categorías distinguibles entre sí por luminosidad/tono. Los indicadores de coincidencia, atenuado y selección ya usan contorno, no solo color (`styles.css:218-233`); `.is-dim { opacity: 0.75 }` se revisa en los temas oscuros para no producir estados «apagados».

### 5. Selector: `<select>` nativo
Un `<select id="theme">` con `<label>` «Tema» y cuatro opciones (Automático, Claro, Oscuro, Nocturno), colocado en la esquina superior derecha de `.page-header` (flex con `justify-content: space-between` junto al `<h1>`). Un `<select>` nativo da nombre accesible, teclado, anuncio del valor y compatibilidad con colores forzados sin trabajo adicional.
- **Alternativa A:** botón que rota entre temas. Descartada: no comunica el estado actual con claridad ni permite volver a «Automático».
- **Alternativa B:** grupo de radios personalizado. Descartada: más marcado y estilo sin ventaja para cuatro opciones.

El cambio se anuncia en una región viva (`role="status"`, `aria-live="polite"`, p. ej. «Tema Nocturno activado»), reutilizando el patrón de `#selection-announce`. El texto del anuncio se inserta con `textContent`.

### 6. Reevaluación de la programación
Con `auto`, un `setInterval` de 60 s (y una reevaluación al volver a ser visible la pestaña mediante `visibilitychange`) recalcula `resolveTheme` y solo toca el DOM si el resultado cambia. Esto cubre las fronteras de las 22:00 y las 06:00, los cambios de reloj y los de zona horaria sin depender de un `setTimeout` calculado que se desfasaría. Con una elección manual el intervalo no hace nada. También se escucha el cambio de `matchMedia('(prefers-color-scheme: dark)')`.

- **Alternativa:** `setTimeout` hasta la próxima frontera. Descartada: se rompe con saltos de reloj y zona; el sondeo de 60 s es trivial en coste.

### 7. Sincronización entre pestañas
El evento `storage` de `window` (clave `periodic-table-theme`) recalcula la elección y el tema y actualiza el selector. Sin `BroadcastChannel`: `storage` basta, funciona por `file://` en los navegadores objetivo y evita una API más. Cuando el almacenamiento no está disponible no hay sincronización, y es aceptable.

### 8. Transiciones y rendimiento
No se añaden transiciones: cambiar `data-theme` repinta de inmediato (< 100 ms, solo se reasignan custom properties). El bloque `prefers-reduced-motion` existente (`styles.css:314-319`) ya anula cualquier transición futura. Esto cumple «movimiento reducido» por construcción y encaja con el no objetivo de producto de «animaciones complejas».

### 9. Colores forzados (alto contraste del SO)
Bajo `@media (forced-colors: active)` no se redefinen colores de texto ni de fondo (el navegador los impone). Se asegura que celdas, selector y estados mantengan borde visible (`border` ya presente; los contornos de `.is-match`/`.is-selected` usan `CanvasText` en ese modo) y que `.legend-swatch` conserve un borde. Los tokens por tema simplemente quedan sin efecto en los elementos que el navegador fuerza.

### 10. Verificación
Sin framework de pruebas en el repositorio (`package.json` no define `test`), y el conocimiento de proyecto prohíbe añadir uno sin pedirlo. Se añade `tests/theme.test.js` ejecutable con `node` y `node:assert` (sin dependencias) para la lógica pura, un script de comprobación de contraste de los tokens, y una lista de verificación manual en navegador para DOM, teclado, pestañas, almacenamiento bloqueado y contraste alto.

## Risks / Trade-offs

- [Parpadeo del tema equivocado al cargar] → `theme.js` síncrono en `<head>` fija `data-theme` antes del pintado; el coste es un script bloqueante pequeño y local.
- [Fin de la ventana nocturna no especificado en ED-44] → Se asume 06:00 y se anota en la propuesta y el spec; es una constante única en `theme.js`, fácil de cambiar.
- [Categorías indistinguibles en temas oscuros] → Validación de contraste y de distancia entre colores como tarea explícita; la leyenda y la ficha siguen dando el nombre de la categoría.
- [`localStorage` bloqueado en `file://` en algunos navegadores] → Todo acceso va en `try/catch` con degradación a `auto`; el tema sigue cambiando durante la sesión.
- [Contradicción con el conocimiento de producto («sin persistencia»)] → Se actualiza `knowledge/product/` en este change; solo se guarda el identificador del tema.
- [Sondeo de 60 s con tema Nocturno programado puede retrasar el cambio hasta 1 min] → Aceptable: la programación es de horas; la elección manual es inmediata.
- [Pestaña oculta con temporizador estrangulado] → `visibilitychange` reevalúa al volver.

## Open Questions

- ¿Debe el tema Nocturno programado terminar a las 06:00? Se asume así; no cambia la estructura, solo una constante.
