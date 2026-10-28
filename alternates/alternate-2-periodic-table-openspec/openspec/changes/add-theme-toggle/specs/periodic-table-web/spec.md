# Spec Delta

## MODIFIED Requirements

### Requirement: Fondo claro y categorías en color pastel
El sistema SHALL mostrar la página por defecto sobre fondo claro y asignar a cada una de las 10 categorías (metales alcalinos, alcalinotérreos, de transición, otros metales, metaloides, no metales, halógenos, gases nobles, lantánidos y actínidos) un color pastel consistente, con una leyenda que relacione cada color con su nombre.

#### Scenario: Color por categoría
- **WHEN** se muestra la tabla
- **THEN** cada celda tiene el color pastel de su categoría y la leyenda lista las 10 categorías

#### Scenario: Texto legible
- **WHEN** se muestra cualquier celda sobre su color pastel
- **THEN** el contraste del texto es suficiente para leerlo

#### Scenario: Tema inicial claro
- **WHEN** la persona abre la página
- **THEN** se muestra en tema claro, sin importar el tema usado en una visita anterior

## ADDED Requirements

### Requirement: Selector de tema claro y oscuro
El sistema SHALL ofrecer en la zona superior de la página un botón que alterne entre tema claro y tema oscuro, aplicando el cambio a toda la página, incluidos celdas, leyenda, buscador y ficha.

#### Scenario: Cambiar a modo oscuro
- **WHEN** la persona activa el botón estando en tema claro
- **THEN** toda la página pasa a tema oscuro y el botón indica que el modo oscuro está activo

#### Scenario: Volver a modo claro
- **WHEN** la persona activa el botón estando en tema oscuro
- **THEN** toda la página vuelve al tema claro y el botón indica que el modo oscuro está inactivo

#### Scenario: Contraste en modo oscuro
- **WHEN** se muestra cualquier celda, texto o control en tema oscuro
- **THEN** el contraste del texto es suficiente para leerlo y cada categoría conserva su color distintivo

#### Scenario: Geometría estable al cambiar de tema
- **WHEN** la persona cambia de tema
- **THEN** la tabla, las celdas, la ficha y el tamaño de fuente conservan tamaño y posición, y el elemento seleccionado y la búsqueda activa se mantienen

### Requirement: Selector de tema accesible
El botón de tema SHALL tener nombre accesible, exponer su estado a tecnologías de apoyo, mostrar foco visible y poder activarse con teclado, sin depender solo del color para indicar el tema activo.

#### Scenario: Uso con teclado
- **WHEN** la persona enfoca el botón con Tab y pulsa Enter o Espacio
- **THEN** el tema cambia

#### Scenario: Estado expuesto
- **WHEN** el tema oscuro está activo
- **THEN** el botón indica estado activado a tecnologías de apoyo y muestra un icono distinto al del tema claro
