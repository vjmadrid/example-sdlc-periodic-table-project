# periodic-table-web Specification

## Purpose

Ofrecer una tabla periódica completa y consultable que funcione como una página estática local, con una organización visual estable y datos útiles para cada elemento.

## Requirements

### Requirement: Complete periodic table layout

La página SHALL mostrar los 118 elementos químicos en sus posiciones correspondientes de grupos y períodos, con una leyenda visual para las categorías representadas mediante colores pastel. Los lantánidos y actínidos SHALL aparecer en dos filas independientes debajo de la tabla principal, con al menos una fila visual vacía entre la tabla principal y esas series.

#### Scenario: Main table is complete

- **WHEN** la página se abre
- **THEN** se muestran los elementos de los períodos 1 a 7 en una cuadrícula de 18 grupos, incluidos los espacios vacíos que preservan sus posiciones periódicas
- **AND** cada elemento visible muestra como mínimo su número atómico y símbolo

#### Scenario: Inner transition series are separated

- **WHEN** el usuario observa la parte inferior de la tabla
- **THEN** encuentra una fila de lantánidos y otra de actínidos separadas de la tabla principal por al menos una fila vacía
- **AND** ambas series mantienen el orden atómico y cubren sus 14 elementos

#### Scenario: Element categories are distinguishable

- **WHEN** el usuario compara elementos de distintas categorías
- **THEN** cada categoría tiene un color pastel consistente
- **AND** la leyenda permite relacionar cada color con su categoría

### Requirement: Local static operation

La aplicación SHALL funcionar al abrir directamente su documento HTML local, sin servidor web, backend, compilación en tiempo de ejecución, framework o dependencia remota. Todos los recursos necesarios para la experiencia principal SHALL estar incluidos en el proyecto y ser referenciados mediante rutas locales.

#### Scenario: Open from the file system

- **WHEN** el usuario abre el archivo HTML mediante una ruta `file://`
- **THEN** la tabla, la búsqueda, la selección y los detalles se cargan y responden sin realizar peticiones de red

### Requirement: Element search

La página SHALL ofrecer un campo de búsqueda visible que permita localizar elementos por nombre, símbolo o número atómico, sin distinguir mayúsculas de minúsculas y tolerando diferencias de acentuación en los nombres. Los resultados que no coincidan SHALL quedar claramente diferenciados de los coincidentes y la interfaz SHALL indicar cuando no haya coincidencias.

#### Scenario: Search by name

- **WHEN** el usuario escribe un nombre de elemento completo o parcial
- **THEN** solo los elementos cuyo nombre coincida permanecen destacados como resultados

#### Scenario: Search by symbol or atomic number

- **WHEN** el usuario escribe un símbolo o un número atómico
- **THEN** el elemento correspondiente queda localizado y destacado en la tabla

#### Scenario: Search with no matches

- **WHEN** el texto de búsqueda no coincide con ningún elemento
- **THEN** la interfaz muestra un estado explícito de “sin resultados” y no presenta una selección engañosa

### Requirement: Element selection and details

La página SHALL permitir seleccionar cualquier elemento y SHALL mostrar sus detalles en una región identificable aparte de la cuadrícula. Como mínimo, los detalles SHALL incluir nombre, símbolo, número atómico, masa atómica, categoría, período y grupo, además de la configuración de datos disponible para enriquecer la consulta. El elemento seleccionado SHALL quedar visualmente marcado y la región de detalles SHALL tener un espacio reservado estable.

#### Scenario: Select an element

- **WHEN** el usuario activa un elemento mediante clic o teclado
- **THEN** el panel de detalles muestra la información del elemento activado
- **AND** la celda activa queda diferenciada del resto

#### Scenario: Layout remains stable after selection

- **WHEN** el usuario selecciona distintos elementos, incluidos elementos con textos de distinta longitud
- **THEN** la tabla mantiene sus dimensiones, posiciones de celdas y tamaño de fuente
- **AND** el panel de detalles usa el espacio reservado sin provocar que la cuadrícula se reescale

