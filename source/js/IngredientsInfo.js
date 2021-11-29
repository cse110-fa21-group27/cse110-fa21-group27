class IngredientsInfo extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
  }

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
