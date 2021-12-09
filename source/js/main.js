import { storage } from "./storage.js";
import { Router } from "./Router.js";

window.addEventListener("DOMContentLoaded", init);

// for now, saved recipes is the homepage
const router = new Router(recipesPage);

/* gonna ignore glider for now
const gliderConfig = {
  focusAt: 'center', //this line seems to being nothing. i wanted it to maybe
  like, enable the non-translucence. or something like that
  type: 'carousel',
  perView: 3,
  breakpoints:{
    800: {
      perView: 2
    }
    // peek: {
    //     before: 1000,
    //     after: 500
    // }
  }
};
*/
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
  // set the recipe-page's data into this recipe's JSON
  recipePage.data = recipeJSON;
}

/**
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
 * DEPRECATED, replaced by storage.getRecipes()
 * After this function resolves, storage.recipeData should be updated
 * with the url's being the keys to access the fetched data.
 * @async
 * @function
 * @param {String[]} recipeUrlList
 * @return {Promise}
 */
async function loadRecipes(recipeUrlList) {
  return new Promise((resolve, reject) => {
    // keep track of each promise we make when using fetch
    const promises = [];

    recipeUrlList.forEach((url) => {
      // add each fetch promise to the array
      promises.push(
        fetch(url)
          // catch any errors in fetching (network problems or whatever)
          .catch((error) => {
            console.log(`Problem fetching ${url}`, error);
            reject(error);
          })
          // check if we get a proper response
          // fetch() still resolves even if it's a 404
          .then((response) => {
            if (!response.ok) {
              console.log(`Problem fetching ${url}, status ${response.status}`);
              reject(response);
            }

            return response.json();
          })
          // response.json() is a promise
          .then((data) => {
            storage.recipeData[url] = {
              url: url,
              data: data,
            };
          }),
      );
    });

    // resolve once the entire promise array is resolved
    Promise.all(promises)
      .then(() => {
        resolve(true);
      })
      .catch((error) => {
        console.log(error);
        reject();
      });
  });
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
  bar.goSearchPage = async(query) => {
    const results = await storage.search({ query: query });
    router.navigate("search-page", false, results);
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
    if (e.path[0].nodeName == "A") return;
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

/* gonna ignore glider for now
function bindGliderEntry(gliderEntry, url) {
  gliderEntry.addEventListener('click',()=>{
    // just slap it onto body for now
    const body = document.querySelector('body');
    const recipeCard = document.createElement('recipe-card');
    recipeCard.data = storage.recipeData[url].data;

    body.appendChild(recipeCard);
  })
}

async function renderRecipesIntoGlider() {
  // obtain the glider thingy we want to add into
  const glider = document.querySelector('.glide__slides');

  for (const url in storage.recipeData) {
    // iterate through recipes we have loaded
    let recipeInfo = storage.recipeData[url].data;
    const newGliderEntry = document.createElement('glider-recipe');
    newGliderEntry.classList.add('glide__slide');
    newGliderEntry.data = recipeInfo;


    // we actually want the li in glider-recipe
    const li = newGliderEntry.shadowRoot.querySelector('li');
    bindGliderEntry(li, url);
    glider.appendChild(li);
  }
}
*/
