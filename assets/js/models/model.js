import { ACCESS_POINT, ACCESS_POINT, API_KEY, APP_ID, TYPE } from "../api";
import { cardQueries, cuisinType } from "../config";
import * as helper from "../helper";
export const state = {
  theme: "",
  data: [],
  sliderData: new Map(),
  recipeSavedData: new Set(),
  nextPageURL: "",
  recipeData: {},
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

const getData = async function (url) {
  const data = await helper.fetchDataJson(url);

  state.nextPageURL = data._links?.next?.href;
  // console.log(data);

  state.data = helper.generateStateData(data?.hits || data);
};

export const fetchData = async function (queries) {
  try {
    const url = helper.generateUrl(queries);

    await getData(url);
  } catch (error) {
    console.error(error);
  }
};

export const fetchRecipeSavedData = async function () {
  state.recipeSavedData = new Set(
    JSON.parse(localStorage.getItem("recipeSaved"))
  );
};

export const fetchNextPageData = async function () {
  await getData(state.nextPageURL);
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
        helper.generateStateData(data.hits)
      );
    }
  } catch (error) {
    console.error(error);
  }
};

// -------------------------------- featch data for Detail page ------------------
export const fetchDetailRecipeData = async function (recipeId) {
  const url = helper.generateUrl(recipeId);
  const data = await helper.fetchDataJson(url);
  const {
    images: { LARGE, REGULAR, SMALL, THUMBNAIL },
    label: title,
    source: author,
    ingredients = [],
    totalTime: cookingTime = 0,
    calories = 0,
    cuisinType = [],
    dietLabels = [],
    dishType = [],
    yield: servings = 0,
    ingredientLines = [],
    uri,
  } = data.recipe;

  const banner = LARGE ?? REGULAR ?? SMALL ?? THUMBNAIL;
  // const { url: bannerUrl, width, height } = banner;

  state.recipeData = {
    banner,
    cuisinType,
    dietLabels,
    dishType,
    title,
    author,
    ingredients,
    cookingTime,
    calories,
    servings,
    ingredientLines,
    uri,
    recipeId: uri.slice(uri.lastIndexOf("_") + 1),
  };
};

// export const getSavedRecipeces = async function (recipeId) {
//   const url = helper.generateUrl(recipeId);
//   const data = await helper.fetchDataJson(url);
//   console.log(data);
//   state.recipeData = helper.generateStateData(data.recipe);
// };
