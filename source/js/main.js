import { storage } from "./storage.js";

window.addEventListener("DOMContentLoaded",init);

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
  //storage.getUserInfo();
  const tempList = ['json/gyudon.json','json/chicken_tortilla_soup.json','json/chicken_n_dumplings.json'];
  await storage.getUserInfo();
  loadRecipes(tempList).then(()=>{
    renderSavedRecipes();
  });
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

    list.appendChild(newCard);
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