# Tasks

## 1. Estructura y catálogo de datos

- [x] 1.1 Crear `index.html`, `styles.css`, `script.js` y `data/elements.js` con el esqueleto (doctype, `lang="es"`, charset, viewport, título, `<noscript>`, scripts con `defer` en orden datos → lógica); verificar abriendo `index.html` por `file://` sin errores en consola
- [x] 1.2 Transcribir en `data/elements.js` los 118 elementos (`PERIODIC_ELEMENTS`) con número atómico, símbolo, nombre, masa, categoría, período, grupo, configuración electrónica y electronegatividad (`null` si no definida), citando la fuente en un comentario; verificar en consola que hay 118 elementos y números únicos 1–118
- [x] 1.3 Implementar la validación del catálogo (cantidad, duplicados, categoría válida, posiciones sin colisión) y su mensaje de error en pantalla; verificar rompiendo temporalmente un dato y comprobando que se muestra el aviso (y revertir)

## 2. Tabla principal, series internas y leyenda

- [x] 2.1 Definir en `styles.css` los tokens de color (fondo claro y 10 pasteles por categoría) y de tamaño de celda; verificar que cada categoría tiene color y que el contraste del texto es ≥ 4.5:1
- [x] 2.2 Renderizar con `createElement`/`textContent` las celdas `<button class="element-tile">` de la tabla principal en rejilla 18×7 con `grid-column`/`grid-row`, con número atómico y símbolo, `data-category` y `aria-label`; verificar que se ven 18 grupos × 7 períodos con los huecos IUPAC y las referencias «57–71»/«89–103»
- [x] 2.3 Renderizar las series internas (lantánidos 57–71 y actínidos 89–103) en dos filas bajo la tabla principal, con al menos una fila vacía de separación y la etiqueta «Series internas»; verificar visualmente la separación y que cada fila tiene 15 celdas en orden
- [x] 2.4 Renderizar la leyenda de las 10 categorías con los mismos tokens; verificar que ninguna categoría falta ni queda sin color
- [x] 2.5 Hacer que la tabla se desplace horizontalmente en su contenedor (`overflow-x: auto`) con celdas de tamaño fijo y una pista de deslizamiento; verificar en una ventana estrecha que la página no se desplaza y las celdas no se comprimen

## 3. Búsqueda

- [x] 3.1 Implementar `normalize` y `matchElement` como funciones puras (nombre parcial/completo, símbolo, número atómico; sin mayúsculas ni acentos); verificar en consola casos: «hidrogeno», «HE», «26», «xyz», cadena vacía
- [x] 3.2 Añadir el campo «Buscar un elemento» con etiqueta, el botón «Limpiar» y el atajo «/»; derivar `is-match`/`is-dimmed` desde el estado y mostrar el mensaje con recuento y el estado «sin resultados»; verificar los escenarios de coincidencias, sin resultados, limpiar con campo vacío y con botón, y que las celdas no se eliminan
- [x] 3.3 Distinguir coincidente/atenuada también sin color (contorno, opacidad y mensaje); verificar en escala de grises o simulando daltonismo que el estado sigue siendo apreciable

## 4. Selección y ficha de detalles

- [x] 4.1 Maquetar el `<aside>` «Ficha del elemento» con altura mínima y ancho definidos, fuera del contenedor desplazable, con estado vacío; verificar que su tamaño es idéntico vacío y con cualquier elemento
- [x] 4.2 Implementar la selección por clic y teclado (un solo elemento, `aria-pressed`, reemplazo y limpieza con «Limpiar») y mostrar en la ficha nombre, símbolo, número atómico, masa, categoría (texto), período, grupo, configuración electrónica y electronegatividad (o «no definida»); verificar los escenarios de seleccionar, cambiar, limpiar y electronegatividad ausente
- [x] 4.3 Verificar la geometría estable: medir (DevTools) tamaño de la tabla, posición de celdas y tamaño de fuente antes y después de buscar, seleccionar y limpiar, y comprobar que no cambian

## 5. Accesibilidad

- [ ] 5.1 Añadir enlace «Saltar al contenido», `role="status"`/`aria-live="polite"` para resultados y ficha, `:focus-visible` visible y orden de foco búsqueda → Limpiar → celdas; verificar con teclado que todo es operable y con lector de pantalla (o inspección de la región viva) que los cambios se anuncian
- [x] 5.2 Revisar nombres accesibles de todos los controles y contraste de cada categoría, y que ningún estado dependa solo del color; verificar con una comprobación manual por escenarios de la especificación

## 6. Verificación de aceptación y documentación

- [ ] 6.1 Abrir `index.html` por `file://` en Chrome, Firefox y Safari recientes y confirmar 0 peticiones de red (pestaña Red) y 0 errores en consola
- [ ] 6.2 Recorrer todos los escenarios de `specs/periodic-table-web/spec.md` y los recorridos de `knowledge/product/journeys.md` marcando el resultado; verificar que cada escenario pasa
- [x] 6.3 Añadir un `README.md` breve con cómo abrir la página, la estructura de ficheros y la forma del dato; verificar que las instrucciones funcionan tal como están escritas

## Workflow follow-up

- Archivar el cambio tras cumplir los requisitos de revisión del proyecto.
- Verificar el resultado archivado.
