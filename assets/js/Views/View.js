import * as global from "../global";
export class View {
  render(
    data,
    savedRecipes,
    parentElement = this.parentElement,
    isClear = true
  ) {
    this.data = data;
    this.savedRecipes = savedRecipes;
    const markup = this._generateMarkup();
    isClear && this.clear(parentElement);
    parentElement.insertAdjacentHTML("beforeend", markup);
  }

  generateSkeletonMarkup() {
    return `
    <div class="skeleton-card flex flex-column">
      <div class="card-banner skeleton radius-8"></div>
      <div class="card-body flex flex-column">
        <div class="card-title skeleton"></div>
        <div class="card-text skeleton"></div>
      </div>
    </div>
    `;
  }

  renderSkeleton(parentElement = this.parentElement) {
    const markup = `${this.generateSkeletonMarkup().repeat(20)}`;
    this.clear(parentElement);
    parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  generateCard(recipe, i, typeOfCuisin = "") {
    // if (typeOfCuisin !== "")
    //   console.log(typeOfCuisin, recipe, this.savedRecipes);
    const { time, unit } = recipe.cookingTime;
    return `
      <div class="card flex flex-column" style="--animation-delay:${
        100 * i
      }ms;--gap:0" data-id="${recipe.recipeId}" >
                  <a href="./detail.html?recipe=${recipe.recipeId}">
                  <figure class="card-media image-holder overflow-h">
                    <img src="${
                      recipe.image
                    }" width="200" height="200" loading="lazy" alt="Recipe name" class="image-cover">
                  </figure></a>

        <div class="card-body flex-1 pd-inline-8 pd-block-8 flex flex-column flex-between" style="--gap: .5rem">
          <h3 class="card-title title-small">
            <a href="/detail.html?recipe=${
              recipe.recipeId
            }" class="clamp-text">${recipe.title}</a>
          </h3>

          <div class="card-info flex flex-between flex-center-y">
            <div class="card-time flex flex-center">
              <span class="material-symbols-outlined" style="font-size: 1.8rem" aria-hidden="true">schedule</span>
              <span class="label-small">${time ? time : "<1"} ${unit}</span>
            </div>

            <button class="icon-btn flex flex-column flex-center ${
              this.savedRecipes.has(recipe.recipeId) ? "saved" : "removed"
            } has-state"
            data-tab-recipe-save-btn>
              <span class="material-symbols-outlined bookmark-add" aria-hidden="true">bookmark_add</span>
              <span class="material-symbols-outlined bookmark" aria-hidden="true">bookmark</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  addHandlerSaveRecipe(handler) {
    this.parentElement.addEventListener("click", (e) => {
      // e.preventDefault();
      const $btnIconSave = e.target.closest("[data-tab-recipe-save-btn]");
      if (!$btnIconSave) return;
      let recipeData;

      if ($btnIconSave?.closest(".slider")?.hasAttribute("cuisinetype")) {
        const cuisineType = $btnIconSave
          .closest(".slider")
          .getAttribute("cuisinetype");
        recipeData = this.data.get(cuisineType);
      } else {
        console.log("enter dtaa");
        recipeData = this.data;
      }

      const cardId = $btnIconSave.closest(".card").dataset.id;

      handler(cardId);
      $btnIconSave.classList.toggle("saved");
      $btnIconSave.classList.toggle("removed");

      const stateOfSave = $btnIconSave.classList.contains("saved")
        ? "saved"
        : "removed";
      // console.log(stateOfSave);
      global.showNotification(stateOfSave);
    });
  }

  addHandlerLoadTheme(handler) {
    window.addEventListener("load", handler);
  }

  clear(parentElement = this.parentElement) {
    parentElement.innerHTML = "";
  }
}
