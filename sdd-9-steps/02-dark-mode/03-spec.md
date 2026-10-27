# Step 3: Specification - Dark Mode (`spec.md`)

Exit: `SPEC READY`. Artefacto real: delta spec `openspec/changes/add-dark-mode-toggle/specs/periodic-table-web/spec.md` (seccion `ADDED Requirements`).

| Requirement (nuevo) | Escenarios |
|---------------------|------------|
| Light and dark theme toggle | claro -> oscuro (tabla conserva dimensiones); oscuro -> claro; busqueda y seleccion se conservan al alternar |
| Theme initial choice and persistence | primera visita sigue el sistema; eleccion manual recordada; almacenamiento no disponible sin error |
| Accessible theme control | activar con teclado (foco permanece); tema activo anunciado por nombre/estado accesible |

## Delta frente a `01-build`
La spec base (5 requisitos) no se modifica: el change solo **anade** 3 requisitos. Al archivar, la spec principal pasa a 8 requisitos.

## Inconsistencia heredada
Sigue pendiente la de `01-build` (series de "14" vs 15 elementos); no afecta a este change.
