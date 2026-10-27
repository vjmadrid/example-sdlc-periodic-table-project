# Governance Foundation - Periodic Table (Dark Mode)

Capa transversal; no cuenta como paso del ciclo de vida. Hereda la de `01-build` y se mantiene vigente.

## Principios y restricciones (heredados)
- Pagina estatica: HTML + CSS3 + JavaScript Vanilla, abrible por `file://`.
- Sin servidor, backend, framework, gestor de paquetes ni recursos remotos.
- Sin modulos ES, `fetch` ni `import/export`.
- Accesibilidad: controles nativos, foco visible, el color nunca es la unica senal.

## Restricciones nuevas para este change
- El tema se resuelve solo con tokens CSS: sin colores literales fuera de `:root`.
- Sin dependencias nuevas ni peticiones de red.
- Cambiar el tema no puede alterar tamanos ni posiciones (solo valores de color).
- Contraste WCAG 2.2 AA exigido por `DESIGN.md` en ambos temas.
- La persistencia (antes fuera de alcance) se admite unicamente para el tema, en `localStorage`.

## Herramientas y flujo
- OpenSpec (`schema: spec-driven`) con change `add-dark-mode-toggle`, partiendo de la spec ya archivada de `build-periodic-table-web-app`.
- Comandos: `/opsx:propose`, `/opsx:apply`, `/opsx:archive` (Claude) o `$openspec-propose`, `$openspec-apply` (Codex).
- Sistema de diseno en `DESIGN.md` (columna "Dark" de cada token ya documentada).

## Fuentes
`examples/periodic-table-openspec-02-dark-mode-step-{1-proposal,2-apply,3-archive}/`, `examples/phase-3-implementation-project-dark-mode.md`.
