# ED-44 · Gestión de temas (Light, Dark, Nocturnal)

2026-10-28

## Ficha de la historia

ED-44 es una User Story del proyecto Edutainment Dev, en curso, que añade tres temas visuales a la plataforma.

| Campo | Valor |
| --- | --- |
| Clave | ED-44 |
| Tipo | User Story |
| Proyecto | Edutainment Dev (ED) |
| Estado | En curso |
| Asignado a | Víctor Javier Madrid Triviño |
| Reporter | Jaime Escribano Benavente |
| Prioridad | Low |
| Creada | 2026-10-27 |
| Documentación | [Edutainment - Mobile Development (Confluence), sección 5. Functional requirements catalogue](https://one-atlas-mfww.atlassian.net/wiki/spaces/MD/pages/7700483/Edutainment#5.-Functional-requirements-catalogue) |

## Resumen y contexto

La historia pide que los usuarios cambien entre los modos Light, Dark y Nocturnal para adaptar la plataforma a su preferencia y a la luz ambiente.

- **Título en Jira:** Implement theme management supporting light, dark, and nocturnal modes.
- **Contexto declarado:** la plataforma necesita gestión de temas con tres modos visuales. No se aporta más contexto.
- **Otra información:** N/A.

## Criterios de aceptación

La historia fija cinco criterios, copiados de Jira.

1. Implementar un control de selección de tema en la interfaz de la plataforma.
2. Definir estilos para tres modos distintos: Light, Dark y Nocturnal.
3. Aplicar el tema elegido globalmente en todos los componentes del shell y elementos de la UI.
4. Persistir la preferencia del usuario entre sesiones y recargas de página.
5. Usar la preferencia del sistema por defecto si no hay una selección guardada.

## Requisitos funcionales

Cinco requisitos funcionales amplían los criterios con ubicación del control, horario automático y alcance sobre la tabla periódica.

| Requisito | Descripción |
| --- | --- |
| Selección manual | Cambio entre Light, Dark y Nocturnal con un toggle en la cabecera superior derecha. |
| Programación nocturna adaptativa | Nocturnal se activa automáticamente desde las 22:00 (hora local del dispositivo) si el usuario no ha elegido manualmente. |
| Persistencia | La preferencia se guarda entre sesiones y recargas, en el mismo dispositivo. |
| Estilo global | Aplica a todos los componentes del shell, la UI y las categorías de la tabla periódica, manteniendo distinguibles los colores de categoría. |
| Valor por defecto | Sin selección guardada, se usa el tema del sistema. |

## Requisitos no funcionales

Los requisitos no funcionales fijan contraste WCAG 2.2 AA, una respuesta inferior a 100 ms y respeto a `prefers-reduced-motion`.

| Categoría | Requisito |
| --- | --- |
| Accesibilidad (WCAG 2.2 AA) | Todos los temas cumplen los contrastes AA. Nocturnal usa una paleta aprobada de tono sépia para reducir la fatiga visual. |
| Rendimiento | Transición inmediata, con respuesta a la interacción en menos de 100 ms y sin recarga completa de página. |
| Integridad visual | Evitar deslumbramiento excesivo y estados de componente "lavados" en Dark y Nocturnal. |
| Sensibilidad al movimiento | Las animaciones de transición respetan el ajuste `prefers-reduced-motion` del sistema. |

## Casos límite

La historia enumera cinco casos límite; solo el primero trae un comportamiento definido, los otros cuatro quedan por especificar.

| Caso | Qué plantea la historia | Estado |
| --- | --- | --- |
| Selección manual frente a horario | Si el usuario elige Light a las 23:00, el horario automático no debe anular su elección. | Comportamiento definido |
| Cambios de zona horaria o reloj | Gestionar el cambio automático si cambia la hora del dispositivo o el usuario cruza zonas horarias con la app abierta. | Por definir |
| Almacenamiento no disponible | Definir el fallback (tema del sistema) si falla el almacenamiento local o la API de preferencias. | Fallback indicado, detalle por definir |
| Modo de alto contraste del SO | Los temas no deben entrar en conflicto con los ajustes de alto contraste del sistema operativo ni anularlos. | Por definir |
| Sincronización entre pestañas | Comportamiento si hay varias pestañas abiertas y se cambia el tema en una. | Por definir |

## Puntos de atención por equipo especializado

Cada equipo recibe solo lo que la historia ya dice y le afecta; no se añade alcance nuevo.

| Equipo | Qué debe revisar |
| --- | --- |
| UX/UI | Ubicación y forma del toggle en la cabecera superior derecha. Paleta sépia de Nocturnal. Colores de categoría de la tabla periódica distinguibles en los tres temas. Evitar deslumbramiento y estados "lavados" en Dark y Nocturnal. |
| Accesibilidad | Contraste WCAG 2.2 AA en los tres temas. Convivencia con el modo de alto contraste del SO. Respeto a `prefers-reduced-motion` en las transiciones. |
| Frontend | Aplicación global del tema en shell y UI. Cambio en menos de 100 ms sin recarga. Persistencia local y fallback al tema del sistema. Horario de las 22:00 con hora local del dispositivo. Sincronización entre pestañas. |
| QA | Verificar los cinco criterios de aceptación y los cinco casos límite. Probar el override manual a las 23:00, el cambio de zona horaria, el fallo de almacenamiento y varias pestañas. |
| Producto | Cerrar los casos límite sin comportamiento definido y las preguntas abiertas de la sección siguiente. |

## Ambigüedades y preguntas abiertas

Hay cinco puntos que la historia deja sin cerrar y que afectan a la implementación.

- [ ] ¿Hasta qué hora dura la ventana nocturna? La historia indica el inicio (22:00) pero no el fin.
- [ ] ¿Se aprueba ya la paleta sépia de Nocturnal o falta definirla? La historia dice "aprobada" sin referencia.
- [ ] ¿Qué ocurre con el horario automático cuando el usuario ya eligió un tema manual: se desactiva de forma permanente o hasta cuándo?
- [ ] ¿Cómo se comporta Nocturnal frente al tema del sistema cuando no hay selección guardada? El criterio 5 y el horario de las 22:00 podrían solaparse.
- [ ] ¿Se persiste solo en el dispositivo o también en el perfil de usuario? Los requisitos hablan de "el mismo dispositivo"; el criterio de aceptación dice "entre sesiones".
