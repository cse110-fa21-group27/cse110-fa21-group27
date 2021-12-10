import { storage } from "./storage.js";
import { Router } from "./Router.js";

window.addEventListener("DOMContentLoaded", init);

// for now, saved recipes is the homepage
const router = new Router(recipesPage);

/**
 * Initializes everything. It all begins here.
 * @async
 * @function
 */
async function init() {
  // obtain userInfo from storage
  await storage.getUserInfo();
  // obtain recipes from storage
  await storage.getRecipes();
  router.navigate("home");
  router.addPage("roadmap-page", RoadmapPage);
  router.addPage("search-page", SearchPage);
  router.addPage("savedRecipes", savedRecipesPage);
  router.addPage("search-page", SearchPage);
  router.addPage("groceryList", groceryListPage);
  router.addPage("collection", collectionPage);
  renderNavBar({
    recipeUrl: null,
    isRecipe: false,
  });
  bindPopState();
}

/**
 * This function will fill main with all the recipes
 * @function
 * @name recipesPage
 */
function recipesPage() {
  const main = document.querySelector("main");
  // delete everyting in main
  main.innerHTML = "";
  // make a section displaying recipes
  const recipeSection = document.createElement("section");
  recipeSection.classList.add("recipes");

  const rlabel = document.createElement("h1");
  rlabel.innerText = "Recipes";
  main.appendChild(rlabel);

  main.appendChild(recipeSection);
  // render the cards for just recipes
  renderRecipes(Object.keys(storage.recipeData), recipeSection);
}

/**
 * This function would replace the main with the search page
 * including the filter and the body
 * @function
 * @name SearchPage
 * @param {Object} results - passes in the results from the search
 */
function SearchPage(results) {
  const main = document.querySelector("main");
  // delete everyting in main
  main.innerHTML = "";
  // make a section displaying recipes
  const searchPage = document.createElement("search-page");
  searchPage.renderRecipes = renderRecipes;
  searchPage.data = results;

  main.appendChild(searchPage);
}

/**
 * This function would replace the main with the saved recipe page
 * including the user's custom collections, if any
 * @function
 * @name savedRecipesPage
 */
function savedRecipesPage() {
  const main = document.querySelector("main");
  // delete everyting in main
  main.innerHTML = "";
  // make saved-recipes visible
  const savedPage = document.createElement("saved-recipes");
  // pass the renderrecipes function
  savedPage.renderRecipes = renderRecipes;
  // pass the collections functions
  savedPage.addCollection = storage.addCollection;
  savedPage.removeCollection = storage.removeCollection;
  savedPage.addToCollection = storage.addToCollection;
  savedPage.removeFromCollection = storage.removeFromCollection;
  // allow it to navigate to collection
  savedPage.goToCollection = (collection) => {
    router.navigate("collection", false, collection);
  };
  // give it the array of userInfo for data
  savedPage.data = storage.userInfo;

  main.appendChild(savedPage);
}

/**
 * This function would replace the main with the recipe page
 * of the recipe that the user just clicked on
 * @function
 * @name recipePage
 * @param {string} recipeId - the id of the recipe the page is showing
 * @param {Object} recipeJSON - the recipeJSON of the recipe that contains
 * all its data
 */
function recipePage(recipeId, recipeJSON) {
  const main = document.querySelector("main");
  // delete everyting in main
  main.innerHTML = "";
  // show the recipe-page
  const recipePage = document.createElement("recipe-page");
  main.appendChild(recipePage);
  // allow it to save and remove recipes
  recipePage.addRecipeToSaved = storage.addRecipeToSaved;
  recipePage.removeRecipeFromSaved = storage.removeRecipeFromSaved;
  recipePage.id = recipeId;
  recipePage.isSaved = storage.isSaved(recipeId);
  // allow it to add to grocery list
  recipePage.addToGroceryList = storage.addToGroceryList;
  // set the recipe-page's data into this recipe's JSON
  recipePage.data = recipeJSON;
}

/**
 * After this page function is run, <main> should be empty except for the
 * <grocery-list-page> component
 * @function
 */
function groceryListPage() {
  const main = document.querySelector("main");
  main.innerHTML = "";
  // create grocery page
  const groceryPage = document.createElement("grocery-list-page");
  main.appendChild(groceryPage);
  // allow it to remove/edit grocery items
  groceryPage.removeFromGroceryList = storage.removeFromGroceryList;
  groceryPage.updateEntryInGrocery = storage.updateEntryInGrocery;
  // give it access to grocery list
  groceryPage.data = storage.userInfo.groceryList;
}

