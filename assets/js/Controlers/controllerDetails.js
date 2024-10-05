import { ControllerBase } from "./controllerBase";
import detailsView from "../Views/DetailsViews/detailsView";
import * as model from "../models/model";
class ControllerDtails extends ControllerBase {
  constructor() {
    super();
    this.initBase();
    this.init();
  }

  async controllerGetData(recipeId) {
    try {
      detailsView.renderSkeleton();
      await model.fetchDetailRecipeData(recipeId);
      await model.fetchRecipeSavedData();
      detailsView.render(model.state.recipeData, model.state.recipeSavedData);
    } catch (error) {}
  }

  init() {
    detailsView.addHandlerLoadData(this.controllerGetData);
  }
}

new ControllerDtails();
