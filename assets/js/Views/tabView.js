import { cardQueries } from "../config";

class TabView {
  #parentElement = document.querySelector(".tab");
  #tabBtns = this.#parentElement.querySelectorAll("[data-tab-btn]");
  #tabPanels = this.#parentElement.querySelectorAll("[data-tab-panel]");
  #lastActiveTabBtn;
  #lastActiveTabPanel;
  #data;
  #savedRecipes;
  constructor() {
    this.lastActiveTabPanel = this.#tabPanels[0];
    this.lastActiveTabBtn = this.#tabBtns[0];

    console.log(this.#lastActiveTabPanel);
  }

  render(data, savedResipes) {
    this.data = data;
    this.#savedRecipes = savedResipes;
    const markup = this.#generateMurkup();

    this.lastActiveTabPanel.insertAdjacentElement("afterbegin", markup);
    this.lastActiveTabPanel.innerHTML += `
    <a href="/recipes.html?mealType=${this.#lastActiveTabBtn.textContent
      .trim()
      .toLowerCase()}" class="title-small text-center pd-block-12 radius-4" data-show-more-link="">
      Show more
    </a>
    `;
  }

  renderSkeleton() {
    const /** {NodeElement} */ $gridList = document.createElement("div");
    $gridList.classList.add("grid-list", "grid");
    $gridList.innerHTML = `${this.#generateSkeletonMarkup().repeat(20)}`;
    this.lastActiveTabPanel.innerHTML = "";

    this.lastActiveTabPanel.insertAdjacentElement("afterbegin", $gridList);
  }

  #generateMurkup() {
    const /** {NodeElement} */ $gridList = document.createElement("div");
    $gridList.classList.add("grid-list", "grid");

    // clear lastActivePanel
    this.lastActiveTabPanel.innerHTML = "";
    const cards = this.data
      .map((recipe, i) => {
        return this.#generateCard(recipe, i);
      })
      .join("");

    $gridList.insertAdjacentHTML("afterbegin", cards);
    return $gridList;
  }

