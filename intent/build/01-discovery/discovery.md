# Discovery: archetype-periodic-table-openspec

> Paso 1 del ciclo SDD. Espacio del **problema**: este documento no define solución, tecnología ni arquitectura.
> Estado: `DISCOVERY DRAFT` · Accountable: *por designar (autor del archetype)*

---

## 1. Disparador

| ID | Señal | Tipo |
| --- | --- | --- |
| DISC-TRG-001 | Se necesita un caso práctico completo, familiar y reutilizable para aprender el flujo de trabajo de OpenSpec | Oportunidad formativa |
| DISC-TRG-002 | Consultar datos de un elemento químico sin conexión ni instalación previa | Necesidad de usuario |

Son señales de partida, no un problema validado.

## 2. Declaración del problema

**DISC-PRB-001** — No se dispone de una referencia visual propia de la tabla periódica que pueda consultarse de forma inmediata, sin conexión y sin instalar ni levantar infraestructura.

**DISC-PRB-002** — No existe un ejemplo completo y trazable del ciclo de trabajo con OpenSpec (propuesta → especificación → implementación → archivo) sobre un dominio que todo el mundo entiende, que pueda reutilizarse como punto de partida.

> Redactado sin referencia a tecnología o arquitectura.

## 3. Estado actual

| ID | Hecho | Fuente |
| --- | --- | --- |
| DISC-FACT-001 | El `archetype-periodic-table-openspec` está inicializado con OpenSpec (schema `spec-driven`) y no contiene ninguna implementación | `openspec/config.yaml`, estructura del repositorio |
| DISC-FACT-002 | Existe un intento previo, `periodic-table-openspec-version-1`, con una interfaz y datos de 118 elementos | Carpeta `periodic-table-openspec-version-1` (≈ 1.700 líneas entre HTML, CSS, JS, datos y `DESIGN.md`) |
| DISC-FACT-003 | `openspec/specs/` está vacío en el intento previo; el cambio `build-periodic-table-web-app` no está archivado como especificación | Estructura del repositorio |
| DISC-FACT-004 | El README del proyecto fija como objetivo interiorizar el flujo OpenSpec, no producir un producto perfecto | `README-periodic-table-openspec.md` |

**Acción pendiente (DISC-GAP-001):** analizar el intento previo (qué cumple, qué se descartó y por qué) para no repetir decisiones ni ignorar aprendizaje.

## 4. Stakeholders

| Stakeholder | Tipo | Interés / necesidad |
| --- | --- | --- |
| Autor / responsable del archetype | Accountable | Un caso que ilustre bien el flujo y sea reutilizable |
| Estudiantes y asistentes a la formación | Primario | Entender el flujo con un dominio familiar |
| Personas que consultan elementos químicos | Primario | Consulta rápida y fiable |
| Agentes de IA (Claude Code, Codex, GitHub Copilot) | Secundario | Contexto no ambiguo para proponer e implementar |

## 5. Necesidades de alto nivel

| ID | Necesidad | Stakeholder | Origen |
| --- | --- | --- | --- |
| DISC-NEED-001 | Consultar un elemento de forma inmediata, también sin conexión | Consultantes | DISC-TRG-002 |
| DISC-NEED-002 | Localizar un elemento por nombre, símbolo o número atómico | Consultantes | DISC-TRG-002 |
| DISC-NEED-003 | Ver la información de un elemento sin perder el contexto del conjunto | Consultantes | DISC-TRG-002 |
| DISC-NEED-004 | Disponer de un ejemplo trazable del ciclo OpenSpec | Estudiantes, autor | DISC-TRG-001 |
| DISC-NEED-005 | Poder reutilizarlo como punto de partida de otros proyectos | Autor | DISC-TRG-001 |

## 6. Evidencia y clasificación

No se dispone de evidencia cuantitativa de uso (analítica, entrevistas, soporte). Se declara explícitamente para evitar tratar creencias como hechos.

| Tipo | ID | Enunciado |
| --- | --- | --- |
| Hecho | DISC-FACT-001..004 | Ver sección 3 |
| Asunción | DISC-ASM-001 | Las personas que consultan la tabla valoran poder hacerlo sin conexión |
| Asunción | DISC-ASM-002 | Una experiencia visual cuidada mejora el valor formativo |
| Asunción | DISC-ASM-003 | Los 118 elementos y sus propiedades se pueden obtener de una fuente fiable |
| Hipótesis | DISC-HYP-001 | Un caso familiar facilita aprender el flujo OpenSpec frente a un caso abstracto |
| Incógnita | DISC-UNK-001 | ¿Qué propiedades de cada elemento necesita realmente quien consulta? |
| Incógnita | DISC-UNK-002 | ¿Qué entornos o navegadores debe soportar? |
| Incógnita | DISC-UNK-003 | ¿Qué aportó y qué limitó el intento previo? |
| Laguna de evidencia | DISC-GAP-001 | Sin análisis del intento previo |
| Laguna de evidencia | DISC-GAP-002 | Sin feedback de personas usuarias o asistentes a formación |

**Asunción crítica:** DISC-ASM-003 (si la fuente de datos no es fiable, el valor de la referencia desaparece).

## 7. Restricciones

