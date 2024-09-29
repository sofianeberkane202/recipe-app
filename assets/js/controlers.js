import { cardQueries } from "./config";
import * as model from "./models/model";
import headerView from "./Views/headerView";
import heroView from "./Views/heroView";
import tabView from "./Views/tabView";
import tagView from "./Views/tagView";
import sliderView from "./Views/sliderView";

// import * as global from "./global";
// -------------- Switch Theme ---------------------
const controlerLoadingSwitchTheme = function () {
  model.getCurrentTheme();

  updateThemeUI(model.state.theme);
};

const controlerSwitchTheme = function (newTheme) {
  model.updateTheme(newTheme);

  controlerLoadingSwitchTheme();
};

// -----------------------------------------------

const controllerSearchField = function () {};

const controllerTabData = async function (queries) {
  try {
    tabView.renderSkeleton();
    await model.fetchData(queries);
    model.fetchRecipeSavedData();
    tabView.render(model.state.data, model.state.recipeSavedData);
  } catch (error) {}
};

const cotrollerSaveRecipe = async function (recipeId) {
  try {
    await model.saveRecipeInLocalStorage(recipeId);
  } catch (error) {}
};

const controllerSlider = async function (/*queries*/) {
  try {
    sliderView.renderSkeleton();
    await model.fetchSliderData(/*queries*/);
    sliderView.render(model.state.sliderData, model.state.recipeSavedData);
  } catch (error) {}
};

const init = function () {
  headerView.addHandlerSwitchTheme(controlerSwitchTheme);

  addHandlerLoadTheme(controlerLoadingSwitchTheme);

  heroView.addHandlerSearchField();

  tabView.addHandlerTab();
  tabView.addHandlerTabKey();
  tabView.addHandlerTabContent(controllerTabData);
  tabView.addHandlerLoadRecipes(controllerTabData);
  tabView.addHandlerDetailRecipe();
  tabView.addHandlerSaveRecipe(cotrollerSaveRecipe);

  tagView.addHandlerWindowLocation();

  sliderView.addHandlerSlider(controllerSlider);
  sliderView.addHandlerSaveRecipe(cotrollerSaveRecipe);
  sliderView.addHandlerDetailRecipe();
};

init();
