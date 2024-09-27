import * as model from "./models/model";
import headerView from "./Views/headerView";
import heroView from "./Views/heroView";
import tabView from "./Views/tabView";
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
const init = function () {
  headerView.addHandlerSwitchTheme(controlerSwitchTheme);
  addHandlerLoadTheme(controlerLoadingSwitchTheme);
  heroView.addHandlerSearchField();
  tabView.addHandlerTab();
};
init();
