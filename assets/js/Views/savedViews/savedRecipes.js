import { View } from "../View";
class SavedRecipes extends View {
  #parentElement = document.querySelector("[data-saved-recipe-container]");
  #data;
  #savedRecipes;
  static #i = 0;
  constructor() {
    super();
  }

  addHandlerLoadSavedRecipes(handler) {
    window.addEventListener("load", handler);
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
    return this.#parentElement.querySelector(".grid-list");
  }
}

export default new SavedRecipes();
