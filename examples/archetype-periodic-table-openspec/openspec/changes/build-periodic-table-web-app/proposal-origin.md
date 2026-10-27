## Why

Se necesita una referencia visual de la tabla periódica que sea clara, explorable y utilizable sin instalar ni levantar infraestructura. Una página estática con búsqueda y detalles contextuales permite consultar los elementos rápidamente desde un archivo local.

## What Changes

- Crear una interfaz de tabla periódica con fondo claro y colores pastel diferenciados por categoría de elemento.
- Mostrar los 118 elementos en su posición periódica, con lantánidos y actínidos en filas separadas y con al menos una fila de separación visual.
- Añadir un buscador que filtre o localice elementos por nombre, símbolo y número atómico.
- Mostrar los detalles del elemento seleccionado en un panel estable, manteniendo el tamaño y la geometría de la tabla.
- Implementar la experiencia como una página estática basada únicamente en HTML, CSS3 y JavaScript Vanilla, funcional al abrirla localmente sin servidor.

## Capabilities

### New Capabilities

- `periodic-table-web`: Tabla periódica estática, búsqueda, selección, panel de detalles y presentación accesible de los elementos.

### Modified Capabilities

Ninguna. No existen capacidades previas en el proyecto.

## Impact

- Nuevos archivos de interfaz estática HTML, CSS y JavaScript dentro del proyecto.
- No se añaden APIs, backend, servidor web, framework ni dependencias externas.
- La funcionalidad debe operar mediante rutas y recursos locales compatibles con la apertura directa del documento HTML.
