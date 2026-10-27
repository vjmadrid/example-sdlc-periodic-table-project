# Ideation: archetype-periodic-table-openspec

> Paso 2 del ciclo SDD. Entrada: [discovery.md](../01-discovery/discovery.md) (Discovery).
> Estado: `IDEATION DRAFT` · Riesgo: LOW · Incertidumbre de la solución: LOW-MEDIUM

---

## 1. Contexto de la Ideación

Se necesita una referencia visual, interactiva y offline de la tabla periódica de 118 elementos, con búsqueda en tiempo real y panel de detalle, que sirva además como caso práctico del flujo OpenSpec. El problema ya está acotado en Discovery; aquí se exploran **direcciones de solución**, no requisitos ni arquitectura detallada.

## 2. Referencia al problema validado

| ID | Elemento | Resumen |
| --- | --- | --- |
| DISC-PRB-001 | Problema | Sin referencia visual propia de la tabla periódica consultable de inmediato, sin conexión ni infraestructura |
| DISC-PRB-002 | Problema | Sin ejemplo completo y trazable del ciclo OpenSpec, reutilizable |
| DISC-NEED-001 | Necesidad | Consultar un elemento de forma inmediata, también sin conexión |
| DISC-NEED-002 | Necesidad | Localizar un elemento por nombre, símbolo o número atómico |
| DISC-NEED-003 | Necesidad | Ver la información de un elemento sin perder el contexto del conjunto |
| DISC-NEED-004 | Necesidad | Disponer de un ejemplo trazable del ciclo OpenSpec |
| DISC-NEED-005 | Necesidad | Reutilizarlo como punto de partida de otros proyectos |

## 3. Resultados deseados y restricciones heredadas

**Resultados deseados** (Discovery, sección 12)

- DISC-OUT-001: localizar cualquier elemento en pocos segundos sin ayuda.
- DISC-OUT-002: consultar el detalle sin perder el contexto de la tabla.
- DISC-OUT-003: 118/118 elementos con datos correctos.
- DISC-OUT-004: completar el ciclo OpenSpec entendiendo cada artefacto.
- DISC-OUT-005: reutilizar el archetype sin cambios estructurales.

**Restricciones duras**

- DISC-CON-001: uso sin conexión ni infraestructura que levantar.
- DISC-CON-002: seguir el flujo OpenSpec.
- DISC-CON-003: los 118 elementos en su posición periódica.
- DISC-CON-004: operable con Claude Code, Codex y GitHub Copilot.

**Preferencia heredada**

- DISC-PRF-001: sencillo y sin dependencias externas.

> DISC-CON-001 y DISC-PRF-001 **descartan de partida** las alternativas que las incumplen. Se documentan igualmente (sección 5) para dejar constancia del razonamiento.

## 4. Divergencia: alternativas exploradas

### IDEA-001 · Página estática con datos en un script global *(candidata)*

- **Descripción**: `index.html` + `styles.css` + `app.js`, y los datos de los elementos en un fichero JS que expone una variable global (`const ELEMENTS = [...]`) cargado con `<script>` clásico. La tabla se renderiza con JS a partir de los datos.
- **Necesidades cubiertas**: DISC-NEED-001..005.
- **Beneficios esperados**: cumple todas las restricciones; sin tooling; fácil de entender y de explicar en formación.
- **Supuestos**: IDEA-ASM-001 — los datos de los 118 elementos se pueden obtener de una fuente fiable y volcar a un fichero JS.
- **Incógnitas**: IDEA-UNK-001 — nivel de detalle de datos necesario para el panel (¿configuración electrónica completa, estado, descubrimiento?).
- **Riesgos**: IDEA-RISK-001 — errores en los datos; IDEA-RISK-002 — namespace global frágil si crece el código.
- **Reversibilidad**: alta.

### IDEA-002 · Página estática con datos embebidos en el HTML (sin renderizado por JS)

- **Descripción**: la tabla se escribe directamente en el HTML (una celda por elemento con `data-*`) y el JS solo gestiona búsqueda y selección.
- **Beneficios**: renderizado inmediato, no depende de JS para ver la tabla.
- **Riesgos**: IDEA-RISK-003 — HTML muy largo y repetitivo, difícil de mantener y de corregir datos; los datos quedan mezclados con la presentación.
- **Reversibilidad**: media (cambiar a datos separados exige reescribir el HTML).

### IDEA-003 · Página estática con datos en JSON cargado por `fetch`

- **Descripción**: `elements.json` separado, cargado dinámicamente.
- **Problema**: `fetch` sobre `file://` está bloqueado por los navegadores modernos, por lo que **incumple DISC-CON-001** (funcionar sin servidor).
- **Estado**: `REJECTED` por restricción dura.

### IDEA-004 · SPA con framework y herramienta de build (p. ej. React + Vite)

- **Descripción**: componentes, estado y build moderno.
- **Beneficios**: escalabilidad para futuras funcionalidades.
- **Problema**: requiere dependencias, `node` y servidor de desarrollo o artefactos construidos; **incumple DISC-CON-001**. Sobredimensionado para el problema (IDEA-RISK-004: complejidad innecesaria).
- **Estado**: `REJECTED` por restricción dura.

### IDEA-005 · Reutilizar un recurso existente (comprar / reutilizar)

- **Descripción**: enlazar o incrustar una tabla periódica interactiva ya existente.
- **Problema**: depende de conexión y de terceros; no cubre DISC-NEED-004 (no hay nada que construir ni trazar con OpenSpec) ni la experiencia visual propia.
- **Estado**: `REJECTED` por necesidad no cubierta.

### IDEA-000 · No hacer nada

