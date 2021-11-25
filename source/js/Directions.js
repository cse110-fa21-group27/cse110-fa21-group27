/**
 * TODO
 */
class Directions extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
  }

  set data(data) {
    const style = `
        .background {
          margin-left: 25vw;
          margin-right: 25vw;
          width: 50vw;
          display: grid;
          grid-template-rows: [top] 50% [image-bottom] 1.5em [title-bottom] 1.5em [info-bottom]  [bottom];
          grid-template-columns: [left] auto [right];
          background: #FFF6EC;
        }
        .direction{
          display: flex;
          justify-content: flex-start;
          align-items: top;
          margin-left: auto;
          margin-right: auto;
          border: 2px solid orange;
          border-radius: 25px;
          padding: 3px;
          background: #FFF6EC;
          gap: 10px; 
        }
        .listItemStyle {
          grid-column:2;
          margin-left: auto;
          margin-right: auto;
          border: 0px solid transparent;
          border-radius: 25px;
          height: 1.5em;
          padding: 3px;
          overflow: hidden ;
          background: #FFF6EC;
        }

        .listItemStyleShown {
          grid-column:2;
          border: 0px solid transparent;
          border-radius: 25px;
          margin-left: auto;
          margin-right: auto;
          width: auto
          height: auto;
          padding: 3px;
          background: #FFF6EC;
        }
    
        .buttonstyle{
          margin-left: 0.7em;
          width: auto;
          display: grid;
          grid-template-columns: 10px auto auto;
          justify-content: flex-start;
          align-items: top;
          gap: 10px; 
        }

        .listItemStyle:hover {
          cursor: pointer;
          filter: brightness(96%);
        }

        .listItemStyleShown:hover {
          cursor: pointer;
          filter: brightness(96%);
        }

        .downArrow{
          grid-column: 3;
          margin-right: 0.7em;
          width: 1em;
          height: 1em;
        }
        .upArrow{
          grid-column:3;
          margin-right: 0.7em;
          width: 2em;
          height: 2em;
        }
        
        .text{
          grid-column:2;
          text-align: left;   
          margin-block: 0 0;       
        }

        .olStyle{
          margin-left: 0vw;
          margin-right: 5vw;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
    
        .header{
          font-style: italic;
          font-size: 2em;
          margin-left: auto;
          margin-right: auto;
          width: auto
        }

        .checkbox{
          margin: 0;
          margin-left: 1em;
          margin-top: 0.3em;
        
        }

        `;

    const styleElem = document.createElement("style");
    styleElem.innerHTML = style;

    const directionList = searchForKey(data, "recipeInstructions");

    const wrapper = document.createElement("article");
    wrapper.classList.add("background");

    const directions = document.createElement("p");
    directions.classList.add("directions");
    directions.textContent = "Directions";
    directions.classList.add("header");
    wrapper.appendChild(directions);

    // let button_wrapper = document.createElement('button_wrapper');
    // button_wrapper.classList.add('buttonstyle');

    // Parsing data to create the direction list.
    const list = document.createElement("ol");
    list.classList.add("olStyle");
    for (let i = 0; i < directionList.length; i++) {
      const direction = document.createElement("div");
      const x = i+1;
      const text_button = document.createElement('button');
      const wrapper = document.createElement("div");
      text_button.appendChild(wrapper);
      const cb = document.createElement("input");
      cb.type = "checkbox";
      cb.classList.add("checkbox");
      direction.appendChild(cb);
      direction.appendChild(text_button);
      direction.classList.add("direction");
      wrapper.classList.add("buttonstyle");
      const text = document.createElement("p");
      const down_arrow = document.createElement("img");
      down_arrow.setAttribute("src", "./images/arrow-down.png");
      const up_arrow = document.createElement("img");
      up_arrow.setAttribute("src", "./images/arrowUp.png");
      down_arrow.classList.add("downArrow");
      up_arrow.classList.add("upArrow");
      
      text.textContent = `${x +")"+ " " + directionList[i].name}`;
      text.classList.add("text");
      wrapper.appendChild(text);
      wrapper.appendChild(down_arrow);
      text_button.appendChild(wrapper);
      text_button.classList.add("listItemStyle");
      
      text_button.addEventListener("click", event => {
        if(text_button.classList.contains("listItemStyle")){
          text_button.classList.remove("listItemStyle");
          text_button.classList.add("listItemStyleShown");
          wrapper.removeChild(down_arrow);
          wrapper.appendChild(up_arrow);
        } else{
        else {
          text_button.classList.remove("listItemStyleShown");
          text_button.classList.add("listItemStyle");
          wrapper.removeChild(up_arrow);
          wrapper.appendChild(down_arrow);
        }
      });
      
      list.appendChild(direction);
     
      // If there are inner steps, display them as well
      if (directionList[i].itemListElement != undefined) {
        for (let j = 0; j < directionList[i].itemListElement.length; j++) {
          let direction = document.createElement("div");
          const y = j+1;
          let text_button = document.createElement('button');
          let wrapper = document.createElement("div");
          text_button.appendChild(wrapper);
          let cb = document.createElement("input");
          cb.type = "checkbox";
          cb.classList.add("checkbox");
          direction.appendChild(cb);
          direction.appendChild(text_button);
          direction.classList.add("direction");
          wrapper.classList.add("buttonstyle");
          let text = document.createElement("p");
          let down_arrow = document.createElement("img");
          down_arrow.setAttribute("src", "./images/arrow-down.png");
          let up_arrow = document.createElement("img");
          up_arrow.setAttribute("src", "./images/arrowUp.png");
          down_arrow.classList.add("downArrow");
          up_arrow.classList.add("upArrow");
      
          text.textContent = `${x + "." + y +")"+ " " + directionList[i].itemListElement[j].text}`;
          text.classList.add("text");
          wrapper.appendChild(text);
          wrapper.appendChild(down_arrow);
          text_button.appendChild(wrapper);
          text_button.classList.add("listItemStyle");
          text_button.addEventListener("click", event => {
            if(text_button.classList.contains("listItemStyle")){
              text_button.classList.remove("listItemStyle");
              text_button.classList.add("listItemStyleShown");
              wrapper.removeChild(down_arrow);
              wrapper.appendChild(up_arrow);
            }
            else{
              text_button.classList.remove("listItemStyleShown");
              text_button.classList.add("listItemStyle");
              wrapper.removeChild(up_arrow);
              wrapper.appendChild(down_arrow);
            }
          });
      
          list.appendChild(direction);
    }
      }
    }
    wrapper.appendChild(list);
    this.shadowRoot.appendChild(styleElem);
    this.shadowRoot.appendChild(wrapper);
  }
}

customElements.define("directions-info", Directions);

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
 *
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
 * @param {Object} data Raw recipe JSON to find name of
 * @return {String} if found, returns the name of recipe as string, otherwise
 * null
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
