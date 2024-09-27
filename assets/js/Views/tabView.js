class TabView {
  #parentElement = document.querySelector(".tab");
  #tabBtns = this.#parentElement.querySelectorAll("[data-tab-btn]");
  #tabPanels = this.#parentElement.querySelectorAll("[data-tab-panel]");
  #lastActiveTabBtn;
  #lastActiveTabPanel;

  constructor() {
    this.lastActiveTabPanel = this.#tabPanels[0];
    this.lastActiveTabBtn = this.#tabBtns[0];
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
}

export default new TabView();
