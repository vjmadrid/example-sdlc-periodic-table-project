# Governance Foundation - Periodic Table

Capa transversal; no cuenta como paso del ciclo de vida.

## Principios y restricciones
- Pagina estatica: HTML + CSS3 + JavaScript Vanilla, abrible por `file://`.
- Sin servidor, backend, framework, gestor de paquetes ni recursos remotos.
- Sin modulos ES, `fetch` ni `import/export` (compatibilidad `file://`).
- Navegadores modernos (Chrome, Firefox, Safari recientes); sin soporte de navegadores antiguos.
- Sin i18n, animaciones pesadas ni persistencia.
- Accesibilidad: controles nativos, foco visible, el color nunca es la unica senal.
- Datos insertados como texto (no HTML interpretado).

## Herramientas y flujo
- OpenSpec (`schema: spec-driven`) con change `build-periodic-table-web-app`.
- Sistema de diseno en `DESIGN.md`.
- Evidencia de QA en `.omo/evidence/`.

## Fuentes
`periodic-table-openspec-version-1/openspec/`, `README-periodic-table-openspec.md`.
