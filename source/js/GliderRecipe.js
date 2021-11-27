class GliderRecipe extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
  }

  set data(data) {
    const cleanData = {};
    /**
     * Making a more organized object for getting
     * the info from messy recipe json. Might not end up using all of it,
     * I just yoinked this from my lab code
     *
     * cleanData should have
     * cleanData.thumbnail - link to the photo of recipe
     * cleanData.title - title of the recipe
     * cleanData.url - url for the recipe
     * cleanData.organization - organization of the recipe
     * cleanData.time - cook time of the recipe
     * cleanData.ingredients - string of ingredients
     *
     * cleanData.rating is optional and should be
     * rating.score - review score out of 5
     * rating.count - number of reviews
     */

    // process raw data into cleanData
    cleanData.thumbnail = searchForKey(data, "thumbnailUrl");
    cleanData.title = getRecipeTitle(data);
    cleanData.url = getUrl(data);
    cleanData.organization = getOrganization(data);
    let tempTime = searchForKey(data, "cookTime");
    if (!tempTime) tempTime = searchForKey(data, "totalTime");
    cleanData.time = convertTime(tempTime);
    cleanData.ingredients = createIngredientList(
      searchForKey(data, "recipeIngredient")
    );
    const tempRating = searchForKey(data, "aggregateRating");
    if (tempRating) {
      cleanData.rating = {
        count: tempRating.ratingCount,
        score: tempRating.ratingValue,
      };
    }

    // alright cool we got everything, time to actually build it

    // this is gonna be the root element we'll slap everything else onto
    const entry = document.createElement("li");
    entry.classList.add("glide__slide");

    const picture = document.createElement("img");
    picture.setAttribute("src", cleanData.thumbnail);
    picture.setAttribute("alt", cleanData.title);
    picture.setAttribute("id", "rec");
    entry.appendChild(picture);

    this.shadowRoot.appendChild(entry);
  }
}

/** *******************************************************************/
/** *                       Helper Functions:                       ***/
/** *          Shout out to the TA's lemme just yoink these         ***/
/** *******************************************************************/

/**
 * Recursively search for a key nested somewhere inside an object
 * @param {Object} object the object with which you'd like to search
 * @param {String} key the key that you are looking for in the object
 * @return {*} the value of the found key
 */
function searchForKey(object, key) {
  let value;
  Object.keys(object).some(function (k) {
    if (k === key) {
      value = object[k];
      return true;
    }
    if (object[k] && typeof object[k] === "object") {
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
 * @return {String} If found, it retuns the name of the org as a string, otherwise null
 */
function getOrganization(data) {
  if (data.publisher?.name) return data.publisher?.name;
  if (data["@graph"]) {
    for (let i = 0; i < data["@graph"].length; i++) {
      if (data["@graph"][i]["@type"] == "Organization") {
        return data["@graph"][i].name;
      }
    }
  }
  return null;
}

/**
 * Similar to getOrganization(), this extracts recipe name from raw JSON
 * @param {Object} Data Raw recipe JSON to find name of
 * @return {String} if found, returns the name of recipe as string, otherwise null
 */
function getRecipeTitle(data) {
  if (data.name) return data.name;
  let value = null;
  if (data["@graph"]) {
    data["@graph"].forEach((obj) => {
      if (obj["@type"] == "Recipe") {
        value = obj["name"];
      }
    });
  }
  return value;
}

/**
 * Extract the URL from the given recipe schema JSON object
 * @param {Object} data Raw recipe JSON to find the URL of
 * @return {String} If found, it returns the URL as a string, otherwise null
 */
function getUrl(data) {
  if (data.url) return data.url;
  if (data["@graph"]) {
    for (let i = 0; i < data["@graph"].length; i++) {
      if (data["@graph"][i]["@type"] == "Article")
        return data["@graph"][i]["@id"];
    }
  }
  return null;
}

/**
 * Converts ISO 8061 time strings to regular english time strings.
 * Not perfect but it works for this lab
 * @param {String} time time string to format
 * @return {String} formatted time string
 */
function convertTime(time) {
  let timeStr = "";

  // Remove the 'PT'
  time = time.slice(2);

  const timeArr = time.split("");
  if (time.includes("H")) {
    for (let i = 0; i < timeArr.length; i++) {
      if (timeArr[i] == "H") return `${timeStr} hr`;
      timeStr += timeArr[i];
    }
  } else {
    for (let i = 0; i < timeArr.length; i++) {
      if (timeArr[i] == "M") return `${timeStr} min`;
      timeStr += timeArr[i];
    }
  }

  return "";
}

/**
 * Takes in a list of ingredients raw from imported data and returns a neatly
 * formatted comma separated list.
 * @param {Array} ingredientArr The raw unprocessed array of ingredients from the
 *                              imported data
 * @return {String} the string comma separate list of ingredients from the array
 */
function createIngredientList(ingredientArr) {
  let finalIngredientList = "";

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
    return ingredient.split(" ").splice(2).join(" ");
  }

  ingredientArr.forEach((ingredient) => {
    ingredient = _removeQtyAndMeasurement(ingredient);
    finalIngredientList += `${ingredient}, `;
  });

  // The .slice(0,-2) here gets ride of the extra ', ' added to the last ingredient
  return finalIngredientList.slice(0, -2);
}

// define custom element!!
customElements.define("glider-recipe", GliderRecipe);
