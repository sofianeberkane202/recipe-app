import { ACCESS_POINT, ACCESS_POINT, API_KEY, APP_ID, TYPE } from "../api";
import { cardQueries } from "../config";
import * as helper from "../helper";
export const state = {
  theme: "",
  data: "",
  recipeSavedData: new Set(),
};

export const getCurrentTheme = function () {
  state.theme = sessionStorage.getItem("theme");
};

export const updateTheme = function (newTheme) {
  sessionStorage.setItem("theme", newTheme);
};

// -------------- Get Data from edamam server --------------------------

/**
 * @param {Array} quiries Query array
 **/

export const fetchData = async function (
  queries,
  ACCESS_POINT_API = ACCESS_POINT
) {
  try {
    const /** {String} */ query = queries
        ?.join("&")
        .replace(/,/g, "=")
        .replace(/ /g, "%20")
        .replace(/\+/g, "%2B");

    const /** {String} */ url = `${ACCESS_POINT_API}?app_id=${APP_ID}&app_key=${API_KEY}&type=${TYPE}${
        query ? `&${query}` : ""
      }`;

    const /** {Objetc} */ response = await fetch(url);
    if (!response.ok) return;
    const data = await response.json();
    state.data = data.hits;

    state.data = data.hits.map((recipeInfo) => {
      const { recipe } = recipeInfo;
      const { time, timeUnit } = helper.getTime(recipe.totalTime);
      return {
        image: recipe.image,
        title: recipe.label,
        cookingTime: {
          time,
          unit: timeUnit,
        },
        recipeId: recipe.uri.slice(recipe.uri.lastIndexOf("_") + 1),
      };
    });
  } catch (error) {
    console.error(error);
  }
};

export const fetchRecipeSavedData = function () {
  state.recipeSavedData = new Set(
    JSON.parse(localStorage.getItem("recipeSaved"))
  );
};

// ----------------- Save Recipies ------------------------

export const saveRecipeInLocalStorage = async function (recipeId) {
  const /** {String}*/ isSaved = state.recipeSavedData.has(recipeId);

  const ACCESS_POINT_API = `${ACCESS_POINT}/${recipeId}`;

  if (!isSaved) {
    const recipeData = await helper.fetchDataJson(
      helper.generateUrl(cardQueries, ACCESS_POINT_API)
    );
    state.recipeSavedData.add(recipeId);

    localStorage.setItem(
      "recipeSaved",
      JSON.stringify([...state.recipeSavedData])
    );
  } else {
    state.recipeSavedData.delete(recipeId);
    localStorage.setItem(
      "recipeSaved",
      JSON.stringify([...state.recipeSavedData])
    );
  }
};
