## Context

El proyecto parte sin una aplicación de interfaz ni capacidades existentes. La solución debe crear una aplicación estática de tabla periódica que debe de funcionar abriendo directamente `index.html` en el navegador. La solución debe poder abrirse directamente desde el sistema de archivos (file://protocol) y no puede depender de un proceso de build, un backend o recursos externos. Consulta `proposal.md` para la motivación y `specs/periodic-table-web/spec.md` para el contrato observable.

## Goals / Non-Goals

**Goals:**

- Entregar una página estática autocontenida con una cuadrícula periódica completa, búsqueda, selección y panel de detalles.
- Tabla periódica completa (118 elementos) con disposición estándar IUPAC.
- Lantánidos y actínidos en filas separadas con al menos una fila de separación visual.
- Las categorias (halógenos, gases nobeles, etc.) deben diferenciarse con colores pastel.
- Fondo claro y contraste suficiente para que el texto sea legible.
- Usa una tipografía legible y consistente, con tamaño de fuente adecuado para escritorio y móvil.
- Mantener una geometría estable de la tabla durante las actualizaciones de búsqueda y selección.
- Hacer que la estructura sea legible en escritorio y usable en ventanas estrechas mediante desplazamiento horizontal de la tabla, sin comprimir las celdas hasta hacerlas ilegibles.
- Mantener la información de los elementos en una única fuente de datos local y renderizarla de forma segura y accesible.
- Buscadpor en tiempo real que filtre nombre, símbolo y número atómico, resaltando los resultados en la tabla.
- Panel de detalles que muestre información completa del elemento seleccionado, incluyendo masa atómica, configuración electrónica, categoría, período y grupo.
- Compatibilidad con Chrome, Firefox y Safari recientes, sin necesidad de build tools ni servidor web.

**Non-Goals:**

- No habrá servidor, API, almacenamiento persistente, cuentas de usuario ni sincronización de datos.
- No se incluirán cálculos químicos avanzados, visualizaciones de tendencias ni edición de elementos.
- No se añadirá un framework, un gestor de paquetes ni una biblioteca de iconos o tipografías remota.
- Soporte a navegadores antiguos (IE, Edge Legacy, etc.)
- Animaciones complejas o transiciones pesadas.
- Internacionalización / i18n.

## Decisions

### Estructura de ficheros: página estática local

Utilizar un único directorio de proyecto con cuatro recursos locales: `index.html`, `styles.css`, `data/elements.js` y `script.js`.

### Página estática con tres recursos locales

La implementación usará `index.html`, `styles.css` y `script.js`, enlazados con rutas relativas. Esta separación conserva HTML semántico, estilos mantenibles y lógica Vanilla sin introducir una cadena de compilación. Se considera un único HTML con estilos y scripts embebidos, pero se descarta porque dificultaría la evolución y revisión de cada capa sin aportar beneficios para la ejecución local.

### Modelo de datos explícito para los 118 elementos

Los datos (número atómico, símbolo, nombre, masa, categoría, período, grupo, configuración electrónica, electronegatividad y la información adicional) de los 118 elementos se definen como un array de objetos en un único archivo `data/elements.js`. Esto permite mantener la información centralizada y facilita su actualización sin afectar la estructura de la aplicación. El archivo se cargará antes de `script.js` como script clásico y expondrá el catálogo en el ámbito de la página; no se usará `import`, `export`, `fetch` ni `type="module"`, para conservar la compatibilidad con `file://`.

### Cuadrícula CSS de tamaño estable

La tabla principal tendrá 18 columnas y celdas con una dimensión base fija, incluyendo los espacios vacíos de la estructura periódica. Las series internas se renderizarán debajo de una fila de separación explícita. El contenedor podrá desplazarse horizontalmente en pantallas pequeñas, pero la selección, los estados de búsqueda y el contenido del panel no cambiarán las dimensiones de las celdas ni el tamaño de la cuadrícula. El panel de detalles ocupará una región reservada con altura mínima y ancho definido para que textos diferentes no alteren la tabla.

Las posiciones de la cuadrícula principal se expresarán con grupo/período; lantánidos y actínidos tendrán una fila de presentación propia y un indicador de serie. Se evitará obtener datos desde una fuente remota para que `file://` sea suficiente.

### Búsqueda por estado visual, no por reconstrucción de la tabla

El buscador normalizará el texto introducido para comparar sin mayúsculas ni acentos contra nombre, símbolo y número atómico. Cada celda conservará su posición y recibirá estados visuales de coincidencia/no coincidencia; el mensaje de resultados comunicará el total y el caso sin coincidencias. Así se mantiene la geometría y se evita que un filtro que quite nodos provoque desplazamientos inesperados.

### Controles nativos y contenido seguro

Las celdas interactivas serán botones con nombre accesible, estado seleccionado y foco visible. El panel tendrá una región viva para anunciar actualizaciones. Los textos de datos se insertarán como contenido de texto, no como HTML interpretado, y la información estática no requerirá sanitización de entradas remotas.

## Risks / Trade-offs

- [Datos de 118 elementos son muchos a mantener] → Mantener un único archivo de datos con 118 registros es más fácil de mantener que múltiples archivos, pero requiere validación de duplicados y consistencia.
- [Ancho de la tabla en pantallas pequeñas] → Mantener celdas legibles y permitir desplazamiento horizontal dentro de un contenedor; verificar que el panel siga siendo accesible sin cambiar la escala de la tabla.
- [Mantenimiento del catálogo de elementos] → Mantener todos los registros en una estructura local coherente y validar durante la implementación que existan exactamente 118 elementos y que no haya números atómicos duplicados.
- [Contraste de colores pastel] → Usar texto y bordes con contraste suficiente, además de nombre de categoría, foco y estados textuales para que el color no sea la única señal.
- [Apertura mediante `file://` en distintos navegadores] → Evitar módulos, fetch y APIs que dependan de un origen HTTP; comprobar la experiencia abriendo el archivo directamente.
- [Busqueda en tiempo real puede ser lenta con highlight DOM] → Evitar reconstruir la tabla; usar estados visuales y clases CSS para resaltar coincidencias sin eliminar nodos del DOM.

## Migration Plan

No hay migración de datos ni despliegue de servidor. La entrega consiste en copiar los tres recursos locales del cambio al directorio de la aplicación y abrir `index.html`. Para revertirla, basta con retirar esos archivos o restaurar la versión anterior del directorio, sin afectar datos persistentes.
