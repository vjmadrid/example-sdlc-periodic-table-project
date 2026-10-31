# Proposal

## Why

No hay todavía ningún producto en este repositorio: solo existe la base de conocimiento (`knowledge/`). Se necesita una tabla periódica interactiva que cualquier persona pueda abrir desde un archivo local, localizar un elemento por nombre, símbolo o número atómico y leer sus datos sin servidor, sin conexión y sin dependencias de terceros.

## What Changes

- Nueva página `index.html` con `styles.css`, `script.js` y `data/elements.js`, que se abre por `file://` sin servidor, build, framework, módulos ES, `fetch` ni recursos remotos.
- Catálogo local de exactamente 118 elementos (número atómico, símbolo, nombre, masa atómica, categoría, período, grupo, configuración electrónica, electronegatividad), validado al cargar.
- Tabla principal de 18 grupos × 7 períodos con huecos IUPAC y fondo claro; cada celda es un botón con número atómico y símbolo.
- Series internas (lantánidos 57–71 y actínidos 89–103) en dos filas independientes bajo la tabla principal, con al menos 1 fila vacía de separación y rótulo «Series internas».
- Diez categorías con color pastel consistente y leyenda; la categoría siempre aparece también como texto.
- Búsqueda por nombre (parcial), símbolo y número atómico, insensible a mayúsculas y acentos; resalta coincidencias y atenúa el resto sin quitar celdas; mensaje de estado con el recuento y estado explícito «sin resultados».
- Selección de un único elemento por clic o teclado, con ficha de detalles en una región reservada de tamaño fijo, y botón «Limpiar» (búsqueda y selección).
- Geometría estable: celdas de dimensión fija; buscar, seleccionar o cerrar la ficha no reescala ni mueve la tabla; en ventanas estrechas la tabla se desplaza horizontalmente dentro de su contenedor.
- Accesibilidad: nombres accesibles, foco visible, atajo «/» para enfocar la búsqueda, enlace para saltar al contenido, regiones vivas y estados que no dependen solo del color.

## Capabilities

### New Capabilities
- `periodic-table-web`: tabla periódica interactiva local: catálogo de 118 elementos, disposición con series internas, categorías y leyenda, búsqueda, selección con ficha de detalles, geometría estable, accesibilidad y funcionamiento sin servidor.

### Modified Capabilities
<!-- Ninguna: no existen specs previas en openspec/specs/. -->

## Impact

- Código nuevo en la raíz del proyecto: `index.html`, `styles.css`, `script.js`, `data/elements.js`.
- Sin cambios en `knowledge/` ni en dependencias; no se añade ningún paquete.
- Fuera de alcance (según `knowledge/product/product.md`): servidor, persistencia, cuentas, cálculos químicos, tendencias, edición de elementos, frameworks, navegadores antiguos, animaciones complejas e internacionalización (todo en español).
- Los datos del catálogo se insertan siempre como texto (`textContent`), nunca como HTML.
