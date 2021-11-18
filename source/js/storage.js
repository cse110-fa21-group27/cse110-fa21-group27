const userInfo = {};
const renderedText = {};

window.addEventListener('DOMContentLoaded', init);

// temporary init for demo
async function init() {
  getUserInfo().then(renderText);
  bindButton();
}

/**
 * After this function resolves, the userInfo object 
 * should be populated with the userInfo taken from storage
 * @async @function
 * @returns {Promise}
 */
async function getUserInfo() {
  return new Promise((resolve, reject) => {
    // attempt to retrieve
    try {
      let storageUserInfoString = window.localStorage.getItem('userInfo');
      let storageUserInfo = {}
      // if it doesn't exist, initialize it as a blank user;
      if (!storageUserInfoString) {
        storageUserInfo = {
          savedRecipes: []
        };
        window.localStorage.setItem('userInfo', JSON.stringify(storageUserInfo));
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
      console.log('Unable to retrieve userInfo', error);
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
 * @async @function
 * @param {String} url - the url for recipe we want to save
 * @returns {Promise}
 */
async function addUrlToSaved(url) {
  return new Promise((resolve,reject)=>{
    // TODO: verify url
    let newIndex = userInfo.savedRecipes.push(url);
    try {
      window.localStorage.setItem('userInfo', JSON.stringify(userInfo));
      // all good!
      resolve(true);
    } catch (error) {
      // unable to save to localStorage, remove it from our global variable
      // and reject the promise
      userInfo.savedRecipes.splice(newIndex,1);
      console.log('Unable to add url to saved recipes', error);
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
 * @async @function
 * @param {String} url - the url for the recipe we want to remove
 * @returns {Promise}
 */
async function removeUrlFromSaved(url) {
  return new Promise((resolve,reject)=> {
    let foundIndex = userInfo.savedRecipes.findIndex((savedRecipe)=>savedRecipe==url);

    if (!foundIndex) { // already not in array, resolve!
      resolve(true);
    }

    // save just in case we need to add it back
    let found = userInfo.savedRecipes[foundIndex];
    // remove from userInfo
    userInfo.savedRecipes.splice(foundIndex, 1);
    try {
      window.localStorage.setItem('userInfo', JSON.stringify(userInfo));
      // all good!
      resolve(true);
    } catch (error) {
      // unable to update localStorage, add it back to global variable 
      // and reject the promise
      userInfo.savedRecipes.splice(foundIndex, 0, found);
      console.log('Unable to remove url from saved recipes', error);
      reject(error);
    }

  });

}

// rendering text for demo
async function renderText() {
  const body = document.querySelector('body');
  // add unrendered entries
  userInfo.savedRecipes.forEach((url) => {
    if (!(url in renderedText)) {
      const newLine = document.createElement('div');
      newLine.classList.add('recipeEntry');
      newLine.setAttribute('url', url);

      const newP = document.createElement('p');
      newP.textContent = url;

      // binding removeURL for demo
      const newButton = document.createElement('button')
      newButton.value = url;
      newButton.textContent = "remove";
      newButton.addEventListener('click', (event)=>{
        removeUrlFromSaved(event.currentTarget.value)
          .then(()=>renderText());
      });

      newLine.appendChild(newButton);
      newLine.appendChild(newP);

      // keep track of each entry we already have rendered
      renderedText[url] = newLine;
      body.appendChild(newLine);
    }
  });

  // remove rendered entries that aren't in userInfo
  for (let recipeEntry in renderedText) {
    const isSaved = !!userInfo.savedRecipes.find((url)=>{
      return url==recipeEntry;
    });

    if (!isSaved) {
      renderedText[recipeEntry].remove();
      delete renderedText[recipeEntry];
    }
  }
}

// binding add button for demo
function bindButton() {
  const button = document.querySelector('button');

  button.addEventListener('click',(event)=>{
    const field = document.querySelector('input');

    addUrlToSaved(field.value).then(()=>{
      renderText();
    });
  });
}