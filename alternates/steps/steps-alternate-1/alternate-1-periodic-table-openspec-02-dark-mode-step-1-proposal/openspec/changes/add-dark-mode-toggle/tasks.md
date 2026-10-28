## 1. Tema oscuro en estilos

- [ ] 1.1 Definir `:root[data-theme="dark"]` en `styles.css` con los valores oscuros de `DESIGN.md` para superficies, texto, bordes, foco, error y categorías
- [ ] 1.2 Declarar `color-scheme` para cada tema y comprobar que no queda ningún color literal fuera de los tokens
- [ ] 1.3 Añadir una transición de color breve y desactivarla con `prefers-reduced-motion`

## 2. Botón de tema

- [ ] 2.1 Añadir en `index.html` el botón de tema en la zona superior de la cabecera, con icono SVG decorativo, etiqueta textual y `aria-pressed`
- [ ] 2.2 Estilar el botón en `styles.css` (foco visible, objetivo táctil amplio, adaptación a móvil) sin desplazar la tabla ni el buscador

## 3. Lógica de tema

- [ ] 3.1 Añadir en `<head>` un script síncrono mínimo que fije `data-theme` desde la preferencia guardada o `prefers-color-scheme` antes del primer pintado
- [ ] 3.2 Implementar en `script.js` la alternancia, la actualización de `aria-pressed` y de la etiqueta, y el guardado de la elección en `localStorage` con `try/catch`
- [ ] 3.3 Seguir los cambios de `prefers-color-scheme` solo mientras no exista elección manual

## 4. Verificación

- [ ] 4.1 Comprobar los contrastes AA de texto y categorías en ambos temas y ajustar tokens y `DESIGN.md` si hace falta
- [ ] 4.2 Verificar que la tabla, la búsqueda y la selección no cambian de dimensiones ni de estado al alternar el tema
- [ ] 4.3 Probar teclado y tecnología de asistencia, la persistencia entre visitas, el primer acceso con sistema oscuro y claro, y la apertura desde `file://`
- [ ] 4.4 Actualizar `DESIGN.md` con el control de tema y las reglas de uso
