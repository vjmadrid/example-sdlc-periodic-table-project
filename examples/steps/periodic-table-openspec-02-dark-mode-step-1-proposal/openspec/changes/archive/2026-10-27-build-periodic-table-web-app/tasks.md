## 1. Estructura de la página

- [x] 1.1 Crear `index.html` con el encabezado, buscador, estado de resultados, leyenda de categorías, región de tabla y panel de detalles semánticamente identificados.
- [x] 1.2 Crear `styles.css` con fondo claro, paleta pastel por categoría, tipografía legible, estados de foco/selección y diseño de la tabla dentro de un contenedor con desplazamiento horizontal.
- [x] 1.3 Crear `data/elements.js` con el catálogo de 118 elementos como un array de objetos, incluyendo número atómico, símbolo, nombre, masa, categoría, período, grupo, configuración electrónica y electronegatividad.
- [x] 1.4 Crear `script.js` con la lógica de renderizado de la tabla, búsqueda, selección y actualización del panel de detalles, consumiendo el array global expuesto por `data/elements.js` como script clásico.
- [x] 1.5 Enlazar `styles.css`, `data/elements.js` y `script.js` mediante rutas locales y comprobar que el HTML no dependa de recursos externos, módulos o un proceso de compilación.

## 2. Layout de la tabla periódica

- [x] 2.1 Implementar el grid CSS de 18 columnas para la tabla principal, respetando los huecos de los períodos 1 a 7 y mostrando número atómico y símbolo en cada celda.
- [x] 2.2 Posicionar cada elemento en su celda correcta según su grupo y período usando `grid-row` y `grid-column`, incluyendo las filas separadas para lantánidos y actínidos con una fila visual vacía entre la tabla principal y ambas series.
- [x] 2.3 Añadir celdas vacías/placeholders para los huecos estandar de la tabla

## 3. Catálogo y renderizado periódico

- [x] 3.1 Validar el catálogo durante la implementación para detectar exactamente 118 elementos, números atómicos únicos y posiciones periódicas válidas.
- [x] 3.2 Renderizar la tabla principal en 18 columnas conservando los huecos de los períodos 1 a 7 y mostrando número atómico y símbolo en cada celda.
- [x] 3.3 Renderizar las filas independientes de lantánidos y actínidos en orden atómico, con una fila visual vacía entre la tabla principal y ambas series.
- [x] 3.4 Renderizar la leyenda y asociar cada celda con el color y nombre de su categoría sin usar el color como única etiqueta.

## 4. Buscador en tiempo real

- [x] 4.1 Añadir `<input type="search">` en el header con placeholder descriptivo
- [x] 4.2 Implementar listener de `input` para filtrar el catálogo de elementos en tiempo real por nombre, símbolo y número atómico, insensible a mausculas y acentos, y resaltando los resultados en la tabla.
- [x] 4.3 Restaurar estilos normales cuando el campo de búsqueda se vacía

## 5. Panel de detalles

- [x] 5.1 Implementar el panel de detalles con todos los campos: nombre, símbolo, número atómico, masa, categoría, período, grupo, configuración electrónica y electronegatividad.
- [x] 5.2 Implementar el evento click en las celdas de elementos para poblar y mostar el panel de detalles
- [x] 5.3 Añadir indicador visual de selección en la celda activa (borde o sombra destacada)
- [x] 5.4 Implementar el cierre del panel (botón de cerrar o clic fuera del panel) y restaurar la selección de la celda activa, así como la limpieza del indicador de selección

## 6. Interacción y accesibilidad

- [x] 6.1 Implementar la selección por clic y teclado, el marcado de la celda activa y la actualización del panel con nombre, símbolo, número atómico, masa, categoría, período, grupo y datos adicionales.
- [x] 6.2 Reservar dimensiones estables para la cuadrícula y el panel, y verificar que cambiar de elemento no altere el tamaño de celdas, fuentes ni posiciones de la tabla.
- [x] 6.3 Implementar la búsqueda normalizada por nombre, símbolo y número atómico, con coincidencias parciales de nombre, tolerancia a mayúsculas/acentos, estados visuales estables y mensaje explícito cuando no haya resultados.
- [x] 6.4 Añadir nombres accesibles, foco visible, estado seleccionado y anuncios de cambios de resultados/detalles para que todas las acciones de ratón tengan equivalente mediante teclado.

## 7. Verificación de aceptación

- [x] 7.1 Abrir `index.html` directamente con una ruta `file://` desde Chrome y Firefox se muestra la tabla completa sin errores de consola
- [x] 7.2 Comprobar que el buscador filtra correctamente por nombre, símbolo y número atómico, resaltando los resultados en la tabla y mostrando un mensaje cuando no hay coincidencias.
- [x] 7.3 Comprobar que el panel de detalles se actualiza correctamente al seleccionar un elemento, mostrando toda la información requerida.
- [x] 7.4 Comprobar que el panel de detalles no desplaza ni redimensiona la tabla al abrirse/cerrarse o al cambiar de elemento seleccionado.
- [x] 7.5 Ejecutar una comprobación manual de los 118 elementos, categorías, series separadas, búsquedas por los tres tipos de dato y estado sin resultados.
- [x] 7.6 Verificar la separacion visual de lantánidos/actinidos (al menos una fila de separacion)
- [x] 7.7 Verificar en una ventana estrecha que la tabla siga siendo legible mediante desplazamiento horizontal y que la selección no provoque reescala ni desplazamientos de la cuadrícula.
- [x] 7.8 Recorrer la página y activar elementos usando solo teclado, confirmando el foco, los nombres accesibles y la comunicación textual de estados.
- [x] 7.9 Revisar legibilidad y contraste de colores pastel en todos los elementos de tabla
