class HeaderView {
  #parentElement = document.querySelector(".header");

  addHandlerSwitchTheme(handler) {
    this.#parentElement.addEventListener("click", (e) => {
      const switchBtn = e.target.closest("[switch-theme-btn]");
      if (!switchBtn) return;

      const newTheme =
        $HTML.getAttribute("data-theme") === "light" ? "dark" : "light";
      // update theme on session storage
      handler(newTheme);
    });
  }
}

export default new HeaderView();