/**
 * At the end of this function, all of the pages should be removed
 * and the corresponding recipe-page passed
 * into this function should be rendered
 * This function would replace the main with the roadmap page
 * that will display recipes meant to help the user learn how
 * to cook

 * @function
 * @name RoadmapPage
 */
function RoadmapPage() {
  const main = document.querySelector("main");
  // delete everyting in main
  main.innerHTML = "";
  // show the roadmap page
  const roadmapPage = document.createElement("roadmap-page");

  main.appendChild(roadmapPage);

  roadmapPage.goRecipe = (recipeId) => {
    router.navigate(recipeId);
  };
}

/**
 * This function would replace the main with the collection page
 * of the user-created collection that they just clicked on and
 * its corresponding recipe cards
 * @function
 * @name collectionPage
 * @param {Object} collection - the collection object that we want to display
 */
function collectionPage(collection) {
  // delete everything in main
  const main = document.querySelector("main");
  main.innerHTML = "";
  // create the user collection custom element
  const userCollection = document.createElement("user-collection");
  // pass the renderRecipes function
  userCollection.renderRecipes = renderRecipes;
  // pass the collections functions
  userCollection.addToCollection = storage.addToCollection;
  userCollection.removeFromCollection = storage.removeFromCollection;
  // create data object
  const data = {
    collection: collection,
    savedRecipes: storage.userInfo.savedRecipes,
  };
  userCollection.data = data;
  main.appendChild(userCollection);
}

/**
 * This function renders the <nav-bar> component with the appropriate data
 * @function
 * @name renderNavBar
 * @param {Object} data - object containing information about the current
 * state of the page.
 */
function renderNavBar(data) {
  // it should already be there, we just need to give it the data to
  // force it to re-render itself appropriately
  const bar = document.querySelector("nav-bar");
  bar.goHome = () => {
    router.navigate("home");
  };
  bar.goRoadmap = () => {
    router.navigate("roadmap-page");
  };

  bar.goToSaved = () => {
    router.navigate("savedRecipes");
  };
  bar.goSearchPage = async (query) => {
    const results = await storage.search({ query: query });
    router.navigate("search-page", false, results);
  };
  bar.goGrocery = () => {
    router.navigate("groceryList");
  };
  bar.data = data;
}

/**
 * After this function is run, the <recipe-card> elements corresponding
 * to an id in list will be created and placed into target
 * @async
 * @function
 * @name renderRecipes
 * @param {String[]} list - array of ids to render
 * @param {HTMLElement} target - the HTMLElement we want to place the
 * @param {Boolean} clickable - if we want to bind event listeners to the
 * card or not. default is true
 * recipe-card's into
 */
async function renderRecipes(list, target, clickable = true) {
  list.forEach((recipeId) => {
    // obtain data
    const recipeJSON = storage.recipeData[recipeId].data;
    const newCard = document.createElement("recipe-card");
    newCard.setAttribute("recipeId", recipeId);
    newCard.data = recipeJSON;

    // add this recipe's page to the router
    router.addPage(recipeId, recipePage.bind(null, recipeId, recipeJSON));
    // bind the router page to the card
    if (clickable) {
      bindRecipeCard(newCard, recipeId);
    }

    target.appendChild(newCard);
  });
}

/**
 * Taken from Lab 7. Binds the click event listener to the card
 * HTMLElement so that when it is clicked, the router navigates to
 * that corresponding recipe's page
 * @function
 * @name bindRecipeCard
 * @param {HTMLElement} recipeCard
 * @param {string} recipeId
 */
function bindRecipeCard(recipeCard, recipeId) {
  recipeCard.addEventListener("click", (e) => {
    if (e.path[0].nodeName === "A") return;
    router.navigate(recipeId);
  });
}

/**
 * This function handles the clicking of back/forward and renders
 * the corresponding page
 * @function
 * @name bindPopState
 */
function bindPopState() {
  window.addEventListener("popstate", (e) => {
    if (!!e.state) {
      router.navigate(e.state.page, true, e.state.options);
    } else {
      router.navigate("home", true);
    }
  });
}
