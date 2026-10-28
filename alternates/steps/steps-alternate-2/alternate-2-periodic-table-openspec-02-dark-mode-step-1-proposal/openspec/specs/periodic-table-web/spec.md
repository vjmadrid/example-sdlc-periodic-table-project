# periodic-table-web Specification

## Purpose

Tabla periódica interactiva en español que se abre desde un archivo local, con búsqueda que resalta coincidencias y una ficha de detalles de tamaño reservado, sin servidor ni dependencias externas.

## Requirements

### Requirement: Catálogo local de 118 elementos
El sistema SHALL contener exactamente 118 elementos con números atómicos únicos del 1 al 118, cada uno con número atómico, símbolo, nombre, masa atómica, categoría, período, grupo, configuración electrónica y electronegatividad, cargados sin red desde un único archivo local.

#### Scenario: Catálogo válido
- **WHEN** la página carga
- **THEN** se muestran 118 celdas, una por número atómico del 1 al 118, sin duplicados

#### Scenario: Catálogo inválido
- **WHEN** el catálogo tiene una cantidad distinta de 118, duplicados o posiciones periódicas inválidas
- **THEN** la validación al cargar lo detecta y la página lo comunica en pantalla en lugar de mostrar una tabla incorrecta

#### Scenario: Electronegatividad ausente
- **WHEN** se selecciona un elemento sin electronegatividad definida
- **THEN** la ficha indica explícitamente que no está definida, sin dejar un hueco

### Requirement: Funcionamiento local sin servidor
El sistema SHALL funcionar abriendo `index.html` por `file://` en Chrome, Firefox y Safari recientes, usando solo HTML, CSS3 y JavaScript vanilla, sin servidor, backend, framework, build, módulos ES, `fetch` ni recursos remotos.

#### Scenario: Apertura desde archivo
- **WHEN** la persona abre `index.html` desde el sistema de archivos
- **THEN** la tabla, la búsqueda y la ficha funcionan y no se realiza ninguna petición de red

### Requirement: Fondo claro y categorías en color pastel
El sistema SHALL mostrar la página sobre fondo claro y asignar a cada una de las 10 categorías (metales alcalinos, alcalinotérreos, de transición, otros metales, metaloides, no metales, halógenos, gases nobles, lantánidos y actínidos) un color pastel consistente, con una leyenda que relacione cada color con su nombre.

#### Scenario: Color por categoría
- **WHEN** se muestra la tabla
- **THEN** cada celda tiene el color pastel de su categoría y la leyenda lista las 10 categorías

#### Scenario: Texto legible
- **WHEN** se muestra cualquier celda sobre su color pastel
- **THEN** el contraste del texto es suficiente para leerlo

### Requirement: Disposición de la tabla principal
El sistema SHALL mostrar la tabla principal en 18 columnas (grupos) y 7 filas (períodos) con los huecos estándar IUPAC, y cada celda SHALL mostrar al menos número atómico y símbolo.

#### Scenario: Posición de un elemento
- **WHEN** se muestra un elemento de la tabla principal
- **THEN** ocupa la columna de su grupo y la fila de su período

### Requirement: Series internas separadas
El sistema SHALL mostrar lantánidos (57–71) y actínidos (89–103) en dos filas independientes bajo la tabla principal, en orden de número atómico, separadas de ella y entre sí por al menos una fila vacía.

#### Scenario: Separación visible
- **WHEN** se muestra la tabla
- **THEN** entre el período 7 y la fila de lantánidos hay al menos una fila vacía, y la fila de actínidos va tras la de lantánidos

#### Scenario: Contenido de las series
- **WHEN** se muestran las series internas
- **THEN** la fila de lantánidos contiene los 15 elementos 57–71 y la de actínidos los 15 elementos 89–103

### Requirement: Geometría estable
El sistema SHALL mantener celdas de dimensión base fija de modo que buscar, seleccionar o cerrar la ficha no cambie el tamaño de la tabla, la posición de las celdas ni el tamaño de fuente.

