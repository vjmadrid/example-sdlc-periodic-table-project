# Proposal

## Why

La página solo ofrece un aspecto claro fijo. Las personas que la consultan con poca luz, o que prefieren un modo oscuro, no pueden adaptarla ni heredan la preferencia de su sistema. La tarea JIRA ED-44 (épica ED-22, «Platform Shell & Navigation») pide gestión de temas con tres modos (Claro, Oscuro y Nocturno), persistente y accesible.

## What Changes

- Control de selección de tema en la esquina superior derecha de la cabecera, operable con ratón y teclado, con nombre accesible y estado anunciado.
- Tres temas definidos como tokens de color: **Claro** (el actual), **Oscuro** y **Nocturno** (paleta de tendencia sepia para reducir fatiga visual).
- El tema elegido se aplica a toda la página: cabecera, búsqueda, leyenda, tabla, ficha y avisos. Las 10 categorías conservan colores distinguibles en cada tema.
- La preferencia se guarda en el dispositivo (`localStorage`) y se restaura al recargar. Sin preferencia guardada se sigue el tema del sistema (`prefers-color-scheme`).
- Programación nocturna: desde las 22:00 hora local, quien no haya elegido un tema manualmente ve el tema Nocturno. Una elección manual nunca es sustituida por la programación. Se reevalúa si cambia la hora o la zona horaria con la página abierta.
- Sincronización entre pestañas: un cambio de tema en una pestaña se refleja en las demás abiertas.
- Cambio de tema inmediato (sin recarga, < 100 ms). Cualquier transición respeta `prefers-reduced-motion`.
- Si `localStorage` no está disponible o está corrupto, se usa el tema del sistema sin error visible.
- Con el modo de contraste alto del sistema (`forced-colors`), los temas no sobrescriben los colores del sistema.
- Contraste WCAG 2.2 AA en los tres temas, incluido el texto sobre cada color de categoría.

Fuera de alcance: más de tres temas, preferencias en servidor o sincronización entre dispositivos, personalización de colores por la persona usuaria, cambios en el catálogo, la búsqueda o la ficha más allá de su aspecto.

## Capabilities

### New Capabilities
- `theme-management`: selección, aplicación, persistencia, valor por defecto (sistema), programación nocturna y sincronización del tema visual (Claro, Oscuro, Nocturno).

### Modified Capabilities
- `periodic-table-web`: los requisitos «Disposición de la tabla principal» (fondo claro) y «Categorías y leyenda» (color pastel único) pasan a depender del tema activo; el contraste y la distinción de categorías deben cumplirse en cada tema.

## Impact

- **Código**: `index.html` (control de tema en la cabecera), `styles.css` (tokens por tema, `[data-theme]`, `forced-colors`), `script.js` (lógica pura de resolución de tema + enlace al DOM y almacenamiento). Sin nuevas dependencias, build ni módulos ES.
- **Conocimiento del proyecto**: `knowledge/product/` declara «sin persistencia» (`obligations.md`, `product.md` → no objetivos) y «color pastel sobre fondo claro» (`business-rules.md`). ED-44 exige persistir la preferencia, de modo que esos documentos deben actualizarse: se guarda solo el identificador del tema (sin datos personales), alineado con `knowledge/dev/architecture/static-web-app.md` que permite `localStorage` para preferencias de tema.
- **CSP**: se mantiene `script-src 'self'`; no se usan scripts en línea.
- **Supuestos** (a confirmar en revisión): el tema Nocturno programado termina a las 06:00 (ED-44 solo fija el inicio); el control ofrece además de los tres temas una opción «Automático» (sin elección manual), necesaria para volver al valor por defecto y a la programación nocturna.
