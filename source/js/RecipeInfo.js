class RecipeInfo extends HTMLElement {
    constructor() {
      super();
      let shadow = this.attachShadow({mode: 'open'});
    }

    set data(data) {
        const style=`
        .recipe-info {
          margin-left: 25vw;
          margin-right: 25vw;
          width: 50vw;
          display: grid;
          grid-template-rows: [top] 50% [image-bottom] 1.5em [title-bottom] 1.5em [info-bottom]  [bottom];
          grid-template-columns: [left] auto [right];
    
          background: #FFF6EC;
        }
    
        .recipe-info > img {
          height: 50vh;
          object-fit: cover;
          width: 50vw;
        }

        .title {
          text-align: center;
          font-size: 3vh;
          font-weight: bolder;
        }

        .rating-time {
          padding-left: 1vw;
          padding-right: 1vw;
          display: grid;
          grid-template-rows: [top] auto [bottom];
          grid-template-columns: [left] 50% [middle] 50% [right];
          border: 1px solid orange;
        }

        .directions {
          text-align: center;
          font-size: 2.5vh;
          font-style: italic;
          font-weight: bold;
          padding: none;
        }
        `;

    const styleElem = document.createElement('style');
    styleElem.innerHTML=style;


    const cleanData = {};
    // process raw data into cleanData
    cleanData.thumbnail = searchForKey(data,'thumbnailUrl');
    cleanData.title = getRecipeTitle(data);
    cleanData.url = getUrl(data);
    cleanData.organization = getOrganization(data);
    let cookTime = searchForKey(data,'cookTime');
    let prepTime = searchForKey(data,'prepTime');
    let totalTime = searchForKey(data,'totalTime');
    // let directionList = searchForKey(data, 'recipeInstructions');
    cleanData.cookTime = convertTime(cookTime);
    cleanData.prepTime = convertTime(prepTime);
    cleanData.totalTime = convertTime(totalTime);
    let tempRating = searchForKey(data,'aggregateRating');
    if (!!tempRating) {
      cleanData.rating = {
        count: tempRating.ratingCount,
        score: tempRating.ratingValue
      }
    }

    const info = document.createElement('article');
    info.classList.add('recipe-info');

    const photo = document.createElement('img');
    photo.setAttribute('src', cleanData.thumbnail);
    info.appendChild(photo);

    const title = document.createElement('p');
    title.classList.add('title');
    title.textContent = cleanData.title;
    info.appendChild(title);

    const review = document.createElement('div');
    review.classList.add('rating-time');

    const time = document.createElement('p');
    if (!!cleanData.prepTime) {
      time.textContent = `Prep Time: ${cleanData.prepTime}`;
    } 
    if (!!cleanData.cookTime) {
      time.textContent = `Cook Time: ${cleanData.cookTime}`;
    }
    if (!!cleanData.totalTime) {
      time.textContent = `Total Time: ${cleanData.totalTime}`;
    }
    review.appendChild(time);

    const rating = document.createElement('p');
    rating.textContent = `${cleanData.rating.score} stars`;
    review.appendChild(rating);

    info.appendChild(review);
    
    // const directions = document.createElement('p');
    // directions.classList.add("directions");
    // directions.textContent = "Directions";
    // info.appendChild(directions);

    // // Parsing data to create the direction list.
    // const list = document.createElement('ol');
    // for (let i = 0; i < directionList.length; i++) {
    //   let listItem = document.createElement('li');
    //   listItem.textContent = `${directionList[i].name}`;
    //   list.appendChild(listItem);

    //   // If there are inner steps, display them as well
    //   if (directionList[i].itemListElement != undefined) {
    //     for (let j = 0; j < directionList[i].itemListElement.length; j++) {
    //       let innerListItem = document.createElement('li');
    //       innerListItem.textContent = `${directionList[i].itemListElement[j].text}`;
    //       list.appendChild(innerListItem);
    //     }
    //   }
    // }
    // info.appendChild(list);

    this.shadowRoot.appendChild(styleElem);
    this.shadowRoot.appendChild(info);
  }

}

customElements.define('recipe-info', RecipeInfo);


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