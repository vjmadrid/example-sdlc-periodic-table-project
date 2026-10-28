# Fase 3: Preparación de OpenSpec

---

- [Fase 3: Preparación de OpenSpec](#fase-3-preparación-de-openspec)
  - [Paso 1: \[Opcional\]  Customizar las bases documentales del proyecto](#paso-1-opcional--customizar-las-bases-documentales-del-proyecto)
    - [Paso 1.1: Preparar las bases documentales](#paso-11-preparar-las-bases-documentales)
      - [Documentación del producto](#documentación-del-producto)
      - [Documentación técnica](#documentación-técnica)
    - [Paso 1.2: Ubicar de las bases documentales](#paso-12-ubicar-de-las-bases-documentales)
  - [Paso 2: \[Opcional\] Configuración de OpenSpec](#paso-2-opcional-configuración-de-openspec)
    - [Paso 2.1:Configuración de OpenSpec para que utilice las bases documentales](#paso-21configuración-de-openspec-para-que-utilice-las-bases-documentales)
  - [Paso 3: \[Opcional\] Añadir plugins/tools de soporte para OpenSpec](#paso-3-opcional-añadir-pluginstools-de-soporte-para-openspec)
    - [OpenSpecWebUI](#openspecwebui)

---

## Paso 1: [Opcional]  Customizar las bases documentales del proyecto

### Paso 1.1: Preparar las bases documentales

>Este paso es muy importante, si esta customización no se realiza, el asistente de IA usará información genérica del proyecto en lugar de la específica que se quiere utilizar

#### Documentación del producto

Pasos a seguir:

* Revisa la documentación existente en la ruta `/knowledge/product`
* Identifica la información específica del proyecto que debe ser añadida o actualizada
* Modifica los archivos correspondientes para reflejar la información específica del proyecto
* Guarda los cambios y verifica que la documentación esté completa y correcta

#### Documentación técnica

Pasos a seguir:

* Revisa la documentación técnica existente en la ruta `/knowledge/technical`
* Identifica la información técnica específica del proyecto que debe ser añadida o actualizada
* Modifica los archivos correspondientes para reflejar la información técnica específica del proyecto
* Guarda los cambios y verifica que la documentación técnica esté completa y correcta

### Paso 1.2: Ubicar de las bases documentales

Las bases documentales del proyecto se encuentran en las siguientes rutas:

* Documentación del producto: `/knowledge/product`
* Documentación técnica: `/knowledge/technical`

Pasos a seguir:

* Verifica que las rutas a las bases documentales sean correctas
* Asegúrate de que los archivos necesarios existan en las rutas especificadas
* Copia las bases documentales sobre el directorio raíz del proyecto
* Verifica que las bases documentales se hayan copiado correctamente al directorio raíz del proyecto

---

## Paso 2: [Opcional] Configuración de OpenSpec

### Paso 2.1:Configuración de OpenSpec para que utilice las bases documentales

Pre-requisitos

* Requiere haber ejecutado previamente el comando "openspec init" para inicializar OpenSpec en el proyecto
* Requiere tener las bases documentales
* Verificar que existe el fichero "config.yaml" dentro del directorio "openspec"

Pasos a seguir:

* Abre el fichero "config.yaml" dentro del directorio "openspec"
* Configura las rutas a las bases documentales según corresponda

```yml
context: |
  Tech stack: HTML, CSS, JavaScript
  Architecture: SPA (Single Page Application)
  Project specs (single source of truth): All artifact creation and implementation MUST follow the project's context in knowledge/product/ (business) and knowledge/dev/ (architecture and languages).

# Per-artifact rules (optional)
# Add custom rules for specific artifacts.
rules:
  # Global: apply project knowledge when creating any artifact
  _global:
    - Before creating any artifact, read and apply knowledge/product/*
    - For development artifacts (design, tasks), also read and apply knowledge/dev/**
```

* Guarda los cambios realizados en el fichero "config.yaml"

---

## Paso 3: [Opcional] Añadir plugins/tools de soporte para OpenSpec

### OpenSpecWebUI

Recursos:

* [GitHub](https://github.com/oioi555/openspec-webui)
* [npm](https://www.npmjs.com/package/openspec-webui)

Para habilitar la interfaz web de OpenSpec, sigue estos pasos:

* Instalar la dependencia de OpenSpecWebUI:

```bash
# Global
npm install -g openspec-webui

# Proyecto
npm i openspec-webui
```

* Identificar las características de configuración de arranque de OpenSpecWebUI

```bash
# Start with default settings (127.0.0.1:3001, auto-open browser)
openspec-webui

# Use a different port
openspec-webui --port 8080

# Allow access from other devices on the network
openspec-webui --host 0.0.0.0

# Start without opening the browser
openspec-webui --no-open
```

* Añadir un script en el archivo `package.json` para facilitar el inicio de OpenSpecWebUI

```json
{
  ...
  "scripts": {
    "openspec-webui": "openspec-webui"
  }
}
```

* Ejecutar el script desde la línea de comandos:

```bash
npm run openspec-webui
```

Esto abrirá un navegador con la interfaz de OpenSpec donde podrás visualizar y gestionar los cambios propuestos de manera interactiva.
