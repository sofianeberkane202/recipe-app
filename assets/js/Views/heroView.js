class HeroView {
  #parentElement = document.querySelector(".hero");

  #updateLocationLink() {
    const $inputSearchField = this.#parentElement.querySelector(
      "[data-search-field]"
    );

    const searchFieldQuery = $inputSearchField.value.trim().toLowerCase();
    if (searchFieldQuery === "") return;

    window.location.href += `recipe.html?q=${searchFieldQuery}`;
  }

  addHandlerSearchField() {
    this.#parentElement.addEventListener("click", (e) => {
      const $bntSearch = e.target.closest("[data-search-btn]");
      if (!$bntSearch) return;
      this.#updateLocationLink();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key !== "Enter") return;

      this.#updateLocationLink();
    });
  }
}

export default new HeroView();
