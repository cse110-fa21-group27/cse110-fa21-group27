/**
 * Upon construction, this custom webcomponent is empty.
 * When its .data property is set, the webcomponent is filled
 * in with the recipe data passed into .data
 */
class IngredientsInfo extends HTMLElement {
  /** Constructs the Component and allows access to the shadow */
  constructor() {
    super();
    // eslint-disable-next-line no-unused-vars
    const shadow = this.attachShadow({ mode: "open" });
  }

  /**
   * Populates the Ingredient Info HTML Component with information from the
   * recipe json file and displays it with some CSS styling.
   * @param {Object} data - The recipe json
   */
  set data(data) {
    // Creates CSS for the Ingredients Info Component
    const style = `
      @font-face {
        font-family: 'font';
        src: URL('font.ttf') format('truetype');
      }
      
      .ingredients-info {
        position: absolute;
        font-family: font;
        width: 20%;
        height: 100%;
        top: 20%;
        left: 2%;
        display: block;
        overflow: auto;
        background: #FFF6EC;
      }
      
      .ingredients-label {
        font-style: normal;
        font-weight: normal;
        font-size: 32px;
      }
      
      .line {
        width: 100%;
        text-align: center;
        color: green;
      
      }
      
      .head{
        display: flex;
        flex-direction: column;
        gap: 0px;
        margin-right: 15%;;
        margin-left: 15%;
        align-items: center;
      }
      
      .cartButton {
        font-family: font;
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        height: 6%;
        right: 14%;
        background: #427820;
        color: white;
      }
      
      .serving_container{
        display: flex;
        flex-direction: row;
        gap: 5%;
        align-items: center;
        margin-right: 15%;;
        margin-left: 15%;
        
      }
      
      .addButton {
        height: 6%;
        background: #427820;
        color: white;
      }
      
      .subtractButton {
        height: 6%; 
        background: #427820;
        color: white;
      }
      
      .quantity_txt {
        font-size: 24px;
      }
      .quantity{
        height: 6%;
      }
      
      .ingredients-list {
        text-align: left;
        position: absolute;
        left: 20%;
        top: 325px;
        width: 60%;
        font-family: font;
        font-size: 12px;
        -ms-transform: scale(1.5);
        -moz-transform: scale(1.5);
        -webkit-transform: scale(1.5);
        -o-transform: scale(1.5);
        transform: scale(1.5);
        padding: 10%;
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

    // header Container
    const head = document.createElement("div");
    head.classList.add("head");
    info.appendChild(head);

    // Creating the Ingredients Title
    const ingredients = document.createElement("p");
    ingredients.classList.add("ingredients-label");
    ingredients.textContent = "Ingredients";
    head.appendChild(ingredients);

    // Adding a Add Ingredients To Cart Button with Event Listener that will
    // call a function to add/remove the Ingredients to Grocery Cart
    // (Not Implemented)
    const addToCart = document.createElement("button");
    addToCart.classList.add("cartButton");
    addToCart.textContent = "Add Ingredients To Cart";
    head.appendChild(addToCart);

    // serving container Container
    const servingContainer = document.createElement("div");
    servingContainer.classList.add("serving_container");
    head.appendChild(servingContainer);

    // Creating a current display of the number of Servings the Recipe
    // will make based on the current number of Ingredients
    const quantity = document.createElement("div");
    quantity.classList.add("quantity");
    const quantityText = document.createElement("p");
    quantityText.textContent = data.servings;
    quantityText.classList.add("quantity_txt");

    // Adding a Subtract Button with Event Listener that will
    // decrement the number of servings and Ingredients
    const subtractQuantity = document.createElement("button");
    subtractQuantity.classList.add("subtractButton");
    subtractQuantity.addEventListener("click", () => {
      if (quantityText.textContent != 1) {
        quantityText.textContent = `${quantity.textContent - 1}`;
        const listOfItems = list.querySelectorAll("label");
        for (let i = 0; i < ingredientList.length; i++) {
          const oldName = listOfItems[i].textContent;
          const checkBox = list.querySelector(`input[entry="${oldName}"]`);
          const newAmount =
            (parseFloat(quantityText.textContent) / parseFloat(data.servings)) *
            parseFloat(ingredientList[i].amount);
          listOfItems[
            i
          ].textContent = `${newAmount} ${ingredientList[i].unit} ${ingredientList[i].name}`;
          checkBox.setAttribute("entry", listOfItems[i].textContent);
        }
      }
    });
    subtractQuantity.textContent = "-";
    servingContainer.appendChild(subtractQuantity);

    // Creating a current display of the number of Servings the Recipe
    // will make based on the current number of Ingredients

    quantity.appendChild(quantityText);
    servingContainer.appendChild(quantity);

    // Adding a Add Button with Event Listener that will
    // increment the number of servings and Ingredients
    const addQuantity = document.createElement("button");
    addQuantity.classList.add("addButton");
    addQuantity.addEventListener("click", () => {
      quantityText.textContent = `${parseInt(quantityText.textContent) + 1}`;
      const listOfItems = list.querySelectorAll("label");
      for (let i = 0; i < ingredientList.length; i++) {
        const oldName = listOfItems[i].textContent;
        const checkBox = list.querySelector(`input[entry="${oldName}"]`);
        const newAmount =
          (parseFloat(quantityText.textContent) / parseFloat(data.servings)) *
          parseFloat(ingredientList[i].amount);
        listOfItems[
          i
        ].textContent = `${newAmount} ${ingredientList[i].unit} ${ingredientList[i].name}`;
        checkBox.setAttribute("entry", listOfItems[i].textContent);
      }
    });
    addQuantity.textContent = "+";

    servingContainer.appendChild(addQuantity);

    // Creating a Stylish Line Break to separate the Title from the Rest
    const line = document.createElement("hr");
    line.classList.add("line");
    head.appendChild(line);

    // Creating an Inner Container
    const form = document.createElement("div");
    form.classList.add("form");

    // Creating the list of ingredients with checkboxes to allow the user
    // to only select some ingredients to add to Grocery List (Not Implemented)
    const list = document.createElement("div");
    list.classList.add("ingredients-list");
    for (let i = 0; i < ingredientList.length; i++) {
      const entryName = `${ingredientList[i].amount} ${ingredientList[i].unit} ${ingredientList[i].name}`;
      const box = document.createElement("input");
      box.type = "checkbox";
      box.setAttribute("entry", entryName);
      const listItem = document.createElement("label");
      listItem.textContent = entryName;
      const lineBreak = document.createElement("br");
      list.appendChild(box);
      list.appendChild(listItem);
      list.appendChild(lineBreak);
    }
    form.appendChild(list);
    info.appendChild(form);
    // listen to add to cart button
    addToCart.addEventListener("click", (e) => {
      const listElements = Array.from(list.children);
      listElements.forEach((element) => {
        if (element.nodeName === "INPUT") {
          if (element.checked) {
            this.addToGroceryList(element.getAttribute("entry"));
          }
        }
      });
    });

    this.shadowRoot.appendChild(styleElem);
    this.shadowRoot.appendChild(info);
  }
}

// Creating a custom Ingredients-Info Element
customElements.define("ingredients-info", IngredientsInfo);
