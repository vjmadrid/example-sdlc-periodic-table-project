## ADDED Requirements

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
