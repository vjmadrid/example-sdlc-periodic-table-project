# Tabla Periódica Design System

## 0. Research Log

- Embedded refs: shortlist `notion.md`, `apple.md` y `figma.md` → pick `minimalist-skill.md` + `notion.md` porque combinan superficies cálidas, estructura editorial y pasteles semánticos sin sacrificar precisión.
- Lazyweb: 3 consultas, 3 pantallas vistas (`CK-12`, `Deepnote`, `Hippocampus`) → se toma navegación educativa por conceptos, relación directa entre herramienta y panel, y una referencia visual persistente para explicar la materia.
- Imagen drafts: `/Users/vjmadrid/.codex/generated_images/01a05216-d8d0-7d72-97ae-bdce77782b67/exec-38de11d3-11a5-4c25-8309-50cd83d8e4d0.png`, `/Users/vjmadrid/.codex/generated_images/01a05216-d8d0-7d72-97ae-bdce77782b67/exec-b4d17b07-ffe8-4b8b-9206-81e76b0a37d6.png`, `/Users/vjmadrid/.codex/generated_images/01a05216-d8d0-7d72-97ae-bdce77782b67/exec-859cb4bd-391b-4bfe-9490-f1ee5a26a96b.png` → picked the third draft as the composition reference: detail rail left, table centered, f-block visibly separated.
- UI-UX DB: lookup `data dense table keyboard accessibility` → tab order visible, skip link, overflow horizontal controlado; lookup `education reference dashboard` → jerarquía clara y colores juguetones con uso disciplinado.

## 1. Atmosphere & Identity

Un atlas de química tranquilo y preciso: la sensación es de papel de laboratorio bien ordenado, con suficiente calidez para invitar a explorar y suficiente contraste para consultar datos rápidamente. La firma visual es una cuadrícula de 18 columnas donde los pasteles funcionan como índice de familias y un panel lateral convierte cada selección en una pequeña ficha de museo.

## 2. Color

### Palette

| Role | Token | Light | Dark | Usage |
|------|-------|-------|------|-------|
| Canvas | `--color-canvas` | `#ffffff` | `#31302e` | Fondo principal |
| Surface warm | `--color-surface-warm` | `#f6f5f4` | `#3a3836` | Bandas, encabezados secundarios |
| Surface raised | `--color-surface-raised` | `#ffffff` | `#45413e` | Panel de detalles y controles |
| Text primary | `--color-text-primary` | `#31302e` | `#ffffff` | Títulos, símbolos, cuerpo |
| Text secondary | `--color-text-secondary` | `#615d59` | `#e8e4e0` | Descripciones y metadatos |
| Text muted | `--color-text-muted` | `#8c857f` | `#b7afa9` | Ayuda, estados vacíos |
| Border | `--color-border` | `#d9d5d1` | `#5d5854` | Contención y separadores |
| Focus | `--color-focus` | `#097fe8` | `#62aef0` | Foco y selección accesible |
| Pastel alkali | `--category-alkali` | `#fdebec` | `#6b4646` | Metales alcalinos |
| Pastel alkaline | `--category-alkaline` | `#fbeedc` | `#735b3e` | Metales alcalinotérreos |
| Pastel transition | `--category-transition` | `#edf3ec` | `#4b604b` | Metales de transición |
| Pastel post-transition | `--category-post-transition` | `#e8f2f0` | `#45635d` | Otros metales |
| Pastel metalloid | `--category-metalloid` | `#f4f0df` | `#6d6343` | Metaloides |
| Pastel nonmetal | `--category-nonmetal` | `#fbf3db` | `#765f25` | No metales |
| Pastel halogen | `--category-halogen` | `#f8e5e5` | `#704848` | Halógenos |
| Pastel noble | `--category-noble` | `#eee7f4` | `#5f526a` | Gases nobles |
| Pastel lanthanide | `--category-lanthanide` | `#e8e9f6` | `#525879` | Lantánidos |
| Pastel actinide | `--category-actinide` | `#f5e6ed` | `#704e5c` | Actínidos |
| Status error | `--color-error` | `#b42318` | `#ffb4ab` | Sin resultados y errores |

### Rules

- La superficie usa tonos sólidos y separadores finos; no se usan gradientes.
- El foco azul se reserva para interacción. Los pasteles solo codifican categoría y siempre llevan texto.
- Todo color usado por la interfaz debe salir de estos tokens.

## 3. Typography

### Scale

