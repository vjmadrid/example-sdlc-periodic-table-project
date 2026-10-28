# Tasks

## 1. Tokens y estilos del tema oscuro

- [ ] 1.1 En `styles.css`, sustituir los colores fijos (`rgba(31, 41, 55, 0.25)` del borde de celdas, `#fef3c7` de `.notice`, colores de `.detail-symbol`) por tokens; verificar con `grep` que no quedan literales de color fuera de `:root` y que el tema claro se ve igual que antes (captura antes/después)
- [ ] 1.2 Definir `:root[data-theme="dark"]` con fondo, superficie, texto, texto atenuado, borde, foco y las 10 variables `--cat-*`; verificar con un cálculo de contraste que cada par texto/categoría es ≥ 4,5:1 y que las categorías siguen siendo distinguibles

## 2. Botón de tema

- [ ] 2.1 Añadir en `index.html` el `<button type="button" id="theme-toggle" aria-pressed="false">` en la cabecera y ajustar el estilo de la cabecera (título a la izquierda, botón a la derecha, ancho mínimo fijo, `:focus-visible` visible); verificar en una captura que se ve en la zona superior y que no desplaza el contenido
- [ ] 2.2 Implementar en `script.js` `setTheme` y el manejador de clic (atributo `data-theme`, `aria-pressed` e icono ☾/☀), con la página abriendo siempre en claro; verificar en Chrome headless que un clic pasa a oscuro, otro vuelve a claro y `aria-pressed` cambia

## 3. Verificación y documentación

- [ ] 3.1 Verificar que cambiar de tema no altera la geometría (tamaño de tabla, posición de celdas, fuente y ficha, medidos con `getBoundingClientRect`) y que se conservan la búsqueda activa y el elemento seleccionado
- [ ] 3.2 Verificar el uso con teclado (Tab hasta el botón, Enter y Espacio cambian el tema) y capturas de ambos temas en ancho 1500 y en ancho estrecho (500 px) sin desbordar la página
- [ ] 3.3 Actualizar `knowledge/product/product.md`, `business-rules.md` y `glossary.md` con la decisión de tema claro por defecto y modo oscuro opcional sin persistencia; verificar que no queda texto que afirme que solo existe fondo claro y actualizar `README.md` con el botón

## Workflow follow-up

- Archivar el cambio tras cumplir los requisitos de revisión del proyecto (sincronizará el delta con `openspec/specs/periodic-table-web/spec.md`).
