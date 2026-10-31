# Ejemplo de implementación del change: Añadir el modo oscuro

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

## Paso 2: Explorar el change

Pasos a seguir:

* Ejecutar el comando del asistente de IA para explorar el change propuesto:

```bash
# Ejemplo para Claude
/opsx:explore Tenemos implementado el un modo oscuro o nocturno en la interfaz

# Ejemplo para Codex
$openspec-explore Tenemos implementado el un modo oscuro o nocturno en la interfaz
```

* Verificar la respuesta

En este caso no debería existir este cambio todavía, ya que aún no se ha propuesto ni creado formalmente.

---

## Paso 2: Crear el change

---

### Paso 2.1: Ejecutar el comando `/opsx:propose`

Pasos a seguir:

* Ejecutar el siguiente comando para proponer un cambio:

Ejemplo sencillo

```bash
# Ejemplo para Claude
/opsx:propose Quiero añadir un botón en la zona superior que facilite cambiar entre el modo oscuro y el modo claro

# Ejemplo para Codex
$openspec-propose Quiero añadir un botón en la zona superior que facilite cambiar entre el modo oscuro y el modo claro
```

Ejemplo más avanzado

```bash
# Comando
/opsx:propose Quiero implementar un modo oscuro (dark) y un modo nocturno (nocturnal) en la interfaz

Este cambio se solicita para este proyecto como un caso nuevo
Genera un resumen de los tokens utilizados en la propuesta, sería interesante si se pudiera ver cuántos tokens se han consumido y cómo se distribuyen entre las diferentes partes de la propuesta.
Genera un resumen de coste estimado del change
```

Tras el proceso que ha realizado para pensar todo ha decidio llamar al change como: `add-dark-mode-toggle`

#### Generar sobre una tarea JIRA

Pre-requisitos:

* Tener instalado y configurado el MCP de Atlassian
* Tener creada la tarea JIRA ED-44

Pasos a seguir:

* Verificar que la tarea JIRA ED-44 existe y está accesible desde el MCP de Atlassian

```bash
Cual es el estado de ED-44 en JIRA
```

Debería de mostrar la informacion sobre la tarea

* Verificar elementos importantes sobre esta tarea

```bash
#Ejemplo 1
Quién es la persona que definió esta necesidad?

#Ejemplo 2
A quién puedo preguntar si necesito más detalle?
```

* Lanzar una tarea sobre la implementación del modo oscuro en la interfaz

```bash
# Comando
/opsx:propose Quiero que implementes la tarea JIRA ED-44
Este cambio se solicita para este proyecto como un caso nuevo
Genera un resumen de los tokens utilizados en la propuesta, sería interesante si se pudiera ver cuántos tokens se han consumido y cómo se distribuyen entre las diferentes partes de la propuesta.
Genera un resumen de coste estimado del change
```

---

### Paso 2.2: Verificar la estructura generada

Despues de ejecutar el comando `/opsx:propose`, se generará un directorio de cambio con la siguiente estructura de subdirectorios y artefactos borradores

Ejemplo:

```bash
openspec/changes/
  add-dark-mode-toggle/
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
openspec status --change "add-dark-mode-toggle"
```

* Verificar la respuesta

```bash
Change: add-dark-mode-toggle
Schema: spec-driven
Change root: /Users/vjmadrid/Workspace/personal/workspace-sdd-openspec/examples/01-periodic-table-project/periodic-table-openspec/openspec/changes/add-dark-mode-toggle
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

Ejemplo sencillo

```bash
# Ejemplo para Claude
/opsx:apply add-dark-mode-toggle

# Ejemplo para Codex
$openspec-apply add-dark-mode-toggle
```

Ejemplo más avanzado

```bash
# Ejemplo para Claude
/opsx:apply add-dark-mode-toggle

Este cambio se solicita para este proyecto como un caso nuevo
Genera un resumen de los tokens utilizados en la propuesta, sería interesante si se pudiera ver cuántos tokens se han consumido y cómo se distribuyen entre las diferentes partes de la propuesta.
Genera un resumen de coste estimado del change

# Ejemplo para Codex
$openspec-apply add-dark-mode-toggle

Este cambio se solicita para este proyecto como un caso nuevo
Genera un resumen de los tokens utilizados en la propuesta, sería interesante si se pudiera ver cuántos tokens se han consumido y cómo se distribuyen entre las diferentes partes de la propuesta.
Genera un resumen de coste estimado del change
```

TEMPLATE CLAUDE

```bash
/opsx:apply xxx

Este cambio se solicita para este proyecto como un caso nuevo
Genera un resumen de los tokens utilizados en la propuesta, sería interesante si se pudiera ver cuántos tokens se han consumido y cómo se distribuyen entre las diferentes partes de la propuesta.
Genera un resumen de coste estimado del change


/opsx:apply add-dark-and-nocturnal-modes

Este cambio se solicita para este proyecto como un caso nuevo
Genera un resumen de los tokens utilizados en la propuesta, sería interesante si se pudiera ver cuántos tokens se han consumido y cómo se distribuyen entre las diferentes partes de la propuesta.
Genera un resumen de coste estimado del change
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
openspec status --change "add-dark-mode-toggle"
```

* Verificar la respuesta

Ejemplo de respuesta:

```bash
Change: add-dark-mode-toggle
Schema: spec-driven
Change root: /Users/vjmadrid/Workspace/personal/kanban-openspec/openspec/changes/add-dark-mode-toggle
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
/opsx:archive add-dark-mode-toggle
```

Si el perfil es EXPANDED, se puede verificar antes de archivar

```bash
# Comandos
/opsx:verify add-dark-mode-toggle

#Ejemplo
/opsx:verify add-dark-mode-toggle
```

