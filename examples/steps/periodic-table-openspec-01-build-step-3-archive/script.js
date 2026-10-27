(() => {
  "use strict";

  const elements = window.PERIODIC_ELEMENTS || [];
  const categoryLabels = {
    alkali: "Metales alcalinos",
    alkaline: "Metales alcalinotérreos",
    transition: "Metales de transición",
    "post-transition": "Otros metales",
    metalloid: "Metaloides",
    nonmetal: "No metales",
    halogen: "Halógenos",
    noble: "Gases nobles",
    lanthanide: "Lantánidos",
    actinide: "Actínidos"
  };
  const categoryOrder = ["alkali", "alkaline", "transition", "post-transition", "metalloid", "nonmetal", "halogen", "noble", "lanthanide", "actinide"];
  const mainGrid = document.querySelector("#main-grid");
  const groupLabels = document.querySelector(".group-labels");
  const lanthanideGrid = document.querySelector("#lanthanide-grid");
  const actinideGrid = document.querySelector("#actinide-grid");
  const legend = document.querySelector("#category-legend");
  const searchInput = document.querySelector("#element-search");
  const clearSearchButton = document.querySelector("#clear-search");
  const searchStatus = document.querySelector("#search-status");
  const detailContent = document.querySelector("#detail-content");
  const clearSelectionButton = document.querySelector("#clear-selection");
  const showcase = document.querySelector("#primitive-showcase");

  let selectedAtomicNumber = null;

  function normalize(value) {
    return String(value)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  }

  function validateCatalog() {
    const numbers = elements.map((element) => element.atomicNumber);
    const uniqueNumbers = new Set(numbers);
    const mainElements = elements.filter((element) => element.block !== "f");
    const invalidMainPositions = mainElements.some((element) => element.period < 1 || element.period > 7 || element.group < 1 || element.group > 18);
    const lanthanides = elements.filter((element) => element.category === "lanthanide");
    const actinides = elements.filter((element) => element.category === "actinide");

    if (elements.length !== 118 || uniqueNumbers.size !== 118 || numbers.some((number, index) => number !== index + 1) || invalidMainPositions || lanthanides.length !== 15 || actinides.length !== 15) {
      searchStatus.textContent = "No se pudo validar el catálogo local de elementos.";
      searchStatus.classList.add("is-error");
      throw new Error("El catálogo de la tabla periódica no cumple la estructura esperada.");
    }
  }

  function createTile(element) {
    const tile = document.createElement("button");
    tile.type = "button";
    tile.className = `element-tile category-${element.category}`;
    tile.dataset.atomicNumber = String(element.atomicNumber);
    tile.setAttribute("aria-pressed", "false");
    tile.setAttribute("aria-label", `${element.name}, símbolo ${element.symbol}, número atómico ${element.atomicNumber}`);

    const atomicNumber = document.createElement("span");
    atomicNumber.className = "atomic-number";
    atomicNumber.textContent = String(element.atomicNumber);
    const symbol = document.createElement("strong");
    symbol.textContent = element.symbol;
    const name = document.createElement("span");
    name.textContent = element.name;
    tile.append(atomicNumber, symbol, name);
    tile.addEventListener("click", () => selectElement(element));
    return tile;
  }

  function renderGroupLabels() {
    for (let group = 1; group <= 18; group += 1) {
      const label = document.createElement("span");
      label.className = "group-label";
      label.textContent = String(group);
      groupLabels.append(label);
    }
  }

  function renderMainGrid() {
    elements.filter((element) => element.block !== "f").forEach((element) => {
      const tile = createTile(element);
      tile.style.gridColumn = String(element.group);
      tile.style.gridRow = String(element.period);
      mainGrid.append(tile);
    });

    [
      { period: 6, label: "57–71", name: "Lantánidos" },
      { period: 7, label: "89–103", name: "Actínidos" }
    ].forEach((series) => {
      const placeholder = document.createElement("div");
      placeholder.className = "element-placeholder";
      placeholder.style.gridColumn = "3";
      placeholder.style.gridRow = String(series.period);
      placeholder.setAttribute("aria-label", `${series.name}, elementos ${series.label}, mostrados en la serie inferior`);
      const range = document.createElement("strong");
      range.textContent = series.label;
      const name = document.createElement("span");
      name.textContent = series.name;
      placeholder.append(range, name);
      mainGrid.append(placeholder);
    });
  }

  function renderSeriesGrid(container, category, rangeLabel) {
    const label = document.createElement("div");
    label.className = "series-label";
    const categoryName = document.createElement("span");
    categoryName.textContent = categoryLabels[category];
    const range = document.createElement("span");
    range.textContent = rangeLabel;
    label.append(categoryName, range);
    container.append(label);
    elements.filter((element) => element.category === category).forEach((element, index) => {
      const tile = createTile(element);
      tile.style.gridColumn = String(index + 2);
      container.append(tile);
    });
  }

  function renderLegend() {
    categoryOrder.forEach((category) => {
      const item = document.createElement("span");
      item.className = "legend-item";
      const swatch = document.createElement("span");
      swatch.className = `legend-swatch category-${category}`;
      swatch.setAttribute("aria-hidden", "true");
      const text = document.createElement("span");
      text.textContent = categoryLabels[category];
      item.append(swatch, text);
      legend.append(item);
    });
  }

  function setSearchStatus(message, isError = false) {
    searchStatus.textContent = message;
    searchStatus.classList.toggle("is-error", isError);
  }

  function updateSearch() {
    const query = normalize(searchInput.value);
    const tiles = document.querySelectorAll(".element-tile[data-atomic-number]");
    let matchCount = 0;

    tiles.forEach((tile) => {
      const element = elements.find((item) => item.atomicNumber === Number(tile.dataset.atomicNumber));
      const searchable = [element.name, element.symbol, element.atomicNumber].map(normalize).join(" ");
      const isMatch = !query || searchable.includes(query);
      tile.classList.toggle("is-dimmed", !isMatch);
      tile.classList.toggle("is-match", Boolean(query && isMatch));
      tile.dataset.searchMatch = String(isMatch);
      if (isMatch) matchCount += 1;
    });

    clearSearchButton.hidden = !query;
    if (!query) {
      setSearchStatus("Mostrando los 118 elementos.");
    } else if (matchCount === 0) {
      setSearchStatus(`No hay resultados para “${searchInput.value}”.`, true);
    } else {
      setSearchStatus(`${matchCount} ${matchCount === 1 ? "elemento encontrado" : "elementos encontrados"}.`);
    }
  }

  function fact(label, value) {
    const item = document.createElement("div");
    item.className = "detail-fact";
    const term = document.createElement("dt");
    term.textContent = label;
    const description = document.createElement("dd");
    description.textContent = value || "No disponible";
    item.append(term, description);
    return item;
  }

  function renderEmptyDetails() {
    detailContent.replaceChildren();
    const empty = document.createElement("div");
    empty.className = "detail-empty";
    const orbit = document.createElement("div");
    orbit.className = "empty-orbit";
    orbit.setAttribute("aria-hidden", "true");
    orbit.append(document.createElement("span"), document.createElement("span"), document.createElement("span"));
    const title = document.createElement("h2");
    title.id = "detail-title";
    title.textContent = "Selecciona un elemento";
    const description = document.createElement("p");
    description.textContent = "Haz clic en cualquier celda para ver su configuración, categoría y propiedades principales.";
    const hint = document.createElement("span");
    hint.className = "detail-hint";
    hint.textContent = "También puedes recorrer las celdas con Tab.";
    empty.append(orbit, title, description, hint);
    detailContent.append(empty);
  }

  function renderDetails(element) {
    detailContent.replaceChildren();
    const content = document.createElement("div");
    content.className = "detail-populated";
    const hero = document.createElement("div");
    hero.className = `detail-hero category-${element.category}`;
    const atomicNumber = document.createElement("p");
    atomicNumber.className = "detail-atomic-number";
    atomicNumber.textContent = `Número atómico ${element.atomicNumber}`;
    const symbol = document.createElement("p");
    symbol.className = "detail-symbol";
    symbol.textContent = element.symbol;
    const name = document.createElement("h2");
    name.id = "detail-title";
    name.className = "detail-name";
    name.textContent = element.name;
    const category = document.createElement("span");
    category.className = "category-badge";
    category.textContent = categoryLabels[element.category];
    hero.append(atomicNumber, symbol, name, category);

    const facts = document.createElement("dl");
    facts.className = "detail-facts";
    facts.append(
      fact("Masa atómica", `${element.atomicMass} u`),
      fact("Grupo", element.group ? String(element.group) : "Serie interna"),
      fact("Período", String(element.period)),
      fact("Bloque", element.block),
      fact("Estado", element.state),
      fact("Configuración electrónica", element.electronConfiguration),
      fact("Electronegatividad", element.electronegativity ? `${element.electronegativity} (Pauling)` : null)
    );
    content.append(hero, facts);
    detailContent.append(content);
  }

  function selectElement(element) {
    selectedAtomicNumber = element.atomicNumber;
    document.querySelectorAll(".element-tile[data-atomic-number]").forEach((tile) => {
      tile.setAttribute("aria-pressed", String(Number(tile.dataset.atomicNumber) === selectedAtomicNumber));
    });
    clearSelectionButton.hidden = false;
    renderDetails(element);
  }

  function clearSelection() {
    selectedAtomicNumber = null;
    document.querySelectorAll(".element-tile[data-atomic-number]").forEach((tile) => tile.setAttribute("aria-pressed", "false"));
    clearSelectionButton.hidden = true;
    renderEmptyDetails();
  }

  function enableKeyboardShortcut() {
    document.addEventListener("keydown", (event) => {
      const target = event.target;
      const isTyping = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLButtonElement;
      if (event.key === "/" && !isTyping && !event.metaKey && !event.ctrlKey && !event.altKey) {
        event.preventDefault();
        searchInput.focus();
      }
    });
  }

  function enableShowcase() {
    if (new URLSearchParams(window.location.search).get("showcase") === "1") showcase.hidden = false;
  }

  validateCatalog();
  renderGroupLabels();
  renderMainGrid();
  renderSeriesGrid(lanthanideGrid, "lanthanide", "57–71");
  renderSeriesGrid(actinideGrid, "actinide", "89–103");
  renderLegend();
  renderEmptyDetails();
  searchInput.addEventListener("input", updateSearch);
  clearSearchButton.addEventListener("click", () => {
    searchInput.value = "";
    updateSearch();
    searchInput.focus();
  });
  clearSelectionButton.addEventListener("click", clearSelection);
  enableKeyboardShortcut();
  enableShowcase();
})();
