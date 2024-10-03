import * as model from "../models/model";
import headerView from "../Views/headerView";
import * as global from "../global";
// import heroView from "../Views/heroView";
// import tabView from "../Views/tabView";
// import tagView from "../Views/tagView";
// import sliderView from "../Views/sliderView";
export class ControllerBase {
  // -------------- Switch Theme ---------------------
  controlerLoadingSwitchTheme() {
    model.getCurrentTheme();

    global.updateThemeUI(model.state.theme);
  }

  controlerSwitchTheme(newTheme) {
    model.updateTheme(newTheme);

    // this.controlerLoadingSwitchTheme();
    model.getCurrentTheme();

    global.updateThemeUI(model.state.theme);
  }

  addHandlerLoadTheme(handler) {
    window.addEventListener("load", handler);
  }

  async cotrollerSaveRecipe(recipeId) {
    try {
      await model.saveRecipeInLocalStorage(recipeId);
    } catch (error) {}
  }

  initBase() {
    headerView.addHandlerSwitchTheme(this.controlerSwitchTheme);

    this.addHandlerLoadTheme(this.controlerLoadingSwitchTheme);
  }
}
