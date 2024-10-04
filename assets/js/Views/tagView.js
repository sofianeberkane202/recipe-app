class TagView {
  #parentEelement = document.querySelector(".tag");

  addHandlerWindowLocation() {
    this.#parentEelement.addEventListener("click", (e) => {
      e.preventDefault();
      const $linkBtn = e.target.closest("[data-tag-link]");
      if (!$linkBtn) return;
      const query = $linkBtn.textContent.toLowerCase().trim();
      console.log(query);
      const link = `recipes.html?health=${query}`;
      window.location.href += link;
    });
  }
}

export default new TagView();
