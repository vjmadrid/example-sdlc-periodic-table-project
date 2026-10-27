# Problem

No se dispone de una referencia visual propia de la tabla periódica que pueda consultarse de forma inmediata, sin conexión y sin instalar ni levantar infraestructura (DISC-PRB-001). Además, no existe un ejemplo completo y trazable del ciclo OpenSpec sobre un dominio familiar, reutilizable como punto de partida (DISC-PRB-002).

Estado actual: el `archetype-periodic-table-openspec` está inicializado (schema `spec-driven`) y sin implementación; existe un intento previo (`periodic-table-openspec-version-1`) pendiente de analizar (DISC-FACT-001, 002, DISC-GAP-001).

Fuentes: [discovery.md](../01-discovery/discovery.md), [ideation.md](../02-ideation/ideation.md).

# Why Now

- El archetype ya está inicializado y listo para su primer cambio (`build-periodic-table-web-app`).
- Discovery e Ideación han acotado el problema y han seleccionado una dirección de bajo riesgo (`PROCEED_TO_PROPOSAL`).
- El caso se necesita como material formativo y como base reutilizable para cambios incrementales posteriores.

# Business Value

- **Uso:** consulta rápida y offline de los 118 elementos (DISC-NEED-001..003).
- **Formación:** ejemplo trazable del ciclo OpenSpec completo (DISC-NEED-004).
- **Reutilización:** archetype clonable para nuevos proyectos con Claude Code, Codex y GitHub Copilot (DISC-NEED-005).

# Goals

Dirección propuesta: **IDEA-001** — aplicación web estática (HTML, CSS3 y JavaScript Vanilla) con los datos de los elementos en un script global y renderizado por JavaScript.

Capacidades del cambio `build-periodic-table-web-app`:

- `periodic-table-display`: tabla completa de 118 elementos en disposición estándar, colores pastel por categoría y lantánidos/actínidos en filas separadas con al menos una fila de separación visual.
- `element-search`: búsqueda en tiempo real por nombre, símbolo y número atómico, con resaltado de resultados.
- `element-details-panel`: panel de detalle estable que no altera el tamaño ni la geometría de la tabla.

Y que se pueda abrir directamente sin servidor.

# Non-Goals

- Backend, APIs o persistencia.
- Servidor web, framework, herramientas de build o dependencias externas.
- Funcionalidades avanzadas (comparador, cuestionarios, gráficas, internacionalización, modo oscuro): posibles cambios futuros.
- Especificación detallada, estructura de datos y diseño de componentes: corresponden a los pasos de Especificación y Diseño.

# Scope

**Dentro del alcance**

- Las tres capacidades anteriores.
- `index.html`, `styles.css`, `app.js` y fichero de datos de los elementos.
- Verificación de los 118 elementos contra la fuente de datos elegida.

**Fuera del alcance**

- Todo lo indicado en Non-Goals.
- Modificación de capacidades previas: ninguna, no existen.

# Stakeholders

| Stakeholder | Interés |
| --- | --- |
| Autor / responsable del archetype (accountable, por designar) | Validar el flujo OpenSpec y la reutilización |
| Estudiantes y asistentes a la formación | Aprender el flujo con un caso familiar |
| Personas que consultan elementos | Consulta rápida, clara y offline |
| Agentes de IA | Especificaciones no ambiguas para implementar |

# Constraints

- DISC-CON-001: uso sin conexión ni infraestructura. Por tanto, sin `fetch` ni módulos ES que requieran servidor (verificar con IDEA-EXP-001).
- DISC-CON-002: seguir el flujo OpenSpec (`spec-driven`).
- DISC-CON-003: los 118 elementos en su posición periódica.
- DISC-CON-004: operable con Claude Code, Codex y GitHub Copilot.
- Solo HTML, CSS3 y JavaScript Vanilla (DISC-PRF-001, adoptado en Ideación).
- El panel de detalle no modifica la geometría de la tabla.

# Risks

| Riesgo | Impacto | Mitigación |
| --- | --- | --- |
| DISC-RISK-001 / IDEA-RISK-001: datos de elementos incorrectos o incompletos | Información errónea | Fuente conocida y verificación 118/118 |
| DISC-RISK-002: el alcance crece | Desvío del objetivo formativo | Mantener los Non-Goals y diferir mejoras |
| DISC-RISK-003: repetir decisiones del intento previo | Retrabajo | Analizar `periodic-table-openspec-version-1` antes de Especificación |
| IDEA-RISK-002: variables globales frágiles | Mantenimiento | Encapsular el ámbito en el diseño |
| IDEA-ASM-002: el script global no carga por `file://` en algún navegador | La app no funciona | Spike IDEA-EXP-001 antes de cerrar el diseño |
| Contraste insuficiente de los pasteles | Accesibilidad | No depender solo del color; verificar contraste |

Riesgo: **LOW** · Incertidumbre: **LOW-MEDIUM**.

# Success Metrics

Orientadas a resultados (outcomes); los umbrales numéricos están por definir antes de la Especificación.

- DISC-OUT-001: una persona localiza cualquier elemento sin ayuda en pocos segundos *(umbral por definir)*.
- DISC-OUT-002: se consulta el detalle sin perder el contexto de la tabla.
- DISC-OUT-003: 118/118 elementos con datos correctos frente a la fuente.
- DISC-OUT-004: el ciclo OpenSpec se completa con el caso y los asistentes entienden cada artefacto.
- DISC-OUT-005: otro proyecto puede arrancar clonando el archetype sin cambios estructurales.

# Traceability

`DISC-PRB-001/002` → `DISC-NEED-001..005` → `DISC-OUT-001..005` → `IDEA-001` → **esta propuesta** → Especificación.

Alternativas rechazadas y motivos: ver [ideation.md](../02-ideation/ideation.md) (secciones 8 y 9).
