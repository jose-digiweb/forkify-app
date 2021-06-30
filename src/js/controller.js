//--> Importing Dependencies
import 'regenerator-runtime/runtime';
import 'core-js/stable';

//--> Importing Files and Modules
import * as model from './model';
import recipeView from './views/recipeViews';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';
import bookmarksView from './views/bookmarksView';
import addRecipeView from './views/addRecipeView';
import { MODAL_CLOSE_SEC } from './config';
import View from './views/view';

const btnSearch = document.querySelector('.search__btn');

// if (module.hot) {
//   module.hot.accept();
// }

//--> Starting Coding <--\\
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    //--> Update results view to mark the search result
    resultsView.update(model.getSearchResultsPage());

    //--> Updating the Bookmarks
    bookmarksView.update(model.state.bookmarks);

    //--> Rendering Spinner
    recipeView.renderSpinner();

    //--> Loading Recipe
    await model.loadRecipe(id);

    // --> Rendering Data
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    //--> Rendering Spinner
    resultsView.renderSpinner();

    const query = searchView.getQuery();

    await model.loadSearchResult(query);

    resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  resultsView.render(model.getSearchResultsPage(goToPage));

  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  //-1-> Update the recipe servings (On State).
  model.updateServings(newServings);

  //-2-> Update the Recipe View
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  //--> Add / Remove Bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.removeBookmark(model.state.recipe.id);

  //--> Update User Interface
  recipeView.update(model.state.recipe);

  //--> Render Bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    //--> Render Loading Spinner
    addRecipeView.renderSpinner();

    //--> Uploading the Recipe
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    //--> Render Recipe
    recipeView.render(model.state.recipe);

    //--> Render Success Message
    addRecipeView.renderMessage();

    //--> Re-Render the bookmarkView
    bookmarksView.render(model.state.bookmarks);

    //--> Change ID in the URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    //--> Close the Form
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error(err);
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServing(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
