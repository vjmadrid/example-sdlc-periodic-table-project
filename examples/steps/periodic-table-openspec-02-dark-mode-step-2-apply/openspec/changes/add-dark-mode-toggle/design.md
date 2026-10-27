## Context

La interfaz ya expresa todos sus colores mediante variables CSS en `:root` de `styles.css` (superficies, texto, bordes, foco y pasteles de categoría), y `DESIGN.md` documenta la columna «Dark» de cada token. No hay colores literales fuera de `:root`, por lo que un tema oscuro se reduce a redefinir tokens. La cabecera (`.site-header`) contiene el bloque superior (`.header-kicker`) y la fila principal (`.hero-row`). La página debe seguir funcionando desde `file://` sin dependencias. Ver proposal.md para la motivación.

## Goals / Non-Goals

**Goals:**
- Alternar tema con un único botón en la zona superior, con efecto inmediato.
- Reutilizar los valores oscuros ya definidos en `DESIGN.md` y cumplir los contrastes WCAG 2.2 AA que ese documento exige.
- Evitar el parpadeo de tema incorrecto al cargar.

**Non-Goals:**
- Selector de tres modos (claro/oscuro/sistema) o más temas.
- Sincronizar la preferencia entre dispositivos o con un servidor.
- Rediseñar componentes existentes más allá de lo necesario para el tema oscuro.

## Decisions

- **Tema mediante atributo `data-theme` en `<html>`**: los tokens oscuros se definen bajo `:root[data-theme="dark"]`. Alternativa: clase en `<body>`; se descarta porque el atributo en la raíz permite fijar el tema antes del primer pintado y declarar `color-scheme`.
- **Tema inicial**: un pequeño script síncrono en `<head>` lee la preferencia guardada y, si no existe, `prefers-color-scheme`, y fija `data-theme` antes de pintar. Alternativa: resolverlo en `script.js` (cargado con `defer`); se descarta por el parpadeo visible.
- **Persistencia en `localStorage`** con una clave propia, envuelta en `try/catch`. Alternativa: cookies; innecesarias y problemáticas en `file://`. Si falla, el tema funciona solo en la sesión.
- **Botón en `.hero-row`/cabecera superior**, como `<button type="button">` con `aria-pressed` y etiqueta textual que refleja el estado, más un icono SVG decorativo (`aria-hidden`). Alternativa: interruptor `role="switch"`; se descarta por simplicidad, ya que un botón con `aria-pressed` es equivalente.
- **`color-scheme: light dark` según el tema** para que controles nativos (input de búsqueda, barras de desplazamiento) coincidan.
- **Transición de color corta**, desactivada con `prefers-reduced-motion`, coherente con `DESIGN.md`.
- **Seguimiento del sistema**: mientras no exista elección manual, un cambio de `prefers-color-scheme` actualiza el tema. Tras una elección manual se ignora.

## Risks / Trade-offs

- [Los pasteles oscuros pueden perder contraste con el texto] → Verificar cada categoría contra los umbrales 4.5:1 y ajustar el token oscuro solo si falla, actualizando `DESIGN.md`.
- [Script en `<head>` duplica lógica de lectura del tema] → Mantenerlo mínimo y que `script.js` lea el estado ya aplicado en el DOM.
- [`localStorage` bloqueado en algunos contextos] → `try/catch` y degradación a tema de sesión.
- [Cambio de tema podría alterar el layout] → Cambiar solo valores de color, nunca tamaños, y comprobar la estabilidad de la tabla.
