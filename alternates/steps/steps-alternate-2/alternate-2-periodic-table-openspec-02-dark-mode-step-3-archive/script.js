(function () {
  'use strict';

  // ---------- Constantes ----------

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

  var TOTAL_ELEMENTS = 118;
  var FIRST_COLUMN_OF_SERIES = 3;
  // Filas de la rejilla: 1 cabecera, 2-8 períodos, 9 separador, 10 lantánidos, 11 separador, 12 actínidos
  var ROW_FIRST_PERIOD = 2;
  var ROW_SERIES_LABEL = 9;
  var ROW_LANTHANIDES = 10;
  var ROW_ACTINIDES = 12;

  // ---------- Datos y lógica (sin DOM) ----------

  function categoryLabel(id) {
    for (var i = 0; i < CATEGORIES.length; i++) {
      if (CATEGORIES[i].id === id) { return CATEGORIES[i].label; }
    }
    return id;
  }

  function isSeriesElement(element) {
    return element.category === 'lanthanide' || element.category === 'actinide';
  }

  // Devuelve la lista de problemas del catálogo (vacía si es válido).
  function validateCatalog(elements) {
    var problems = [];
    var seenNumbers = {};
    var seenPositions = {};
    var validCategories = {};
    CATEGORIES.forEach(function (c) { validCategories[c.id] = true; });

    if (!Array.isArray(elements) || elements.length !== TOTAL_ELEMENTS) {
      problems.push('Se esperaban ' + TOTAL_ELEMENTS + ' elementos.');
      if (!Array.isArray(elements)) { return problems; }
    }

    elements.forEach(function (el) {
      var n = el.atomicNumber;
      if (!Number.isInteger(n) || n < 1 || n > TOTAL_ELEMENTS) {
        problems.push('Número atómico inválido: ' + n + '.');
      } else if (seenNumbers[n]) {
        problems.push('Número atómico duplicado: ' + n + '.');
      }
      seenNumbers[n] = true;

      if (!validCategories[el.category]) {
        problems.push('Categoría inválida en el elemento ' + n + '.');
      }
      if (!Number.isInteger(el.period) || el.period < 1 || el.period > 7) {
        problems.push('Período inválido en el elemento ' + n + '.');
      }

      var seriesStart = el.category === 'lanthanide' ? 57 : el.category === 'actinide' ? 89 : null;
      if (isSeriesElement(el)) {
        if (el.group !== null || n < seriesStart || n > seriesStart + 14) {
          problems.push('Posición inválida en las series internas: elemento ' + n + '.');
        }
      } else {
        if (!Number.isInteger(el.group) || el.group < 1 || el.group > 18) {
          problems.push('Grupo inválido en el elemento ' + n + '.');
        } else {
          var key = el.period + '-' + el.group;
          if (seenPositions[key]) {
            problems.push('Posición repetida (período ' + el.period + ', grupo ' + el.group + ').');
          }
          seenPositions[key] = true;
        }
      }
    });

    return problems;
  }

  function normalize(text) {
    return String(text).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();
  }

  // query ya normalizada; una consulta vacía no coincide con nada (estado "sin búsqueda").
  function matchElement(element, query) {
    if (query === '') { return false; }
    var symbol = normalize(element.symbol);
    return normalize(element.name).indexOf(query) !== -1 ||
      symbol === query ||
      symbol.indexOf(query) === 0 ||
      String(element.atomicNumber) === query;
  }

  function formatElectronegativity(value) {
    return value === null ? 'No definida' : String(value).replace('.', ',');
  }

  function statusMessage(query, rawQuery, matchCount) {
    if (query === '') { return 'Mostrando los ' + TOTAL_ELEMENTS + ' elementos.'; }
    if (matchCount === 0) { return 'Sin resultados para «' + rawQuery.trim() + '».'; }
    return matchCount === 1 ? '1 coincidencia.' : matchCount + ' coincidencias.';
  }

  // ---------- Estado ----------

  var state = { rawQuery: '', selectedAtomicNumber: null };

  // ---------- Renderizado ----------

  var tableEl, legendEl, detailEl, statusEl, inputEl, clearButton;
  var tiles = {};
  var elementsByNumber = {};

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) { node.className = className; }
    if (text !== undefined) { node.textContent = text; }
    return node;
  }

  function place(node, row, column) {
    node.style.gridRow = String(row);
    node.style.gridColumn = String(column);
  }

  function buildTile(element) {
    var tile = el('button', 'element-tile');
    tile.type = 'button';
    tile.dataset.category = element.category;
    tile.dataset.atomicNumber = String(element.atomicNumber);
    tile.setAttribute('aria-pressed', 'false');
    tile.setAttribute('aria-label',
      element.name + ', símbolo ' + element.symbol + ', número atómico ' + element.atomicNumber +
      ', ' + categoryLabel(element.category));
    tile.appendChild(el('span', 'number', String(element.atomicNumber)));
    tile.appendChild(el('span', 'symbol', element.symbol));
    tile.appendChild(el('span', 'name', element.name));
    return tile;
  }

  function buildSeriesRef(text, category, row) {
    var ref = el('div', 'series-ref', text);
    ref.dataset.category = category;
    ref.setAttribute('role', 'img');
    ref.setAttribute('aria-label', (category === 'lanthanide' ? 'Lantánidos ' : 'Actínidos ') + text +
      ': se muestran en las series internas, debajo de la tabla');
    place(ref, row, FIRST_COLUMN_OF_SERIES);
    return ref;
  }

  function renderTable(elements) {
    var fragment = document.createDocumentFragment();

    for (var g = 1; g <= 18; g++) {
      var header = el('div', 'group-header', String(g));
      header.setAttribute('aria-hidden', 'true');
      place(header, 1, g);
      fragment.appendChild(header);
    }

    elements.forEach(function (element) {
      var tile = buildTile(element);
      if (isSeriesElement(element)) {
        var start = element.category === 'lanthanide' ? 57 : 89;
        place(tile,
          element.category === 'lanthanide' ? ROW_LANTHANIDES : ROW_ACTINIDES,
          FIRST_COLUMN_OF_SERIES + element.atomicNumber - start);
      } else {
        place(tile, ROW_FIRST_PERIOD + element.period - 1, element.group);
      }
      tiles[element.atomicNumber] = tile;
      fragment.appendChild(tile);
    });

    fragment.appendChild(buildSeriesRef('57–71', 'lanthanide', ROW_FIRST_PERIOD + 5));
    fragment.appendChild(buildSeriesRef('89–103', 'actinide', ROW_FIRST_PERIOD + 6));

    var label = el('div', 'series-label', 'Series internas');
    label.style.gridRow = String(ROW_SERIES_LABEL);
    fragment.appendChild(label);

    tableEl.appendChild(fragment);
  }

  function renderLegend() {
    var fragment = document.createDocumentFragment();
    CATEGORIES.forEach(function (c) {
      var item = el('li');
      var swatch = el('span', 'swatch');
      swatch.style.setProperty('--swatch', 'var(--cat-' + c.id + ')');
      swatch.setAttribute('aria-hidden', 'true');
      item.appendChild(swatch);
      item.appendChild(el('span', '', c.label));
      fragment.appendChild(item);
    });
    legendEl.appendChild(fragment);
  }

  function renderDetail() {
    detailEl.textContent = '';
    var element = elementsByNumber[state.selectedAtomicNumber];

    if (!element) {
      detailEl.appendChild(el('p', 'detail-empty', 'Selecciona un elemento de la tabla para ver sus datos.'));
      return;
    }

    var head = el('div', 'detail-head');
    var symbol = el('div', 'detail-symbol', element.symbol);
    symbol.dataset.category = element.category;
    symbol.style.setProperty('--detail-color', 'var(--cat-' + element.category + ')');
    head.appendChild(symbol);
    head.appendChild(el('p', 'detail-name', element.name));
    detailEl.appendChild(head);

    var rows = [
      ['Número atómico', String(element.atomicNumber)],
      ['Masa atómica', element.atomicMass],
      ['Categoría', categoryLabel(element.category)],
      ['Período', String(element.period)],
      ['Grupo', element.group === null ? 'No aplica (series internas)' : String(element.group)],
      ['Configuración electrónica', element.electronConfiguration],
      ['Electronegatividad', formatElectronegativity(element.electronegativity)]
    ];
    var list = el('dl', 'detail-list');
    rows.forEach(function (row) {
      list.appendChild(el('dt', '', row[0]));
      list.appendChild(el('dd', '', row[1]));
    });
    detailEl.appendChild(list);
  }

  function render(elements) {
    var query = normalize(state.rawQuery);
    var matchCount = 0;

    elements.forEach(function (element) {
      var tile = tiles[element.atomicNumber];
      var isMatch = matchElement(element, query);
      if (isMatch) { matchCount++; }
      var isSelected = element.atomicNumber === state.selectedAtomicNumber;
      tile.classList.toggle('is-match', isMatch);
      tile.classList.toggle('is-dimmed', query !== '' && !isMatch);
      tile.classList.toggle('is-selected', isSelected);
      tile.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
    });

    statusEl.textContent = statusMessage(query, state.rawQuery, matchCount);
  }

  // ---------- Tema ----------

  function setTheme(dark) {
    var root = document.documentElement;
    if (dark) { root.setAttribute('data-theme', 'dark'); } else { root.removeAttribute('data-theme'); }
    var toggle = document.getElementById('theme-toggle');
    toggle.setAttribute('aria-pressed', dark ? 'true' : 'false');
    document.getElementById('theme-toggle-icon').textContent = dark ? '☀' : '☾';
  }

  function initThemeToggle() {
    var toggle = document.getElementById('theme-toggle');
    setTheme(false);
    toggle.addEventListener('click', function () {
      setTheme(toggle.getAttribute('aria-pressed') !== 'true');
    });
  }

  // ---------- Entrada ----------

  function showCatalogError(problems) {
    console.error('Catálogo inválido:', problems);
    var message = el('p', 'notice', 'No se pudo mostrar la tabla: el catálogo de elementos no es válido.');
    message.setAttribute('role', 'alert');
    tableEl.textContent = '';
    tableEl.appendChild(message);
    statusEl.textContent = '';
    inputEl.disabled = true;
    clearButton.disabled = true;
  }

  function init() {
    tableEl = document.getElementById('periodic-table');
    legendEl = document.getElementById('legend');
    detailEl = document.getElementById('detail');
    statusEl = document.getElementById('search-status');
    inputEl = document.getElementById('search-input');
    clearButton = document.getElementById('clear-button');

    initThemeToggle();
    renderLegend();

    var elements = typeof PERIODIC_ELEMENTS === 'undefined' ? null : PERIODIC_ELEMENTS;
    var problems = elements ? validateCatalog(elements) : ['No se encontró el catálogo.'];
    if (problems.length > 0) {
      showCatalogError(problems);
      return;
    }

    elements.forEach(function (element) { elementsByNumber[element.atomicNumber] = element; });
    renderTable(elements);
    renderDetail();
    render(elements);

    inputEl.addEventListener('input', function () {
      state.rawQuery = inputEl.value;
      render(elements);
    });

    document.getElementById('search-form').addEventListener('submit', function (event) {
      event.preventDefault();
    });

    clearButton.addEventListener('click', function () {
      state.rawQuery = '';
      state.selectedAtomicNumber = null;
      inputEl.value = '';
      render(elements);
      renderDetail();
    });

    tableEl.addEventListener('click', function (event) {
      var tile = event.target.closest('.element-tile');
      if (!tile) { return; }
      state.selectedAtomicNumber = Number(tile.dataset.atomicNumber);
      render(elements);
      renderDetail();
    });

    document.addEventListener('keydown', function (event) {
      if (event.key !== '/' || event.ctrlKey || event.metaKey || event.altKey) { return; }
      var target = event.target;
      var tag = target && target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || (target && target.isContentEditable)) { return; }
      event.preventDefault();
      inputEl.focus();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
