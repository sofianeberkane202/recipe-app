import { ControllerBase } from "./controllerBase";
import savedRecipes from "../Views/savedViews/savedRecipes";
import * as model from "../models/model";
import { wait } from "../global";
class ControllerSavedRecipes extends ControllerBase {
  #parentElement = document.querySelector("[data-saved-recipe-container]");
  #savedRecipesData = [];

  constructor() {
    super();
    this.initBase();
    this.init();
  }

  async controllerLoadSavedRecipes() {
    try {
      await model.fetchRecipeSavedData();

      model.state?.recipeSavedData?.size &&
        savedRecipes.renderSkeleton(
          undefined,
          model.state.recipeSavedData.size
        );

      this.#savedRecipesData = [...model.state.recipeSavedData].map(
        async (recipeId) => {
          const w = wait(0.1);
          await w.promise;
          clearTimeout(w.timeoutId);

          await model.fetchData(recipeId);
          return model.state.data;
        }
      );

      this.#savedRecipesData = await Promise.all(this.#savedRecipesData);

      savedRecipes.render(this.#savedRecipesData, model.state.recipeSavedData);
    } catch (error) {}
  }

  async controllerSaveRecipe(recipeId) {
    try {
      await model.saveRecipeInLocalStorage(recipeId);
    } catch (error) {}
  }

  init() {
    savedRecipes.addHandlerLoadSavedRecipes(
      this.controllerLoadSavedRecipes.bind(this)
    );
    savedRecipes.addHandlerSaveRecipe(this.controllerSaveRecipe);
  }
}

new ControllerSavedRecipes();
