import * as global from "../global";
export class View {
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

  // renderSkeleton($parentElement) {
  //   $parentElement.innerHTML = `${this.generateSkeletonMarkup().repeat(20)}`;
  //   this.lastActiveTabPanel.innerHTML = "";

  //   this.lastActiveTabPanel.insertAdjacentElement("afterbegin", $gridList);
  // }

  generateCard(recipe, i, typeOfCuisin = "") {
    // if (typeOfCuisin !== "")
    //   console.log(typeOfCuisin, recipe, this.savedRecipes);
    const { time, unit } = recipe.cookingTime;
    return `
      <div class="card flex flex-column" style="--animation-delay:${
        100 * i
      }ms;--gap:0" data-id="${i}">
                  <figure class="card-media image-holder overflow-h">
                    <img src="${
                      recipe.image
                    }" width="200" height="200" loading="lazy" alt="Recipe name" class="image-cover">
                  </figure>

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
    console.log(this);
    this.parentElement.addEventListener("click", (e) => {
      e.preventDefault();
      const $btnIconSave = e.target.closest("[data-tab-recipe-save-btn]");
      if (!$btnIconSave) return;
      let recipeData;

      if ($btnIconSave?.closest(".slider")?.hasAttribute("cuisinetype")) {
        const cuisineType = $btnIconSave
          .closest(".slider")
          .getAttribute("cuisinetype");
        recipeData = this.data.get(cuisineType);
      } else {
        recipeData = this.data;
      }

      const cardId = +$btnIconSave.closest(".card").dataset.id;

      const { recipeId } = recipeData[cardId];

      handler(recipeId);
      $btnIconSave.classList.toggle("saved");
      $btnIconSave.classList.toggle("removed");

      const stateOfSave = $btnIconSave.classList.contains("saved")
        ? "saved"
        : "removed";
      // console.log(stateOfSave);
      global.showNotification(stateOfSave);
    });
  }

  addHandlerDetailRecipe() {
    this.parentElement.addEventListener("click", (e) => {
      const $recipe = e.target.closest("figure");

      if (!$recipe) return;

      let recipeData;

      if ($recipe?.closest(".slider")?.hasAttribute("cuisinetype")) {
        const cuisineType = $recipe
          .closest(".slider")
          .getAttribute("cuisinetype");
        recipeData = this.data.get(cuisineType);
      } else {
        recipeData = this.data;
      }

      const recipeIndex = +$recipe.closest(".card").dataset.id;

      window.location.href += `detail.html?recipe=${recipeData[recipeIndex].recipeId}`;
    });
  }

  clear() {
    this.parentElement.innerHTML = "";
  }
}
