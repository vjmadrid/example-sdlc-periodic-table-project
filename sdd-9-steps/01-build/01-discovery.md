# Step 1: Discovery - Periodic Table

Pregunta: que problema resolvemos y por que importa. Salida: `DISCOVERY READY`

## Problema
No existe ninguna implementacion. Se necesita consultar los elementos quimicos de forma rapida, explorable y sin instalar ni levantar infraestructura (offline).

## Contexto de eleccion del proyecto
- Es familiar: todos entienden una tabla de elementos.
- Permite iteracion incremental de features.
- El objetivo didactico es interiorizar el flujo OpenSpec, no producir un producto perfecto.

## Necesidades
- Ver los 118 elementos en su posicion periodica.
- Buscar por nombre, simbolo y numero atomico.
- Consultar detalles de un elemento sin alterar la tabla.
- Experiencia visual atractiva.

## Resultados esperados
Un archivo local que se abre y funciona de inmediato.

## Preguntas abiertas
- Rango de datos "adicionales" por elemento (se resolvio en diseno: electronegatividad y configuracion).
