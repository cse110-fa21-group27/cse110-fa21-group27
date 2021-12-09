/**
 * Upon construction, this custom webcomponent is empty.
 * When its .data property is set, the webcomponent is filled
 * in with the recipe data passed into .data
 */
class Directions extends HTMLElement {
  /** Constructs the Component and allows access to the shadow */
  constructor() {
    super();
    // This was based on lab code. I don't want to mess it up this late
    // eslint-disable-next-line no-unused-vars
    const shadow = this.attachShadow({ mode: "open" });
  }

  /**
   * Populates the Directions HTML Component with information from the recipe
   * json file and displays it with some CSS styling.
   * @param {Object} data - The recipe json
   */
  set data(data) {
    // Creates CSS for the Directions Component
    const style = `
      @font-face {
        font-family: 'font';
        src: local('font.ttf') format('truetype');
      }

      @font-face {
        font-family: 'boldFont';
        src: url('semiBold.ttf') format('truetype');
      }
      
      .background {
        margin-left: auto;
        margin-right: auto;
        width: 50vw;
        display: grid;
        grid-template-rows: 
        [top] 50% [image-bottom] 1.5em [title-bottom] 1.5em [info-bottom] [bottom];
        grid-template-columns: [left] auto [right];
        background: #2f4035;
        padding-bottom: 2.5%;
        border: 10px solid #302B27;
        border-bottom-left-radius: 60px;
        border-bottom-right-radius: 60px;
        color: white;
      }
      
      .direction {
        display: flex;
        justify-content: flex-start;
        align-items: top;
        margin-left: auto;
        margin-right: auto;
        border: 2px solid #b1c9b5;
        border-radius: 25px;
        padding: 10px;
        family-font: boldFont;

        background: #655B53;
        gap: 10px;
      }
      
      .listItemStyle {
        grid-column: 2;
        margin-left: auto;
        margin-right: auto;
        border: 0px solid transparent;
        border-radius: 25px;
        height: 1.5em;
        padding: 3px;
        overflow: hidden;
        background: #655B53;

        font-size: 18px;
      }
      
      .listItemStyleShown {
        font-size: 30px;
        grid-column: 2;
        border: 0px solid transparent;
        border-radius: 25px;
        margin-left: auto;
        margin-right: auto;
        width: auto height: auto;
        padding: 40px;
        background: #655B53;
      }
      
      
      /*
          * not to be confused with the buttons at the top of the page
          * below is the containers
          * per each recipe instructions
          */
      
      .buttonstyle {
        margin-left: 0.7em;
        width: auto;
        display: grid;
        grid-template-columns: 10px auto auto;
        justify-content: flex-start;
        align-items: top;
        gap: 10px;
        color: #FFEFEB;
      }
      
      .listItemStyle:hover {
        cursor: pointer;
        filter: brightness(96%);
      }
      
      .listItemStyleShown:hover {
        cursor: pointer;
        filter: brightness(96%);
      }
      
      .downArrow {
        grid-column: 3;
        margin-right: 0.7em;
        width: 1em;
        height: 1em;
        
      }
      
      .upArrow {
        grid-column: 3;
        margin-right: 0.7em;
        width: 2em;
        height: 2em;
      }
      
      .text {
        grid-column: 2;
        text-align: left;
        margin-block: 0 0;
      }
      
      .olStyle {
        margin-left: 0vw;
        margin-right: 5vw;
        display: flex;
        flex-direction: column;
        gap: 10px;
        
      }
      
      .header {
        font-weight: 1em;
        font-size: 2em;
        margin-left: auto;
        margin-right: auto;
        width: auto;
      }
      
      .checkbox {
        zoom: 3;
        width:auto;
        height:auto;
      }
    `;

    const styleElem = document.createElement("style");
    styleElem.innerHTML = style;

    const directionList = data.analyzedInstructions[0].steps;

    // Background frame
    const wrapper = document.createElement("article");
    wrapper.classList.add("background");

    // Directions header "Directions"
    const directions = document.createElement("p");
    directions.classList.add("directions");
    directions.textContent = "Directions";
    directions.classList.add("header");
    wrapper.appendChild(directions);

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
      text.textContent = `${x + ")" + " " + directionList[i].step}`;
      text.classList.add("text");
      wrapper.appendChild(text);
      wrapper.appendChild(downArrow);
      textButton.appendChild(wrapper);
      textButton.classList.add("listItemStyle");

      /**
       * Button click event listener to expand and compress
       * directions.
       */
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
      if (directionList[i].itemListElement !== undefined) {
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
          /**
           * Button click event listener to expand and compress
           * directions.
           */
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
