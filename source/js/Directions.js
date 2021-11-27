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
      const x = i + 1;
      const textButton = document.createElement("button");
      const wrapper = document.createElement("div");
      textButton.appendChild(wrapper);
      const cb = document.createElement("input");
      cb.type = "checkbox";
      cb.classList.add("checkbox");
      direction.appendChild(cb);
      direction.appendChild(textButton);
      direction.classList.add("direction");
      wrapper.classList.add("buttonstyle");
      const text = document.createElement("p");
      const downArrow = document.createElement("img");
      downArrow.setAttribute("src", "./images/arrow-down.png");
      const upArrow = document.createElement("img");
      upArrow.setAttribute("src", "./images/arrowUp.png");
      downArrow.classList.add("downArrow");
      upArrow.classList.add("upArrow");
      text.textContent = `${x + ")" + " " + directionList[i].name}`;
      text.classList.add("text");
      wrapper.appendChild(text);
      wrapper.appendChild(downArrow);
      textButton.appendChild(wrapper);
      textButton.classList.add("listItemStyle");

      textButton.addEventListener("click", (event) => {
        if (textButton.classList.contains("listItemStyle")) {
          textButton.classList.remove("listItemStyle");
          textButton.classList.add("listItemStyleShown");
          wrapper.removeChild(downArrow);
          wrapper.appendChild(upArrow);
        } else {
          textButton.classList.remove("listItemStyleShown");
          textButton.classList.add("listItemStyle");
          wrapper.removeChild(upArrow);
          wrapper.appendChild(downArrow);
        }
      });

      list.appendChild(direction);

      // If there are inner steps, display them as well
      if (directionList[i].itemListElement != undefined) {
        for (let j = 0; j < directionList[i].itemListElement.length; j++) {
          const direction = document.createElement("div");
          const y = j + 1;
          const textButton = document.createElement("button");
          const wrapper = document.createElement("div");
          textButton.appendChild(wrapper);
          const cb = document.createElement("input");
          cb.type = "checkbox";
          cb.classList.add("checkbox");
          direction.appendChild(cb);
          direction.appendChild(textButton);
          direction.classList.add("direction");
          wrapper.classList.add("buttonstyle");
          const text = document.createElement("p");
          const downArrow = document.createElement("img");
          downArrow.setAttribute("src", "./images/arrow-down.png");
          const upArrow = document.createElement("img");
          upArrow.setAttribute("src", "./images/arrowUp.png");
          downArrow.classList.add("downArrow");
          upArrow.classList.add("upArrow");

          text.textContent = `${
            x + "." + y + ")" + " " + directionList[i].itemListElement[j].text
          }`;
          text.classList.add("text");
          wrapper.appendChild(text);
          wrapper.appendChild(downArrow);
          textButton.appendChild(wrapper);
          textButton.classList.add("listItemStyle");
          textButton.addEventListener("click", (event) => {
            if (textButton.classList.contains("listItemStyle")) {
              textButton.classList.remove("listItemStyle");
              textButton.classList.add("listItemStyleShown");
              wrapper.removeChild(downArrow);
              wrapper.appendChild(upArrow);
            } else {
              textButton.classList.remove("listItemStyleShown");
              textButton.classList.add("listItemStyle");
              wrapper.removeChild(upArrow);
              wrapper.appendChild(downArrow);
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
  Object.keys(object).some(function(k) {
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
