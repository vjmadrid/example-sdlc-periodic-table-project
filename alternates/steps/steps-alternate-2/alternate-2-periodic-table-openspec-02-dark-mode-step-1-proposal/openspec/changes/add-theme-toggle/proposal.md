# Proposal

## Why

La página solo existe en tema claro. Quien consulta la tabla en entornos con poca luz, o por preferencia visual, no tiene forma de cambiarlo. Un botón visible en la zona superior permite alternar entre modo claro y modo oscuro con un solo gesto.

## What Changes

- Botón «Modo oscuro» en la cabecera de la página, alineado a la derecha del título, que alterna entre tema claro y tema oscuro.
- Tema oscuro con paleta propia: fondo oscuro, texto claro y las 10 categorías en tonos suaves de bajo brillo que mantienen contraste suficiente.
- El tema claro sigue siendo el tema inicial en cada carga (decisión de producto «fondo claro»).
- El cambio de tema solo altera colores: no mueve ni reescala la tabla, la ficha ni el resto de la página.
- Accesibilidad: el botón es un control nativo con nombre accesible, estado expuesto con `aria-pressed`, foco visible y operable por teclado; el estado no depende solo del color (icono y atributo).
- Se actualiza `knowledge/product/` para reflejar que existe un modo oscuro opcional.

Supuestos (editables antes de implementar): el tema **no se recuerda** entre cargas (el producto descarta el almacenamiento persistente) y **no sigue** la preferencia del sistema, de modo que la página siempre abre en claro.

## Capabilities

### New Capabilities
<!-- Ninguna: el selector de tema pertenece a la capacidad existente. -->

### Modified Capabilities
- `periodic-table-web`: el requisito «Fondo claro y categorías en color pastel» pasa a «tema claro por defecto, con modo oscuro opcional», y se añade el requisito del selector de tema.

## Impact

- Código: `index.html` (botón en la cabecera), `styles.css` (tokens del tema oscuro y colores que hoy están fijos), `script.js` (alternar el atributo `data-theme` y `aria-pressed`).
- Conocimiento: `knowledge/product/product.md`, `business-rules.md` y `glossary.md` (decisión de producto y regla «Categorías»/tema).
- Sin dependencias, red ni almacenamiento nuevos.
- Fuera de alcance: recordar la elección, seguir `prefers-color-scheme`, más de dos temas.
