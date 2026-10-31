# Spec Delta

## Purpose

Tabla periódica interactiva que se consulta desde un archivo local: muestra los 118 elementos, permite buscarlos, seleccionarlos y ver su ficha, sin servidor ni dependencias externas.

## ADDED Requirements

### Requirement: Catálogo de 118 elementos
El sistema SHALL ofrecer un catálogo local de exactamente 118 elementos con números atómicos únicos del 1 al 118. Cada elemento MUST tener número atómico, símbolo, nombre, masa atómica, categoría, período, grupo y configuración electrónica; la electronegatividad MAY estar ausente.

#### Scenario: Catálogo completo
- **WHEN** la página se carga
- **THEN** se muestran 118 elementos con números atómicos únicos del 1 al 118

#### Scenario: Catálogo inválido
- **WHEN** el catálogo tiene una cantidad distinta de 118, duplicados o posiciones periódicas inválidas
- **THEN** la página lo detecta durante la carga y muestra un mensaje de error visible en lugar de una tabla incorrecta

### Requirement: Disposición de la tabla principal
El sistema SHALL mostrar la tabla principal de 18 grupos por 7 períodos con los huecos estándar IUPAC, sobre fondo claro. Cada celda MUST mostrar al menos el número atómico y el símbolo.

#### Scenario: Posición por grupo y período
- **WHEN** se muestra la tabla
- **THEN** cada elemento de la tabla principal ocupa la columna de su grupo y la fila de su período, y los huecos IUPAC quedan vacíos

### Requirement: Series internas
El sistema SHALL mostrar los lantánidos (57–71) y los actínidos (89–103) en dos filas independientes bajo la tabla principal, en orden de número atómico, separadas de ella por al menos una fila vacía y con el rótulo «Series internas».

#### Scenario: Series separadas
- **WHEN** se muestra la tabla
- **THEN** los 15 lantánidos y los 15 actínidos aparecen en dos filas propias bajo el período 7, con al menos una fila vacía entre la tabla principal y la primera serie

### Requirement: Categorías y leyenda
El sistema SHALL clasificar cada elemento en una de 10 categorías (metales alcalinos, alcalinotérreos, de transición, otros metales, metaloides, no metales, halógenos, gases nobles, lantánidos y actínidos), cada una con un color pastel consistente y una entrada en la leyenda.

#### Scenario: Color y leyenda
- **WHEN** se muestra la tabla
- **THEN** cada celda tiene el color pastel de su categoría y la leyenda lista las 10 categorías con su color y nombre

#### Scenario: Color no es la única señal
- **WHEN** una persona no distingue los colores
- **THEN** puede conocer la categoría por la leyenda o por el texto de la ficha al seleccionar el elemento

### Requirement: Búsqueda por nombre, símbolo o número atómico
El sistema SHALL comparar el texto buscado contra el nombre (coincidencia parcial o completa), el símbolo y el número atómico, sin distinguir mayúsculas de minúsculas y tolerando diferencias de acentuación.

#### Scenario: Coincidencias destacadas
- **WHEN** la persona escribe un texto que coincide con al menos un elemento
- **THEN** las celdas coincidentes quedan destacadas, las demás atenuadas y ninguna celda se elimina
- **AND** el mensaje de estado informa del total de coincidencias

#### Scenario: Acentos y mayúsculas
- **WHEN** la persona escribe «hidrogeno» o «HIDRÓGENO»
- **THEN** obtiene las mismas coincidencias que con «Hidrógeno»

#### Scenario: Sin resultados
- **WHEN** el texto no coincide con ningún elemento
- **THEN** se muestra el estado explícito «sin resultados» y ningún elemento se presenta como seleccionado por la búsqueda

#### Scenario: Campo vacío
- **WHEN** la persona vacía el campo de búsqueda
- **THEN** se restauran los estilos normales y se muestran los 118 elementos

