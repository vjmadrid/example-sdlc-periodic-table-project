# Step 3: Specification - Periodic Table (`spec.md`)

Exit: `SPEC READY`. Artefacto real: `openspec/changes/build-periodic-table-web-app/specs/periodic-table-web/spec.md`

| Requirement | Escenarios |
|-------------|------------|
| Complete periodic table layout | tabla principal completa; series internas separadas; categorias distinguibles |
| Local static operation | apertura por `file://` sin peticiones de red |
| Element search | por nombre; por simbolo o numero; sin resultados |
| Element selection and details | seleccionar elemento; layout estable tras seleccion |
| Usable keyboard and assistive interaction | navegar/activar con teclado; estado sin depender del color |

## Inconsistencia conocida
El escenario dice que cada serie cubre 14 elementos; los rangos 57-71 y 89-103 contienen 15 cada uno. La implementacion renderiza 15 por serie para cumplir los 118. Corregir el texto de la spec.