| ID | Restricción | Dura / preferencia | Origen |
| --- | --- | --- | --- |
| DISC-CON-001 | Debe poder usarse sin conexión y sin infraestructura que levantar | Dura | Enunciado del proyecto (README) |
| DISC-CON-002 | Debe seguir el flujo OpenSpec (schema `spec-driven`) | Dura | Propósito del proyecto |
| DISC-CON-003 | Debe cubrir los 118 elementos en su posición periódica | Dura | Definición del dominio |
| DISC-CON-004 | Debe servir en un entorno de formación con Claude Code, Codex y GitHub Copilot | Dura | Configuración inicial del proyecto |
| DISC-PRF-001 | Mantenerlo sencillo y sin dependencias externas | Preferencia | README ("todo integrado") |

> Las decisiones sobre pila tecnológica concreta **no** se toman aquí: se exploran en Ideación.

## 8. Dependencias

| ID | Dependencia | Criticidad |
| --- | --- | --- |
| DISC-DEP-001 | Fuente de datos de los elementos químicos | Alta |
| DISC-DEP-002 | Herramienta OpenSpec y agentes de IA configurados | Media |
| DISC-DEP-003 | Aprendizajes del intento previo | Baja |

## 9. Alcance y no-objetivos

**Dentro del alcance**
- Referencia consultable de los 118 elementos con búsqueda y detalle.
- Caso completo del ciclo OpenSpec como ejemplo reutilizable.

**Fuera del alcance (no-objetivos)**
- Funcionalidades didácticas avanzadas (cuestionarios, comparadores, gráficas).
- Persistencia, cuentas de usuario o funcionalidades en red.
- Internacionalización.
- Producto final pulido o publicado: el objetivo es formativo.

## 10. Valor y coste de no actuar

- **Valor esperado:** consulta autónoma y offline; ejemplo formativo reutilizable; base para ampliaciones incrementales.
- **No hacer nada:** el valor formativo (DISC-PRB-002) no se obtiene y la consulta depende de fuentes externas. Tampoco hay ningún daño crítico, por lo que **no actuar es una alternativa aceptable** si no se prioriza el caso formativo.
- **Cambio de software necesario:** sí, para DISC-PRB-001; no existe una alternativa de terceros que cubra DISC-PRB-002.

## 11. Riesgo e incertidumbre

| Dimensión | Nivel | Justificación |
| --- | --- | --- |
| Riesgo / criticidad | **LOW** | Sin datos sensibles, sin impacto en producción, alta reversibilidad |
| Incertidumbre | **LOW-MEDIUM** | Quedan incógnitas sobre fuente de datos, propiedades y entornos |

Riesgos principales:
- DISC-RISK-001: datos químicos incorrectos o incompletos.
- DISC-RISK-002: el alcance crece más allá del objetivo formativo.
- DISC-RISK-003: repetir decisiones del intento previo sin haberlo analizado.

Rigor requerido en pasos posteriores: **ligero** (documentación concisa, verificación de datos, sin gobernanza reforzada).

## 12. Resultados deseados y métricas de éxito (outcomes)

| ID | Resultado | Cómo se observa | Necesidad |
| --- | --- | --- | --- |
| DISC-OUT-001 | Una persona localiza cualquier elemento en pocos segundos sin ayuda | Prueba con personas reales (a definir objetivo concreto) | NEED-001, 002 |
| DISC-OUT-002 | La información de un elemento se consulta sin perder el contexto de la tabla | Observación en pruebas de uso | NEED-003 |
| DISC-OUT-003 | Los 118 elementos y sus datos son correctos | Verificación contra la fuente (118/118) | NEED-001 |
| DISC-OUT-004 | Una persona de formación completa el ciclo OpenSpec con el caso y entiende cada artefacto | Feedback de asistentes | NEED-004 |
| DISC-OUT-005 | Otro proyecto arranca clonando el archetype sin cambios estructurales | Prueba de reutilización | NEED-005 |

> Los umbrales numéricos concretos (por ejemplo tiempo de localización) están **por definir**; no se fijan sin evidencia.

## 13. Trazabilidad

```text
DISC-TRG-001 ─► DISC-PRB-002 ─► DISC-NEED-004, 005 ─► DISC-OUT-004, 005
DISC-TRG-002 ─► DISC-PRB-001 ─► DISC-NEED-001, 002, 003 ─► DISC-OUT-001, 002, 003
DISC-FACT-001..004 ──────────────► soportan ambos problemas
```

## 14. Decisión de Discovery

**Resultado: `PROCEED_TO_IDEATION`**

Motivo: el problema está suficientemente acotado y es de bajo riesgo, pero el espacio de solución sigue abierto (varias formas de cumplir DISC-CON-001 y de estructurar los datos).

Condiciones / pendientes no bloqueantes:
- Analizar el intento previo (DISC-GAP-001).
- Confirmar fuente de datos (DISC-ASM-003, DISC-DEP-001).
- Definir umbrales numéricos de los resultados deseados.

## 15. Quality Gate (resumen)

- [x] Problema separado de la solución
- [x] Estado actual con hechos verificables
- [x] Hechos, asunciones, hipótesis e incógnitas distinguidos
- [x] Alcance, no-objetivos, restricciones y dependencias definidos
- [x] Riesgo e incertidumbre clasificados
- [x] Resultados deseados orientados a outcomes
- [ ] Accountable designado
- [ ] Umbrales numéricos de éxito
- [ ] Análisis del intento previo
