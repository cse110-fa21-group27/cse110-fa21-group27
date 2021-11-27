import { storage } from "./storage.js";
import { Router } from "./Router.js";

window.addEventListener("DOMContentLoaded",init);

// for now, saved recipes is the homepage
const router = new Router(savedRecipesPage);

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
 * At the end of this function, all the other pages should be hidden and only the saved Recipe List should be visible
 * @function
 */
function savedRecipesPage() {
  const main = document.querySelector('main');
  /* TODO: hide/delete all other pages/views */
  const recipePage = document.querySelector('recipe-page');
  if(!!recipePage) recipePage.remove();
  
  // make saved-recipes visible
  const savedRecipeSection = document.createElement('section');
  savedRecipeSection.classList.add('saved-recipes')
  main.appendChild(savedRecipeSection);

  renderSavedRecipes();
  renderNavBar({
    recipeUrl: null,
    isRecipe: false
  })
}



/**
 * Initializes everything. It all begins here.
 * @async
 * @function
 */
async function init() {
  // obtain userInfo from storage
  //storage.getUserInfo();
  const tempList = ['json/gyudon.json','json/chicken_tortilla_soup.json','json/chicken_n_dumplings.json'];
  await storage.getUserInfo();
  renderNavBar({
    recipeUrl: null,
    isRecipe: false
  });
  loadRecipes(tempList).then(()=>{
    router.navigate('home');
  });
  bindPopState();
}


/**
 * After this function resolves, storage.recipeData should be updated 
 * with the url's being the keys to access the fetched data.
 * @async
 * @function 
 * @param {Array[string]} recipeUrlList 
 * @returns {Promise} 
 */
async function loadRecipes(recipeUrlList) {
  return new Promise((resolve,reject)=> {
    // keep track of each promise we make when using fetch
    let promises = [];

    recipeUrlList.forEach(url=>{
      // add each fetch promise to the array
      promises.push(
        fetch(url) 
        // catch any errors in fetching (network problems or whatever)
          .catch(error => {
            console.log(`Problem fetching ${url}`, error);
            reject(error);
          })
          // check if we get a proper response
          // fetch() still resolves even if it's a 404
          .then(response => {
            if (!response.ok){
              console.log(`Problem fetching ${url}, status ${response.status}`);
              reject(response);
            }

            return response.json();
          })
          // response.json() is a promise
          .then(data=> {
            storage.recipeData[url] = {
              url: url,
              data: data
            };
          })
      );
    });

    // resolve once the entire promise array is resolved
    Promise.all(promises)
      .then(()=>{
        resolve(true);
      })
      .catch(error=> {
        console.log(error);
        reject();
      })
  });
}

/**
 * This function renders the <nav-bar> with the appropriate data
 * @param {Object} data - object containing information about the current
 * state of the page. 
 */
function renderNavBar(data) {
  // it should already be there, we just need to give it the data to force it to re-render itself appropriately
  const bar = document.querySelector('nav-bar');
  bar.data = data;
}

/**
 * After this function is run, the <recipe-card> elements will be added 
 * html element in the body with the 'saved-recipes' class.
 * @async
 * @function
 */
async function renderSavedRecipes() {
  // go through each url 
  const list = document.querySelector('.saved-recipes');

  storage.userInfo.savedRecipes.forEach((url)=>{
    // obtain data
    const recipeJSON = storage.recipeData[url].data;  
    const newCard = document.createElement('recipe-card');
    newCard.data = recipeJSON;

    // add this recipe's page to the router
    router.addPage(url,() => {
      // hide saved-recipes
      const savedRecipesSection = document.querySelector('.saved-recipes');
      if (!!savedRecipesSection) savedRecipesSection.remove();
      // show the recipe-page
      const recipePage = document.createElement('recipe-page');
      const main = document.querySelector('main');
      main.appendChild(recipePage);
      // set the recipe-page's data into this recipe's JSON 
      recipePage.data = recipeJSON;
      // update nav-bar
      renderNavBar({
        recipeUrl: url,
        isRecipe: true
      });
    });
    // bind the router page to the card
    bindRecipeCard(newCard,url);

    list.appendChild(newCard);
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
  recipeCard.addEventListener('click', e=>{
    if (e.path[0].nodeName =='A') return;
    router.navigate(url);
  });
}

/**
 * this function handles the clicking of back/forward and renders
 * the corresponding page
 */
function bindPopState() {
  window.addEventListener('popstate', e=>{
    if(!!e.state) {
      router.navigate(e.state.page, true);
    } else {
      router.navigate('home',true);
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