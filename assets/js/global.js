export const $HTML = document.documentElement;
export const $switchBtn = document.querySelector("[switch-theme-btn]");
export const $body = document.querySelector("body");

export const isDark = window.matchMedia("(prefers-color-scheme:dark)").matches;

let isPressed = false;

// const addHandlerLoadTheme = function (handler) {
//   window.addEventListener("load", handler);
// };

export const updatePressedAria = function (ispressed) {
  console.log("updated");
  isPressed = ispressed === "dark" ? true : false;
  $switchBtn.setAttribute("aria-pressed", isPressed);
};

export const updateThemeUI = function (theme) {
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
export const wait = function (seconds) {
  let timeoutId;
  const promise = new Promise((resolved) => {
    return setTimeout(resolved, seconds * 1000);
  });

  return { promise, timeoutId };
};

const $snackBarContainer = document.querySelector(".snackbar-container");
export const showNotification = async function (state) {
  let timeId;
  const markup = `
      <div class="snackbar flex flex-between flex-center-y pd-inline-16">
        <p class="body-medium">${
          state === "removed" ? "Removed in" : "Added to"
        } Recipe book</p>
      </div>
    
  `;
  if (timeId) clearTimeout(timeId);
  const { promise, timeoutId } = wait(4);
  timeId = timeoutId;
  $snackBarContainer.innerHTML = "";
  $snackBarContainer.insertAdjacentHTML("beforeend", markup);

  await promise;
  $snackBarContainer.innerHTML = "";
};

export const getDataFromURL = function () {
  const queriesStr = window.location.search.slice(1);
  if (!queriesStr) return "";
  const queries = queriesStr && queriesStr.split("&").map((i) => i.split("="));
  return queries;
};
