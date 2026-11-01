# Obligaciones

Una pregunta respondida por área.

| Área | Respuesta | Obligación, autoridad y responsable |
| --- | --- | --- |
| Datos y privacidad | no | No se recogen, almacenan ni transmiten datos personales: no hay cuentas, servidor ni analítica. Solo se guarda en el dispositivo el identificador del tema elegido (`light`, `dark` o `nocturnal`), que no es un dato personal. |
| Accesibilidad e inclusión | sí | Ver más abajo. |
| Seguridad y confianza | no | No hay red, backend ni entrada remota; los datos del catálogo son estáticos y se insertan como texto, no como HTML interpretado. |
| Obligación regulatoria | no | Ninguna identificada en los cambios de OpenSpec. |

## Accesibilidad e inclusión

Exige que búsqueda, celdas y ficha tengan nombres accesibles y orden de foco comprensible; que toda acción de ratón sea posible con teclado; que los cambios de resultados y de ficha se comuniquen a tecnologías de apoyo; que ningún estado dependa solo del color; que el texto y los indicadores cumplan el contraste WCAG 2.2 AA sobre los colores de cada tema (Claro, Oscuro y Nocturno); que los temas respeten el modo de contraste alto del sistema y `prefers-reduced-motion`; y que la tabla sea legible en pantallas pequeñas mediante desplazamiento horizontal.
Autoridad: requisito «Usable keyboard and assistive interaction» de la especificación `periodic-table-web`, impuesto por el propio producto (no por una norma externa citada en los cambios).
Responsable: responsable del producto.
Evidencia: tareas 6.4, 7.8 y 7.9 de la verificación de aceptación (recorrido solo con teclado, nombres accesibles, foco, comunicación textual de estados y contraste).
