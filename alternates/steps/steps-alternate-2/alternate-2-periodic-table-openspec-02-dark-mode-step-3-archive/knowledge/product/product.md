# Producto

## Propósito

Ofrecer una tabla periódica interactiva, clara y explorable, que se consulte desde un archivo local sin instalar ni levantar infraestructura, con una experiencia visual atractiva.

## Resultado buscado

Que cualquier persona pueda localizar un elemento químico (por nombre, símbolo o número atómico) y entender sus datos principales en pocos segundos, sin servidor, sin conexión y sin depender de terceros.

## Alcance de esta base de conocimiento

Describe lo que el producto ofrece a quien lo usa: la tabla de 118 elementos, la búsqueda, la selección y la ficha de detalles, y las reglas que los gobiernan. Deja a la documentación técnica (`DESIGN.md` y `openspec/`) la estructura de ficheros, el modelo de datos, el layout CSS y las decisiones de implementación.

## No objetivos

- Servidor, API, almacenamiento persistente, cuentas de usuario o sincronización de datos.
- Cálculos químicos avanzados, visualizaciones de tendencias o edición de elementos.
- Frameworks, gestores de paquetes, bibliotecas de iconos o tipografías remotas.
- Soporte a navegadores antiguos (IE, Edge Legacy).
- Animaciones complejas o transiciones pesadas.
- Internacionalización: el producto está en español.

## Dónde vive el sistema descrito

Repositorio: <https://github.com/vjmadrid/example-sdlc-periodic-table-project>, en `examples/steps/periodic-table-openspec-01-build-step-3-archive` (`index.html`, `styles.css`, `script.js`, `data/elements.js`). Quien lea este documento puede abrir ese código.

## Decisiones de producto

### Aplicación estática que funciona sin servidor

El producto se abre directamente desde el sistema de archivos (`file://`), sin build, backend ni recursos remotos. Descarta cualquier funcionalidad que exija red, módulos ES, `fetch` o un proceso de compilación.
Afecta a: todo el producto.
Responsable: responsable del producto (no asignado en los cambios de OpenSpec).

### Búsqueda que resalta sin reorganizar la tabla

Buscar marca coincidencias y atenúa el resto, pero nunca elimina celdas ni mueve la tabla. Descarta la búsqueda que filtra quitando elementos.
Afecta a: búsqueda y tabla.
Responsable: responsable del producto.

### Detalles en un panel reservado y estable

La ficha del elemento aparece en una región aparte con espacio reservado; seleccionar no cambia el tamaño ni la posición de la tabla. Descarta ventanas emergentes o paneles que desplacen la cuadrícula.
Afecta a: selección y ficha de detalles.
Responsable: responsable del producto.

### Color pastel por categoría, nunca como única señal

Cada categoría tiene un color pastel sobre fondo claro (tema claro, el predeterminado) y un tono apagado equivalente en el tema oscuro, siempre acompañado de nombre de categoría, foco, texto o atributos accesibles.
Afecta a: tabla, leyenda y accesibilidad.
Responsable: responsable del producto.

### Tema claro por defecto, con modo oscuro opcional

La página abre siempre en tema claro. Un botón en la zona superior alterna entre tema claro y oscuro; el cambio solo afecta a los colores y no se recuerda entre visitas ni sigue la preferencia del sistema. Descarta el almacenamiento persistente de la elección.
Afecta a: cabecera, colores y accesibilidad.
Responsable: responsable del producto.

### Idioma único: español

Todo el texto visible está en español. Descarta la internacionalización.
Afecta a: todo el producto.
Responsable: responsable del producto.

## Actores y necesidades

### Persona curiosa o estudiante

**Objetivo:** consultar rápidamente un elemento y comprender qué lo hace único.
**Necesidad:** ver la tabla completa en su sitio, encontrar un elemento escribiendo lo que sabe de él y leer su ficha sin perder el contexto de la tabla.

### Persona que usa teclado o tecnologías de apoyo

**Objetivo:** hacer lo mismo que cualquier otra persona sin usar el ratón ni depender del color.
**Necesidad:** controles con nombre accesible, orden de foco comprensible, estados anunciados como texto y todas las acciones disponibles con teclado.

### Persona en pantalla pequeña

**Objetivo:** consultar la tabla desde una ventana estrecha o un móvil.
**Necesidad:** celdas legibles y desplazamiento horizontal de la tabla, en lugar de celdas comprimidas hasta ser ilegibles.

## Actores que condicionan este producto

Ninguno identificado en los cambios de OpenSpec.
