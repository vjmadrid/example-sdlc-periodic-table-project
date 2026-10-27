## Why

Se necesita una página web interactiva de la tabla periódica que sea clara, explorable y utilizable sin instalar ni levantar infraestructura (funcionamiento offline). Una página estática con búsqueda y detalles contextuales permite consultar los elementos rápidamente desde un archivo local.
Tiene que tener una experiencia visual atractiva.

No existe actualmente ningiuna implementacion en el proyecto


## What Changes

- Crea una aplicación web estática funcional (basada en HTML, CSS3 y JavaScript Vanilla) que muestre la tabla periódica de los elementos químicos de manera completa e interactiva.
- Debería de poder utilizarse sin usar servidor.
- Crear una interfaz con fondo claro y colores pastel diferenciados por categoría de elemento.
- Mostrar los 118 elementos en su posición periódica, con lantánidos y actínidos en filas separadas y con al menos una fila de separación visual.
- Añadir un buscador en tiempo real que filtre o localice elementos por nombre, símbolo y número atómico.
- Mostrar los detalles del elemento seleccionado en un panel estable, manteniendo el tamaño y la geometría de la tabla.

## Capabilities

### New Capabilities

- `periodic-table-display`: Renderizado de la tabla periódica completa con disposición estándar, colores pastel por categoría y lantánidos/actinidos separados por al menos una fila de separación visual
- `element-search`: Búsqueda en tiempo real de elementos que filtre nombre, símbolo y número atómico. Debería de resaltar los resultados en la tabla.
- `element-details-panel`: Panel de detalles del elemento seleccionado, mostrando información completa (masa atómica, configuración electrónica, categoría, etc.) y manteniendo la geometría de la tabla.

### Modified Capabilities

Ninguna. No existen capacidades previas en el proyecto.

## Impact

- Nuevos archivos de interfaz estática HTML (index.html), CSS (styles.css) y JavaScript (app.js) dentro del proyecto.
- No se añaden APIs, backend, servidor web, framework ni dependencias externas.
- La funcionalidad debe operar mediante rutas y recursos locales compatibles con la apertura directa del documento HTML.
- Compatible con navegadores modernos sin necesidaad de build tools ni servidor web.
