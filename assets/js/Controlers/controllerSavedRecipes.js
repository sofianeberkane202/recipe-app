import { ControllerBase } from "./controllerBase";
import savedRecipes from "../Views/savedViews/savedRecipes";
import * as model from "../models/model";
class ControllerSavedRecipes extends ControllerBase {
  #parentElement = document.querySelector("[data-saved-recipe-container]");
  constructor() {
    super();
    this.initBase();
    this.init();
  }

  async controllerLoadSavedRecipes() {
    try {
      await model.fetchRecipeSavedData();

      model.state.recipeSavedData.forEach(async (recipeId) => {
        await model.fetchData(recipeId);
        savedRecipes.render(model.state.data, model.state.recipeSavedData);
      });
    } catch (error) {}
  }

  async controllerSaveRecipe(recipeId) {
    try {
      await model.saveRecipeInLocalStorage(recipeId);
    } catch (error) {}
  }

  init() {
    savedRecipes.addHandlerLoadSavedRecipes(this.controllerLoadSavedRecipes);
    savedRecipes.addHandlerSaveRecipe(this.controllerSaveRecipe);
  }
}

new ControllerSavedRecipes();
