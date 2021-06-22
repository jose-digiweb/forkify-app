//--> Importing Dependencies
import 'regenerator-runtime/runtime';
import 'core-js/stable';

//--> Importing Modules
import { API_URL } from './config';
import { fetchData } from './helper';
import { RESULTS_PER_PAGE } from './config';

//--> Importing HTML Elements
const recipeContainer = document.querySelector('.recipe');

//--> Starting Coding <--\\
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultsPerPage: RESULTS_PER_PAGE,
    resultsPage: 1,
  },
};

export const loadRecipe = async function (id) {
  try {
    const data = await fetchData(`${API_URL}${id}`);

    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      cookingTime: recipe.cooking_time,
      image: recipe.image_url,
      ingredients: recipe.ingredients,
      publisher: recipe.publisher,
      servings: recipe.servings,
      url: recipe.source_url,
      title: recipe.title,
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const loadSearchResult = async function (query) {
  try {
    state.search.query = query;

    const data = await fetchData(`${API_URL}?search=${query}`);
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        image: rec.image_url,
        publisher: rec.publisher,
        title: rec.title,
      };
    });

    state.search.resultsPage = 1;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.resultsPage) {
  state.search.resultsPage = page;

  const start = (page - 1) * state.search.resultsPerPage; //0
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(eng => {
    //--> NewQty = OldQty * NewServing / OldServing
    eng.quantity = (eng.quantity * newServings) / state.recipe.servings;
  });

  state.recipe.servings = newServings;
};