### Requirement: Usable keyboard and assistive interaction

Los controles de búsqueda, las celdas seleccionables y la región de detalles SHALL tener nombres accesibles y un orden de foco comprensible. Toda acción disponible con el ratón SHALL poder ejecutarse mediante teclado, y los cambios de resultados o detalles SHALL comunicarse a tecnologías de asistencia sin depender exclusivamente del color.

#### Scenario: Navigate and activate with keyboard

- **WHEN** el usuario recorre los controles con el teclado y activa una celda enfocada
- **THEN** puede mover el foco entre controles y seleccionar el elemento sin usar el ratón

#### Scenario: Understand state without color alone

- **WHEN** un elemento está seleccionado o una búsqueda oculta elementos
- **THEN** el estado se expresa también mediante foco, texto, atributos o etiquetas accesibles

### Requirement: Light and dark theme toggle

La página SHALL ofrecer en su zona superior un botón visible que permita alternar entre un modo claro y un modo oscuro. Al activarlo, toda la interfaz (cabecera, búsqueda, leyenda, tabla y panel de detalles) SHALL cambiar de tema de inmediato, sin recargar la página, sin alterar las dimensiones ni las posiciones de la tabla y sin perder la búsqueda ni el elemento seleccionado. En ambos temas el texto SHALL mantener un contraste suficiente y las categorías SHALL seguir siendo distinguibles y relacionables con la leyenda.

#### Scenario: Switch from light to dark

- **WHEN** la página se muestra en modo claro y el usuario activa el botón de tema
- **THEN** la interfaz completa pasa a modo oscuro
- **AND** la tabla conserva sus dimensiones y posiciones de celdas

#### Scenario: Switch from dark to light

- **WHEN** la página se muestra en modo oscuro y el usuario activa el botón de tema
- **THEN** la interfaz completa pasa a modo claro

#### Scenario: Current state is preserved when toggling

- **WHEN** el usuario tiene un texto de búsqueda o un elemento seleccionado y cambia de tema
- **THEN** la búsqueda, los resultados y el elemento seleccionado permanecen sin cambios

### Requirement: Theme initial choice and persistence

Cuando el usuario no haya elegido un tema, la página SHALL usar el tema que coincida con la preferencia de color del sistema. Cuando el usuario elija un tema con el botón, la página SHALL recordar esa elección y aplicarla en visitas posteriores en el mismo navegador, con prioridad sobre la preferencia del sistema. Si la preferencia no se puede leer o guardar, la página SHALL seguir funcionando con el tema por defecto del sistema o claro.

#### Scenario: First visit follows system preference

- **WHEN** el usuario abre la página por primera vez y su sistema prefiere el modo oscuro
- **THEN** la página se muestra en modo oscuro

#### Scenario: Manual choice is remembered

- **WHEN** el usuario cambia el tema con el botón y vuelve a abrir la página
- **THEN** la página se muestra con el tema elegido, aunque difiera de la preferencia del sistema

#### Scenario: Storage unavailable

- **WHEN** el navegador no permite guardar la preferencia
- **THEN** el botón sigue alternando el tema durante la sesión y no se muestra ningún error al usuario

### Requirement: Accessible theme control

El botón de tema SHALL tener un nombre accesible que describa su acción o estado, SHALL poder activarse con teclado, SHALL mostrar foco visible y SHALL comunicar el tema activo mediante texto, icono o atributos accesibles, sin depender solo del color. Su objetivo de interacción SHALL ser suficientemente amplio para uso táctil.

#### Scenario: Activate with keyboard

- **WHEN** el usuario enfoca el botón de tema con el teclado y pulsa Intro o Espacio
- **THEN** el tema cambia y el foco permanece en el botón

#### Scenario: Active theme is announced

- **WHEN** un usuario de tecnología de asistencia recorre el botón
- **THEN** su nombre o estado accesible indica el tema activo o el tema al que cambiará
