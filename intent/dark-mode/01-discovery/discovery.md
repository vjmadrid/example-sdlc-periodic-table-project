# Discovery: add-dark-mode-toggle

> Paso 1 del ciclo SDD. Espacio del **problema**: este documento no define solución, tecnología ni arquitectura.
> Estado: `DISCOVERY DRAFT` · Accountable: *por designar (autor del archetype)*
> Nota: la funcionalidad ya está implementada (change archivado `2026-10-27-add-dark-mode-toggle`); este documento recoge la intención que la originó.

---

## 1. Disparador

| ID | Señal | Tipo |
| --- | --- | --- |
| DISC-TRG-001 | `DESIGN.md` ya documenta una paleta oscura completa que la interfaz no ofrece | Oportunidad (valor ya diseñado sin explotar) |
| DISC-TRG-002 | Consultar la tabla con poca luz o preferir interfaces oscuras no es posible | Necesidad de usuario |
| DISC-TRG-003 | Se necesita un segundo caso del ciclo OpenSpec: un change incremental sobre un producto ya archivado | Oportunidad formativa |

Son señales de partida, no un problema validado.

## 2. Declaración del problema

**DISC-PRB-001** — Quien consulta la tabla periódica no puede elegir un aspecto oscuro, y la página tampoco respeta la preferencia de color de su sistema.

**DISC-PRB-002** — No existe un ejemplo trazable de un cambio incremental (delta sobre una spec ya archivada) con OpenSpec sobre este dominio.

> Redactado sin referencia a tecnología o arquitectura.

## 3. Estado actual

| ID | Hecho | Fuente |
| --- | --- | --- |
| DISC-FACT-001 | La app `build-periodic-table-web-app` está implementada y archivada; la spec principal `periodic-table-web` tiene 5 requisitos | `openspec/specs/periodic-table-web/spec.md` (antes del change) |
| DISC-FACT-002 | La interfaz solo ofrece tema claro | `index.html`, `styles.css` |
| DISC-FACT-003 | Todos los colores se expresan como variables CSS en `:root`; no hay colores literales fuera de ellas | `styles.css` |
| DISC-FACT-004 | `DESIGN.md` documenta una columna «Dark» para cada token | `DESIGN.md` |
| DISC-FACT-005 | La página no tiene persistencia de ningún tipo (decisión del build original) | `01-build`, governance foundation |

## 4. Stakeholders

| Stakeholder | Tipo | Interés / necesidad |
| --- | --- | --- |
| Autor / responsable del archetype | Accountable | Un segundo caso que ilustre bien un change incremental |
| Personas que consultan elementos | Primario | Consultar cómodamente con poca luz o con su preferencia de tema |
| Estudiantes y asistentes a la formación | Primario | Ver el flujo `propose → apply → archive` sobre un proyecto existente |
| Agentes de IA (Claude Code, Codex, GitHub Copilot) | Secundario | Contexto no ambiguo para proponer e implementar |

## 5. Necesidades de alto nivel

| ID | Necesidad | Stakeholder | Origen |
| --- | --- | --- | --- |
| DISC-NEED-001 | Elegir entre aspecto claro y oscuro de forma inmediata | Consultantes | DISC-TRG-002 |
| DISC-NEED-002 | Que el aspecto inicial respete la preferencia del sistema | Consultantes | DISC-TRG-002 |
| DISC-NEED-003 | No tener que repetir la elección en cada visita | Consultantes | DISC-TRG-002 |
| DISC-NEED-004 | Que los colores de categoría sigan siendo legibles y distinguibles | Consultantes | DISC-TRG-001 |
| DISC-NEED-005 | Que la funcionalidad sea accesible (teclado, tecnología de asistencia) | Consultantes | DISC-TRG-002 |
| DISC-NEED-006 | Disponer de un ejemplo trazable de change incremental | Estudiantes, autor | DISC-TRG-003 |

## 6. Evidencia y clasificación

No se dispone de evidencia cuantitativa de uso. Se declara explícitamente para evitar tratar creencias como hechos.

| Tipo | ID | Enunciado |
| --- | --- | --- |
| Hecho | DISC-FACT-001..005 | Ver sección 3 |
| Asunción | DISC-ASM-001 | Una parte relevante de las personas usuarias prefiere interfaces oscuras o lo tiene configurado en su sistema |
| Asunción | DISC-ASM-002 | Los valores oscuros de `DESIGN.md` cumplen contraste AA sin ajustes |
| Hipótesis | DISC-HYP-001 | Un delta pequeño y localizado facilita entender un change incremental frente a un build completo |
| Incógnita | DISC-UNK-001 | ¿Cómo persistir la elección en un contexto `file://`? |
| Incógnita | DISC-UNK-002 | ¿Se necesita un tercer modo «automático» explícito? |
| Laguna de evidencia | DISC-GAP-001 | Sin feedback de personas usuarias sobre el tema oscuro |

