
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
  return new Promise((resolve, reject) => {
    // create new recipe object
    let newSavedRecipe = {
      url: url,
      checkedIngredients: [],
      checkedSteps: [],
    };
    let newIndex = userInfo.savedRecipes.push(newSavedRecipe);
    try {
      window.localStorage.setItem("userInfo", JSON.stringify(userInfo));
      // all good!
      resolve(true);
    } catch (error) {
      // Unable to save to localStorage, remove it from our global variable
      // and reject the promise
      userInfo.savedRecipes.splice(newIndex, 1);
      console.log("Unable to add recipe to saved recipes", error);
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

export const storage = {userInfo, recipeData, getUserInfo, addRecipeToSaved, removeRecipeFromSaved};