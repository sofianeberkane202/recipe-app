const $HTML = document.documentElement;
const $switchBtn = document.querySelector("[switch-theme-btn]");
const $body = document.querySelector("body");

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

// snackbar
const wait = function (seconds) {
  return new Promise((Resolved) => {
    return setTimeout(Resolved, seconds * 1000);
  });
};

const $snackBarContainer = document.querySelector(".snackbar-container");
const showNotification = async function () {
  const markup = `
      <div class="snackbar flex flex-between flex-center-y pd-inline-16">
        <p class="body-medium">Added to Recipe book</p>
      </div>
    
  `;
  $snackBarContainer.innerHTML = "";
  $snackBarContainer.style.zIndex = 4;
  $snackBarContainer.insertAdjacentHTML("beforeend", markup);
  await wait(4);
  $snackBarContainer.style.zIndex = -1;
};
