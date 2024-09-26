import * as model from "./models/model";
import headerView from "./Views/headerView";
// import * as global from "./global";
const controlerLoadingSwitchTheme = function () {
  model.getCurrentTheme();

  updateThemeUI(model.state.theme);
};

const controlerSwitchTheme = function (newTheme) {
  model.updateTheme(newTheme);

  controlerLoadingSwitchTheme();
};

const init = function () {
  headerView.addHandlerSwitchTheme(controlerSwitchTheme);
  addHandlerLoadTheme(controlerLoadingSwitchTheme);
};
init();