### Requirement: Selección y ficha de detalles
El sistema SHALL permitir seleccionar un elemento activando su celda por clic o teclado. Solo MUST haber un elemento seleccionado a la vez; la celda queda marcada y la ficha muestra nombre, símbolo, número atómico, masa atómica, categoría, período, grupo, configuración electrónica y electronegatividad.

#### Scenario: Seleccionar un elemento
- **WHEN** la persona activa la celda de un elemento
- **THEN** la celda queda marcada y la ficha muestra los datos de ese elemento

#### Scenario: Reemplazar la selección
- **WHEN** hay un elemento seleccionado y la persona activa otra celda
- **THEN** la selección y la ficha pasan al nuevo elemento y se retira la marca del anterior

#### Scenario: Dato ausente
- **WHEN** el elemento seleccionado no tiene electronegatividad definida
- **THEN** la ficha indica explícitamente que no está definida en lugar de dejar un hueco

#### Scenario: Limpiar
- **WHEN** la persona pulsa «Limpiar»
- **THEN** se vacía la búsqueda, se retira la selección y su marca, y la ficha vuelve a su estado vacío

### Requirement: Geometría estable
El sistema SHALL mantener celdas de dimensión base fija y MUST NOT cambiar el tamaño de la tabla, la posición de las celdas ni el tamaño de fuente al buscar, seleccionar o limpiar. La ficha MUST ocupar una región reservada con altura mínima y ancho definidos, aparte de la tabla.

#### Scenario: Seleccionar no mueve la tabla
- **WHEN** la persona selecciona un elemento o limpia la selección
- **THEN** la tabla conserva su tamaño y la posición de todas sus celdas

#### Scenario: Buscar no mueve la tabla
- **WHEN** la persona escribe en el buscador o aparece el estado «sin resultados»
- **THEN** la tabla conserva su tamaño y la posición de todas sus celdas

#### Scenario: Ventana estrecha
- **WHEN** la ventana es más estrecha que la tabla
- **THEN** la tabla se desplaza horizontalmente dentro de su contenedor, las celdas no se comprimen, la página no tiene desplazamiento horizontal y una pista recuerda deslizar

### Requirement: Accesibilidad de teclado y tecnologías de apoyo
El sistema SHALL ofrecer nombre accesible y foco visible en la búsqueda, las celdas y «Limpiar», con orden de foco comprensible. Toda acción de ratón MUST estar disponible con teclado, los cambios de resultados y de ficha MUST anunciarse en regiones vivas, ningún estado MUST depender solo del color y el texto MUST tener contraste suficiente sobre los colores pastel.

#### Scenario: Recorrido solo con teclado
- **WHEN** la persona usa únicamente teclado
- **THEN** puede buscar, enfocar una celda con Tab y seleccionarla con Enter o Espacio, y limpiar

#### Scenario: Atajo de búsqueda
- **WHEN** la persona pulsa «/» fuera de un campo de texto
- **THEN** el foco pasa al campo de búsqueda sin escribir el carácter

#### Scenario: Estados anunciados
- **WHEN** cambian los resultados de búsqueda o la ficha
- **THEN** el cambio se comunica como texto en una región viva

#### Scenario: Estados sin depender del color
- **WHEN** una celda está coincidente, atenuada o seleccionada
- **THEN** el estado se distingue además por un indicador no cromático (borde, marca o atributo accesible)

### Requirement: Funcionamiento local sin dependencias
El sistema SHALL funcionar abriendo `index.html` por `file://` en Chrome, Firefox y Safari recientes, sin servidor, backend, framework, build, módulos ES, `fetch` ni recursos remotos, con 0 peticiones de red. Todo el texto visible MUST estar en español y los datos del catálogo MUST insertarse como texto, no como HTML.

#### Scenario: Apertura local
- **WHEN** se abre `index.html` desde el sistema de archivos
- **THEN** la tabla, la búsqueda y la ficha funcionan y no se realiza ninguna petición de red

#### Scenario: Sin JavaScript
- **WHEN** el navegador no ejecuta JavaScript
- **THEN** la página muestra un mensaje en español indicando que requiere JavaScript
