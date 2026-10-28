# Tabla periódica

Tabla periódica interactiva en español. Funciona abriendo `index.html` directamente en el navegador (`file://`), sin servidor, build ni conexión.

## Uso

1. Abre `index.html` con doble clic o con «Abrir con» tu navegador.
2. Escribe en «Buscar un elemento» un nombre, un símbolo o un número atómico (pulsa «/» para ir al buscador). Las coincidencias se destacan y el resto se atenúa.
3. El botón «Modo oscuro» de la cabecera alterna entre tema claro (por defecto) y oscuro; la elección no se recuerda al recargar.
4. Haz clic (o Enter/Espacio con el foco) en una celda para ver su ficha. «Limpiar» borra la búsqueda y la selección.

## Estructura

| Fichero | Contenido |
| --- | --- |
| `index.html` | Estructura de la página |
| `styles.css` | Estilos, colores pastel por categoría (variables `--cat-*`) y geometría |
| `script.js` | Validación del catálogo, búsqueda, selección y renderizado |
| `data/elements.js` | Catálogo `PERIODIC_ELEMENTS` (118 elementos) |

## Forma del dato

Cada elemento tiene `atomicNumber`, `symbol`, `name`, `atomicMass`, `category`, `period`, `group` (`null` en lantánidos y actínidos), `electronConfiguration` y `electronegativity` (`null` si no está definida). La descripción completa está en la cabecera de `data/elements.js`.
