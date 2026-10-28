# Reglas de negocio

Un encabezado `##` por área del dominio. Los términos son los del glosario.

## Catálogo de elementos

### Contenido del catálogo

El catálogo contiene exactamente 118 elementos, con números atómicos únicos del 1 al 118. Cada uno tiene número atómico, símbolo, nombre, masa atómica, categoría, período, grupo, configuración electrónica y electronegatividad. Los datos viven en un único archivo local (`data/elements.js`) y se cargan sin red.
**Excepciones:** la electronegatividad puede estar ausente en elementos que no la tienen definida; en ese caso la ficha lo indica.
**Cuando se incumple:** se detecta durante la validación del catálogo al cargar (cantidad distinta de 118, duplicados o posiciones periódicas inválidas).
**Autoridad:** responsable del producto.

### Categorías

Existen 10 categorías: metales alcalinos, metales alcalinotérreos, metales de transición, otros metales, metaloides, no metales, halógenos, gases nobles, lantánidos y actínidos. Cada una tiene un color pastel consistente sobre fondo claro (tema claro, predeterminado) y un tono apagado equivalente en el tema oscuro, y aparece en la leyenda.
**Excepciones:** ninguna.
**Cuando se incumple:** una categoría sin color o sin entrada en la leyenda se considera un defecto.
**Autoridad:** responsable del producto.

## Tabla periódica

### Disposición

La tabla principal tiene 18 columnas (grupos) y 7 filas (períodos), con los huecos estándar IUPAC. Cada celda muestra al menos número atómico y símbolo. Lantánidos (57–71, 15 elementos) y actínidos (89–103, 15 elementos) se muestran en dos filas independientes bajo la tabla principal, en orden de número atómico, con al menos 1 fila vacía de separación.
**Excepciones:** ninguna.
**Cuando se incumple:** defecto de presentación.
**Autoridad:** responsable del producto (estándar IUPAC).

### Geometría estable

Las celdas tienen dimensión base fija y la tabla no cambia de tamaño, posición de celdas ni tamaño de fuente al buscar, seleccionar o cerrar la ficha. En ventanas estrechas la tabla se desplaza horizontalmente en su contenedor y las celdas no se comprimen.
**Excepciones:** ninguna.
**Cuando se incumple:** defecto de presentación.
**Autoridad:** responsable del producto.

## Tema

### Tema claro por defecto y modo oscuro opcional

La página abre siempre en tema claro. Un botón en la zona superior alterna entre tema claro y oscuro, aplicándolo a toda la página, sin cambiar el tamaño ni la posición de la tabla ni perder la búsqueda o la selección. El botón expone su estado (pulsado/no pulsado) y un icono, no solo el color. El tema no se recuerda entre visitas.
**Excepciones:** ninguna.
**Cuando se incumple:** defecto de presentación o de accesibilidad.
**Autoridad:** responsable del producto.

## Búsqueda

### Qué se busca y cómo se compara

El texto se compara contra nombre (coincidencia parcial o completa), símbolo y número atómico. No distingue mayúsculas de minúsculas y tolera diferencias de acentuación. Las celdas coincidentes quedan destacadas y las demás atenuadas, sin eliminarlas. El mensaje de estado informa del total de coincidencias.
**Excepciones:** con el campo vacío se restauran los estilos normales y se muestran los 118 elementos.
**Cuando se incumple:** si no hay coincidencias, se muestra el estado explícito «sin resultados» y no se presenta ningún elemento como seleccionado por la búsqueda.
**Autoridad:** responsable del producto.

## Selección y detalles

### Qué muestra la ficha

Activar una celda por clic o teclado selecciona ese elemento: la celda queda marcada y la ficha muestra, como mínimo, nombre, símbolo, número atómico, masa atómica, categoría, período y grupo, y además configuración electrónica y electronegatividad. La ficha ocupa una región reservada con altura mínima y ancho definido. Solo hay 1 elemento seleccionado a la vez; la selección puede limpiarse y entonces se restaura la ficha vacía y se retira la marca.
**Excepciones:** ninguna.
**Cuando se incumple:** defecto de presentación.
**Autoridad:** responsable del producto.

## Accesibilidad

### Interacción sin ratón ni color

Todo control (búsqueda, celdas, limpiar) tiene nombre accesible y foco visible, con orden de foco comprensible. Toda acción disponible con ratón lo está con teclado. Los cambios de resultados y de ficha se anuncian en regiones vivas. Ningún estado (categoría, selección, coincidencia) depende solo del color. El texto debe tener contraste suficiente sobre los colores pastel.
**Excepciones:** ninguna.
**Cuando se incumple:** defecto de accesibilidad.
**Autoridad:** responsable del producto.

## Funcionamiento local

### Sin dependencias externas

La página funciona abriendo `index.html` por `file://` en Chrome, Firefox y Safari recientes, sin servidor, backend, framework, build, módulos ES, `fetch` ni recursos remotos: 0 peticiones de red para la experiencia principal.
**Excepciones:** ninguna.
**Cuando se incumple:** defecto bloqueante.
**Autoridad:** responsable del producto.

## Estados de la búsqueda y la selección

El producto no tiene ciclo de vida de objetos de dominio, pero la interfaz tiene dos estados independientes.

Estados legales de búsqueda: sin búsqueda, con coincidencias, sin resultados.

- sin búsqueda → con coincidencias: la persona escribe texto que coincide con al menos 1 elemento.
- sin búsqueda → sin resultados: la persona escribe texto que no coincide con ningún elemento; se muestra el mensaje explícito.
- con coincidencias ↔ sin resultados: la persona edita el texto.
- con coincidencias → sin búsqueda; sin resultados → sin búsqueda: la persona vacía el campo o pulsa «Limpiar»; se restauran los 118 elementos.

Estados legales de selección: sin selección, con elemento seleccionado.

- sin selección → con elemento seleccionado: la persona activa una celda por clic o teclado.
- con elemento seleccionado → con elemento seleccionado: la persona activa otra celda; reemplaza a la anterior.
- con elemento seleccionado → sin selección: la persona pulsa «Limpiar»; se retira la marca y vuelve la ficha vacía.

No hay otra transición legal.
