class RecipeCard extends HTMLElement {
  constructor() {
    super();
    let shadow = this.attachShadow({mode: 'open'});
  }

  set data(data) {
    const stylesElem = document.createElement('style');
    const styles = `
    .recipe-card {
      width: 50%;
      display: grid;
      grid-template-rows: [image-top] 500px [title-top] 25px [info-top] 30px [directions-label-top] 30px [directions-top] auto [directions-bottom];
      grid-template-columns: [left] auto [right];
      justify-items: stretch;
    }
    
    .recipe-card-bg {
      grid-row: title-top / directions-bottom;
      gird-column: left / right;
      background: #fff;
    }
    
    .recipe-photo {
      grid-row: image-top / title-top;
      grid-column: left / right;
    }

    .recipe-title {
      grid-row: title-top / info-top;
      grid-column: left / right;
    }

    .recipe-info {
      grid-row: info-top / directions-label-top;
      grid-column: left / right;
     
      display: grid;
      grid-template-rows: [left] auto [right];
      grid-template-columns: [prep-start] 25% [cook-start] 25% [rating-start] 40% [save-start] 10% [end];
    }

    .recipe-directions-label {
      grid-row: directions-label-top / directions-top;
      grid-column: left / right;
    }
    `;
    stylesElem.innerHTML = styles;

    const cleanData = {};
    // process raw data into cleanData
    cleanData.thumbnail = searchForKey(data,'thumbnailUrl');
    cleanData.title = getRecipeTitle(data);
    cleanData.url = getUrl(data);
    cleanData.organization = getOrganization(data);
    let cookTime = searchForKey(data,'cookTime');
    let prepTime = searchForKey(data,'prepTime');
    let totalTime = searchForKey(data,'totalTime');
    cleanData.cookTime = convertTime(cookTime);
    cleanData.prepTime = convertTime(prepTime);
    cleanData.totalTime = convertTime(totalTime);
    cleanData.ingredients = createIngredientList(searchForKey(data,'recipeIngredient'));
    let tempRating = searchForKey(data,'aggregateRating');
    if (tempRating) {
      cleanData.rating = {
        count: tempRating.ratingCount,
        score: tempRating.ratingValue
      }
    }

    const card = document.createElement('div');
    card.classList.add('recipe-card');

    const picture = document.createElement('img');
    picture.classList.add('recipe-photo');
    picture.setAttribute('src', cleanData.thumbnail);
    card.appendChild(picture);

    const bg = document.createElement('div');
    bg.classList.add('recipe-card-bg');
    card.appendChild(bg);

    const title = document.createElement('h2');
    title.innerText = cleanData.title;
    title.classList.add('recipe-title');
    card.appendChild(title);
    
    const recipeInfo = document.createElement('recipe-info');
    recipeInfo.data = cleanData;
    recipeInfo.classList.add('recipe-info');
    card.appendChild(recipeInfo);

    const directionsLabel = document.createElement('h2');
    directionsLabel.innerText = "Directions";
    directionsLabel.classList.add('recipe-directions-label');

    /* TODO: directions list element */

    this.shadowRoot.appendChild(stylesElem);
    this.shadowRoot.appendChild(card);
  }
}

customElements.define('recipe-card', RecipeCard);


/*********************************************************************/
/***                       Helper Functions:                       ***/
/***          Shout out to the TA's lemme just yoink these         ***/
/*********************************************************************/

/**
 * Recursively search for a key nested somewhere inside an object
 * @param {Object} object the object with which you'd like to search
 * @param {String} key the key that you are looking for in the object
 * @returns {*} the value of the found key
 */
 function searchForKey(object, key) {
  var value;
  Object.keys(object).some(function (k) {
    if (k === key) {
      value = object[k];
      return true;
    }
    if (object[k] && typeof object[k] === 'object') {
      value = searchForKey(object[k], key);
      return value !== undefined;
    }
  });
  return value;
}

/**
 * Similar to getUrl(), this function extracts the organizations name from the
 * schema JSON object. It's not in a standard location so this function helps.
 * @param {Object} data Raw recipe JSON to find the org string of
 * @returns {String} If found, it retuns the name of the org as a string, otherwise null
 */
 function getOrganization(data) {
  if (data.publisher?.name) return data.publisher?.name;
  if (data['@graph']) {
    for (let i = 0; i < data['@graph'].length; i++) {
      if (data['@graph'][i]['@type'] == 'Organization') {
        return data['@graph'][i].name;
      }
    }
  };
  return null;
}

/**
 * Similar to getOrganization(), this extracts recipe name from raw JSON
 * @param {Object} Data Raw recipe JSON to find name of
 * @returns {String} if found, returns the name of recipe as string, otherwise null
 */
function getRecipeTitle(data) {
  if (data.name) return data.name;
  let value = null;
  if (data['@graph']) {
    data['@graph'].forEach((obj) => {
      if (obj['@type'] == 'Recipe') {
        value = obj['name'];
      }
    });
  }
  return value;
}

/**
 * Extract the URL from the given recipe schema JSON object
 * @param {Object} data Raw recipe JSON to find the URL of
 * @returns {String} If found, it returns the URL as a string, otherwise null
 */
function getUrl(data) {
  if (data.url) return data.url;
  if (data['@graph']) {
    for (let i = 0; i < data['@graph'].length; i++) {
      if (data['@graph'][i]['@type'] == 'Article') return data['@graph'][i]['@id'];
    }
  };
  return null;
}

/**
 * Converts ISO 8061 time strings to regular english time strings.
 * Not perfect but it works for this lab
 * @param {String} time time string to format
 * @return {String} formatted time string
 */
function convertTime(time) {
  let timeStr = '';

  // Remove the 'PT'
  time = time.slice(2);

  let timeArr = time.split('');
  if (time.includes('H')) {
    for (let i = 0; i < timeArr.length; i++) {
      if (timeArr[i] == 'H') return `${timeStr} hr`;
      timeStr += timeArr[i];
    }
  } else {
    for (let i = 0; i < timeArr.length; i++) {
      if (timeArr[i] == 'M') return `${timeStr} min`;
      timeStr += timeArr[i];
    }
  }

  return '';
}

/**
 * Takes in a list of ingredients raw from imported data and returns a neatly
 * formatted comma separated list.
 * @param {Array} ingredientArr The raw unprocessed array of ingredients from the
 *                              imported data
 * @return {String} the string comma separate list of ingredients from the array
 */
function createIngredientList(ingredientArr) {
  let finalIngredientList = '';

  /**
   * Removes the quantity and measurement from an ingredient string.
   * This isn't perfect, it makes the assumption that there will always be a quantity
   * (sometimes there isn't, so this would fail on something like '2 apples' or 'Some olive oil').
   * For the purposes of this lab you don't have to worry about those cases.
   * @param {String} ingredient the raw ingredient string you'd like to process
   * @return {String} the ingredient without the measurement & quantity 
   * (e.g. '1 cup flour' returns 'flour')
   */
  function _removeQtyAndMeasurement(ingredient) {
    return ingredient.split(' ').splice(2).join(' ');
  }

  ingredientArr.forEach(ingredient => {
    ingredient = _removeQtyAndMeasurement(ingredient);
    finalIngredientList += `${ingredient}, `;
  });

  // The .slice(0,-2) here gets ride of the extra ', ' added to the last ingredient
  return finalIngredientList.slice(0, -2);
}

