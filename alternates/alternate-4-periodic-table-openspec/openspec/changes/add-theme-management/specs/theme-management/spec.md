# Spec Delta

## Purpose

Permite a la persona elegir entre los temas visuales Claro, Oscuro y Nocturno, aplicarlo a toda la página, conservarlo entre sesiones y, sin elección manual, seguir el sistema o la programación nocturna.

## ADDED Requirements

### Requirement: Selector de tema
El sistema SHALL ofrecer en la esquina superior derecha de la cabecera un control para elegir entre «Automático», «Claro», «Oscuro» y «Nocturno». El control MUST tener nombre accesible, foco visible y ser operable con teclado, y MUST indicar la opción activa.

#### Scenario: Elegir un tema
- **WHEN** la persona elige «Oscuro» en el control
- **THEN** la página adopta el tema Oscuro sin recargar y el control muestra «Oscuro» como opción activa

#### Scenario: Uso solo con teclado
- **WHEN** la persona enfoca el control con Tab y cambia de opción con el teclado
- **THEN** el tema cambia igual que con ratón y el cambio se comunica como texto en una región viva

#### Scenario: Volver a Automático
- **WHEN** la persona elige «Automático»
- **THEN** se descarta su elección manual y el tema pasa a resolverse por la programación nocturna y el sistema

### Requirement: Tres temas definidos
El sistema SHALL definir tres temas: Claro, Oscuro y Nocturno. El tema Nocturno MUST usar una paleta de tendencia sepia. Los tres MUST evitar el exceso de brillo y los estados «apagados» que impidan distinguir componentes.

#### Scenario: Tema Nocturno
- **WHEN** el tema activo es Nocturno
- **THEN** fondos y textos usan la paleta sepia aprobada y ningún componente queda ilegible o sin contraste

### Requirement: Aplicación global del tema
El sistema SHALL aplicar el tema activo a todos los componentes de la página: cabecera, búsqueda, botón «Limpiar», leyenda, tabla, series internas, ficha, avisos y el propio selector.

#### Scenario: Cobertura completa
- **WHEN** cambia el tema
- **THEN** ningún componente conserva los colores del tema anterior

### Requirement: Tema por defecto del sistema
El sistema SHALL usar el tema que corresponda a la preferencia de color del sistema (claro u oscuro) cuando no haya elección manual guardada.

#### Scenario: Sistema oscuro sin preferencia guardada
- **WHEN** la página se carga fuera de la ventana nocturna, sin elección guardada y con el sistema en modo oscuro
- **THEN** se aplica el tema Oscuro

#### Scenario: Sistema claro sin preferencia guardada
- **WHEN** la página se carga fuera de la ventana nocturna, sin elección guardada y con el sistema en modo claro
- **THEN** se aplica el tema Claro

#### Scenario: Cambia el tema del sistema
- **WHEN** la persona no ha elegido tema y cambia la preferencia de color del sistema con la página abierta
- **THEN** el tema se actualiza sin recargar

### Requirement: Persistencia de la elección
El sistema SHALL guardar la elección manual en el dispositivo y restaurarla al recargar y en sesiones posteriores, sin guardar ningún dato personal.

#### Scenario: Recarga
- **WHEN** la persona elige «Claro» y recarga la página
- **THEN** se aplica el tema Claro y el control lo muestra activo

#### Scenario: Primera visita
- **WHEN** no existe elección guardada
- **THEN** el control muestra «Automático»

### Requirement: Programación nocturna
El sistema SHALL aplicar el tema Nocturno entre las 22:00 y las 06:00 de la hora local del dispositivo a quien tenga «Automático» (sin elección manual). La programación MUST NOT sustituir una elección manual.

#### Scenario: Entrada en la ventana nocturna
- **WHEN** son las 22:00 o más tarde (hasta las 06:00), sin elección manual
- **THEN** se aplica el tema Nocturno

#### Scenario: Elección manual dentro de la ventana
- **WHEN** a las 23:00 la persona elige «Claro»
- **THEN** el tema permanece Claro y la programación no lo cambia, ni al recargar ni al pasar el tiempo

#### Scenario: Cambio de hora o de zona con la página abierta
- **WHEN** cambia la hora del dispositivo o su zona horaria, o llega una frontera de la ventana (22:00 o 06:00), sin elección manual
- **THEN** el tema se reevalúa y se actualiza sin recargar

### Requirement: Sincronización entre pestañas
El sistema SHALL reflejar en las demás pestañas abiertas de la página un cambio de elección de tema hecho en una de ellas.

#### Scenario: Cambio en otra pestaña
- **WHEN** hay dos pestañas abiertas y la persona elige «Oscuro» en una
- **THEN** la otra pestaña adopta el tema Oscuro y su control lo muestra activo sin recargar

### Requirement: Almacenamiento no disponible
El sistema SHALL seguir funcionando con el tema por defecto (programación y sistema) cuando el almacenamiento local no esté disponible, falle o contenga un valor no válido, sin mostrar un error al usuario.

#### Scenario: Almacenamiento bloqueado
- **WHEN** el almacenamiento local lanza error al leer o escribir
- **THEN** la página carga con el tema por defecto y el selector sigue cambiando el tema durante la sesión

#### Scenario: Valor corrupto
- **WHEN** el valor guardado no es uno de los temas válidos
- **THEN** se ignora y se aplica el tema por defecto

### Requirement: Contraste y legibilidad
El sistema SHALL cumplir en los tres temas el contraste mínimo WCAG 2.2 AA para texto y para indicadores de interfaz, incluidos el texto sobre cada color de categoría y el foco visible.

#### Scenario: Contraste de texto
- **WHEN** se muestra cualquier texto en cualquier tema
- **THEN** su relación de contraste con el fondo es al menos 4,5:1 (3:1 para texto grande e indicadores de interfaz)

### Requirement: Respuesta inmediata y movimiento reducido
El sistema SHALL aplicar el cambio de tema de forma inmediata, sin recarga y con respuesta visible en menos de 100 ms. Cualquier transición MUST desactivarse con `prefers-reduced-motion: reduce`.

#### Scenario: Cambio sin recarga
- **WHEN** la persona cambia de tema
- **THEN** la página no se recarga y el nuevo tema es visible en menos de 100 ms

#### Scenario: Movimiento reducido
- **WHEN** el sistema indica `prefers-reduced-motion: reduce`
- **THEN** el cambio de tema no incluye transición animada

### Requirement: Compatibilidad con contraste alto del sistema
El sistema SHALL respetar el modo de contraste alto del sistema operativo: cuando está activo, los temas MUST NOT sobrescribir los colores forzados por el sistema y las funciones de la página MUST seguir siendo utilizables.

#### Scenario: Contraste alto activo
- **WHEN** el sistema activa el modo de colores forzados
- **THEN** la página usa los colores del sistema, y los estados (coincidencia, selección, foco) siguen distinguiéndose por borde o marca
