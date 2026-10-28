# Proposal

## Why

No existe todavía el producto: el repositorio solo contiene la base de conocimiento (`knowledge/`) y la configuración de OpenSpec. Se quiere una tabla periódica interactiva en español que cualquier persona abra desde un archivo local (`file://`), sin servidor, red ni instalación, y que permita localizar un elemento y leer sus datos en pocos segundos.

## What Changes

- Nueva página estática (`index.html`, `styles.css`, `script.js`, `data/elements.js`) con HTML, CSS3 y JavaScript vanilla, sin build, framework, módulos ES, `fetch` ni recursos remotos.
- Tabla principal de 18 grupos × 7 períodos con huecos IUPAC, sobre fondo claro y con un color pastel por categoría (10 categorías) y leyenda.
- Lantánidos (57–71) y actínidos (89–103) en dos filas independientes bajo la tabla principal, separadas de ella por al menos una fila vacía (separador «Series internas»).
- Buscador por nombre (parcial o completo), símbolo o número atómico; insensible a mayúsculas y acentos; resalta coincidencias y atenúa el resto sin eliminar celdas; mensaje de estado con recuento y estado explícito «sin resultados»; botón «Limpiar» y atajo «/».
- Selección de elemento por clic o teclado que muestra la ficha de detalles en una región reservada, sin reescalar ni mover la tabla; solo un elemento seleccionado a la vez y selección limpiable.
- Catálogo local de 118 elementos con validación al cargar.
- Accesibilidad: nombres accesibles, foco visible, regiones vivas, estados no dependientes solo del color, contraste suficiente y desplazamiento horizontal de la tabla en pantallas estrechas.

## Capabilities

### New Capabilities
- `periodic-table-web`: tabla periódica estática y local con catálogo de 118 elementos, disposición con series internas separadas, categorías en color pastel, búsqueda que resalta, selección con ficha de detalles de geometría estable y accesibilidad por teclado y tecnologías de apoyo.

### Modified Capabilities
<!-- Ninguna: `openspec/specs/` está vacío. -->

## Impact

- Código nuevo en la raíz del proyecto: `index.html`, `styles.css`, `script.js`, `data/elements.js`. No se modifica código existente.
- Sin dependencias, APIs ni sistemas externos; 0 peticiones de red.
- Conflicto detectado en la base de conocimiento: `knowledge/dev/languages/javascript.md` y `architecture/static-web-app.md` recomiendan módulos ES y `fetch`, mientras que `knowledge/product/` (producto y reglas de negocio) los prohíbe porque no funcionan por `file://`. Prevalece lo de producto: scripts clásicos con `defer`, datos en un `.js` que declara una variable global, y la separación Data/Logic/Rendering se mantiene por funciones dentro de los ficheros.
- Fuera de alcance: servidor, persistencia, cuentas, cálculos químicos, tendencias, edición de elementos, internacionalización y navegadores antiguos.