- **Descripción**: no construir; usar fuentes externas.
- **Consecuencia**: no se resuelve DISC-NEED-004 (el caso formativo) ni el uso offline.
- **Estado**: `REJECTED`.

## 5. Criterios de evaluación

| Criterio | Peso cualitativo |
| --- | --- |
| Cumplimiento de restricciones duras (`file://`, sin dependencias) | Eliminatorio |
| Encaje con el problema y las necesidades | Alto |
| Simplicidad / valor formativo | Alto |
| Mantenibilidad de los datos | Medio |
| Reversibilidad | Medio |
| Riesgo y complejidad | Medio |

## 6. Evaluación de alternativas

| Criterio | IDEA-001 Script global | IDEA-002 HTML embebido | IDEA-003 JSON + fetch | IDEA-004 SPA + build | IDEA-005 Reutilizar |
| --- | :---: | :---: | :---: | :---: | :---: |
| Restricciones duras | ✅ Cumple | ✅ Cumple | ❌ No cumple | ❌ No cumple | ❌ No cumple (offline) |
| Encaje con el problema | Alto | Alto | — | — | Bajo |
| Simplicidad / valor formativo | Alto | Medio | — | Bajo | Bajo |
| Mantenibilidad de datos | Alta | Baja | — | Alta | — |
| Reversibilidad | Alta | Media | — | Media | Alta |
| Riesgo / complejidad | Bajo | Bajo | — | Medio | Bajo |
| Incertidumbre | Baja | Baja | — | Media | Baja |

> Evaluación cualitativa; sin puntuaciones numéricas. **Confianza de la evidencia: MEDIA**, basada en las restricciones de Discovery y en el conocimiento general del comportamiento de `file://`; no se ha ejecutado ningún experimento en este paso.

## 7. Experimentos / verificaciones requeridas

| ID | Pregunta de decisión | Método | Criterio de éxito |
| --- | --- | --- | --- |
| IDEA-EXP-001 | ¿Se cargan correctamente los datos como script global abriendo `index.html` por `file://` en los navegadores objetivo? | Spike mínimo de una página con 3 elementos | Los datos se leen y se renderizan sin servidor en Chrome, Firefox y Safari |

Es un spike descartable: **no** debe convertirse en código de producción. Resultado: *pendiente*.

## 8. Preselección y dirección preferida

**Dirección preferida: IDEA-001** — página estática con datos separados en un script global y renderizado por JS.

Motivos:

1. Es la única alternativa viable que además separa datos y presentación.
2. Cumple todas las restricciones duras sin tooling.
3. Es la más sencilla de explicar y la más reversible.

## 9. Alternativas rechazadas

| Alternativa | Justificación |
| --- | --- |
| IDEA-002 | Cumple, pero mezcla datos y presentación y encarece cualquier corrección |
| IDEA-003 | Incumple `file://` |
| IDEA-004 | Incumple restricción de no-dependencias; sobredimensionada |
| IDEA-005 | Depende de conexión y de terceros; no cubre el valor formativo |
| IDEA-000 | No resuelve el problema |

## 10. Principales compromisos (trade-offs)

- Un script global simplifica la carga, pero obliga a cuidar el ámbito de las variables para no contaminar el espacio global.
- Renderizar con JS retrasa la primera visualización frente al HTML estático, a cambio de un mantenimiento mucho mejor de los datos.
- Se renuncia a la escalabilidad de un framework a cambio de simplicidad y cero dependencias.

## 11. Supuestos, incógnitas y riesgos consolidados

| ID | Tipo | Descripción |
| --- | --- | --- |
| IDEA-ASM-001 | Supuesto | Hay una fuente fiable para los datos de los 118 elementos |
| IDEA-ASM-002 | Supuesto | Un script clásico se carga por `file://` en todos los navegadores objetivo (a verificar con IDEA-EXP-001) |
| IDEA-UNK-001 | Incógnita | Campos exactos que debe mostrar el panel de detalle |
| IDEA-UNK-002 | Incógnita | Definición exacta de "navegadores modernos" objetivo |
| IDEA-RISK-001 | Riesgo | Datos de elementos incorrectos o incompletos |
| IDEA-RISK-002 | Riesgo | Variables globales frágiles si el código crece |
| IDEA-RISK-003 | Riesgo | Mantenimiento difícil con HTML embebido (alternativa rechazada) |
| IDEA-RISK-004 | Riesgo | Complejidad innecesaria con un framework (alternativa rechazada) |

## 12. Preguntas abiertas

1. ¿Qué fuente de datos se usará para los elementos y quién valida su exactitud?
2. ¿Qué campos son obligatorios en el panel de detalle?
3. ¿Qué navegadores se consideran objetivo?
4. ¿Se debe dar soporte a accesibilidad por teclado en la selección de elementos? (a decidir en Especificación)

## 13. Trazabilidad

```text
DISC-PRB-001, DISC-PRB-002
   ├── DISC-NEED-001..005
   │      └── DISC-OUT-001..005
   │             └── IDEA-001 (preferida)
   │                    ├── IDEA-EXP-001
   │                    └── → PROPOSAL (build-periodic-table-web-app)
   └── IDEA-002..005, IDEA-000 (rechazadas)
```

## 14. Decisión de Ideación

**Resultado: `PROCEED_TO_PROPOSAL`** con IDEA-001 como dirección preferida.

Condiciones:

- Completar IDEA-EXP-001 antes de cerrar el diseño técnico, o aceptar explícitamente el riesgo.
- Resolver o registrar las preguntas abiertas en la propuesta y la especificación.

Esta decisión no define requisitos detallados, estructura de datos ni arquitectura de componentes, que corresponden a Especificación y Diseño.
