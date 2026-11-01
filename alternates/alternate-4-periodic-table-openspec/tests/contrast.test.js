/* Contraste WCAG 2.2 AA de los tokens de styles.css: node tests/contrast.test.js */
'use strict';

var fs = require('node:fs');
var path = require('node:path');

var css = fs.readFileSync(path.join(__dirname, '..', 'styles.css'), 'utf8');
var CATS = ['alkali', 'alkaline', 'transition', 'post-transition', 'metalloid',
  'nonmetal', 'halogen', 'noble', 'lanthanide', 'actinide'];
var MIN_DELTA_E = 8; // distancia mínima CIE76 entre categorías de un mismo tema

function block(selector) {
  var start = css.indexOf(selector + ' {');
  if (start === -1) {
    throw new Error('No se encontró ' + selector);
  }
  return css.slice(start, css.indexOf('}', start));
}

function tokens(selector) {
  var out = {};
  var re = /(--[a-z-]+):\s*(#[0-9a-fA-F]{6}|[0-9.]+)\s*;/g;
  var m;
  var text = block(selector);
  while ((m = re.exec(text)) !== null) {
    out[m[1]] = m[2].toLowerCase();
  }
  return out;
}

var base = tokens(':root');
var themes = {
  light: base,
  dark: Object.assign({}, base, tokens(':root[data-theme="dark"]')),
  nocturnal: Object.assign({}, base, tokens(':root[data-theme="nocturnal"]'))
};

function rgb(hex) {
  return [1, 3, 5].map(function (i) { return parseInt(hex.slice(i, i + 2), 16); });
}

function linear(c) {
  var s = c / 255;
  return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}

function luminance(c) {
  return 0.2126 * linear(c[0]) + 0.7152 * linear(c[1]) + 0.0722 * linear(c[2]);
}

function ratio(a, b) {
  var la = luminance(a);
  var lb = luminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

function blend(fg, bg, alpha) {
  return fg.map(function (c, i) { return c * alpha + bg[i] * (1 - alpha); });
}

function lab(c) {
  var r = linear(c[0]);
  var g = linear(c[1]);
  var b = linear(c[2]);
  var x = (0.4124 * r + 0.3576 * g + 0.1805 * b) / 0.95047;
  var y = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  var z = (0.0193 * r + 0.1192 * g + 0.9505 * b) / 1.08883;
  function f(t) { return t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116; }
  return [116 * f(y) - 16, 500 * (f(x) - f(y)), 200 * (f(y) - f(z))];
}

function deltaE(a, b) {
  var la = lab(a);
  var lb = lab(b);
  return Math.sqrt(Math.pow(la[0] - lb[0], 2) + Math.pow(la[1] - lb[1], 2) + Math.pow(la[2] - lb[2], 2));
}

var failures = [];

function need(theme, label, fg, bg, min) {
  var r = ratio(fg, bg);
  if (r < min) {
    failures.push(theme + ': ' + label + ' ' + r.toFixed(2) + ':1 (mínimo ' + min + ':1)');
  }
}

Object.keys(themes).forEach(function (name) {
  var t = themes[name];
  var c = function (k) { return rgb(t[k]); };

  [['--bg', 'fondo'], ['--surface', 'superficie']].forEach(function (pair) {
    need(name, '--text sobre ' + pair[1], c('--text'), c(pair[0]), 4.5);
    need(name, '--text-muted sobre ' + pair[1], c('--text-muted'), c(pair[0]), 4.5);
    need(name, '--focus sobre ' + pair[1], c('--focus'), c(pair[0]), 3);
    need(name, '--accent sobre ' + pair[1], c('--accent'), c(pair[0]), 3);
  });
  need(name, '--error-text sobre superficie', c('--error-text'), c('--surface'), 4.5);
  need(name, '--error sobre superficie', c('--error'), c('--surface'), 3);

  CATS.forEach(function (cat) {
    var fill = c('--cat-' + cat);
    need(name, '--text sobre cat-' + cat, c('--text'), fill, 4.5);
    need(name, '--accent (contorno) sobre cat-' + cat, c('--accent'), fill, 3);
    // Estado atenuado: la celda entera se mezcla con el fondo
    var bg = c('--bg');
    var DIM = parseFloat(t['--dim-opacity']);
    need(name, 'texto atenuado sobre cat-' + cat,
      blend(c('--text'), bg, DIM), blend(fill, bg, DIM), 4.5);
  });

  for (var i = 0; i < CATS.length; i += 1) {
    for (var j = i + 1; j < CATS.length; j += 1) {
      var d = deltaE(c('--cat-' + CATS[i]), c('--cat-' + CATS[j]));
      if (d < MIN_DELTA_E) {
        failures.push(name + ': ' + CATS[i] + ' y ' + CATS[j] + ' casi iguales (ΔE ' + d.toFixed(1) + ')');
      }
    }
  }
});

if (failures.length > 0) {
  console.error(failures.join('\n'));
  process.exit(1);
}
console.log('contrast.test.js: todo en verde (' + Object.keys(themes).length + ' temas)');
