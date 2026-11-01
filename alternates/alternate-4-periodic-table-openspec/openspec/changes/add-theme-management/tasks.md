# Tasks

## 1. Lógica de tema (`theme.js`) y su prueba

- [x] 1.1 Crear `theme.js` (script clásico, IIFE) con las constantes (clave `periodic-table-theme`, valores válidos, ventana 22:00–06:00), `normalizeChoice` y `resolveTheme({ choice, hour, systemDark })`, expuestos como `PeriodicTableTheme` tras el guardado `typeof document === 'undefined'`. Verificar con `node -e "require('./theme.js')"` sin errores.
- [x] 1.2 Añadir `tests/theme.test.js` (`node` + `node:assert`, sin dependencias) que cubra: elección manual gana a la programación (23:00 + `light` → `light`), `auto` a las 22:00, 05:59 y 06:00, sistema oscuro/claro fuera de la ventana y valor inválido → `auto`. Verificar con `node tests/theme.test.js` (todo en verde).
- [x] 1.3 Implementar el enlace al DOM en `theme.js`: lectura/escritura de la elección en `localStorage` con `try/catch` (error o valor corrupto → `auto`; «Automático» borra la clave), aplicar `data-theme` en `<html>` en la carga, sondeo cada 60 s con reevaluación en `visibilitychange`, escucha de `matchMedia('(prefers-color-scheme: dark)')` y del evento `storage`. Verificar manualmente con almacenamiento bloqueado (el tema sigue cambiando en la sesión) y con dos pestañas (el cambio se refleja en la otra).

## 2. Tokens y estilos por tema (`styles.css`)

- [x] 2.1 Sustituir los literales del aviso de error por tokens `--error` y `--error-text` en `:root` y comprobar que el aspecto del tema Claro no cambia (comparación visual antes/después).
- [x] 2.2 Definir `:root[data-theme="dark"]` y `:root[data-theme="nocturnal"]` redefiniendo todos los tokens (`--bg`, `--surface`, `--text`, `--text-muted`, `--border`, `--focus`, `--accent`, `--error*`, `--cat-*`) y `color-scheme`; paleta Nocturno de tendencia sepia, sin `!important`. Verificar que ningún componente conserva colores del tema anterior al alternar los tres temas.
- [x] 2.3 Revisar `.is-dim`, `.is-match`, `.is-selected`, `.legend-swatch` y el foco en los temas Oscuro y Nocturno para evitar estados «apagados» o con brillo excesivo, manteniendo indicadores no cromáticos. Verificar visualmente buscando y seleccionando un elemento en cada tema.
- [x] 2.4 Añadir `@media (forced-colors: active)` que no sobrescriba colores del sistema y conserve bordes en celdas, selector, muestras de leyenda y estados. Verificar con la emulación de colores forzados de DevTools que todo es utilizable.
- [x] 2.5 Añadir `tests/contrast.test.js` (Node, sin dependencias) que calcule la relación de contraste de los pares texto/fondo, indicadores/fondo y `--text` sobre cada `--cat-*` de los tres temas a partir de los valores de `styles.css`, exigiendo ≥ 4,5:1 (3:1 en indicadores y foco). Verificar con `node tests/contrast.test.js` (todo en verde) y que las 10 categorías difieren entre sí en cada tema.

## 3. Selector de tema en la cabecera

- [x] 3.1 En `index.html`, añadir `<script src="theme.js">` síncrono en `<head>` antes de la hoja de estilos (sin scripts en línea; la CSP no cambia) y el `<label>` «Tema» + `<select id="theme">` con Automático, Claro, Oscuro y Nocturno, en la esquina superior derecha de `.page-header`, más una región `role="status"` `aria-live="polite"` para anunciar el cambio. Verificar que la página sigue cargando por `file://` sin errores en consola y con 0 peticiones de red.
- [x] 3.2 Estilar la cabecera (`h1` a la izquierda, selector a la derecha, apilado en ventanas estrechas) con tokens, sin cambiar el tamaño ni la posición de la tabla. Verificar a ancho estrecho y ancho completo que la página no tiene desplazamiento horizontal y la geometría de la tabla no cambia al cambiar de tema.
- [x] 3.3 Conectar el selector con `theme.js`: reflejar la elección guardada al cargar («Automático» en la primera visita), cambiar el tema al instante al elegir, y anunciar «Tema <nombre> activado» con `textContent`. Verificar con teclado (Tab y flechas) que el cambio y el anuncio funcionan y que el cambio es visible en menos de 100 ms sin recarga.

## 4. Conocimiento y especificaciones del proyecto

- [x] 4.1 Actualizar `knowledge/product/` (`obligations.md`, `product.md`, `business-rules.md`, `glossary.md`, `journeys.md`) para: permitir guardar solo el identificador del tema, reemplazar «color pastel sobre fondo claro» por colores por tema con contraste WCAG 2.2 AA, y describir el recorrido «Cambiar el tema». Verificar con `grep -rn "sin persistencia\|fondo claro" knowledge/product` que no quedan afirmaciones contradictorias.
- [x] 4.2 Ejecutar `openspec validate add-theme-management --strict` y verificar que el change es válido (spec nueva `theme-management` y delta de `periodic-table-web`).

## 5. Verificación de integración

- [ ] 5.1 Recorrido manual en Chrome, Firefox y Safari recientes por `file://`: elegir cada tema, recargar (persiste), borrar la clave (vuelve a sistema/programación), tema del sistema oscuro/claro, elegir «Claro» a las 23:00 (no se sustituye), simular 22:00/06:00 y un cambio de reloj o zona, dos pestañas sincronizadas, `localStorage` bloqueado, `prefers-reduced-motion` y colores forzados. Registrar el resultado de cada caso de borde de ED-44.
  - Resultado parcial (Chrome headless, vía DevTools): cada tema se aplica y persiste; valor corrupto o `auto` → tema por defecto; 21:00 → Claro, 22:00 y 05:59 → Nocturno, 06:00 → Claro; «Claro» elegido a las 23:00 no se sustituye (recarga ni reevaluación); cambio de reloj reevaluado; dos pestañas sincronizadas; `localStorage` bloqueado sin error; sistema oscuro/claro y cambio en vivo; sin transiciones con `prefers-reduced-motion`; colores forzados usables; 360 px sin desplazamiento horizontal; sin errores de consola. **Pendiente:** Firefox y Safari (no ejecutables en este entorno) y el contraste alto real del sistema operativo.
- [x] 5.2 Ejecutar `node tests/theme.test.js` y `node tests/contrast.test.js`, y confirmar que búsqueda, selección, «Limpiar», atajo «/» y la ficha siguen funcionando igual en los tres temas.

## Workflow follow-up

- Archivar el change tras la revisión (`/opsx:archive`) y verificar que `openspec/specs/theme-management/spec.md` queda creado.
- Confirmar con el equipo de producto la hora de fin del tema Nocturno programado (supuesto: 06:00).
