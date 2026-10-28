## 1. Estructura de la página

- [ ] 1.1 Crear `index.html` con el encabezado, buscador, estado de resultados, leyenda de categorías, región de tabla y panel de detalles semánticamente identificados.
- [ ] 1.2 Crear `styles.css` con fondo claro, paleta pastel por categoría, tipografía legible, estados de foco/selección y diseño de la tabla dentro de un contenedor con desplazamiento horizontal.
- [ ] 1.3 Enlazar únicamente `styles.css` y `script.js` mediante rutas locales y comprobar que el HTML no dependa de recursos externos, módulos o un proceso de compilación.

## 2. Catálogo y renderizado periódico

- [ ] 2.1 Añadir en `script.js` el catálogo local completo de 118 elementos con número atómico, símbolo, nombre, masa, categoría, período, grupo y datos adicionales del panel.
- [ ] 2.2 Validar el catálogo durante la implementación para detectar exactamente 118 elementos, números atómicos únicos y posiciones periódicas válidas.
- [ ] 2.3 Renderizar la tabla principal en 18 columnas conservando los huecos de los períodos 1 a 7 y mostrando número atómico y símbolo en cada celda.
- [ ] 2.4 Renderizar las filas independientes de lantánidos y actínidos en orden atómico, con una fila visual vacía entre la tabla principal y ambas series.
- [ ] 2.5 Renderizar la leyenda y asociar cada celda con el color y nombre de su categoría sin usar el color como única etiqueta.

## 3. Interacción y accesibilidad

- [ ] 3.1 Implementar la selección por clic y teclado, el marcado de la celda activa y la actualización del panel con nombre, símbolo, número atómico, masa, categoría, período, grupo y datos adicionales.
- [ ] 3.2 Reservar dimensiones estables para la cuadrícula y el panel, y verificar que cambiar de elemento no altere el tamaño de celdas, fuentes ni posiciones de la tabla.
- [ ] 3.3 Implementar la búsqueda normalizada por nombre, símbolo y número atómico, con coincidencias parciales de nombre, tolerancia a mayúsculas/acentos, estados visuales estables y mensaje explícito cuando no haya resultados.
- [ ] 3.4 Añadir nombres accesibles, foco visible, estado seleccionado y anuncios de cambios de resultados/detalles para que todas las acciones de ratón tengan equivalente mediante teclado.

## 4. Verificación de aceptación

- [ ] 4.1 Abrir `index.html` directamente con una ruta `file://` y comprobar que la tabla, la búsqueda, la selección y los detalles funcionan sin peticiones de red ni errores de consola.
- [ ] 4.2 Ejecutar una comprobación manual de los 118 elementos, categorías, series separadas, búsquedas por los tres tipos de dato y estado sin resultados.
- [ ] 4.3 Verificar en una ventana estrecha que la tabla siga siendo legible mediante desplazamiento horizontal y que la selección no provoque reescala ni desplazamientos de la cuadrícula.
- [ ] 4.4 Recorrer la página y activar elementos usando solo teclado, confirmando el foco, los nombres accesibles y la comunicación textual de estados.
