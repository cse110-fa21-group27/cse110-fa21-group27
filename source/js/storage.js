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
      if (!storageUserInfoString) {
        storageUserInfo = {
          savedRecipes: [],
          collections: [],
          groceryList: [],
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
 * When the promise returned by this function is resolved,
 * the recipes stored in local storage should be placed into
 * the global variable recipeData
 * @returns {Promise}
 */
async function getRecipes() {
  return new Promise(async (resolve, reject) => {
    // attempt to retrieve
    try {
      let storageRecipesString = window.localStorage.getItem("recipes");
      let storageRecipes = {};
      // if it doesn't exist, we fill it with our temp recipes for now
      if (!storageRecipesString) {
        // fetch them
        const list = ["./json/recipes.json"];
        let promises = [];

        list.forEach((url) => {
          promises.push(
            fetch(url)
              .then((response) => {
                return response.json();
              })
              .then((json) => {
                console.log(json.recipes);
                json.recipes.forEach((recipe) => {
                  let id = recipe.id;
                  storageRecipes[id] = {
                    id: id,
                    data: recipe,
                  };
                });

                console.log(storageRecipes);
              })
              .catch((error) => {
                console.log(`Error fetching premadejsons ${error}`);
              })
          );
        });
        // return this pushed promise
        resolve(
          Promise.all(promises).then(() => {
            window.localStorage.setItem(
              "recipes",
              JSON.stringify(storageRecipes)
            );
            // update global variable
            for (const id in storageRecipes) {
              recipeData[id] = storageRecipes[id];
            }
          })
        );
      } else {
        // it does exist, let's just update global variable
        storageRecipes = JSON.parse(storageRecipesString);
        // update global variable
        for (const id in storageRecipes) {
          recipeData[id] = storageRecipes[id];
        }
        // all done!
        resolve(true);
      }
    } catch (error) {
      console.log(`Unable to retrieve recipes ${error}`);
      reject(error);
    }
  });
}

/**
 * This function iterates through the recipeData variable
 * and looks for recipes matching the given options variable
 * This assumes getRecipes() has been called
 * @async
 * @param {Object} options should contain search terms as well as any
 * other options (e.g. sort/filtering)
 * Currently only supports just query string
 * @returns {Promise}
 */
async function search(options) {
  return new Promise((resolve, reject) => {
    try {
      // initialize results array
      let results = [];
      // split up the search terms into an array
      const searchTerms = options.query.toLowerCase().split(" ");
      // iterate through recipeData
      for (const recipeId in recipeData) {
        let hit = false;
        for (const term in searchTerms) {
          // see if its name contains one of the search terms
          if (
            recipeData[recipeId].data.title
              .toLowerCase()
              .includes(searchTerms[term])
          ) {
            hit = true;
          }
        }

        if (hit) {
          results.push(recipeId);
        }
      }
      // done
      resolve(results);
    } catch (error) {
      // uh oh
      console.log(`Error searching for ${options}, ${error}`);
      reject();
    }
  });
}

/**
 * Adds a recipe to the user's savedRecipes[] array
 * After it resolves, the userInfo object should be updated and
 * the userInfo in localStorage should also be updated
 *
 * Should only reject if we can't update localStorage for some reason
 * @async
 * @function
 * @param {String} recipeId - the spoonacular reicpeid for recipe we want to save
 * @param {String} recipeName - the recipe name for recipe we want to save
 * @returns {Promise}
 */
async function addRecipeToSaved(recipeId, recipeName) {
  return new Promise((resolve, reject) => {
    // create new recipe object
    let newSavedRecipe = {
      id: recipeId,
      name: recipeName,
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
 * Should remove recipe from the user's savedRecipes[] array.
 * After it resolves, the userInfo object should be updated.
 * the userInfo in localStorage should also be updated.
 *
 * The promise will still resolve even if recipeId didn't exist in the array
 * beforehand
 *
 * Should only reject if there's a problem with the above operations.
 * @async
 * @function
 * @param {String} recipeId - the url for the recipe we want to remove
 * @returns {Promise}
 */
async function removeRecipeFromSaved(recipeId) {
  return new Promise((resolve, reject) => {
    const foundIndex = userInfo.savedRecipes.findIndex(
      (savedRecipe) => savedRecipe.id == recipeId
    );

    if (foundIndex === -1) {
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
 * Adds a collection to the user's collections[] array
 * After it resolves, the userInfo object should be updated and
 * the userInfo in localStorage should also be updated
 *
 * Should only reject if we can't update localStorage for some reason
 * @async
 * @function
 * @param {String} collectionName - the user's name for the collection
 * @returns {Promise}
 */
async function addCollection(collectionName) {
  return new Promise((resolve, reject) => {
    // grab the current number of collections
    let collectionNumber = userInfo.collections.length;
    // create new collection object
    let newCollection = {
      collectionId: collectionNumber,
      name: collectionName,
      ids: [],
    };
    let newIndex = userInfo.collections.push(newCollection);
    try {
      window.localStorage.setItem("userInfo", JSON.stringify(userInfo));
      // all good!
      resolve(true);
    } catch (error) {
      // Unable to save to localStorage, remove it from our global variable
      // and reject the promise
      userInfo.collections.splice(newIndex, 1);
      console.log("Unable to add new collection to collections", error);
      reject(error);
    }
  });
}

/**
 * Should remove collection from the user's collections[] array.
 * After it resolves, the userInfo object should be updated.
 * the userInfo in localStorage should also be updated.
 *
 * The promise will still resolve even if the collection didn't exist in the array
 * beforehand
 *
 * Should only reject if there's a problem with the above operations.
 * @async
 * @function
 * @param {String} collectionName - the collection's name to remove
 * @returns {Promise}
 */
async function removeCollection(collectionName) {
  return new Promise((resolve, reject) => {
    const foundIndex = userInfo.collections.findIndex(
      (savedCollection) => savedCollection.name == collectionName
    );

    if (foundIndex === -1) {
      // already not in array, resolve!
      resolve(true);
    }

    // save just in case we need to add it back
    let found = userInfo.collections[foundIndex];
    // remove from userInfo
    userInfo.collections.splice(foundIndex, 1);
    try {
      window.localStorage.setItem("userInfo", JSON.stringify(userInfo));
      // all good!
      resolve(true);
    } catch (error) {
      // Unable to update localStorage, add it back to global variable
      // and reject the promise
      userInfo.collections.splice(foundIndex, 0, found);
      console.log("Unable to remove collection from saved collections", error);
      reject(error);
    }
  });
}

/**
 * Adds a recipe to a collection specified by the user
 * After it resolves, the userInfo object should be updated and
 * the userInfo in localStorage should also be updated
 *
 * Should reject if the collection name is incorrect or if
 * we can't update localStorage for some reason
 * @async
 * @function
 * @param {String} recipeId - The Recipe Id that we want to add to the collection
 * @param {String} collectionName - the user's name for the collection
 * @returns {Promise}
 */
async function addToCollection(recipeId, collectionName) {
  return new Promise((resolve, reject) => {
    const foundIndex = userInfo.collections.findIndex(
      (savedCollection) => savedCollection.name == collectionName
    );

    if (foundIndex === -1) {
      // collection does not exist
      reject("Collection does not exist");
    }

    let newIndex = userInfo.collections[foundIndex].ids.push(recipeId);
    try {
      window.localStorage.setItem("userInfo", JSON.stringify(userInfo));
      // all good!
      resolve(true);
    } catch (error) {
      // Unable to save to localStorage, remove it from our global variable
      // and reject the promise
      userInfo.collections[foundIndex].ids.splice(newIndex, 1);
      console.log("Unable to add recipe id to collection", error);
      reject(error);
    }
  });
}

/**
 * Removes a recipe collection specified by the user
 * After it resolves, the userInfo object should be updated.
 * the userInfo in localStorage should also be updated.
 *
 * The promise will still resolve even if the recipe id didn't exist in the
 * collection id array beforehand
 *
 * Should only reject if there's a problem with the above operations.
 * @async
 * @function
 * @param {String} recipeId - The Recipe Id that we want to remove from the collection
 * @param {String} collectionName - the collection's name to remove
 * @returns {Promise}
 */
async function removeFromCollection(recipeId, collectionName) {
  return new Promise((resolve, reject) => {
    const foundCollectionIndex = userInfo.collections.findIndex(
      (savedCollection) => savedCollection.name == collectionName
    );
    const foundRecipeIndex = userInfo.collections[
      foundCollectionIndex
    ].ids.findIndex((savedRecipeId) => savedRecipeId === recipeId);

    if (foundRecipeIndex === -1) {
      // already not in array, resolve!
      resolve(true);
    }

    // save just in case we need to add it back
    let found =
      userInfo.collections[foundCollectionIndex].ids[foundRecipeIndex];
    // remove from userInfo
    userInfo.collections[foundCollectionIndex].ids.splice(foundRecipeIndex, 1);
    try {
      window.localStorage.setItem("userInfo", JSON.stringify(userInfo));
      // all good!
      resolve(true);
    } catch (error) {
      // Unable to update localStorage, add it back to global variable
      // and reject the promise
      userInfo.collections[foundCollectionIndex].ids.splice(
        foundRecipeIndex,
        0,
        found
      );
      console.log("Unable to remove recipe id from saved collections", error);
      reject(error);
    }
  });
}

/**
 * Should return true if the recipe is in the user's saved recipes
 * and false otherwise
 * @param {string} recipeId
 * @returns {Boolean}
 */
function isSaved(recipeId) {
  const savedIds = userInfo.savedRecipes.map((x) => x.id);
  return savedIds.includes(recipeId);
}

/**
 * ON HOLD (UNTESTED)
 * @function
 * This function fetches an external recipe url and parses it for its recipe
 * json, which we return when this function resolves.
 * @param {string} url
 * @returns {Promise}
 */
async function retrieveJSONFromPage(url) {
  return Promise((resolve, reject) => {
    fetch(url)
      .then((response) => {
        // check if we got the page
        if (!response.ok) {
          console.log(`Unable to retrieve ${url}`);
          reject();
        }
        response.text();
      })
      // get the page as text
      .then((text) => {
        // parse it as an html element
        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(text, "text/html");
        // get all scripts with attribute type="application/ld+json"
        const candidates = htmlDoc.querySelectorAll(
          'script[type="application/ld+json]"'
        );
        // go through all of them and see which one is our recipe script
        let ourRecipe = null;
        candidates.forEach((candidateScript) => {
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
        } else {
          // resolve
          resolve(ourRecipe);
        }
      });
  });
}

/**
 * UNTESTED
 * Recursively searches the object
 * Returns true if the given object contains a recipe inside of it
 * @param {Object} object - a js object we want to check if it has a recipe in it
 * @returns {Boolean}
 */
function hasRecipe(object) {
  // go through its keys
  Object.keys(object).forEach((key) => {
    // if it is of @type Recipe then we're good
    if (key == "@type") {
      if (object[key] == "Recipe") {
        return true;
      }
    }
    // check if it has subobjects and recurse
    else if (!!object[key] && typeof object[key] === "object") {
      return hasRecipe(object[key]);
    }
  });
  // no recipe!!!!
  return false;
}

/**
 * When the returned promise is resolved, the userInfo and localStorage should be updated with the new grocery list entry
 * @param {string} ingredient - name of ingredient to add
 * @returns {Promise}
 */
async function addToGroceryList(ingredient) {
  return new Promise((resolve, reject) => {
    // add to userInfo
    const index = userInfo.groceryList.push({
      name: ingredient,
      checked: false,
    });
    // attempt to update userInfo in localStorage
    try {
      window.localStorage.setItem("userInfo", JSON.stringify(userInfo));
      // all good!
      resolve();
    } catch (error) {
      // if there's an error, remove from userInfo
      userInfo.groceryList.splice(index, 1);
      console.log(`Unable to add to grocery list ${error}`);
      reject(error);
    }
  });
}

/**
 * When the returned promise is resolved, the userInfo and localStorage
 * should be updated with the remove grocery list entry
 * @param {string} ingredient - name of ingredient to remove
 * @returns {Promise}
 */
async function removeFromGroceryList(ingredient) {
  return new Promise((resolve, reject) => {
    // edit user Info
    const index = userInfo.groceryList.findIndex((item) => {
      item.name == ingredient;
    });
    if (index === -1) {
      // already not in grocery list, resolve
      resolve();
    }
    const entry = userInfo.groceryList[index];
    userInfo.groceryList.splice(index, 1);
    // attempt to update userInfo in localStorage
    try {
      window.localStorage.setItem("userInfo", JSON.stringify(userInfo));
      // resolve when good
      resolve();
    } catch (error) {
      // reject when there's an error
      userInfo.groceryList.splice(index, 0, entry);
      console.log(`Unable to remove from grocery list ${error}`);
      reject(error);
    }
  });
}

/**
 * After the returned promise is resolved, the corresponding ingredient in the
 * user's grocery list will be updated and so will userInfo and localStorage
 * @param {string} ingredient - the name of the ingredient to update
 * @param {boolean} checked - the new value for the ingredient's checkbox
 * @returns {Promise}
 */
async function updateEntryInGrocery(ingredient, checked) {
  return new Promise((resolve, reject) => {
    // edit user Info
    const index = userInfo.groceryList;
    if (index === -1) {
      // doesn't exist
      console.log(`${ingredient} does not exist in groceryList`);
      reject();
    }
    const previous = userInfo.groceryList[index].checked;
    userInfo.groceryList[index].checked = checked;
    // attempt to update localStorage
    try {
      window.localStorage.setItem("userInfo", JSON.stringify(userInfo));
      // ok
      resolve();
    } catch (error) {
      // reject when there's an error
      // reset to what it was
      userInfo.groceryList[index].checked = previous;
      console.log(`Unable to update grocery list entry ${error}`);
      reject(error);
    }
  });
}

export const storage = {
  userInfo,
  recipeData,
  getUserInfo,
  getRecipes,
  addRecipeToSaved,
  removeRecipeFromSaved,
  isSaved,
  addCollection,
  removeCollection,
  addToCollection,
  removeFromCollection,
  addToGroceryList,
  removeFromGroceryList,
  updateEntryInGrocery,
  search,
};
