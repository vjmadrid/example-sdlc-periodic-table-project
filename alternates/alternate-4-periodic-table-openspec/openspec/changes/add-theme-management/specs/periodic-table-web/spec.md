# Spec Delta

## MODIFIED Requirements

### Requirement: Disposición de la tabla principal
El sistema SHALL mostrar la tabla principal de 18 grupos por 7 períodos con los huecos estándar IUPAC, sobre el fondo del tema activo. Cada celda MUST mostrar al menos el número atómico y el símbolo.

#### Scenario: Posición por grupo y período
- **WHEN** se muestra la tabla
- **THEN** cada elemento de la tabla principal ocupa la columna de su grupo y la fila de su período, y los huecos IUPAC quedan vacíos

### Requirement: Categorías y leyenda
El sistema SHALL clasificar cada elemento en una de 10 categorías (metales alcalinos, alcalinotérreos, de transición, otros metales, metaloides, no metales, halógenos, gases nobles, lantánidos y actínidos), cada una con un color consistente dentro del tema activo y una entrada en la leyenda. En cada tema los 10 colores MUST ser distinguibles entre sí y el texto sobre ellos MUST cumplir el contraste WCAG 2.2 AA.

#### Scenario: Color y leyenda
- **WHEN** se muestra la tabla
- **THEN** cada celda tiene el color de su categoría en el tema activo y la leyenda lista las 10 categorías con su color y nombre

#### Scenario: Categorías en cada tema
- **WHEN** el tema es Claro, Oscuro o Nocturno
- **THEN** las 10 categorías se distinguen entre sí y el número y el símbolo de cada celda son legibles sobre su color

#### Scenario: Color no es la única señal
- **WHEN** una persona no distingue los colores
- **THEN** puede conocer la categoría por la leyenda o por el texto de la ficha al seleccionar el elemento
