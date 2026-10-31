# theme-modes Specification

## Purpose

Permite a la persona elegir entre los temas claro, oscuro y nocturno de la tabla periódica, manteniendo en todos ellos la legibilidad, la accesibilidad y el funcionamiento local sin persistencia.

## Requirements

### Requirement: Theme selector with three options
La interfaz SHALL ofrecer un control con las opciones «Claro», «Oscuro» y «Nocturno», operable con ratón y teclado, con nombre accesible y foco visible, y con exactamente una opción activa.

#### Scenario: Cambiar de tema con el ratón
- **WHEN** la persona activa la opción «Oscuro»
- **THEN** la interfaz se muestra con el tema oscuro y solo esa opción figura como activa

#### Scenario: Cambiar de tema con el teclado
- **WHEN** la persona enfoca el control con la tecla de tabulación y activa «Nocturno» con teclado
- **THEN** la interfaz se muestra con el tema nocturno y el foco permanece visible

#### Scenario: Estado activo no depende solo del color
- **WHEN** hay un tema activo
- **THEN** la opción activa se distingue de las demás por un indicador no cromático y por un estado accesible

### Requirement: Initial theme follows system preference
Al cargar, la interfaz SHALL usar el tema oscuro si el sistema declara preferencia por esquema oscuro y el tema claro en cualquier otro caso. El tema nocturno MUST NOT activarse sin una elección explícita.

#### Scenario: Sistema en modo oscuro
- **WHEN** la página se carga con el sistema configurado en esquema oscuro
- **THEN** se muestra el tema oscuro y la opción «Oscuro» figura como activa

#### Scenario: Sistema sin preferencia
- **WHEN** la página se carga sin preferencia de esquema oscuro
- **THEN** se muestra el tema claro

### Requirement: Dark theme appearance
En el tema oscuro, la interfaz SHALL usar fondos oscuros neutros y texto claro, y las diez categorías SHALL conservar un color propio distinguible y su entrada en la leyenda.

#### Scenario: Legibilidad de la tabla
- **WHEN** el tema oscuro está activo
- **THEN** el texto de celdas, ficha, búsqueda y leyenda alcanza un contraste mínimo de 4,5:1 con su fondo

#### Scenario: Categorías distinguibles
- **WHEN** el tema oscuro está activo
- **THEN** cada una de las diez categorías tiene un color distinto en la tabla y en la leyenda, y su nombre sigue visible como texto en la ficha

### Requirement: Nocturnal theme appearance
En el tema nocturno, la interfaz SHALL usar una paleta de luminosidad inferior a la del tema oscuro, con tonos cálidos y sin azules intensos, manteniendo un contraste mínimo de 4,5:1 en el texto.

#### Scenario: Menor luminosidad que el oscuro
- **WHEN** la persona cambia del tema oscuro al nocturno
- **THEN** el fondo general y las superficies resultan más oscuros que en el tema oscuro y el texto sigue siendo legible

#### Scenario: Sin azules intensos
- **WHEN** el tema nocturno está activo
- **THEN** ningún color de fondo, texto o categoría usa un azul saturado

### Requirement: Existing behavior unchanged across themes
En todos los temas, la geometría de la tabla, la búsqueda, la selección, la ficha y los atajos SHALL comportarse igual que en el tema claro, y los estados de coincidencia y selección MUST seguir siendo perceptibles sin depender solo del color.

#### Scenario: Cambiar de tema no mueve la tabla
- **WHEN** la persona cambia de tema con una búsqueda activa y un elemento seleccionado
- **THEN** la búsqueda, la selección y la ficha se conservan y las celdas no cambian de tamaño ni de posición

#### Scenario: Coincidencia y selección visibles
- **WHEN** hay coincidencias y un elemento seleccionado en cualquier tema
- **THEN** las celdas coincidentes, las atenuadas y la seleccionada se distinguen por rasgos además del color

### Requirement: No persistence and no external resources
El cambio de tema SHALL funcionar abriendo `index.html` por `file://`, sin red ni recursos remotos, y MUST NOT almacenar la elección en el navegador.

#### Scenario: Recarga de la página
- **WHEN** la persona elige «Nocturno» y recarga la página
- **THEN** la página vuelve al tema inicial según la preferencia del sistema

#### Scenario: Sin peticiones de red
- **WHEN** la persona cambia de tema
- **THEN** no se realiza ninguna petición de red ni se escribe en el almacenamiento del navegador
