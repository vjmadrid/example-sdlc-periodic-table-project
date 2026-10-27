# Step 2: Ideation - Dark Mode

Pregunta: que podriamos hacer. Salida: `SOLUTION DIRECTION READY`

## Alternativas (recogidas en `design.md`)
| # | Opcion | Decision |
|---|--------|----------|
| A | Tema via atributo `data-theme` en `<html>` | Elegida: permite fijarlo antes del primer pintado y declarar `color-scheme` |
| B | Tema via clase en `<body>` | Descartada |
| C | Script sincrono minimo en `<head>` para el tema inicial | Elegida |
| D | Resolver el tema inicial en `script.js` (`defer`) | Descartada: parpadeo visible |
| E | Persistir en `localStorage` con `try/catch` | Elegida |
| F | Cookies | Descartada: innecesarias y problematicas en `file://` |
| G | Boton `<button>` con `aria-pressed` | Elegida |
| H | Interruptor `role="switch"` | Descartada: equivalente, mas complejo |
| I | Selector de tres modos (claro/oscuro/sistema) | Descartada (non-goal) |

## Supuestos
- Todos los colores ya son tokens CSS, asi que el tema oscuro es redefinir tokens.
- Los valores oscuros de `DESIGN.md` bastan; solo se ajustan si fallan contraste.

## Experimentos / referencias
`DESIGN.md` (tokens Light/Dark) y la estructura de la cabecera (`.site-header`, `.hero-row`).
