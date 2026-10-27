# Ideation: add-dark-mode-toggle

> Paso 2 del ciclo SDD. Entrada: [discovery.md](../01-discovery/discovery.md) (Discovery).
> Estado: `IDEATION DRAFT` · Riesgo: LOW · Incertidumbre de la solución: LOW

---

## 1. Contexto de la Ideación

Se necesita que la tabla periódica ya construida ofrezca un aspecto oscuro, elegible por la persona usuaria y coherente con la preferencia de su sistema. El problema ya está acotado en Discovery; aquí se exploran **direcciones de solución**, no requisitos ni arquitectura detallada.

## 2. Referencia al problema validado

| ID | Elemento | Resumen |
| --- | --- | --- |
| DISC-PRB-001 | Problema | No se puede elegir aspecto oscuro y no se respeta la preferencia del sistema |
| DISC-PRB-002 | Problema | Sin ejemplo trazable de change incremental con OpenSpec |
| DISC-NEED-001 | Necesidad | Elegir entre aspecto claro y oscuro de forma inmediata |
| DISC-NEED-002 | Necesidad | Aspecto inicial según la preferencia del sistema |
| DISC-NEED-003 | Necesidad | No repetir la elección en cada visita |
| DISC-NEED-004 | Necesidad | Colores de categoría legibles y distinguibles |
| DISC-NEED-005 | Necesidad | Control accesible |
| DISC-NEED-006 | Necesidad | Ejemplo trazable de change incremental |

## 3. Resultados deseados y restricciones heredadas

**Resultados deseados** (Discovery, sección 12)

- DISC-OUT-001: cambio de tema en un gesto e inmediato.
- DISC-OUT-002: primera visita acorde con el sistema.
- DISC-OUT-003: elección conservada entre visitas.
- DISC-OUT-004: contraste AA en ambos temas.
- DISC-OUT-005: control operable con teclado y que anuncia su estado.
- DISC-OUT-006: ciclo `propose → apply → archive` completado.

**Restricciones duras**

- DISC-CON-001: `file://`, sin conexión ni servidor.
- DISC-CON-002: flujo OpenSpec como change sobre la spec existente.
- DISC-CON-003: sin alterar tamaños, posiciones, búsqueda ni selección.
- DISC-CON-004: contraste AA; el color no es la única señal.

**Preferencia heredada**

- DISC-PRF-001: sin dependencias nuevas.

> DISC-CON-001 y DISC-PRF-001 **descartan de partida** las alternativas que las incumplen. Se documentan igualmente (sección 6) para dejar constancia del razonamiento.

## 4. Divergencia: alternativas exploradas

### IDEA-001 · Tema por atributo `data-theme` en `<html>` con tokens CSS *(candidata)*

- **Descripción**: los tokens oscuros se definen bajo `:root[data-theme="dark"]`; un botón alterna el atributo. Un script síncrono mínimo en `<head>` fija el tema inicial antes del primer pintado. La elección se guarda en `localStorage` con `try/catch`.
- **Necesidades cubiertas**: DISC-NEED-001..005.
- **Beneficios esperados**: aprovecha que todo color ya es un token; sin dependencias; sin parpadeo; permite declarar `color-scheme`.
- **Supuestos**: IDEA-ASM-001 — los valores oscuros de `DESIGN.md` cumplen contraste AA.
- **Incógnitas**: IDEA-UNK-001 — comportamiento de `localStorage` bajo `file://` en cada navegador.
- **Riesgos**: IDEA-RISK-001 — lógica de lectura del tema duplicada entre `<head>` y `script.js`.
- **Reversibilidad**: alta.

### IDEA-002 · Tema por clase en `<body>`

- **Descripción**: alternar una clase en `<body>` y definir los tokens oscuros bajo ella.
- **Problema**: el `<body>` no existe aún cuando se ejecuta un script en `<head>`; no permite fijar el tema antes del primer pintado ni declarar `color-scheme` en la raíz.
- **Estado**: `REJECTED` por peor encaje técnico.

### IDEA-003 · Tema inicial resuelto en `script.js` (`defer`)

- **Descripción**: toda la lógica de tema en el script existente.
- **Problema**: la página se pinta primero en claro y luego cambia (parpadeo), contra DISC-OUT-002.
- **Estado**: `REJECTED`.

### IDEA-004 · Solo seguir `prefers-color-scheme`, sin botón

- **Descripción**: media query que aplica la paleta oscura según el sistema.
- **Problema**: no cubre DISC-NEED-001 (elegir manualmente) ni el caso de quien prefiere otro aspecto que su sistema.
- **Estado**: `REJECTED` por necesidad no cubierta.

### IDEA-005 · Persistir con cookies

- **Descripción**: guardar la elección en una cookie.
- **Problema**: innecesaria y problemática bajo `file://`.
- **Estado**: `REJECTED`.

### IDEA-006 · Selector de tres modos (claro / oscuro / sistema)

- **Descripción**: control con tres estados.
- **Problema**: mayor complejidad sin necesidad validada; ya es no-objetivo en Discovery.
- **Estado**: `DEFERRED` (posible cambio futuro).

### IDEA-000 · No hacer nada

- **Consecuencia**: no se resuelve DISC-PRB-001 ni se obtiene el caso formativo.
- **Estado**: `REJECTED`.

## 5. Criterios de evaluación

