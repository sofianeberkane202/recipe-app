import { ACCESS_POINT, ACCESS_POINT, API_KEY, APP_ID, TYPE } from "../api";
import { cardQueries, cuisinType } from "../config";
import * as helper from "../helper";
export const state = {
  theme: "",
  data: "",
  sliderData: new Map(),
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
    const url = helper.generateUrl(queries);

    const data = await helper.fetchDataJson(url);

    state.data = helper.generateStateData(data);
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

// -------------------------------- featch data for slider card ------------------

export const fetchSliderData = async function (/*queries*/) {
  try {
    for (const cuisine of cuisinType) {
      const queries = [...cardQueries, ["cuisineType", cuisine]];
      const url = helper.generateUrl(queries);

      const data = await helper.fetchDataJson(url);
      state.sliderData.set(
        queries.at(-1).at(-1),
        helper.generateStateData(data)
      );
    }
  } catch (error) {
    console.error(error);
  }
};

// fetchSliderData([...cardQueries, ["cuisineType", "American"]]);
