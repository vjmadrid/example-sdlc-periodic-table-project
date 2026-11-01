/*
 * Tabla periódica: lógica, render y entrada. Script clásico (sin módulos ES) para
 * funcionar por file://. Depende de PERIODIC_ELEMENTS (data/elements.js).
 */
(function (root) {
  'use strict';

  var CATEGORIES = [
    { id: 'alkali', label: 'Metales alcalinos' },
    { id: 'alkaline', label: 'Metales alcalinotérreos' },
    { id: 'transition', label: 'Metales de transición' },
    { id: 'post-transition', label: 'Otros metales' },
    { id: 'metalloid', label: 'Metaloides' },
    { id: 'nonmetal', label: 'No metales' },
    { id: 'halogen', label: 'Halógenos' },
    { id: 'noble', label: 'Gases nobles' },
    { id: 'lanthanide', label: 'Lantánidos' },
    { id: 'actinide', label: 'Actínidos' }
  ];

  var CATALOG_SIZE = 118;
  var MAIN_PERIODS = 7;
  var GROUPS = 18;
  // Filas de la rejilla: 1 cabecera + 7 períodos + 1 separador + 2 series
  var SEPARATOR_ROW = 9;
  var LANTHANIDE_ROW = 10;
  var ACTINIDE_ROW = 11;

  /* ---------- Lógica pura (sin DOM) ---------- */

  function normalizeText(text) {
    return String(text)
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '');
  }

  function matchElements(elements, query) {
    var q = normalizeText(query);
    if (q === '') {
      return [];
    }
    return elements.filter(function (el) {
      return normalizeText(el.name).indexOf(q) !== -1 ||
        normalizeText(el.symbol) === q ||
        String(el.atomicNumber) === q;
    });
  }

  // Devuelve la lista de problemas; vacía si el catálogo es válido.
  function validateCatalog(elements) {
    var problems = [];
    var validCategories = CATEGORIES.map(function (c) { return c.id; });
    if (!Array.isArray(elements) || elements.length !== CATALOG_SIZE) {
      problems.push('Se esperaban ' + CATALOG_SIZE + ' elementos.');
      if (!Array.isArray(elements)) {
        return problems;
      }
    }
    var numbers = {};
    var positions = {};
    elements.forEach(function (el) {
      var n = el.atomicNumber;
      if (!Number.isInteger(n) || n < 1 || n > CATALOG_SIZE) {
        problems.push('Número atómico inválido: ' + n);
      } else if (numbers[n]) {
        problems.push('Número atómico duplicado: ' + n);
      }
      numbers[n] = true;
      if (validCategories.indexOf(el.category) === -1) {
        problems.push('Categoría desconocida en ' + el.symbol + '.');
      }
      var inner = el.category === 'lanthanide' || el.category === 'actinide';
      if (!Number.isInteger(el.period) || el.period < 1 || el.period > MAIN_PERIODS) {
        problems.push('Período inválido en ' + el.symbol + '.');
      }
      if (inner) {
        if (el.group !== null) {
          problems.push('Grupo inválido en ' + el.symbol + '.');
        }
      } else if (!Number.isInteger(el.group) || el.group < 1 || el.group > GROUPS) {
        problems.push('Grupo inválido en ' + el.symbol + '.');
      } else {
        var key = el.period + ',' + el.group;
        if (positions[key]) {
          problems.push('Posición repetida: período ' + el.period + ', grupo ' + el.group + '.');
        }
        positions[key] = true;
      }
    });
    return problems;
  }

  root.PeriodicTableLogic = {
    normalizeText: normalizeText,
    matchElements: matchElements,
    validateCatalog: validateCatalog,
    CATEGORIES: CATEGORIES
  };

  if (typeof document === 'undefined') {
    return;
  }

  /* ---------- Render ---------- */

  var elements = root.PERIODIC_ELEMENTS;
  var categoryLabels = {};
  CATEGORIES.forEach(function (c) { categoryLabels[c.id] = c.label; });

  var dom = {
    grid: document.getElementById('table-grid'),
    legend: document.getElementById('legend'),
    search: document.getElementById('search'),
    clear: document.getElementById('clear'),
    status: document.getElementById('search-status'),
    announce: document.getElementById('selection-announce'),
    error: document.getElementById('catalog-error'),
    detail: {
      empty: document.getElementById('detail-empty'),
      body: document.getElementById('detail-body'),
      symbol: document.getElementById('detail-symbol'),
      number: document.getElementById('detail-number'),
      name: document.getElementById('detail-name'),
      mass: document.getElementById('detail-mass'),
      category: document.getElementById('detail-category'),
      period: document.getElementById('detail-period'),
      group: document.getElementById('detail-group'),
      config: document.getElementById('detail-config'),
      en: document.getElementById('detail-en')
    }
  };
  var tiles = {};

  function makeText(tag, className, text) {
    var node = document.createElement(tag);
    if (className) {
      node.className = className;
    }
    node.textContent = text;
    return node;
  }

  function place(node, column, row) {
    node.style.gridColumn = String(column);
    node.style.gridRow = String(row);
  }

  function buildTile(el, column, row) {
    var tile = document.createElement('button');
    tile.type = 'button';
    tile.className = 'element-tile cat-' + el.category;
    tile.setAttribute('aria-pressed', 'false');
    tile.setAttribute('aria-label',
      el.name + ', símbolo ' + el.symbol + ', número atómico ' + el.atomicNumber);
    tile.appendChild(makeText('span', 'tile-number', String(el.atomicNumber)));
    tile.appendChild(makeText('span', 'tile-symbol', el.symbol));
    place(tile, column, row);
    tile.addEventListener('click', function () { select(el.atomicNumber); });
    tiles[el.atomicNumber] = tile;
    return tile;
  }

  function buildTable() {
    var fragment = document.createDocumentFragment();
    var g;
    var p;
    var label;
    for (g = 1; g <= GROUPS; g += 1) {
      label = makeText('span', 'axis-label', String(g));
      label.setAttribute('aria-hidden', 'true');
      place(label, g + 1, 1);
      fragment.appendChild(label);
    }
    for (p = 1; p <= MAIN_PERIODS; p += 1) {
      label = makeText('span', 'axis-label', String(p));
      label.setAttribute('aria-hidden', 'true');
      place(label, 1, p + 1);
      fragment.appendChild(label);
    }
    label = makeText('span', 'series-label', 'Series internas');
    place(label, 2, SEPARATOR_ROW);
    label.style.gridColumn = '2 / span 8';
    fragment.appendChild(label);

    elements.forEach(function (el) {
      var column;
      var row;
      if (el.category === 'lanthanide') {
        column = el.atomicNumber - 57 + 4;
        row = LANTHANIDE_ROW;
      } else if (el.category === 'actinide') {
        column = el.atomicNumber - 89 + 4;
        row = ACTINIDE_ROW;
      } else {
        column = el.group + 1;
        row = el.period + 1;
      }
      fragment.appendChild(buildTile(el, column, row));
    });
    dom.grid.appendChild(fragment);
  }

  function buildLegend() {
    CATEGORIES.forEach(function (c) {
      var item = document.createElement('li');
      item.className = 'legend-item';
      var swatch = document.createElement('span');
      swatch.className = 'legend-swatch cat-' + c.id;
      swatch.setAttribute('aria-hidden', 'true');
      item.appendChild(swatch);
      item.appendChild(makeText('span', '', c.label));
      dom.legend.appendChild(item);
    });
  }

  /* ---------- Estado y vista derivada ---------- */

  var state = { query: '', selected: null };

  function elementByNumber(n) {
    return elements[n - 1];
  }

  function renderSearch() {
    var query = state.query;
    var matches = matchElements(elements, query);
    var active = normalizeText(query) !== '';
    var matched = {};
    matches.forEach(function (el) { matched[el.atomicNumber] = true; });

    elements.forEach(function (el) {
      var tile = tiles[el.atomicNumber];
      tile.classList.toggle('is-match', active && !!matched[el.atomicNumber]);
      tile.classList.toggle('is-dim', active && !matched[el.atomicNumber]);
    });

    if (!active) {
      dom.status.textContent = '';
    } else if (matches.length === 0) {
      dom.status.textContent = 'Sin resultados';
    } else if (matches.length === 1) {
      dom.status.textContent = '1 coincidencia';
    } else {
      dom.status.textContent = matches.length + ' coincidencias';
    }
  }

  function renderSelection() {
    var d = dom.detail;
    elements.forEach(function (el) {
      var on = el.atomicNumber === state.selected;
      var tile = tiles[el.atomicNumber];
      tile.classList.toggle('is-selected', on);
      tile.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    if (state.selected === null) {
      d.empty.hidden = false;
      d.body.hidden = true;
      dom.announce.textContent = '';
      return;
    }
    var el = elementByNumber(state.selected);
    d.empty.hidden = true;
    d.body.hidden = false;
    d.symbol.textContent = el.symbol;
    d.number.textContent = String(el.atomicNumber);
    d.name.textContent = el.name;
    d.mass.textContent = String(el.atomicMass);
    d.category.textContent = categoryLabels[el.category];
    d.period.textContent = String(el.period);
    d.group.textContent = el.group === null ? 'Series internas (sin grupo propio)' : String(el.group);
    d.config.textContent = el.electronConfiguration;
    d.en.textContent = el.electronegativity === null ? 'No definida' : String(el.electronegativity);
    dom.announce.textContent = 'Seleccionado: ' + el.name + ', ' + el.symbol +
      ', número atómico ' + el.atomicNumber + ', ' + categoryLabels[el.category];
  }

  function select(n) {
    state.selected = n;
    renderSelection();
  }

  function setQuery(text) {
    state.query = text;
    renderSearch();
  }

  function clearAll() {
    dom.search.value = '';
    state.selected = null;
    setQuery('');
    renderSelection();
    dom.search.focus();
  }

  function isTextTarget(target) {
    var tag = target && target.tagName;
    return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' ||
      (target && target.isContentEditable);
  }

  function bindEvents() {
    dom.search.addEventListener('input', function () { setQuery(dom.search.value); });
    dom.clear.addEventListener('click', clearAll);
    document.addEventListener('keydown', function (event) {
      if (event.key === '/' && !event.ctrlKey && !event.metaKey && !event.altKey &&
          !isTextTarget(event.target)) {
        event.preventDefault();
        dom.search.focus();
      }
    });
  }

  function init() {
    var problems = validateCatalog(elements);
    if (problems.length > 0) {
      dom.error.hidden = false;
      dom.error.textContent = 'No se pudo cargar el catálogo de elementos: ' + problems[0];
      if (root.console) {
        root.console.error(problems);
      }
      return;
    }
    buildLegend();
    buildTable();
    bindEvents();
    renderSearch();
    renderSelection();
  }

  init();
}(typeof window !== 'undefined' ? window : globalThis));
