/** this is the ingredientsIfo component */
class IngredientsInfo extends HTMLElement {
  /** constructs the component and allows access to the shadow */
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
  }
  /** passes the data object that has the recipe json file
   * @param {object} data - the recipe json file
   */
  set data(data) {
    const style = `
        .ingredients-info {
          position: absolute;
          width: 20%;
          height: 66%;
          top: 20%;
          left: 2%;
          background: #FFF6EC;
      }
      
      .ingredients-label {
          position: absolute;
          left: 22%;
          top: 9%;
          font-family: DM Sans;
          font-style: normal;
          font-weight: normal;
          font-size: 32px;
          line-height: 62px;
      }

      .line {
        margin-top: 36%;
        width: 90%;
        text-align: center;
        color: black;
      }

      .form > button {
          position: absolute;
          font-family: DM Sans;
          font-style: normal;
          font-weight: normal;
          font-size: 18px;
          height: 8%;
          background: #FFB673;
      }
      
      .cartButton {
        left: 6%;
        top: 20%;
      }

      .addButton {
        left: 45%;
        top: 30%;
        height: 8%;
      }

      .subtractButton {
        left: 25%;
        top: 30%;
        height: 5%;
      }

      .quantity {
          position:absolute;
          left:36%;
          top: 25%;
          font-family: DM Sans;
          font-style: normal;
          font-weight: normal;
          font-size: 32px;
          line-height: 30px;
      }
      
      #serving_size {
          position:absolute;
          left:12%;
          top: 38%;
          width:98%;
          font-family: DM Sans;
          font-style: normal;
          font-weight: normal;
          font-size: 12px;
          line-height: 20px;
      }
      
      .ingredients-list {
          position:absolute;
          left: 20%;
          top: 48%;
          width: 60%;
          font-family: DM Sans;
          font-size: 12px;
          -ms-transform: scale(1.5); 
          -moz-transform: scale(1.5); 
          -webkit-transform: scale(1.5); 
          -o-transform: scale(1.5); 
          transform: scale(1.5);
          padding: 10px;
      }
      `;

    const styleElem = document.createElement("style");
    styleElem.innerHTML = style;

    const ingredientList = searchForKey(data, "recipeIngredient");

    const info = document.createElement("div");
    info.classList.add("ingredients-info");

    const ingredients = document.createElement("p");
    ingredients.classList.add("ingredients-label");
    ingredients.textContent = "Ingredients";
    info.appendChild(ingredients);

    const line = document.createElement("hr");
    line.classList.add("line");
    info.appendChild(line);

    const form = document.createElement("div");
    form.classList.add("form");

    const addToCart = document.createElement("button");
    addToCart.classList.add("cartButton");
    addToCart.textContent = "Add Ingredients To Cart";
    form.appendChild(addToCart);

    const subtractQuantity = document.createElement("button");
    subtractQuantity.classList.add("subtractButton");
    subtractQuantity.addEventListener("click", (event) => {
      if (quantity.textContent != 1) {
        quantity.textContent = `${quantity.textContent - 1}`;
      }
    });
    subtractQuantity.textContent = "-";
    form.appendChild(subtractQuantity);

    const quantity = document.createElement("p");
    quantity.classList.add("quantity");
    const servings = searchForKey(data, "recipeYield");
    quantity.textContent = servings[0];
    form.appendChild(quantity);

    const addQuantity = document.createElement("button");
    addQuantity.classList.add("addButton");
    addQuantity.addEventListener("click", (event) => {
      quantity.textContent = `${parseInt(quantity.textContent) + 1}`;
    });
    addQuantity.textContent = "+";
    form.appendChild(addQuantity);

    const list = document.createElement("div");
    list.classList.add("ingredients-list");
    for (let i = 0; i < ingredientList.length; i++) {
      const box = document.createElement("input");
      box.type = "checkbox";
      const listItem = document.createElement("label");
      listItem.textContent = ingredientList[i];
      const lineBreak = document.createElement("br");
      list.appendChild(box);
      list.appendChild(listItem);
      list.appendChild(lineBreak);
    }
    form.appendChild(list);
    info.appendChild(form);

    this.shadowRoot.appendChild(styleElem);
    this.shadowRoot.appendChild(info);
  }
}

customElements.define("ingredients-info", IngredientsInfo);

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
      if (data["@graph"][i]["@type"] == "Article") {
        return data["@graph"][i]["@id"];
      }
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
