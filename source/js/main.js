import { storage } from "./storage.js";
import { Router } from "./Router.js";

window.addEventListener("DOMContentLoaded", init);

// for now, saved recipes is the homepage
const router = new Router(recipesPage);

/* gonna ignore glider for now
const gliderConfig = {
  focusAt: 'center', //this line seems to being nothing. i wanted it to maybe like, enable the non-translucence. or something like that
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
  renderNavBar({
    recipeUrl: null,
    isRecipe: false,
    goHome: () => {
      router.navigate("home");
    },
  });
  bindPopState();
}

/**
 * At the end of this function
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
  // make saved-recipes visible
  const savedRecipeSection = document.createElement("section");
  savedRecipeSection.classList.add("saved-recipes");

  const slabel = document.createElement("h1");
  slabel.innerText = "Saved Recipes";
  main.appendChild(slabel);

  main.appendChild(savedRecipeSection);
  // render the cards for saved recipes
  renderRecipes(
    storage.userInfo.savedRecipes.map((savedRecipe) => {
      return savedRecipe.url;
    }),
    savedRecipeSection
  );
  // render the cards for just recipes
  renderRecipes(Object.keys(storage.recipeData), recipeSection);
  /*
  renderNavBar({
    recipeUrl: null,
    isRecipe: false,
  });
  */
}

/**
 * At the end of this function, all the other pages should be hidden and only the saved Recipe List should be visible
 * @function
 */
function savedRecipesPage() {
  const main = document.querySelector("main");
  // delete everyting in main
  main.innerHTML = "";
  // make saved-recipes visible
  const savedRecipeSection = document.createElement("section");
  savedRecipeSection.classList.add("saved-recipes");
  main.appendChild(savedRecipeSection);

  renderRecipes(
    storage.userInfo.savedRecipes.map((savedRecipe) => {
      savedRecipe.url;
    }),
    savedRecipeSection
  );
  /*
  renderNavBar({
    recipeUrl: null,
    isRecipe: false,
  });
  */
}

/**
 * At the end of this function, all of the pages should be removed
 * and the corresponding recipe-page passed into this function should be rendered
 * @function
 * @param {string} recipeUrl - the url of the recipe the page is showing
 * @param {Object} recipeJSON - the recipeJSON of the recipe that contains
 * all its data
 */
function recipePage(recipeUrl, recipeJSON) {
  const main = document.querySelector("main");
  // delete everyting in main
  main.innerHTML = "";
  // show the recipe-page
  const recipePage = document.createElement("recipe-page");
  main.appendChild(recipePage);
  // allow it to save and remove recipes
  recipePage.addRecipeToSaved = storage.addRecipeToSaved;
  recipePage.removeRecipeFromSaved = storage.removeRecipeFromSaved;
  recipePage.url = recipeUrl;
  recipePage.isSaved = storage.isSaved(recipeUrl);
  // set the recipe-page's data into this recipe's JSON
  recipePage.data = recipeJSON;
  // update nav-bar
  /*
  renderNavBar({
    recipeUrl: recipeUrl,
    isRecipe: true,
  });
  */
}

/**
 * DEPRECATED, replaced by storage.getRecipes()
 * After this function resolves, storage.recipeData should be updated
 * with the url's being the keys to access the fetched data.
 * @async
 * @function
 * @param {Array[string]} recipeUrlList
 * @returns {Promise}
 */
async function loadRecipes(recipeUrlList) {
  return new Promise((resolve, reject) => {
    // keep track of each promise we make when using fetch
    let promises = [];

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
          })
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
 * This function renders the <nav-bar> with the appropriate data
 * @param {Object} data - object containing information about the current
 * state of the page.
 */
function renderNavBar(data) {
  // it should already be there, we just need to give it the data to force it to re-render itself appropriately
  const bar = document.querySelector("nav-bar");
  bar.goHome = () => {
    router.navigate("home");
  };
  console.log(data);
  bar.data = data;
}

/**
 * After this function is run, the <recipe-card> elements corresponding
 * to a url in list will be created and placed into target
 * @async
 * @function
 * @param {Array<string>} list - array of urls to render
 * @param {HTMLElement} target - the HTMLElement we want to place the
 * recipe-card's into
 */
async function renderRecipes(list, target) {
  list.forEach((recipeUrl) => {
    // obtain data
    const recipeJSON = storage.recipeData[recipeUrl].data;
    const newCard = document.createElement("recipe-card");
    newCard.data = recipeJSON;

    // add this recipe's page to the router
    router.addPage(recipeUrl, recipePage.bind(null, recipeUrl, recipeJSON));
    // bind the router page to the card
    bindRecipeCard(newCard, recipeUrl);

    target.appendChild(newCard);
  });
}

/**
 * Taken from Lab 7. Binds the click event listener to the card
 * HTMLElement so that when it is clicked, the router navigates to
 * that corresponding recipe's page
 * @param {HTMLElement} recipeCard
 * @param {string} url
 */
function bindRecipeCard(recipeCard, url) {
  recipeCard.addEventListener("click", (e) => {
    if (e.path[0].nodeName == "A") return;
    router.navigate(url);
  });
}

/**
 * this function handles the clicking of back/forward and renders
 * the corresponding page
 */
function bindPopState() {
  window.addEventListener("popstate", (e) => {
    if (!!e.state) {
      router.navigate(e.state.page, true);
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
