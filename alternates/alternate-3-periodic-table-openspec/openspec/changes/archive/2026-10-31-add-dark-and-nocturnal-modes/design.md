# Design

## Context

La página ya define sus colores como variables en `:root` de `styles.css` (`--bg`, `--surface`, `--text`, `--text-muted`, `--border`, `--focus`, `--accent` y diez `--cat-*`), pero algunos estados usan valores fijos que habrá que revisar. La CSP de `index.html` es `style-src 'self'; script-src 'self'`: no hay estilos ni scripts en línea. El producto no persiste datos (`knowledge/product/obligations.md`). Ver proposal.md para la motivación y specs/theme-modes para los requisitos.

## Goals / Non-Goals

**Goals:**
- Tres temas cambiando solo valores de variables, sin duplicar reglas de componentes.
- Tema inicial correcto desde el primer pintado, sin parpadeo.
- Contraste de texto ≥ 4,5:1 en los tres temas.

**Non-Goals:**
- Persistir la elección, sincronizarla entre pestañas o reaccionar en vivo a cambios del sistema tras elegir manualmente.
- Programar el modo nocturno por horario.
- Rediseñar la maquetación o añadir dependencias.

## Decisions

1. **Atributo `data-theme` en `<html>` con variables por tema.** `styles.css` define el claro en `:root`, y sobrescribe las variables en `:root[data-theme="dark"]` y `:root[data-theme="nocturnal"]`. Alternativa: clases en `<body>` o hojas separadas; se descarta por añadir peticiones o reglas duplicadas.
2. **Tema oscuro por defecto vía CSS.** Un bloque `@media (prefers-color-scheme: dark)` aplica la paleta oscura a `:root:not([data-theme])`, de modo que no hay parpadeo y funciona incluso antes de ejecutar JS. `script.js` establece `data-theme` solo al elegir. Alternativa: decidirlo en JS; se descarta porque la CSP prohíbe un script en línea previo al pintado.
3. **Selector como grupo de tres botones de radio (`role="radiogroup"`) en la cabecera.** Teclado y lector de pantalla nativos, un único activo, indicador no cromático (marca y texto en la opción activa). Alternativa: un botón que cicla; se descarta porque no expone las opciones.
4. **Sin persistencia.** Se mantiene el estado en el DOM; la recarga vuelve a la preferencia del sistema. Alternativa: `localStorage`; se descarta por contradecir la obligación de datos y privacidad.
5. **Paletas.** Oscuro: fondo carbón neutro, texto claro, categorías en tonos medios/apagados con texto claro u oscuro según contraste. Nocturno: fondo casi negro cálido, texto ámbar suave, categorías de baja saturación sin azules intensos (halógenos y no metales se desplazan a verdes/turquesas apagados y violeta/magenta cálido). Los valores concretos se fijan al implementar y se validan con una comprobación de contraste.
6. **Estados sin color solo.** Se mantienen los contornos (selección doble, foco de 3 px) y la atenuación por opacidad; se revisa que `box-shadow` use `var(--surface)` y que la atenuación (`opacity: 0.75`) no rompa el contraste en los temas oscuros.

## Risks / Trade-offs

- [Colores fijos olvidados en `styles.css`] → Auditar con `grep` los valores hexadecimales fuera de `:root` y convertirlos en variables.
- [Contraste insuficiente en categorías con fondo medio] → Calcular el contraste de cada par texto/fondo por tema y ajustar tonos.
- [Dos temas oscuros muy parecidos] → Fijar una diferencia mínima de luminosidad entre `--bg` oscuro y nocturno y comprobarla visualmente.
- [Sin persistencia el usuario repite la elección] → Aceptado por la obligación de privacidad; se documenta como decisión.
- [Tema forzado a «Nocturno» ignora cambios del sistema] → Aceptado; la preferencia manual manda durante la sesión.
