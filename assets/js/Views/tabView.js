import { cardQueries } from "../config";
import { View } from "./View";
class TabView extends View {
  #parentElement = document.querySelector(".tab");
  #tabBtns = this.#parentElement.querySelectorAll("[data-tab-btn]");
  #tabPanels = this.#parentElement.querySelectorAll("[data-tab-panel]");
  #lastActiveTabBtn;
  #lastActiveTabPanel;
  #data;
  #savedRecipes;

  constructor() {
    super();
    this.lastActiveTabPanel = this.#tabPanels[0];
    this.lastActiveTabBtn = this.#tabBtns[0];
  }

  render(data, savedResipes) {
    this.data = data;
    this.savedRecipes = savedResipes;
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

    this.clear(this.#lastActiveTabPanel);

    this.lastActiveTabPanel.insertAdjacentElement("afterbegin", $gridList);

    super.renderSkeleton(this.#lastActiveTabPanel.querySelector(".grid-list"));
  }

  #generateMurkup() {
    const /** {NodeElement} */ $gridList = document.createElement("div");
    $gridList.classList.add("grid-list", "grid");

    // clear lastActivePanel
    this.lastActiveTabPanel.innerHTML = "";
    const cards = this.data
      .map((recipe, i) => {
        return this.generateCard(recipe, i);
      })
      .join("");

    $gridList.insertAdjacentHTML("afterbegin", cards);
    return $gridList;
  }

  #updateTabBtnAndPanelUI($currentPanel, $currentTabBtn) {
    // update Tab Buttons :
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

  // addHandlerSaveRecipe(handler) {
  //   this.#parentElement.addEventListener("click", (e) => {
  //     e.preventDefault();
  //     const $btnIconSave = e.target.closest("[data-tab-recipe-save-btn]");
  //     if (!$btnIconSave) return;

  //     const recipeId = +$btnIconSave.closest(".card").dataset.id;
  //     // console.log(this.data[recipeId]);
  //     handler(this.data[recipeId].recipeId);
  //     $btnIconSave.classList.toggle("saved");
  //     $btnIconSave.classList.toggle("removed");
  //   });
  // }

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

  get savedRecipes() {
    return this.#savedRecipes;
  }
  set savedRecipes(savedRecipes) {
    this.#savedRecipes = savedRecipes;
  }

  get parentElement() {
    return this.#parentElement;
  }

  set parentElement(parentElement) {
    this.#parentElement = parentElement;
  }
}

export default new TabView();
