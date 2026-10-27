# Step 8: Release & Operate - Dark Mode (`release.md`)

Exit: `RELEASE STABLE` - pendiente de confirmar

## Entrega
Igual que `01-build`: copiar `index.html`, `styles.css`, `script.js` y `data/`; abrir `index.html`. Sin build ni servidor.

## Exposicion
Fichero local o hosting estatico. La eleccion de tema se guarda por navegador (`localStorage`), no se sincroniza entre dispositivos.

## Rollback
Restaurar los cuatro ficheros previos. Una clave `pt-theme` residual en el navegador es inocua.

## Senales de operacion
Sin runtime que monitorizar. Comprobar en Chrome, Firefox y Safari: errores de consola, primer acceso con sistema claro y oscuro, y comportamiento con `localStorage` bloqueado.

## Pendiente
Cerrar la tarea 4.3 antes de dar el release por estable, y decidir si hay despliegue real.