**Asunción crítica:** DISC-ASM-002 (si los pasteles oscuros no cumplen contraste, el tema no es utilizable).

## 7. Restricciones

| ID | Restricción | Dura / preferencia | Origen |
| --- | --- | --- | --- |
| DISC-CON-001 | Debe seguir funcionando sin conexión ni servidor, abierto por `file://` | Dura | Governance de `01-build` |
| DISC-CON-002 | Debe seguir el flujo OpenSpec (`spec-driven`) como change sobre la spec existente | Dura | Propósito del proyecto |
| DISC-CON-003 | No debe alterar tamaños ni posiciones de la tabla ni perder búsqueda o selección | Dura | Requisitos existentes |
| DISC-CON-004 | Contraste WCAG 2.2 AA en ambos temas; el color no es la única señal | Dura | `DESIGN.md` |
| DISC-PRF-001 | Sin dependencias nuevas | Preferencia | Governance de `01-build` |

> Las decisiones sobre el mecanismo concreto **no** se toman aquí: se exploran en Ideación.

## 8. Dependencias

| ID | Dependencia | Criticidad |
| --- | --- | --- |
| DISC-DEP-001 | Paleta oscura documentada en `DESIGN.md` | Alta |
| DISC-DEP-002 | Spec `periodic-table-web` archivada como base del delta | Alta |
| DISC-DEP-003 | Herramienta OpenSpec y agentes de IA configurados | Media |

## 9. Alcance y no-objetivos

**Dentro del alcance**
- Alternar claro/oscuro desde la zona superior de la página.
- Tema inicial según el sistema y elección manual recordada.
- Accesibilidad del control.

**Fuera del alcance (no-objetivos)**
- Selector de tres modos o más temas.
- Sincronizar la preferencia entre dispositivos o con un servidor.
- Rediseñar componentes más allá de lo necesario para el tema oscuro.

## 10. Valor y coste de no actuar

- **Valor esperado:** comodidad de consulta con poca luz; respeto de la preferencia del sistema; segundo caso formativo reutilizable.
- **No hacer nada:** sin daño crítico; la tabla sigue siendo usable en tema claro. **No actuar es una alternativa aceptable** si no se prioriza el caso formativo.
- **Cambio de software necesario:** sí; no hay alternativa de terceros aplicable a una página propia.

## 11. Riesgo e incertidumbre

| Dimensión | Nivel | Justificación |
| --- | --- | --- |
| Riesgo / criticidad | **LOW** | Sin datos sensibles, sin impacto en producción, alta reversibilidad |
| Incertidumbre | **LOW** | Los tokens oscuros ya están diseñados; solo quedan incógnitas de persistencia y contraste |

Riesgos principales:
- DISC-RISK-001: pasteles oscuros con contraste insuficiente.
- DISC-RISK-002: parpadeo de tema incorrecto al cargar.
- DISC-RISK-003: persistencia no disponible en algunos contextos.

Rigor requerido en pasos posteriores: **ligero**.

## 12. Resultados deseados y métricas de éxito (outcomes)

| ID | Resultado | Cómo se observa | Necesidad |
| --- | --- | --- | --- |
| DISC-OUT-001 | Una persona cambia de tema en un solo gesto y el cambio es inmediato | Prueba de uso | NEED-001 |
| DISC-OUT-002 | En la primera visita el aspecto coincide con la preferencia del sistema | Prueba con sistema claro y oscuro | NEED-002 |
| DISC-OUT-003 | La elección manual se conserva entre visitas | Prueba de reapertura | NEED-003 |
| DISC-OUT-004 | Texto y categorías cumplen contraste AA en ambos temas | Comprobación de contraste | NEED-004 |
| DISC-OUT-005 | El control es operable con teclado y anuncia su estado | Prueba con teclado y lector de pantalla | NEED-005 |
| DISC-OUT-006 | El ciclo `propose → apply → archive` se completa como change incremental | Feedback de asistentes | NEED-006 |

> Los umbrales numéricos concretos están **por definir**; no se fijan sin evidencia.

## 13. Trazabilidad

```text
DISC-TRG-001, 002 ─► DISC-PRB-001 ─► DISC-NEED-001..005 ─► DISC-OUT-001..005
DISC-TRG-003 ─────► DISC-PRB-002 ─► DISC-NEED-006 ──────► DISC-OUT-006
DISC-FACT-001..005 ────────────────► soportan ambos problemas
```

## 14. Decisión de Discovery

**Resultado: `PROCEED_TO_IDEATION`**

Motivo: el problema está acotado y es de bajo riesgo, pero el mecanismo de aplicar el tema, fijar el estado inicial y persistir la elección sigue abierto.

Condiciones / pendientes no bloqueantes:
- Confirmar contraste de los pasteles oscuros (DISC-ASM-002).
- Resolver cómo persistir la elección (DISC-UNK-001).
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
- [ ] Feedback de personas usuarias