| Level | Size | Weight | Line Height | Tracking | Usage |
|-------|------|--------|-------------|----------|-------|
| Display | `clamp(40px, 5vw, 64px)` | 700 | 1.05 | -0.04em | Título de la página |
| H1 | `32px` | 700 | 1.12 | -0.03em | Encabezados principales |
| H2 | `24px` | 700 | 1.2 | -0.02em | Panel y secciones |
| H3 | `18px` | 700 | 1.3 | -0.01em | Nombre de elemento |
| Body large | `18px` | 400 | 1.5 | 0 | Introducción |
| Body | `16px` | 400 | 1.5 | 0 | Texto de interfaz |
| Body small | `14px` | 400 | 1.45 | 0 | Datos secundarios |
| Caption | `12px` | 600 | 1.35 | 0.02em | Número atómico y etiquetas |
| Symbol | `26px` | 700 | 1.0 | -0.03em | Símbolo químico |

### Font Stack

- Primary: `"Helvetica Neue", Helvetica, Arial, sans-serif`
- Display: `Georgia, "Times New Roman", serif`

### Rules

- El cuerpo nunca baja de `14px`.
- Los nombres compactos de las celdas y etiquetas de grupo usan los tokens `--font-size-micro` y `--font-size-caption`; no son texto corrido.
- El display serif solo se usa para el título y el nombre destacado del elemento; la cuadrícula usa sans-serif para optimizar lectura y alineación.
- Se mantienen como máximo dos familias tipográficas.

### Implementation tokens

Los valores repetidos de tipografía, tamaños estructurales, bordes, escala fluida y movimiento viven como tokens CSS en `styles.css`: `--font-size-*` (incluido `--font-size-display-fluid`), `--line-height-*`, `--size-*`, `--border-width`, `--focus-width`, `--radius-*`, `--duration-micro` y `--ease-micro`. Los valores literales restantes se reservan para breakpoints y geometría decorativa de iconos.

## 4. Spacing & Layout

### Base Unit

Todo espaciado deriva de una unidad base de `4px`.

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | `4px` | Separación mínima |
| `--space-2` | `8px` | Gaps compactos |
| `--space-3` | `12px` | Relleno de controles |
| `--space-4` | `16px` | Relleno estándar |
| `--space-5` | `20px` | Grupos de contenido |
| `--space-6` | `24px` | Paneles y secciones |
| `--space-8` | `32px` | Separación mayor |
| `--space-10` | `40px` | Ritmo de página |
| `--space-12` | `48px` | Separación de bloques |
| `--space-16` | `64px` | Aire de composición |

### Shape Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-control` | `4px` | Inputs, buttons y celdas |
| `--radius-panel` | `12px` | Panel de detalles |

### Grid

- Max content width: `1440px`.
- Shell: rail lateral estable + área de tabla; en móvil se apila el rail encima de la tabla.
- Periodic grid: exactamente 18 columnas con `--cell-size: 64px` y `--cell-gap: 4px`; entre 1024 y 1290 px usa `--cell-size-compact: 47px` para mantener la tabla completa en el área de trabajo; el contenedor permite overflow horizontal en pantallas estrechas.
- Breakpoints: `640px` móvil, `768px` tablet, `1024px` escritorio, `1280px` escritorio amplio.

### Rules

- La tabla conserva tamaño de celda y posiciones al seleccionar o buscar.
- El panel de detalles tiene altura mínima reservada y el overflow de la tabla pertenece a su contenedor, no al documento completo.
- El espacio entre la tabla principal y las series internas es una fila completa de `--space-8` como mínimo.
- En anchos estrechos, el contenedor de tabla conserva sus pistas fijas y ofrece scroll horizontal con la indicación textual “Desliza horizontalmente…”; la captura de revisión incluye el estado `showcase=1` para hacer visibles los estados de componentes.

## 5. Components

### Search Field

- **Structure**: label visible, input `type="search"`, ayuda de atajo y estado de resultados.
- **Variants**: vacío, con consulta, sin resultados.
- **Spacing**: `--space-3` interno, `--space-4` alrededor.
- **States**: default, hover, focus, query, empty-result, disabled.
- **Accessibility**: label asociado, `aria-describedby`, `aria-live` para resultados y foco visible.
- **Motion**: ninguna animación de layout; transición corta de color en focus.
- **Layout**: cluster horizontal que pasa a stack en móvil.

### Element Tile