  #generateCard(recipe, i) {
    const { time, unit } = recipe.cookingTime;
    return `
      <div class="card flex flex-column" style="--animation-delay:${
        100 * i
      }ms;--gap:0" data-id="${i}">
                  <figure class="card-media image-holder overflow-h">
                    <img src="${
                      recipe.image
                    }" width="200" height="200" loading="lazy" alt="Recipe name" class="image-cover">
                  </figure>

        <div class="card-body flex-1 pd-inline-8 pd-block-8 flex flex-column flex-between" style="--gap: .5rem">
          <h3 class="card-title title-small">
            <a href="/detail.html?recipe=${
              recipe.recipeId
            }" class="clamp-text">${recipe.title}</a>
          </h3>

          <div class="card-info flex flex-between flex-center-y">
            <div class="card-time flex flex-center">
              <span class="material-symbols-outlined" style="font-size: 1.8rem" aria-hidden="true">schedule</span>
              <span class="label-small">${time ? time : "<1"} ${unit}</span>
            </div>

            <button class="icon-btn flex flex-column flex-center ${
              this.#savedRecipes.has(recipe.recipeId) ? "saved" : "removed"
            } has-state"
            data-tab-recipe-save-btn>
              <span class="material-symbols-outlined bookmark-add" aria-hidden="true">bookmark_add</span>
              <span class="material-symbols-outlined bookmark" aria-hidden="true">bookmark</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  #generateSkeletonMarkup() {
    return `
    <div class="skeleton-card flex flex-column">
      <div class="card-banner skeleton radius-8"></div>
      <div class="card-body flex flex-column">
        <div class="card-title skeleton"></div>
        <div class="card-text skeleton"></div>
      </div>
    </div>
    `;
  }

  #updateTabBtnAndPanelUI($currentPanel, $currentTabBtn) {
    this.lastActiveTabBtn.setAttribute("aria-selected", false);
    this.lastActiveTabBtn.setAttribute("tabindex", -1);
    $currentTabBtn.setAttribute("aria-selected", true);
    $currentTabBtn.setAttribute("tabindex", 0);

    this.lastActiveTabPanel.setAttribute("hidden", "");
    $currentPanel.removeAttribute("hidden");

    this.lastActiveTabBtn = $currentTabBtn;
    this.lastActiveTabPanel = $currentPanel;
  }

  addHandlerTab() {
    this.#parentElement.addEventListener("click", (e) => {
      const $currentTabBtn = e.target.closest("[data-tab-btn]");
      if (!$currentTabBtn) return;
      // get curentPanel
      const $currentPanel = this.#parentElement.querySelector(
        `#${$currentTabBtn.getAttribute("aria-controls")}`
      );

      this.#updateTabBtnAndPanelUI($currentPanel, $currentTabBtn);
    });
  }

  addHandlerTabKey() {
    document.addEventListener("keydown", (e) => {
      let currentActiveTabBtnIndex = +this.lastActiveTabBtn.dataset.id - 1;

      if (e.key === "ArrowRight" && e.target.closest("[data-tab-btn]")) {
        currentActiveTabBtnIndex =
          (currentActiveTabBtnIndex + 1) % this.#tabBtns.length;
      }

      if (e.key === "ArrowLeft" && e.target.closest("[data-tab-btn]")) {
        currentActiveTabBtnIndex--;
        if (currentActiveTabBtnIndex < 0)
          currentActiveTabBtnIndex = this.#tabBtns.length - 1;
      }

      const $currentTabBtn = this.#tabBtns[currentActiveTabBtnIndex];
      const $currentTabPanel = this.#tabPanels[currentActiveTabBtnIndex];

      this.#updateTabBtnAndPanelUI($currentTabPanel, $currentTabBtn);
      this.#tabBtns[currentActiveTabBtnIndex].focus();
    });
  }

  #generateQuery() {
    const typeOfMiel = this.#lastActiveTabBtn.textContent.trim().toLowerCase();
    const queries = [["mealType", typeOfMiel], ...cardQueries];
    return queries;
  }

  addHandlerLoadRecipes(handler) {
    window.addEventListener("load", () => {
      const queries = this.#generateQuery();
      handler(queries);
    });
  }

  addHandlerTabContent(handler) {
    this.#parentElement.addEventListener("click", (e) => {
      const $btnTab = e.target.closest("[data-tab-btn]");
      if (!$btnTab) return;
      const queries = this.#generateQuery();
      handler(queries);
    });
  }

  addHandlerDetailRecipe() {
    this.#parentElement.addEventListener("click", (e) => {
      const $recipe = e.target.closest("figure");

      if (!$recipe) return;
      console.log($recipe);

      const recipeIndex = +$recipe.closest(".card").dataset.id;

      window.location.href += `detail.html?recipe=${this.data[recipeIndex].recipeId}`;
    });
  }

  addHandlerSaveRecipe(handler) {
    this.#parentElement.addEventListener("click", (e) => {
      e.preventDefault();
      const $btnIconSave = e.target.closest("[data-tab-recipe-save-btn]");
      if (!$btnIconSave) return;

      const recipeId = +$btnIconSave.closest(".card").dataset.id;
      // console.log(this.data[recipeId]);
      handler(this.data[recipeId].recipeId);
      $btnIconSave.classList.toggle("saved");
      $btnIconSave.classList.toggle("removed");
    });
  }

  // setters getter
  get lastActiveTabBtn() {
    return this.#lastActiveTabBtn;
  }
  get lastActiveTabPanel() {
    return this.#lastActiveTabPanel;
  }

  set lastActiveTabBtn(lastActiveTabBtn) {
    this.#lastActiveTabBtn = lastActiveTabBtn;
  }
  set lastActiveTabPanel(lastActiveTabPanel) {
    this.#lastActiveTabPanel = lastActiveTabPanel;
  }

  get data() {
    return this.#data;
  }
  set data(data) {
    this.#data = data;
  }
}

export default new TabView();
