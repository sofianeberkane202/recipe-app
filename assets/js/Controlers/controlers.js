import * as model from "../models/model";
import heroView from "../Views/heroView";
import tabView from "../Views/tabView";
import tagView from "../Views/tagView";
import sliderView from "../Views/sliderView";

import { ControllerBase } from "./controllerBase";

class Controller extends ControllerBase {
  // import * as global from "./global";
  // -------------- Switch Theme ---------------------
  // controlerLoadingSwitchTheme() {
  //   console.log("enter herererer");
  //   model.getCurrentTheme();

  //   updateThemeUI(model.state.theme);
  // }

  // controlerSwitchTheme(newTheme) {
  //   model.updateTheme(newTheme);

  //   // this.controlerLoadingSwitchTheme();
  //   model.getCurrentTheme();

  //   updateThemeUI(model.state.theme);
  // }

  // -----------------------------------------------

  controllerSearchField() {}

  async controllerTabData(queries) {
    try {
      tabView.renderSkeleton();
      await model.fetchData(queries);
      model.fetchRecipeSavedData();
      tabView.render(model.state.data, model.state.recipeSavedData);
    } catch (error) {}
  }

  async cotrollerSaveRecipe(recipeId) {
    try {
      await model.saveRecipeInLocalStorage(recipeId);
    } catch (error) {}
  }

  async controllerSlider(/*queries*/) {
    try {
      sliderView.renderSkeleton();
      await model.fetchSliderData(/*queries*/);
      sliderView.render(model.state.sliderData, model.state.recipeSavedData);
    } catch (error) {}
  }

  init() {
    this.initBase();

    heroView.addHandlerSearchField();

    tabView.addHandlerTab();
    tabView.addHandlerTabKey();
    tabView.addHandlerTabContent(this.controllerTabData);
    tabView.addHandlerLoadRecipes(this.controllerTabData);
    tabView.addHandlerDetailRecipe();
    tabView.addHandlerSaveRecipe(this.cotrollerSaveRecipe);

    tagView.addHandlerWindowLocation();

    sliderView.addHandlerSlider(this.controllerSlider);
    sliderView.addHandlerSaveRecipe(this.cotrollerSaveRecipe);
    sliderView.addHandlerDetailRecipe();
  }
}

const controller = new Controller();
controller.init();
