const $HTML = document.documentElement;
const $switchBtn = document.querySelector("[switch-theme-btn]");

const isDark = window.matchMedia("(prefers-color-scheme:dark)").matches;

let isPressed = false;

const addHandlerLoadTheme = function (handler) {
  window.addEventListener("load", handler);
};

const updatePressedAria = function (ispressed) {
  console.log("updated");
  isPressed = ispressed === "dark" ? true : false;
  $switchBtn.setAttribute("aria-pressed", isPressed);
};

const updateThemeUI = function (theme) {
  if (theme) {
    $HTML.setAttribute("data-theme", theme);
    updatePressedAria(theme);
  } else {
    const theme = isDark ? "dark" : "light";
    $HTML.setAttribute("data-theme", theme);
    updatePressedAria(theme);
  }
};

// export { $HTML };
