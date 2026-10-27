# Step 1: Discovery - Dark Mode

Pregunta: que problema resolvemos y por que importa. Salida: `DISCOVERY READY`

## Problema
La pagina solo ofrece tema claro, aunque `DESIGN.md` ya define una paleta oscura completa. Quien consulta la tabla con poca luz o prefiere interfaces oscuras no puede cambiarlo, y la pagina ignora la preferencia de color del sistema.

## Contexto de eleccion del cambio
- Es una evolucion incremental sobre un producto ya archivado (`01-build`): demuestra el ciclo OpenSpec en un proyecto existente, no solo en uno nuevo.
- Alcance pequeno y verificable, ideal para interiorizar el flujo `propose -> apply -> archive`.

## Necesidades
- Alternar claro/oscuro desde la zona superior, con efecto inmediato.
- Tema inicial acorde con la preferencia del sistema.
- Recordar la eleccion manual entre visitas.
- Mantener accesibilidad y legibilidad de los pasteles de categoria.

## Resultados esperados
Un boton de tema que funciona offline desde `file://` sin romper nada de lo existente.

## Preguntas abiertas (resueltas en diseno)
- Persistencia: `localStorage` con `try/catch`.
- Tercer modo "automatico" explicito: no se anade.
