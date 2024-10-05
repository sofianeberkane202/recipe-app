import { ControllerBase } from "./controllerBase";
import * as model from "../models/model";
import filterView from "../Views/recipesViews/filterView";

class ControllerRecipes extends ControllerBase {
  constructor() {
    super();
    this.initBase();

    this.init();
  }

  async controllerRecipeData(queries) {
    try {
      filterView.renderSkeleton();

      await model.fetchData(queries);
      model.fetchRecipeSavedData();

      filterView.render(model.state.data, model.state.recipeSavedData);
    } catch (error) {}
  }

  async controllerLoadMoreRecipes() {
    try {
      const isNextPageExist = await model.fetchNextPageData();
      // console.log(model.state.data);
      // if (!isNextPageExist) {
      //   filterView.renderNoLoadMessage();
      //   return;
      // }
      await model.fetchRecipeSavedData();

      filterView.render(
        model.state.data,
        model.state.recipeSavedData,
        undefined,
        false
      );
    } catch (error) {}
  }

  init() {
    filterView.addHandlerLoad();
    filterView.addHandlerAccordion();
    filterView.addHandlerFilterBar();
    filterView.addhandlierSubmit();
    filterView.addHandlerSearch();
    filterView.addHandlerClear();
    filterView.addHandlerScroll();
    filterView.addHandlerRecipiesData(this.controllerRecipeData);
    filterView.addHandlerSaveRecipe(this.cotrollerSaveRecipe);
    filterView.addHandlerLoadMore(this.controllerLoadMoreRecipes);
  }
}

new ControllerRecipes();
