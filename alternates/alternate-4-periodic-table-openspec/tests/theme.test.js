/* Pruebas de theme.js sin dependencias: node tests/theme.test.js */
'use strict';

var assert = require('node:assert');
var fs = require('node:fs');
var path = require('node:path');
var vm = require('node:vm');

var source = fs.readFileSync(path.join(__dirname, '..', 'theme.js'), 'utf8');

/* ---------- Lógica pura ---------- */

require('../theme.js');
var theme = globalThis.PeriodicTableTheme;
var resolveTheme = theme.resolveTheme;

function resolve(choice, hour, systemDark) {
  return resolveTheme({ choice: choice, hour: hour, systemDark: systemDark });
}

// La elección manual gana a la programación
assert.strictEqual(resolve('light', 23, false), 'light');
assert.strictEqual(resolve('dark', 3, false), 'dark');
assert.strictEqual(resolve('nocturnal', 12, false), 'nocturnal');

// Programación con auto: 22:00 → 06:00
assert.strictEqual(resolve('auto', 22, false), 'nocturnal');
assert.strictEqual(resolve('auto', 23, true), 'nocturnal');
assert.strictEqual(resolve('auto', 0, false), 'nocturnal');
assert.strictEqual(resolve('auto', 5, false), 'nocturnal');
assert.strictEqual(resolve('auto', 6, false), 'light');
assert.strictEqual(resolve('auto', 21, false), 'light');

// Sistema fuera de la ventana
assert.strictEqual(resolve('auto', 12, true), 'dark');
assert.strictEqual(resolve('auto', 12, false), 'light');

// Valores inválidos o ausentes equivalen a auto
assert.strictEqual(theme.normalizeChoice('rojo'), 'auto');
assert.strictEqual(theme.normalizeChoice(null), 'auto');
assert.strictEqual(theme.normalizeChoice(undefined), 'auto');
assert.strictEqual(resolve('<script>', 12, true), 'dark');
assert.strictEqual(resolve(null, 23, false), 'nocturnal');

/* ---------- Enlace al DOM con entorno simulado ---------- */

function loadWithDom(options) {
  var attrs = {};
  var listeners = {};
  var store = options.store;
  var picker = { value: 'auto', listeners: {}, addEventListener: function (n, f) { this.listeners[n] = f; } };
  var announce = { textContent: '' };
  var win = {
    localStorage: options.throwStorage ? {
      getItem: function () { throw new Error('bloqueado'); },
      setItem: function () { throw new Error('bloqueado'); },
      removeItem: function () { throw new Error('bloqueado'); }
    } : {
      getItem: function (k) { return Object.prototype.hasOwnProperty.call(store, k) ? store[k] : null; },
      setItem: function (k, v) { store[k] = String(v); },
      removeItem: function (k) { delete store[k]; }
    },
    matchMedia: function () {
      return { matches: !!options.systemDark, addEventListener: function () {} };
    },
    setInterval: function () {},
    addEventListener: function (n, f) { listeners[n] = f; }
  };
  var doc = {
    readyState: 'complete',
    hidden: false,
    documentElement: { setAttribute: function (k, v) { attrs[k] = v; } },
    getElementById: function (id) { return id === 'theme' ? picker : (id === 'theme-announce' ? announce : null); },
    addEventListener: function () {}
  };
  var RealDate = Date;
  var fakeDate = function () { return new RealDate(2026, 0, 1, options.hour, 0, 0); };
  vm.runInNewContext(source, { window: win, document: doc, Date: fakeDate });
  return { attrs: attrs, picker: picker, announce: announce, store: store, win: win, listeners: listeners };
}

// Almacenamiento bloqueado: usa el tema por defecto y el selector sigue funcionando
var blocked = loadWithDom({ throwStorage: true, hour: 12, systemDark: true });
assert.strictEqual(blocked.attrs['data-theme'], 'dark');
blocked.picker.value = 'light';
blocked.picker.listeners.change();
assert.strictEqual(blocked.attrs['data-theme'], 'light');
assert.strictEqual(blocked.announce.textContent, 'Tema Claro activado');

// Valor corrupto: se ignora
var corrupt = loadWithDom({ store: { 'periodic-table-theme': 'rojo' }, hour: 12, systemDark: false });
assert.strictEqual(corrupt.attrs['data-theme'], 'light');

// Elección guardada gana a la ventana nocturna y se refleja en el selector
var saved = loadWithDom({ store: { 'periodic-table-theme': 'light' }, hour: 23, systemDark: true });
assert.strictEqual(saved.attrs['data-theme'], 'light');
assert.strictEqual(saved.picker.value, 'light');

// Elegir se guarda; Automático borra la clave
var chooser = loadWithDom({ store: {}, hour: 12, systemDark: false });
chooser.picker.value = 'nocturnal';
chooser.picker.listeners.change();
assert.strictEqual(chooser.store['periodic-table-theme'], 'nocturnal');
assert.strictEqual(chooser.attrs['data-theme'], 'nocturnal');
chooser.picker.value = 'auto';
chooser.picker.listeners.change();
assert.strictEqual('periodic-table-theme' in chooser.store, false);
assert.strictEqual(chooser.attrs['data-theme'], 'light');

// Otra pestaña cambia la elección: evento storage
var tabs = loadWithDom({ store: {}, hour: 12, systemDark: false });
tabs.store['periodic-table-theme'] = 'dark';
tabs.listeners.storage({ key: 'periodic-table-theme' });
assert.strictEqual(tabs.attrs['data-theme'], 'dark');
assert.strictEqual(tabs.picker.value, 'dark');

console.log('theme.test.js: todo en verde');
