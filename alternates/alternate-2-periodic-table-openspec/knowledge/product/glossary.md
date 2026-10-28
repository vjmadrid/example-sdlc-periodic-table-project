# Glosario

Las palabras que usa este producto y las que rechaza. Cuando una palabra se rechaza es porque es el sinónimo cercano al que recurre quien llega nuevo.

### Elemento

Es cada una de las 118 sustancias químicas que muestra la tabla, identificada por su número atómico, símbolo y nombre.
_Uso_: celdas de la tabla; ficha de detalles; resultados de búsqueda. En español: elemento.
_Evitar_: átomo; sustancia; casilla (para el dato, no para la celda)
_Relacionado_: Número atómico; Símbolo; Celda; Categoría

Código: `PERIODIC_ELEMENTS` en [`data/elements.js`](../data/elements.js).

### Número atómico

Es el entero único (1 a 118) que identifica a un elemento y ordena la tabla.
_Uso_: esquina de cada celda; ficha; búsqueda. En español: número atómico.
_Evitar_: número, índice, ID
_Relacionado_: Elemento; Búsqueda

Código: campo `atomicNumber`.

### Símbolo

Es la abreviatura de uno o dos caracteres de un elemento (por ejemplo, Fe).
_Uso_: centro de la celda; ficha; búsqueda. En español: símbolo.
_Evitar_: abreviatura, sigla, código
_Relacionado_: Elemento

### Categoría

Es el grupo de afinidad química al que pertenece un elemento y que determina su color: metales alcalinos, metales alcalinotérreos, metales de transición, otros metales, metaloides, no metales, halógenos, gases nobles, lantánidos y actínidos.
_Uso_: leyenda; color de la celda; ficha. En español: categoría.
_Evitar_: tipo, familia, clase
_Relacionado_: Leyenda; Grupo

Código: campo `category` (`alkali`, `alkaline`, `transition`, `post-transition`, `metalloid`, `nonmetal`, `halogen`, `noble`, `lanthanide`, `actinide`).

### Grupo

Es la columna (1 a 18) que ocupa un elemento en la tabla.
_Uso_: cabecera de columnas; ficha. En español: grupo.
_Evitar_: columna, familia
_Relacionado_: Período; Categoría

### Período

Es la fila (1 a 7) que ocupa un elemento en la tabla.
_Uso_: ficha; posición en la tabla. En español: período.
_Evitar_: fila, nivel
_Relacionado_: Grupo

### Series internas

Son las dos filas independientes de lantánidos (57–71) y actínidos (89–103) que se muestran bajo la tabla principal, separadas por al menos una fila vacía.
_Uso_: filas inferiores de la tabla; separador «Series internas». En español: series internas.
_Evitar_: apéndice, notas al pie
_Relacionado_: Categoría; Tabla principal

### Tabla principal

Es la cuadrícula de 18 grupos por 7 períodos, con sus huecos, sin las series internas.
_Uso_: región central de la página. En español: tabla principal.
_Evitar_: tabla base
_Relacionado_: Grupo; Período; Series internas

### Celda

Es el botón que representa un elemento en la tabla y muestra al menos su número atómico y símbolo.
_Uso_: tabla; series internas. En español: celda.
_Evitar_: ficha (reservado para el panel de detalles), tarjeta, botón
_Relacionado_: Elemento; Selección

Código: clase `element-tile`.

### Búsqueda

Es la acción de escribir texto para localizar elementos por nombre, símbolo o número atómico, resaltando coincidencias en la tabla.
_Uso_: campo «Buscar un elemento»; mensaje de estado. En español: búsqueda, buscar.
_Evitar_: filtro (la tabla no elimina celdas)
_Relacionado_: Coincidencia; Sin resultados

### Coincidencia

Es un elemento cuyo nombre, símbolo o número atómico encaja con el texto buscado y permanece destacado.
_Uso_: celdas resaltadas; recuento en el mensaje de estado. En español: coincidencia, resultado.
_Evitar_: acierto
_Relacionado_: Búsqueda

### Sin resultados

Es el estado explícito que comunica que ningún elemento coincide con el texto buscado.
_Uso_: mensaje de estado de la búsqueda. En español: sin resultados.
_Evitar_: error, vacío
_Relacionado_: Búsqueda

### Selección

Es el elemento activado por clic o teclado, marcado visualmente y mostrado en la ficha.
_Uso_: celda activa; ficha de detalles. En español: seleccionar, elemento seleccionado.
_Evitar_: elegir, marcar
_Relacionado_: Celda; Ficha de detalles

### Ficha de detalles

Es el panel aparte, de tamaño reservado, que muestra los datos del elemento seleccionado: nombre, símbolo, número atómico, masa atómica, categoría, período, grupo, configuración electrónica y electronegatividad.
_Uso_: panel «Ficha del elemento». En español: ficha, panel de detalles.
_Evitar_: popup, modal, tooltip
_Relacionado_: Selección; Elemento

### Leyenda

Es la lista de categorías que relaciona cada color pastel con su nombre.
_Uso_: cabecera de la página. En español: leyenda.
_Evitar_: clave
_Relacionado_: Categoría

### Tema

Es el esquema de colores de la página: claro (predeterminado) u oscuro, que la persona alterna con el botón de la cabecera.
_Uso_: botón «Modo oscuro»; colores de la página. En español: tema, modo claro, modo oscuro.
_Evitar_: skin, estilo
_Relacionado_: Categoría; Leyenda

## Modelo de dominio

El producto mantiene un catálogo único y local de exactamente 118 elementos, con número atómico único. Cada elemento tiene una categoría, un período y un grupo; los de lantánidos y actínidos se presentan en las series internas, no en la tabla principal. Ninguna acción de búsqueda o selección altera el catálogo ni la geometría de la tabla.
