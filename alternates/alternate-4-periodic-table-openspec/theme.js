/*
 * Gestión de temas (Claro, Oscuro, Nocturno). Script clásico (sin módulos ES) para
 * funcionar por file://. Se carga sin defer en <head> para fijar data-theme antes
 * del primer pintado.
 */
(function (root) {
  'use strict';

  var STORAGE_KEY = 'periodic-table-theme';
  var AUTO = 'auto';
  var THEMES = ['light', 'dark', 'nocturnal'];
  var THEME_LABELS = { light: 'Claro', dark: 'Oscuro', nocturnal: 'Nocturno' };
  // Ventana del tema Nocturno programado: desde NIGHT_START hasta NIGHT_END (hora local).
  var NIGHT_START = 22;
  var NIGHT_END = 6;
  var POLL_MS = 60000;

  /* ---------- Lógica pura (sin DOM) ---------- */

  // Devuelve una elección válida ('auto' o un tema); cualquier otra cosa es 'auto'.
  function normalizeChoice(value) {
    return THEMES.indexOf(value) !== -1 ? value : AUTO;
  }

  function isNight(hour) {
    return hour >= NIGHT_START || hour < NIGHT_END;
  }

  // Elección manual > programación nocturna > preferencia del sistema.
  function resolveTheme(options) {
    var choice = normalizeChoice(options.choice);
    if (choice !== AUTO) {
      return choice;
    }
    if (isNight(options.hour)) {
      return 'nocturnal';
    }
    return options.systemDark ? 'dark' : 'light';
  }

  root.PeriodicTableTheme = {
    normalizeChoice: normalizeChoice,
    resolveTheme: resolveTheme,
    STORAGE_KEY: STORAGE_KEY,
    THEMES: THEMES,
    NIGHT_START: NIGHT_START,
    NIGHT_END: NIGHT_END
  };

  if (typeof document === 'undefined') {
    return;
  }

  /* ---------- Almacenamiento (no confiable: puede fallar o estar corrupto) ---------- */

  function readChoice() {
    try {
      return normalizeChoice(root.localStorage.getItem(STORAGE_KEY));
    } catch (error) {
      return AUTO;
    }
  }

  function writeChoice(choice) {
    try {
      if (choice === AUTO) {
        root.localStorage.removeItem(STORAGE_KEY);
      } else {
        root.localStorage.setItem(STORAGE_KEY, choice);
      }
    } catch (error) {
      // Sin almacenamiento: la elección vive solo en memoria durante la sesión.
    }
  }

  /* ---------- Estado y aplicación al DOM ---------- */

  var darkQuery = typeof root.matchMedia === 'function'
    ? root.matchMedia('(prefers-color-scheme: dark)')
    : null;
  var choice = readChoice();
  var applied = null;
  var picker = null;
  var announce = null;

  function currentTheme() {
    return resolveTheme({
      choice: choice,
      hour: new Date().getHours(),
      systemDark: !!(darkQuery && darkQuery.matches)
    });
  }

  function apply() {
    var theme = currentTheme();
    if (theme !== applied) {
      applied = theme;
      document.documentElement.setAttribute('data-theme', theme);
    }
    return theme;
  }

  function syncPicker() {
    if (picker && picker.value !== choice) {
      picker.value = choice;
    }
  }

  function announceChoice() {
    if (!announce) {
      return;
    }
    var theme = currentTheme();
    announce.textContent = choice === AUTO
      ? 'Tema automático: ' + THEME_LABELS[theme]
      : 'Tema ' + THEME_LABELS[theme] + ' activado';
  }

  function setChoice(next) {
    choice = normalizeChoice(next);
    writeChoice(choice);
    apply();
    syncPicker();
    announceChoice();
  }

  // Antes del primer pintado.
  apply();

  /* ---------- Reevaluación: programación, sistema, otras pestañas ---------- */

  root.setInterval(apply, POLL_MS);
  document.addEventListener('visibilitychange', function () {
    if (!document.hidden) {
      apply();
    }
  });
  if (darkQuery) {
    if (typeof darkQuery.addEventListener === 'function') {
      darkQuery.addEventListener('change', apply);
    } else if (typeof darkQuery.addListener === 'function') {
      darkQuery.addListener(apply);
    }
  }
  root.addEventListener('storage', function (event) {
    if (event.key === STORAGE_KEY || event.key === null) {
      choice = readChoice();
      apply();
      syncPicker();
    }
  });

  /* ---------- Selector (se enlaza cuando el DOM está listo) ---------- */

  function bindPicker() {
    picker = document.getElementById('theme');
    announce = document.getElementById('theme-announce');
    if (!picker) {
      return;
    }
    syncPicker();
    picker.addEventListener('change', function () { setChoice(picker.value); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindPicker);
  } else {
    bindPicker();
  }
}(typeof window !== 'undefined' ? window : globalThis));