- **Structure**: botón con número atómico, símbolo y nombre; el color de fondo representa categoría.
- **Variants**: main-table, lanthanide, actinide, placeholder, selected, dimmed.
- **Spacing**: celdas fijas de `--cell-size`, `--space-1` interno.
- **States**: default, hover, active, focus, selected, dimmed.
- **Accessibility**: nombre accesible completo, `aria-pressed`, orden de foco visual y no depender solo del color.
- **Motion**: solo color/transform sutil en hover y active; desactivado con reduced motion.
- **Layout**: grid de 18 columnas; cada tile ocupa una celda fija.
- El showcase de revisión también demuestra los estados disabled, empty y error.

### Detail Panel

- **Structure**: encabezado de elemento, badge de categoría, tabla de propiedades y botón de limpiar selección.
- **Variants**: empty, populated.
- **Spacing**: `--space-6` interno, `--space-4` entre propiedades.
- **States**: empty, populated, updated, focus on close action.
- **Accessibility**: heading identificado, región `aria-live="polite"`, propiedades como lista de términos y valores.
- **Motion**: actualización por opacity/transform únicamente y respetando reduced motion.
- **Layout**: rail estable, scroll propio solo si el contenido lo necesita.

### Category Legend

- **Structure**: lista de categorías con swatch y texto.
- **Variants**: desktop row, mobile wrap.
- **Spacing**: `--space-2` entre items.
- **States**: default, focusable only when interactive; no decorative hover state.
- **Accessibility**: cada swatch tiene etiqueta textual y contraste suficiente.
- **Motion**: none.
- **Layout**: cluster con wrap.

### Theme Toggle

- **Structure**: botón en la franja superior de la cabecera, con icono SVG decorativo y etiqueta textual que nombra el modo al que se cambiará («Modo oscuro» / «Modo claro»).
- **Variants**: tema claro, tema oscuro.
- **Spacing**: `--space-3` interno, alto mínimo de `44px`, alineado a la derecha de la franja.
- **States**: default, hover, focus, pressed (`aria-pressed="true"` en modo oscuro).
- **Accessibility**: `<button>` nativo con foco visible, equivalencia de teclado y estado comunicado por texto, icono y `aria-pressed`.
- **Behavior**: el tema inicial sigue `prefers-color-scheme`; la elección manual se guarda en `localStorage` (clave `pt-theme`) y prevalece. Se aplica con `data-theme` en `<html>` antes del primer pintado. La transición de color dura `240ms` y se anula con reduced motion.
- **Layout**: solo cambian valores de color; tamaños y posiciones de la tabla no varían.

### Status Message

- **Structure**: texto de estado junto al buscador o debajo de la tabla.
- **Variants**: neutral, match-count, no-results, validation-error.
- **Spacing**: `--space-2`.
- **States**: default, error.
- **Accessibility**: `role="status"` para cambios normales y texto explícito para error.
- **Motion**: none.
- **Layout**: block inline con la región que describe.

## 6. Motion & Interaction

### Timing

| Type | Duration | Easing | Usage |
|------|----------|--------|-------|
| Micro | `120ms` | ease-out | Hover, press, focus |
| Standard | `240ms` | ease-in-out | Actualización de panel |
| Emphasis | `400ms` | cubic-bezier(0.16, 1, 0.3, 1) | Entrada inicial del contenido |

### Rules

- Solo se animan `transform` y `opacity`, además de transiciones de color para estados interactivos.
- La búsqueda no anima ni cambia el layout; solo alterna clases de estado.
- `prefers-reduced-motion: reduce` elimina las transiciones no esenciales.

## 7. Depth & Surface

### Strategy

`borders-only`: la profundidad proviene de superficies blancas/cálidas y bordes susurro. No se usan sombras para separar tarjetas ni paneles.

| Type | Value | Usage |
|------|-------|-------|
| Default | `1px solid var(--color-border)` | Paneles, inputs y tiles |
| Subtle | `1px solid color-mix(in srgb, var(--color-border) 60%, transparent)` | Divisores suaves |

## 8. Accessibility Constraints & Accepted Debt

### Constraints

- WCAG 2.2 AA: contraste mínimo `4.5:1` para cuerpo y `3:1` para texto grande.
- Todos los controles interactivos tienen foco visible, objetivo táctil amplio y equivalencia de teclado.
- La tabla no comunica selección, coincidencia o categoría solo mediante color.
- Se incluye enlace para saltar al contenido principal y se respeta `prefers-reduced-motion`.

### Accepted Debt

Los tamaños micro de nombre atómico y etiquetas de grupo son una excepción deliberada de densidad: quedan limitados a metadatos dentro de celdas fijas y se acompañan de nombre accesible completo.