#### Scenario: Seleccionar no reescala
- **WHEN** se selecciona un elemento o se limpia la selección
- **THEN** la tabla conserva tamaño, posición de celdas y tamaño de fuente

#### Scenario: Ventana estrecha
- **WHEN** la ventana es más estrecha que la tabla
- **THEN** la tabla se desplaza horizontalmente dentro de su contenedor, la página no tiene desplazamiento horizontal propio y las celdas no se comprimen

### Requirement: Búsqueda que resalta
El sistema SHALL comparar el texto buscado con nombre (parcial o completo), símbolo y número atómico, sin distinguir mayúsculas ni acentos, destacando las celdas coincidentes y atenuando las demás sin eliminarlas.

#### Scenario: Coincidencias
- **WHEN** la persona escribe texto que coincide con al menos un elemento
- **THEN** las celdas coincidentes quedan destacadas, las demás atenuadas y el mensaje de estado indica el total de coincidencias

#### Scenario: Acentos y mayúsculas
- **WHEN** la persona escribe «HIDROGENO» o «hidrógeno»
- **THEN** obtiene las mismas coincidencias

#### Scenario: Sin resultados
- **WHEN** el texto no coincide con ningún elemento
- **THEN** se muestra el estado explícito «sin resultados» y ningún elemento queda seleccionado por la búsqueda

#### Scenario: Limpiar la búsqueda
- **WHEN** la persona vacía el campo o pulsa «Limpiar»
- **THEN** se restauran los estilos normales y se muestran los 118 elementos

#### Scenario: Atajo de enfoque
- **WHEN** la persona pulsa «/» fuera de un campo de texto
- **THEN** el foco pasa al campo de búsqueda

#### Scenario: Estado no depende del color
- **WHEN** hay coincidencias
- **THEN** la distinción entre coincidente y atenuada se aprecia además de por color (por ejemplo, borde, peso o opacidad) y en el mensaje de estado

### Requirement: Selección y ficha de detalles
El sistema SHALL permitir seleccionar un elemento por clic o teclado, marcar su celda y mostrar en una región reservada de altura mínima y ancho definidos la ficha con nombre, símbolo, número atómico, masa atómica, categoría, período, grupo, configuración electrónica y electronegatividad. SHALL haber a lo sumo un elemento seleccionado.

#### Scenario: Seleccionar un elemento
- **WHEN** la persona activa una celda por clic o teclado
- **THEN** la celda queda marcada y la ficha muestra los datos de ese elemento

#### Scenario: Cambiar de selección
- **WHEN** la persona activa otra celda con un elemento ya seleccionado
- **THEN** la nueva selección reemplaza a la anterior en celda y ficha

#### Scenario: Limpiar la selección
- **WHEN** la persona pulsa «Limpiar» con un elemento seleccionado
- **THEN** se retira la marca y la ficha vuelve a su estado vacío

#### Scenario: Ficha vacía
- **WHEN** no hay elemento seleccionado
- **THEN** la región reservada de la ficha sigue ocupando su espacio e indica que se seleccione un elemento

### Requirement: Uso accesible con teclado y tecnologías de apoyo
El sistema SHALL ofrecer nombre accesible y foco visible en la búsqueda, las celdas y «Limpiar», con orden de foco comprensible; toda acción con ratón SHALL estar disponible con teclado; los cambios de resultados y de ficha SHALL anunciarse en regiones vivas; y ningún estado SHALL depender solo del color.

#### Scenario: Recorrido solo con teclado
- **WHEN** la persona usa solo Tab, texto y Enter o Espacio
- **THEN** puede buscar, seleccionar un elemento y limpiar

#### Scenario: Anuncio de cambios
- **WHEN** cambian los resultados de búsqueda o la selección
- **THEN** el nuevo estado se comunica como texto en una región viva

#### Scenario: Categoría como texto
- **WHEN** se selecciona un elemento
- **THEN** la ficha muestra el nombre de su categoría como texto
