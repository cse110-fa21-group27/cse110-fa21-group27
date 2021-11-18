const userInfo = {}
const recipeData = {}
const renderedText = {}

window.addEventListener('DOMContentLoaded', init);

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
      reject(error);
    }
  });
}

function renderText() {
  console.log(userInfo);
  const body = document.querySelector('body');
  userInfo.savedRecipes.forEach((url) => {
    if (!(url in renderedText)) {
      const newP = document.createElement('p');
      newP.textContent = url;

      renderedText[url] = newP;
      body.appendChild(newP);
    }
  });
}

function bindButton() {
  const button = document.querySelector('button');

  button.addEventListener('click',(event)=>{
    const field = document.querySelector('input');

    addUrlToSaved(field.value).then(()=>{
      renderText();
    });
  });
}