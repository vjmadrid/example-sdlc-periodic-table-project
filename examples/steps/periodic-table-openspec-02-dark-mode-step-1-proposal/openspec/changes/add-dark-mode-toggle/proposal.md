## Why

La página solo ofrece un tema claro, aunque `DESIGN.md` ya define una paleta oscura completa. Quien consulta la tabla con poca luz, o prefiere interfaces oscuras, no puede cambiarlo, y la página tampoco respeta la preferencia de color del sistema.

## What Changes

- Añadir en la zona superior de la página un botón que alterna entre modo claro y modo oscuro.
- Aplicar a toda la interfaz (tabla, leyenda, búsqueda, panel de detalles) la paleta oscura documentada en `DESIGN.md`, manteniendo los pasteles de categoría legibles y distinguibles.
- Elegir el tema inicial según la preferencia del sistema (`prefers-color-scheme`) cuando el usuario no haya elegido uno, y recordar la elección manual entre visitas.
- Mantener el botón accesible: nombre accesible, estado comunicado más allá del color, uso con teclado y foco visible.

## Capabilities

### New Capabilities

### Modified Capabilities
- `periodic-table-web`: se añaden requisitos de alternancia de tema claro/oscuro y de persistencia de la preferencia; los requisitos existentes de operación local y accesibilidad se mantienen.

## Impact

- `index.html`: nuevo control en la cabecera.
- `styles.css`: valores de los tokens para el tema oscuro y estilos del botón.
- `script.js`: lógica de alternancia, tema inicial y persistencia.
- Sin dependencias nuevas ni peticiones de red; la página sigue funcionando desde `file://`.
- Supuestos: el almacenamiento de la preferencia es local al navegador; no se añade un tercer modo «automático» explícito.
