import { View } from "../View.js";
class DetailsView extends View {
  #parentElement = document.querySelector("[data-detail-container]");
  #data;
  #savedRecipes;

  _generateMarkup() {
    return `
      <figure class="detail-banner image-holder">
        <img src="${this.#data.banner.url}" width="${
      this.#data.banner.width
    }" height="${this.#data.banner.height}" class="image-cover" alt="Cook.io">
      </figure>

      <div class="detail-content">
        <div class="title-wrapper flex flex-between flex-center-y" style="--gap: 1.6rem">
          <h1 class="display-small">${this.#data.title}</h1>

          <button class="btn btn-secondary has-state has-icon flex ${
            this.#savedRecipes.has(this.#data.recipeId) ? "saved" : "removed"
          }">
            <span class="material-symbols-outlined bookmark-add" aria-hidden="true">bookmark_add</span>
            <span class="material-symbols-outlined bookmark" aria-hidden="true">bookmark</span>

            <span class="label-large save-text">Save</span>
            <span class="label-large unsave-text">Unsaved</span>
          </button>
        </div>

            <div class="detail-author label-large">
              <span class="span">by</span> ${this.#data.author}
            </div>

            <div class="detail-stats">
              <div class="stats-item flex flex-column flex-center-y pd-block-16" style="--gap: 4px">
                <span class="display-medium">${
                  this.#data.ingredients.length
                }</span>

                <span class="label-medium">Ingredients</span>
              </div>

              <div class="stats-item flex flex-column flex-center-y pd-block-16" style="--gap: 4px">
                <span class="display-medium">${this.#data.cookingTime}</span>

                <span class="label-medium">Minutes</span>
              </div>

              <div class="stats-item flex flex-column flex-center-y pd-block-16" style="--gap: 4px">
                <span class="display-medium">${Number(
                  this.#data.calories
                ).toFixed(2)}</span>

                <span class="label-medium">Calories</span>
              </div>
            </div>

            <div class="tag-list flex flex-center flex-warp">
              ${this.#generateTags([
                ...this.#data.cuisinType,
                ...this.#data.dietLabels,
                ...this.#data.dishType,
              ])}
            </div>

            <h2 class="title-medium ingr-title">
              Ingredients
              <span class="label-medium">for ${
                this.#data.servings
              } Servings</span>
            </h2>

            <ul class="body-large ingr-list">
              ${this.#generateIngredientLines(this.#data.ingredientLines)}
            </ul>
          </div>
    `;
  }

  #generateTags(tags) {
    return tags
      .map((tag) => {
        let type = "";
        if (this.#data.cuisinType.includes(tag)) type = "cuisineType";
        else if (this.#data.dietLabels.includes(tag)) type = "diet";
        else type = "dishType";

        return `
        <a href="/recipes.html?${type}=${tag.toLowerCase()}" class="filter-chip label-large has-state">${tag}</a>
      `;
      })
      .join("");
  }

  #generateIngredientLines(ingrs) {
    return ingrs
      .map((ingr) => {
        return `
        <li class="ingr-item">
           ${ingr}
        </li>
      `;
      })
      .join("");
  }

  generateSkeletonMarkup() {
    return `
      <div class="detail-banner detail-banner-skeleton skeleton skeleton-card"></div>
      <div class="detail-content detail-content-skeleton skeleton-card">
            <div class="title wrapper flex flex-between flex-center-y" style="--gap: 16px">
              <div class="title-skeleton skeleton"></div>
            </div>

            <div class="detail-author text-skeleton skeleton"></div>
            <div class="detail-stats">
              <div class="stats-item flex flex-column flex-center-y pd-block-16">
                <span class="skeleton title-skeleton"></span>

                <span class="skeleton text-skeleton"></span>
              </div>

              <div class="stats-item flex flex-column flex-center-y pd-block-16">
                <span class="skeleton title-skeleton"></span>

                <span class="skeleton text-skeleton"></span>
              </div>

              <div class="stats-item flex flex-column flex-center-y pd-block-16">
                <span class="skeleton title-skeleton"></span>

                <span class="skeleton text-skeleton"></span>
              </div>
            </div>

            <div class="tag-list">
              <div class="filter-chip skeleton filter-chip-skeleton"></div>
              <div class="filter-chip skeleton filter-chip-skeleton"></div>
              <div class="filter-chip skeleton filter-chip-skeleton"></div>
            </div>

            <div class="ingr-title skeleton title-skeleton"></div>

            <div class="ingr-list">
              <div class="ingr-item skeleton text-skeleton"></div>
              <div class="ingr-item skeleton text-skeleton"></div>
              <div class="ingr-item skeleton text-skeleton"></div>
              <div class="ingr-item skeleton text-skeleton"></div>
            </div>
          </div>
    `;
  }

  addHandlerLoadData(handler) {
    window.addEventListener("load", () => {
      console.log("enter");
      const recipeId = window.location.search.slice(
        window.location.search.indexOf("=") + 1
      );
      handler(recipeId);
    });
  }

  get parentElement() {
    return this.#parentElement;
  }

  get data() {
    return this.#data;
  }
  set data(data) {
    this.#data = data;
  }

  get savedRecipes() {
    this.#savedRecipes;
  }
  set savedRecipes(saveRecipes) {
    this.#savedRecipes = saveRecipes;
  }
}

export default new DetailsView();
