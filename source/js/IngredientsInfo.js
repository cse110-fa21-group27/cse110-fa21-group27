/**
 * Upon construction, this custom webcomponent is empty.
 * When its .data property is set, the webcomponent is filled
 * in with the recipe data passed into .data
 */
class IngredientsInfo extends HTMLElement {
  /** Constructs the Component and allows access to the shadow */
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
  }

  /**
   * Populates the Ingredient Info HTML Component with information from the recipe
   * json file and displays it with some CSS styling.
   * @param {Object} data - The recipe json
   */
  set data(data) {
    // Creates CSS for the Recipe Info Component
    const style = `
      @font-face {
        font-family: 'font';
        src: URL('font.ttf') format('truetype');
      }
      
      .ingredients-info {
        position: absolute;
        width: 20%;
        height: 66%;
        top: 20%;
        left: 2%;
        background: #FFF6EC;
      }
      
      .ingredients-label {
        display: flex;
        justify: left;
        text-align: left;
        left: 22%;
        top: 0%;
        font-family: font;
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
      
      .form>button {
        position: absolute;
        font-family: font;
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        height: 8%;
        background: #FFB673;
      }
      
      .cartButton {
        left: 14%;
        top: 20%;
      }
      
      .addButton {
        left: 55%;
        top: 30%;
        height: 8%;
      }
      
      .subtractButton {
        left: 35%;
        top: 30%;
        height: 5%;
      }
      
      .quantity {
        text-align: left;
        position: absolute;
        left: 45%;
        top: 26%;
        font-family: font;
        font-style: normal;
        font-weight: normal;
        font-size: 32px;
        line-height: 30px;
      }
      
      #serving_size {
        position: absolute;
        left: 12%;
        top: 38%;
        width: 98%;
        font-family: font;
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 20px;
      }
      
      .ingredients-list {
        text-align: left;
        position: absolute;
        left: 20%;
        top: 48%;
        width: 60%;
        font-family: font;
        font-size: 12px;
        -ms-transform: scale(1.5);
        -moz-transform: scale(1.5);
        -webkit-transform: scale(1.5);
        -o-transform: scale(1.5);
        transform: scale(1.5);
        padding: 10px;
      }
    `;

    // Adds the style sheet to the shadow
    const styleElem = document.createElement("style");
    styleElem.innerHTML = style;

    // Grabs the Ingredients from data
    const ingredientList = data.extendedIngredients;

    // Creating an Overall Container
    const info = document.createElement("div");
    info.classList.add("ingredients-info");

    // Creating the Ingredients Title
    const ingredients = document.createElement("p");
    ingredients.classList.add("ingredients-label");
    ingredients.textContent = "Ingredients";
    info.appendChild(ingredients);

    // Creating a Stylish Line Break to separate the Title from the Rest
    const line = document.createElement("hr");
    line.classList.add("line");
    info.appendChild(line);

    // Creating an Inner Container
    const form = document.createElement("div");
    form.classList.add("form");

    // Adding a Add Ingredients To Cart Button with Event Listener that will
    // call a function to add/remove the Ingredients to Grocery Cart (Not Implemented)
    const addToCart = document.createElement("button");
    addToCart.classList.add("cartButton");
    addToCart.textContent = "Add Ingredients To Cart";
    form.appendChild(addToCart);

    // Adding a Subtract Button with Event Listener that will
    // decrement the number of servings and Ingredients
    // NOT IMPLEMENTED THE CHANGE IN INGREDIENTS
    const subtractQuantity = document.createElement("button");
    subtractQuantity.classList.add("subtractButton");
    subtractQuantity.addEventListener("click", (event) => {
      if (quantity.textContent != 1) {
        quantity.textContent = `${quantity.textContent - 1}`;
      }
    });
    subtractQuantity.textContent = "-";
    form.appendChild(subtractQuantity);

    // Creating a current display of the number of Servings the Recipe
    // will make based on the current number of Ingredients
    const quantity = document.createElement("p");
    quantity.classList.add("quantity");
    quantity.textContent = data.servings;
    form.appendChild(quantity);

    // Adding a Add Button with Event Listener that will
    // increment the number of servings and Ingredients
    // NOT IMPLEMENTED THE CHANGE IN INGREDIENTS
    const addQuantity = document.createElement("button");
    addQuantity.classList.add("addButton");
    addQuantity.addEventListener("click", (event) => {
      quantity.textContent = `${parseInt(quantity.textContent) + 1}`;
    });
    addQuantity.textContent = "+";
    form.appendChild(addQuantity);

    // Creating the list of ingredients with checkboxes to allow the user
    // to only select some ingredients to add to Grocery List (Not Implemented)
    const list = document.createElement("div");
    list.classList.add("ingredients-list");
    for (let i = 0; i < ingredientList.length; i++) {
      const box = document.createElement("input");
      box.type = "checkbox";
      const listItem = document.createElement("label");
      listItem.textContent = `${ingredientList[i].amount} ${ingredientList[i].unit} ${ingredientList[i].name}`;
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

// Creating a custom Ingredients-Info Element
customElements.define("ingredients-info", IngredientsInfo);