| Criterio | Peso cualitativo |
| --- | --- |
| Cumplimiento de restricciones duras (`file://`, sin alterar layout) | Eliminatorio |
| Encaje con el problema y las necesidades | Alto |
| Ausencia de parpadeo y accesibilidad | Alto |
| Simplicidad / valor formativo | Alto |
| Reversibilidad | Medio |
| Riesgo y complejidad | Medio |

## 6. Evaluación de alternativas

| Criterio | IDEA-001 data-theme | IDEA-002 clase body | IDEA-003 en script.js | IDEA-004 solo sistema | IDEA-005 cookies |
| --- | :---: | :---: | :---: | :---: | :---: |
| Restricciones duras | ✅ Cumple | ✅ Cumple | ✅ Cumple | ✅ Cumple | ⚠ Problemática en `file://` |
| Encaje con el problema | Alto | Alto | Medio | Bajo | Medio |
| Sin parpadeo | Sí | No | No | Sí | — |
| Simplicidad / valor formativo | Alto | Alto | Alto | Alto | Bajo |
| Reversibilidad | Alta | Alta | Alta | Alta | Media |
| Riesgo / complejidad | Bajo | Bajo | Bajo | Bajo | Medio |

> Evaluación cualitativa; sin puntuaciones numéricas. **Confianza de la evidencia: MEDIA**, basada en las restricciones de Discovery y en la estructura actual de la interfaz; no se ha ejecutado ningún experimento en este paso.

## 7. Experimentos / verificaciones requeridas

| ID | Pregunta de decisión | Método | Criterio de éxito |
| --- | --- | --- | --- |
| IDEA-EXP-001 | ¿Se lee y escribe `localStorage` abriendo `index.html` por `file://` en los navegadores objetivo? | Spike mínimo con una página y una clave | La clave se guarda y se recupera sin errores; si falla, el tema sigue funcionando en sesión |
| IDEA-EXP-002 | ¿Cumplen contraste AA los pasteles oscuros de `DESIGN.md`? | Comprobar cada categoría contra 4.5:1 | Todas ≥ 4.5:1, o se ajusta el token |

Son verificaciones descartables. Resultado: *pendiente de evidencia registrada*.

## 8. Preselección y dirección preferida

**Dirección preferida: IDEA-001** — tema por `data-theme` en `<html>` con tokens CSS, script síncrono en `<head>` y persistencia en `localStorage`.

Motivos:

1. Aprovecha que todo color ya es un token: el tema es redefinir valores.
2. Evita el parpadeo y permite declarar `color-scheme`.
3. Cumple todas las restricciones sin dependencias y es reversible.

## 9. Alternativas rechazadas

| Alternativa | Justificación |
| --- | --- |
| IDEA-002 | No permite fijar el tema antes del primer pintado |
| IDEA-003 | Parpadeo visible al cargar |
| IDEA-004 | No permite elegir manualmente |
| IDEA-005 | Innecesaria y problemática en `file://` |
| IDEA-006 | Aplazada: complejidad sin necesidad validada |
| IDEA-000 | No resuelve el problema |

## 10. Principales compromisos (trade-offs)

- Un script en `<head>` evita el parpadeo, pero duplica parte de la lógica de lectura del tema.
- `localStorage` es simple, pero si el navegador lo bloquea la elección solo dura la sesión.
- Sin modo «sistema» explícito, quien elige manualmente ya no sigue los cambios del sistema.

## 11. Supuestos, incógnitas y riesgos consolidados

| ID | Tipo | Descripción |
| --- | --- | --- |
| IDEA-ASM-001 | Supuesto | Los valores oscuros de `DESIGN.md` cumplen contraste AA |
| IDEA-ASM-002 | Supuesto | `localStorage` está disponible en los contextos objetivo, con degradación aceptable si no |
| IDEA-UNK-001 | Incógnita | Comportamiento de `localStorage` bajo `file://` por navegador |
| IDEA-UNK-002 | Incógnita | Si hace falta un modo «sistema» explícito |
| IDEA-RISK-001 | Riesgo | Lógica de tema duplicada entre `<head>` y `script.js` |
| IDEA-RISK-002 | Riesgo | El cambio de tema altera el layout si se tocan tamaños |
| IDEA-RISK-003 | Riesgo | Pasteles oscuros con contraste insuficiente |

## 12. Preguntas abiertas

1. ¿Qué etiqueta e icono comunican mejor el estado y la acción del botón?
2. ¿Debe seguirse el cambio del sistema mientras no haya elección manual? (a decidir en Especificación/Diseño)
3. ¿Qué navegadores se consideran objetivo (incluido Safari)?

## 13. Trazabilidad

```text
DISC-PRB-001, DISC-PRB-002
   ├── DISC-NEED-001..006
   │      └── DISC-OUT-001..006
   │             └── IDEA-001 (preferida)
   │                    ├── IDEA-EXP-001, IDEA-EXP-002
   │                    └── → PROPOSAL (add-dark-mode-toggle)
   └── IDEA-002..005, IDEA-006 (diferida), IDEA-000 (rechazadas)
```

## 14. Decisión de Ideación

**Resultado: `PROCEED_TO_PROPOSAL`** con IDEA-001 como dirección preferida.

Condiciones:

- Verificar contraste AA y `localStorage` bajo `file://`, o aceptar explícitamente el riesgo.
- Resolver o registrar las preguntas abiertas en la propuesta y la especificación.

Esta decisión no define requisitos detallados ni arquitectura de componentes, que corresponden a Especificación y Diseño.
