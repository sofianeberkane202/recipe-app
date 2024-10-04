import { View } from "../View";
class SavedRecipes extends View {
  #parentElement = document.querySelector("[data-saved-recipe-container]");
  #data;
  #savedRecipes;
  static #i = 0;
  constructor() {
    super();
  }
  render(data, savedRecipes) {
    this.#data = data;
    this.#savedRecipes = savedRecipes;
    const parentElement = this.#parentElement.querySelector(".grid-list");
    const markup = this.generateCard(this.#data, SavedRecipes.#i);
    parentElement.insertAdjacentHTML("beforeend", markup);
    SavedRecipes.#i += 1;
  }

  addHandlerLoadSavedRecipes(handler) {
    window.addEventListener("load", handler);
  }

  get data() {
    return this.#data;
  }
  get savedRecipes() {
    return this.#savedRecipes;
  }
  get parentElement() {
    return this.#parentElement;
  }
}

export default new SavedRecipes();
