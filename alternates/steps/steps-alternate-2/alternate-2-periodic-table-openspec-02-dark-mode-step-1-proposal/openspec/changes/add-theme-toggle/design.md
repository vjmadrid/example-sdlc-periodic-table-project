# Design

## Context

La página (ver `openspec/specs/periodic-table-web/spec.md`) ya define sus colores como tokens en `:root` de `styles.css`, pero hay valores fijos fuera de los tokens: el borde de las celdas (`rgba(31, 41, 55, 0.25)`), el fondo de `.notice` (`#fef3c7`) y el color de texto/borde de `.detail-symbol`. La cabecera solo contiene el `<h1>`. Los scripts son clásicos con `defer` y no hay almacenamiento. Ver `proposal.md` para motivación y supuestos.

Las guías de `knowledge/dev/languages/css.md` recomiendan sobrescribir los tokens y, si hay botón, usar un atributo `data-theme` en `<html>`.

## Goals / Non-Goals

**Goals:**
- Alternar claro/oscuro con un botón en la cabecera, solo cambiando tokens de color.
- No alterar la geometría de la página ni el estado de búsqueda y selección.

**Non-Goals:**
- Persistir la elección o seguir `prefers-color-scheme` (el producto descarta el almacenamiento persistente; la página abre siempre en claro).
- Más de dos temas o personalización de colores.

## Decisions

**1. `data-theme` en `<html>` y tokens sobrescritos.** El tema claro es el de `:root`; el oscuro se define en `:root[data-theme="dark"]` redefiniendo `--bg`, `--surface`, `--text`, `--text-muted`, `--border`, `--focus` y las 10 variables `--cat-*`. Alternativas: clases en `body` (menos estándar con la guía), hoja de estilos aparte (más peticiones y complejidad), `prefers-color-scheme` solo (no da control a la persona).

**2. Convertir en tokens los colores fijos.** Se añaden `--tile-border`, `--notice-bg` y se reutilizan `--text`/`--surface` en `.detail-symbol` para que el tema oscuro los cambie sin duplicar reglas. Se evita cualquier `!important`.

**3. Paleta oscura con categorías de bajo brillo.** En oscuro, las categorías son tonos apagados (mismo matiz que el pastel) con texto claro; cada par se mide para contraste ≥ 4,5:1. Las referencias «57–71»/«89–103» y la leyenda usan los mismos tokens, así que cambian solas.

**4. Botón nativo en la cabecera.** `<button type="button" id="theme-toggle" aria-pressed="false">` con icono (☾/☀) y texto fijo «Modo oscuro»; el estado se expone con `aria-pressed` y el icono cambia (no solo el color). Ancho mínimo fijo para que el cambio de icono no mueva la cabecera. La cabecera pasa a `display: flex; justify-content: space-between`. Alternativa: `role="switch"`; se descarta por simplicidad, `aria-pressed` es suficiente para un botón de alternancia.

**5. Lógica mínima en `script.js`.** Una función `setTheme(dark)` que fija/elimina `data-theme` en `document.documentElement`, actualiza `aria-pressed` y el icono; el estado inicial es claro. El handler es un `addEventListener('click')`. No toca `state` de búsqueda/selección ni vuelve a renderizar la tabla, por lo que ambos se conservan.

**6. Conocimiento de producto.** Se actualizan `product.md` (nueva decisión «Tema claro por defecto, con modo oscuro opcional», sin persistencia), `business-rules.md` (la regla de categorías habla de «fondo claro»; pasa a tema claro por defecto y oscuro opcional) y `glossary.md` (término «Tema»).

## Risks / Trade-offs

- [Contraste insuficiente en alguna categoría oscura] → Medir cada par texto/fondo y ajustar el tono.
- [Colores fijos olvidados que se vean mal en oscuro] → Buscar literales de color en `styles.css` y revisar visualmente ambos temas.
- [La persona pierde el tema al recargar] → Es una decisión de producto consciente (sin almacenamiento); se puede revisar si se pide persistencia.
- [Cambio de la regla de producto «fondo claro»] → Se mantiene como valor por defecto y se documenta en `knowledge/product/`.
