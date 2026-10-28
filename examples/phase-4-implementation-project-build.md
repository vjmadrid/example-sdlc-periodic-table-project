# Ejemplo de implementación del change

---

## Paso 1: Arrancar el asistente de IA

Pasos a seguir:

* Localizar el proyecto en la terminal y ejecutar el siguiente comando para iniciar el asistente de IA:

* Ejecutar el comando del asistente de IA para proponer un cambio:

```bash
# Comando
codex
```

---

## Paso 2: Crear el change

---

### Paso 2.1: Ejecutar el comando `/opsx:propose`

Pasos a seguir:

* Ejecutar el siguiente comando para proponer un cambio:

```bash
# Ejemplo para Claude
/opsx:propose /opsx:propose Quiero una web con la tabla periódica.
1) Con fondo claro y los elementos en color pastel
2) Que funcione sin necesidad de un servidor web, usando solo estándares HTML, CSS3 y JavaScript (Vainilla)
3) Que tenga un buscador
4) Que cuando selecciones un elemento muestre los detalles, sin que la tabla periódica reescale de tamaño
5) Que los lantánidos y actínidos estén separados de la tabla periódica por al menos una fila

# Ejemplo para Codex
$openspec-propose /opsx:propose Quiero una web con la tabla periódica.
1) Con fondo claro y los elementos en color pastel
2) Que funcione sin necesidad de un servidor web, usando solo estándares HTML, CSS3 y JavaScript (Vainilla)
3) Que tenga un buscador
4) Que cuando selecciones un elemento muestre los detalles, sin que la tabla periódica reescale de tamaño
5) Que los lantánidos y actínidos estén separados de la tabla periódica por al menos una fila
```

Tras el proceso que ha realizado para pensar todo ha decidio llamar al change como: `build-periodic-table-web-app`

---

### Paso 2.2: Verificar la estructura generada

Despues de ejecutar el comando `/opsx:propose`, se generará un directorio de cambio con la siguiente estructura de subdirectorios y artefactos borradores

Ejemplo:

```bash
# Ejemplo de change con nombre "build-periodic-table-web-app"
openspec/changes/
  build-periodic-table-web-app/
    .openspec.yaml   # Metadata (schema, estado)
    proposal.md      # El "que" y "por que"
    design.md        # El "como"
    tasks.md         # Lista de tareas
    specs/           # Delta specs
      data-model/
        spec.md
```

---

### Paso 2.3: Verificar el estado del change

>Es un paso opcional

Pasos a seguir:

* Ejecutar el siguiente comando para verificar el estado del change:

```bash
# Comando
openspec status --change "<CHANGE>"

# Ejemplo
openspec status --change "build-periodic-table-web-app"
```

* Verificar la respuesta

```bash
Change: build-periodic-table-web-app
Schema: spec-driven
Change root: /Users/vjmadrid/Workspace/personal/workspace-sdd-openspec/examples/01-periodic-table-project/periodic-table-openspec/openspec/changes/build-periodic-table-web-app
Progress: 4/4 artifacts complete

[x] proposal
[x] specs
[x] design
[x] tasks

All planning artifacts complete!
```

---

## Paso 3: Revisar los artefactos

Los artefactos generados son borradores de inicio y SIEMPRE se deberían revisar

>Estos documentos se pueden enriquecer con más información, detalles y ejemplos. Se pueden añadir más escenarios Gherkin, más detalles de diseño, más tareas, etc.

Habría que hacerse algunas preguntas como:

* Alcance correcto? Ni demasiado grande ni demasiado pequeno
* Specs completas? Los escenarios Gherkin cubren los casos relevantes?
* Design coherente? Las decisiones se alinean con tu proyecto?
* Tasks atomicas? Cada tarea produce un resultado verificable?

Para ello se puede:

* Editar cualquier archivo .md directamente con tu editor
* Pedirle a la IA que ayude en los ajustes

---

## Paso 4: Implementar el change

### Paso 4.1: Implementar con `/opsx:apply`

Pasos a seguir:

* Una vez revisados y ajustados los artefactos, se puede aplicar el change con:

```bash
# Ejemplo para Claude
/opsx:apply build-periodic-table-web-app

# Ejemplo para Codex
$openspec-apply build-periodic-table-web-app
```

* Verificar que la IA esta usando el change y muestra el progreso de que esta modificando

### Paso 4.2: Verificar el resultado de la implementación

Pasos a seguir:

* Ejecutar el siguiente comando para verificar el resultado de la implementación:

```bash
# Comandos
openspec status                               # Interactivo
openspec status --change "<CHANGE>"           # Cambio específico
openspec status --change "<CHANGE>" --json    # Para agentes

#Ejemplo
openspec status --change "build-periodic-table-web-app"
```

* Verificar la respuesta

Ejemplo de respuesta:

```bash
Change: <CHANGE>
Schema: spec-driven
Change root: /Users/vjmadrid/Workspace/personal/kanban-openspec/openspec/changes/<CHANGE>
Progress: 4/4 artifacts complete

[x] proposal
[x] specs
[x] design
[x] tasks

All planning artifacts complete!
```

* Revisar la completitud del fichero de `tasks.md` y que todas las tareas han sido completadas

---

## Paso 5: Verificar y Archivar el change

---

### Paso 5.1: Verificar antes de archivar

>Nota: Este paso depende del tipo de perfil con el que se esta trabajando (CORE o EXPANDED)

Si el perfil es CORE, entonces solo permite archivar

```bash

# Ejemplo
/opsx:archive build-periodic-table-web-app
```

Si el perfil es EXPANDED, se puede verificar antes de archivar

```bash
# Comandos
/opsx:archive setup-data-model

#Ejemplo
/opsx:verify build-periodic-table-web-app
```

