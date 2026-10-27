# Problem

Quien consulta la tabla periódica no puede elegir un aspecto oscuro y la página no respeta la preferencia de color de su sistema (DISC-PRB-001), aunque `DESIGN.md` ya define una paleta oscura completa. Además, no existe un ejemplo trazable de un change incremental con OpenSpec sobre este dominio (DISC-PRB-002).

Estado actual: la app `build-periodic-table-web-app` está implementada y archivada; la spec `periodic-table-web` tiene 5 requisitos; todos los colores son tokens CSS en `:root` (DISC-FACT-001..004).

Fuentes: [discovery.md](../01-discovery/discovery.md), [ideation.md](../02-ideation/ideation.md).

# Why Now

- La paleta oscura ya está diseñada y los colores ya son tokens: el coste es bajo.
- Discovery e Ideación han acotado el problema y seleccionado una dirección de bajo riesgo (`PROCEED_TO_PROPOSAL`).
- Se necesita un segundo caso formativo: un change incremental sobre un producto archivado.

# Business Value

- **Uso:** consulta cómoda con poca luz y respeto de la preferencia del sistema (DISC-NEED-001..003).
- **Calidad:** colores de categoría legibles y control accesible (DISC-NEED-004, 005).
- **Formación:** ejemplo trazable de change con delta spec (DISC-NEED-006).

# Goals

Dirección propuesta: **IDEA-001** — tema por atributo `data-theme` en `<html>` con tokens CSS, script síncrono en `<head>` y persistencia en `localStorage`.

Changes sobre la capability `periodic-table-web` del cambio `add-dark-mode-toggle` (sin capabilities nuevas):

- **Light and dark theme toggle**: botón visible en la zona superior que alterna entre modo claro y oscuro de inmediato, sin alterar la tabla ni perder búsqueda o selección.
- **Theme initial choice and persistence**: tema inicial según el sistema; la elección manual se recuerda y prevalece; si no se puede guardar, la página sigue funcionando.
- **Accessible theme control**: nombre accesible, uso con teclado, foco visible, estado comunicado más allá del color y objetivo táctil amplio.

Y que la página siga abriéndose directamente por `file://`.

# Non-Goals

- Selector de tres modos (claro / oscuro / sistema) o más temas.
- Sincronizar la preferencia entre dispositivos o con un servidor.
- Rediseñar componentes más allá de lo necesario para el tema oscuro.
- Dependencias, servidor, framework o herramientas de build.
- Especificación detallada y diseño de componentes: corresponden a los pasos de Especificación y Diseño.

# Scope

**Dentro del alcance**

- `index.html`: botón de tema en la cabecera y script de tema inicial en `<head>`.
- `styles.css`: tokens oscuros, `color-scheme`, estilos del botón y transición breve.
- `script.js`: alternancia, estado accesible, persistencia y seguimiento del sistema.
- `DESIGN.md`: documentar el control de tema.

**Fuera del alcance**

- Todo lo indicado en Non-Goals.
- Modificación de los 5 requisitos existentes: se mantienen; el cambio solo añade.

# Stakeholders

| Stakeholder | Interés |
| --- | --- |
| Autor / responsable del archetype (accountable, por designar) | Validar el flujo OpenSpec incremental |
| Estudiantes y asistentes a la formación | Ver un change sobre un proyecto existente |
| Personas que consultan elementos | Consultar con el aspecto que prefieren |
| Agentes de IA | Especificaciones no ambiguas para implementar |

# Constraints

- DISC-CON-001: `file://`, sin conexión ni servidor.
- DISC-CON-002: seguir el flujo OpenSpec (`spec-driven`) como delta sobre `periodic-table-web`.
- DISC-CON-003: el cambio de tema no altera tamaños ni posiciones ni pierde búsqueda o selección.
- DISC-CON-004: contraste WCAG 2.2 AA en ambos temas; el color no es la única señal.
- Sin dependencias nuevas (DISC-PRF-001).
- La persistencia, antes fuera de alcance, se admite únicamente para el tema.

# Risks

| Riesgo | Impacto | Mitigación |
| --- | --- | --- |
| IDEA-RISK-003: pasteles oscuros con contraste insuficiente | Accesibilidad | Verificar cada categoría contra 4.5:1 y ajustar el token y `DESIGN.md` |
| DISC-RISK-002: parpadeo de tema incorrecto al cargar | Experiencia | Script síncrono mínimo en `<head>` |
| DISC-RISK-003 / IDEA-UNK-001: `localStorage` bloqueado o no disponible | La elección no se recuerda | `try/catch` y degradación a tema de sesión; verificar IDEA-EXP-001 |
| IDEA-RISK-001: lógica de tema duplicada | Mantenimiento | Script mínimo; `script.js` lee el estado ya aplicado |
| IDEA-RISK-002: el cambio altera el layout | Regresión visual | Cambiar solo colores y comprobar la estabilidad de la tabla |

Riesgo: **LOW** · Incertidumbre: **LOW**.

# Success Metrics

Orientadas a resultados (outcomes); los umbrales numéricos están por definir antes de la Especificación.

- DISC-OUT-001: el cambio de tema es inmediato y de un solo gesto.
- DISC-OUT-002: la primera visita coincide con la preferencia del sistema.
- DISC-OUT-003: la elección manual se conserva entre visitas.
- DISC-OUT-004: texto y categorías cumplen contraste AA en ambos temas.
- DISC-OUT-005: el control es operable con teclado y anuncia su estado.
- DISC-OUT-006: el ciclo `propose → apply → archive` se completa como change incremental.

# Traceability

`DISC-PRB-001/002` → `DISC-NEED-001..006` → `DISC-OUT-001..006` → `IDEA-001` → **esta propuesta** → Especificación.

Alternativas rechazadas y motivos: ver [ideation.md](../02-ideation/ideation.md) (secciones 8 y 9).
