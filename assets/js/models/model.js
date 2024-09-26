export const state = {
  theme: "",
};

export const getCurrentTheme = function () {
  state.theme = sessionStorage.getItem("theme");
};

export const updateTheme = function (newTheme) {
  sessionStorage.setItem("theme", newTheme);
};
