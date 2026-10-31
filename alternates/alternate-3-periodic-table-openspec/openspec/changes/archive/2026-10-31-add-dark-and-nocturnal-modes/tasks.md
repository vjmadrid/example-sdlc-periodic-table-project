# Tasks

## 1. Variables de color y paletas

- [x] 1.1 Auditar `styles.css` y convertir en variables todo color fijo fuera de `:root`; verificar que `grep -nE "#[0-9a-fA-F]{3,8}" styles.css` solo devuelve líneas dentro de bloques de variables
- [ ] 1.2 Definir la paleta del tema oscuro en `:root[data-theme="dark"]` y su equivalente automático en `@media (prefers-color-scheme: dark)` para `:root:not([data-theme])`; verificar abriendo la página con el sistema en modo oscuro y viendo el tema sin ejecutar JS
- [x] 1.3 Definir la paleta del tema nocturno en `:root[data-theme="nocturnal"]` con luminosidad menor y sin azules intensos; verificar visualmente que es más oscuro que el oscuro y que ningún color es un azul saturado
- [x] 1.4 Comprobar el contraste texto/fondo ≥ 4,5:1 de todos los pares (texto, texto atenuado, celdas de las diez categorías, ficha, búsqueda) en los tres temas y registrar la tabla de ratios en el cambio

## 2. Selector de tema

- [x] 2.1 Añadir el grupo de tres opciones «Claro», «Oscuro» y «Nocturno» en la cabecera de `index.html` con nombre accesible y estilos con foco visible e indicador activo no cromático; verificar que se ve en los tres temas y respeta la CSP
- [ ] 2.2 Implementar en `script.js` el cambio de tema por `data-theme` y la sincronización de la opción activa al cargar según `prefers-color-scheme`, sin `localStorage` ni red; verificar que recargar vuelve al tema del sistema y que el modo nocturno nunca es el inicial
- [ ] 2.3 Verificar el manejo por teclado (tabulación, flechas, espacio/Intro) y que el lector de pantalla anuncia la opción activa

## 3. Comportamiento existente y aceptación

- [ ] 3.1 Revisar los estados de atenuación, selección y coincidencia en los temas oscuros y ajustarlos para que sigan siendo perceptibles sin depender solo del color; verificar con búsqueda y selección activas en cada tema
- [ ] 3.2 Verificar que cambiar de tema no mueve ni redimensiona las celdas y conserva búsqueda, selección y ficha (comparar medidas con las herramientas de desarrollo)
- [ ] 3.3 Verificar la apertura por `file://` en Chrome, Firefox y Safari con 0 peticiones de red y sin escrituras en el almacenamiento del navegador
- [ ] 3.4 Actualizar la documentación del producto si procede (`knowledge/product/` menciona un fondo claro y colores pastel) y verificar que no contradice la especificación

## Workflow follow-up

- Archivar este cambio después de `build-periodic-table-web-app`, o junto con él, porque `theme-modes` presupone la tabla ya implementada.
