# Tasks

## 1. Catálogo de elementos

- [x] 1.1 Crear `data/elements.js` con `PERIODIC_ELEMENTS` (118 elementos con los 9 campos, `electronegativity: null` donde no exista) y un comentario con la forma del dato; verificar con `node -e` sobre el archivo que hay 118 números únicos del 1 al 118
- [x] 1.2 Verificar una muestra (H, C, Fe, La, U, Og) de grupo, período, categoría y masa contra una fuente fiable, y que los lantánidos (57–71) y actínidos (89–103) tienen categoría `lanthanide`/`actinide`

## 2. Lógica pura y verificación

- [x] 2.1 En `script.js`, implementar `normalizeText`, `matchElements` y `validateCatalog` sin acceso al DOM; verificar con un script de Node temporal (fuera del repo) que «hidrogeno», «HIDRÓGENO», «fe», «26», «gen» y un texto sin coincidencias dan los resultados esperados
- [x] 2.2 Verificar con el mismo script que `validateCatalog` rechaza un catálogo con 117 elementos, uno duplicado y una categoría desconocida

## 3. Estructura, estilos y tabla

- [x] 3.1 Crear `index.html` (doctype, `lang="es"`, charset, viewport, título, enlace «Saltar al contenido», `header` con leyenda y búsqueda, `main` con tabla y ficha, `<noscript>` en español, `defer` en ambos scripts, sin inline); verificar que abre por `file://` sin errores en consola
- [x] 3.2 Crear `styles.css` con tokens `--cat-*` pastel y de espaciado, rejilla 18×(7+separador+2 series), celdas de tamaño fijo y contenedor con `overflow-x: auto`; verificar que no hay scroll horizontal de la página a 360 px
- [x] 3.3 Renderizar las 118 celdas como `<button type="button">` con `createElement`/`textContent`, cabeceras de grupo y período, leyenda de 10 categorías y rótulo «Series internas»; verificar que cada elemento está en su grupo/período y que hay al menos 1 fila vacía entre el período 7 y los lantánidos
- [x] 3.4 Mostrar un `role="alert"` y no pintar la tabla si `validateCatalog` falla; verificar alterando temporalmente el catálogo y restaurándolo

## 4. Búsqueda

- [x] 4.1 Conectar el campo «Buscar un elemento» a `matchElements`: resaltar coincidentes, atenuar el resto, indicadores no cromáticos, mensaje con recuento y «Sin resultados» en `role="status"`; verificar en el navegador con «hidrogeno», «fe», «26» y «zzz»
- [x] 4.2 Verificar que vaciar el campo restaura los 118 elementos y que la tabla no cambia de tamaño ni de posición (comparar `getBoundingClientRect` de 3 celdas antes y durante la búsqueda)

## 5. Selección y ficha

- [x] 5.1 Implementar la ficha reservada (altura mínima y ancho fijos, estado vacío) y la selección única por clic y por Enter/Espacio con `aria-pressed`, marca no cromática y anuncio en región viva; verificar que se muestran los 9 campos y que seleccionar otra celda reemplaza la anterior
- [x] 5.2 Mostrar «No definida» cuando la electronegatividad sea `null`; verificar con He o Og
- [x] 5.3 Implementar «Limpiar» (vacía búsqueda y selección) y verificar que la ficha vuelve vacía y la tabla no se mueve (misma comparación de `getBoundingClientRect`)

## 6. Accesibilidad y responsive

- [x] 6.1 Añadir el atajo «/» (ignorado dentro de campos de texto), `aria-label` en celdas y controles, `:focus-visible` y pista de desplazamiento horizontal; verificar el recorrido completo (buscar, seleccionar, limpiar) solo con teclado
- [x] 6.2 Comprobar contraste ≥ 4.5:1 de texto sobre cada color pastel y de las celdas atenuadas, y ajustar tokens si hace falta; verificar con las herramientas de contraste del navegador

## 7. Verificación de aceptación

- [ ] 7.1 Abrir `index.html` por `file://` en Chrome, Firefox y Safari y verificar 0 peticiones de red (pestaña Red) y 0 errores en consola; si el CSP meta falla en alguno, retirarlo y anotarlo en `design.md`
- [x] 7.2 Recorrer los 6 recorridos de `knowledge/product/journeys.md` y confirmar el resultado normal de cada uno; verificar que en ventana estrecha la tabla se desliza sin comprimir celdas

## Workflow follow-up

- Archivar el change tras la revisión (`/opsx:archive build-periodic-table-web-app`).
