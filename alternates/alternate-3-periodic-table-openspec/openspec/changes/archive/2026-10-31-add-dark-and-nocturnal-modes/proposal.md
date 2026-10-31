# Proposal

## Why

La interfaz solo ofrece un tema claro con colores pastel. Quien la usa de noche o con poca luz ambiental recibe un fondo muy luminoso, y quien ya tiene el sistema en modo oscuro encuentra una página que no lo respeta. Se quiere ofrecer un modo oscuro y un modo nocturno sin perder legibilidad ni accesibilidad.

## What Changes

- Nuevo selector de tema en la cabecera con tres opciones: «Claro» (el actual), «Oscuro» y «Nocturno».
- **Modo oscuro**: fondo gris carbón y texto claro, con contraste alto; colores de categoría reinterpretados para fondo oscuro.
- **Modo nocturno**: paleta de muy baja luminosidad y tonos cálidos (sin azules intensos) pensada para uso nocturno prolongado; mantiene el contraste mínimo exigido.
- Tema inicial según la preferencia del sistema (`prefers-color-scheme`): oscuro si el sistema lo pide, claro en caso contrario. El modo nocturno solo se activa por elección explícita.
- El tema elegido vive solo en la sesión de la página: no se persiste (la obligación «Datos y privacidad» del producto excluye cualquier almacenamiento).
- Se conservan sin cambios la geometría estable, la búsqueda, la selección, la ficha y el funcionamiento por `file://` sin dependencias.
- Ningún estado (categoría, selección, coincidencia, tema activo) depende solo del color.

## Capabilities

### New Capabilities
- `theme-modes`: selección y aplicación de los temas claro, oscuro y nocturno: opciones, tema inicial, legibilidad y accesibilidad de cada tema, y ausencia de persistencia.

### Modified Capabilities
<!-- Ninguna: openspec/specs/ está vacío; `periodic-table-web` sigue en el cambio build-periodic-table-web-app, aún sin archivar. -->

## Impact

- `index.html`: control de selección de tema en la cabecera.
- `styles.css`: variables de color por tema; la categoría y el resto de colores pasan a variables.
- `script.js`: lógica de selección de tema (sin `localStorage`, sin red).
- Sin dependencias nuevas, sin cambios en `data/elements.js` ni en `knowledge/`.
- Dependencia de orden: este cambio se apoya en `periodic-table-web`; debe archivarse después de `build-periodic-table-web-app` o junto con él.
