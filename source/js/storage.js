
const userInfo = {};
const recipeData = {};

/**
 * After this function resolves, the userInfo object
 * should be populated with the userInfo taken from storage
 * @async
 * @function
 * @returns {Promise}
 */
async function getUserInfo() {
  return new Promise((resolve, reject) => {
    // attempt to retrieve
    try {
      let storageUserInfoString = window.localStorage.getItem("userInfo");
      let storageUserInfo = {};
      // if it doesn't exist, initialize it as a blank user;
      // give them our temp recipes for now
      if (!storageUserInfoString) {
        storageUserInfo = {
          savedRecipes: [
            /*
            {
              url: 'json/gyudon.json',
              checkedIngredients: [],
              checkedSteps: []
            },
            {
              url: 'json/chicken_tortilla_soup.json',
              checkedIngredients: [],
              checkedSteps: []
            },
            {
              url: 'json/chicken_n_dumplings.json',
              checkedIngredients: [],
              checkedSteps: []
            },
            */
          ]
        };
        window.localStorage.setItem(
          "userInfo",
          JSON.stringify(storageUserInfo)
        );
      } else {
        storageUserInfo = JSON.parse(storageUserInfoString);
      }

      // update global variable
      for (let attr in storageUserInfo) {
        userInfo[attr] = storageUserInfo[attr];
      }
      // all done!
      resolve(true);
    } catch (error) {
      // uh oh
      console.log("Unable to retrieve userInfo", error);
      reject(error);
    }
  });
}

/**
 * Adds a url to the user's savedRecipes[] array
 * After it resolves, the userInfo object should be updated and
 * the userInfo in localStorage should also be updated
 *
 * Should only reject if we can't update localStorage for some reason
 * @async
 * @function
 * @param {String} url - the url for recipe we want to save
 * @returns {Promise}
 */
async function addRecipeToSaved (url) {
  return new Promise(async (resolve, reject) => {
    // create new recipe object
    let newSavedRecipe = {
      url: url,
      checkedIngredients: [],
      checkedSteps: [],
    };
    // attempt to retrieve JSON
    let recipeJSON = await retrieveJSONFromPage(url);
    recipeData[url] = {
      url: url,
      data: recipeJSON
    };
    let newIndex = userInfo.savedRecipes.push(newSavedRecipe);

    // attempt to save to localStorage
    try {
      window.localStorage.setItem("userInfo", JSON.stringify(userInfo));
      window.localStorage.setItem("recipes", JSON.stringify(recipeData));
      // all good!
      resolve(true);
    } catch (error) {
      // Unable to save to localStorage, remove it from our global variable
      // and reject the promise
      userInfo.savedRecipes.splice(newIndex, 1);
      delete recipeData[url];
      console.log("Unable to add recipe to localStorage", error);
      reject(error);
    }
  });
}

/**
 * Should remove url from the user's savedRecipes[] array.
 * After it resolves, the userInfo object should be updated.
 * the userInfo in localStorage should also be updated.
 *
 * The promise will still resolve even if url didn't exist in the array
 * beforehand
 *
 * Should only reject if there's a problem with the above operations.
 * @async
 * @function
 * @param {String} url - the url for the recipe we want to remove
 * @returns {Promise}
 */
async function removeRecipeFromSaved(url) {
  return new Promise((resolve, reject) => {
    const foundIndex = userInfo.savedRecipes.findIndex(
      (savedRecipe) => savedRecipe.url == url
    );

    if (!foundIndex) {
      // already not in array, resolve!
      resolve(true);
    }

    // save just in case we need to add it back
      let found = userInfo.savedRecipes[foundIndex];
    // remove from userInfo
    userInfo.savedRecipes.splice(foundIndex, 1);
    try {
      window.localStorage.setItem("userInfo", JSON.stringify(userInfo));
      // all good!
      resolve(true);
    } catch (error) {
      // Unable to update localStorage, add it back to global variable 
      // and reject the promise
        userInfo.savedRecipes.splice(foundIndex, 0, found);
      console.log("Unable to remove recipe from saved recipes", error);
      reject(error);
    }
  });
}

/**
 * This function fetches an external recipe url and parses it for its recipe
 * json, which we return when this function resolves.
 * @param {string} url 
 * @returns {Promise}
 */
function retrieveJSONFromPage(url) {
  return new Promise((resolve,reject)=> {
    fetch(url)
      .then(response=>{
        // check if we got the page
        if (!response.ok) {
          console.log(`Unable to retrieve ${url}`);
          reject();
        }
        response.text();
      })
      // get the page as text
      .then(text => {
        // parse it as an html element
        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(text, "text/html");
        // get all scripts with attribute type="application/ld+json"
        const candidates = htmlDoc.querySelectorAll('script[type="application/ld+json]"')
        // go through all of them and see which one is our recipe script
        let ourRecipe = null;
        candidates.forEach((candidateScript)=>{
          // parse it into an object
          const json = JSON.parse(candidateScript.innerHTML);

          if (hasRecipe(json)) {
            ourRecipe = json;
          }
        });

        // if we don't find it then we reject the promise
        if (!ourRecipe) {
          console.log(`Woopsies, json not found from ${url}`);
          reject();
        }
        else {
          // resolve
          resolve(ourRecipe);
        }

      })
      // error
      .catch(error=>{
        console.log(`Unable to retireve ${url}`, error);
        reject();
      });
  });
}

/**
 * Recursively searches the object
 * Returns true if the given object contains a recipe inside of it
 * @param {Object} object - a js object we want to check if it has a recipe in it
 * @returns {Boolean} 
 */
function hasRecipe(object) {
  // go through its keys
  Object.keys(object).forEach((key)=>{
    // if it is of @type Recipe then we're good
    if (key == "@type") {
      if (object[key] == "Recipe") {
        return true;
      }
    }
    // check if it has subobjects and recurse
    else if (!!object[key] && typeof object[key] === 'object') {
      return hasRecipe(object[key]);
    }
  });
  // no recipe!!!!
  return false;
}

export const storage = {userInfo, recipeData, getUserInfo, addRecipeToSaved, removeRecipeFromSaved};