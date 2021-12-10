/**
 * Upon construction, this custom webcomponent is empty.
 * When its .data property is set, the webcomponent is filled
 * in with the recipe data passed into .data
 * This assumes that the following properties are passed into this object before
 *  .data is called or set
 * @property {function} renderRecipes
 * @property {function} addToCollection
 * @property {function} removeFromCollection
 */
class UserCollection extends HTMLElement {
  /** Constructs the Component and allows access to the shadow */
  constructor() {
    super();
    // legacy from lab. don't break.
    // eslint-disable-next-line no-unused-vars
    const shadow = this.attachShadow({ mode: "open" });
  }

  /**
   * Populates the User Collection HTML Component with information from the
   * recipe json file and displays it with some CSS styling.
   * @param {Object} data - object that contains information
   * about the collection in question and all the user's saved recipes
   */
  set data(data) {
    // Creates CSS for the User Collection Component
    const style = `
      button {
        height: 10vh;
        width: 20vw;
      }
  
      .addRemoveButton {
        position: absolute;
        top: 8vh;
        left: 5vw;
      }
  
      .neverMindButton {
        position: absolute;
        top: 8vh;
        right: 5vw;
      }
  
      div {
        width: 50vw;
        margin-left: 25vw;
        margin-right: 25vw;
        margin-top: 25vh;
        background: grey;
        min-height: 75vh;
      }
  
      .form {
        position: absolute;
        top: 11vh;
        left: 25vw;
        margin-left: 0vw;
        margin-right: 0vw;
        margin-top: 0vh;
        z-index: 1;
      }
  
      input {
        position:absolute;
        left: 5vw;
        height: 3vh;
        width: 3vw;
        margin-top: 20vh;
      }
      
      p {
        position: absolute;
        display: block;
        left: 8vw;
        margin-top: 20vh;
      }
  
      .title {
        position:absolute;
        left: 10vw;
        width: 30vw;
        height: 5vh;
        margin-top: 1vh;
        text-align: center;
      }
  
      .saved-recipes {
        display: flex;
        flex-wrap: wrap;
        gap: 1em;
      }`;

    const styleElem = document.createElement("style");
    styleElem.innerHTML = style;

    const headerName = document.createElement("h1");
    headerName.textContent = data.collection.name;
    this.shadowRoot.appendChild(headerName);

    const addButton = document.createElement("button");
    addButton.textContent = "Add Recipes";
    this.shadowRoot.appendChild(addButton);
    addButton.addEventListener("click", () => {
      const form = document.createElement("div");
      form.classList.add("form");
      const name = document.createElement("p");
      name.classList.add("title");
      name.textContent = "Add Recipes";
      form.appendChild(name);

      // Copy the array
      const recipesToDisplay = [];
      for (let i = 0; i < data.savedRecipes.length; i++) {
        recipesToDisplay.push(data.savedRecipes[i]);
      }
      // Find the recipes that are not duplicates
      for (let i = 0; i < data.collection.ids.length; i++) {
        for (let j = recipesToDisplay.length - 1; j >= 0; j--) {
          // Removing values in reverse to avoid index issues
          if (recipesToDisplay[j].id === data.collection.ids[i]) {
            recipesToDisplay.splice(j, 1);
          }
        }
      }

      // Add options to add recipes from the user's saved recipes
      for (let i = 0; i < recipesToDisplay.length; i++) {
        const input = document.createElement("input");
        input.type = "checkbox";
        input.classList.add("checkbox");
        form.appendChild(input);
        const text = document.createElement("p");
        text.classList.add("options");
        text.textContent = recipesToDisplay[i].name;
        form.appendChild(text);
        const lineBreak = document.createElement("br");
        form.appendChild(lineBreak);
      }

      // Button to add the recipes
      const addButton = document.createElement("button");
      addButton.classList.add("addRemoveButton");
      addButton.textContent = "Add Recipes";
      addButton.addEventListener("click", () => {
        const checkboxArray = form.querySelectorAll("input");
        const recipeCardContainer = document.querySelector(
          "section.saved-recipes"
        );
        const renderArray = [];

        for (let i = 0; i < checkboxArray.length; i++) {
          // Checks which recipes were checked and deletes them
          if (checkboxArray[i].checked) {
            // Adding to collection
            this.addToCollection(recipesToDisplay[i].id, data.collection.name);
            // Array of ids to render
            renderArray.push(recipesToDisplay[i].id);
          }
        }
        // Render the added recipes
        this.renderRecipes(renderArray, recipeCardContainer);

        this.shadowRoot.removeChild(form);
      });

      // Button to remove the form without adding the recipes
      const neverMindButton = document.createElement("button");
      neverMindButton.classList.add("neverMindButton");
      neverMindButton.textContent = "Don't Add Recipes";
      neverMindButton.addEventListener("click", () => {
        this.shadowRoot.removeChild(form);
      });

      form.appendChild(addButton);
      form.appendChild(neverMindButton);

      this.shadowRoot.appendChild(form);
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Remove Recipes";
    // Create the form for the user to delete collections
    deleteButton.addEventListener("click", () => {
      const form = document.createElement("div");
      form.classList.add("form");
      const name = document.createElement("p");
      name.classList.add("title");
      name.textContent = "Remove Recipes";
      form.appendChild(name);

      // Add options to remove each of the user's recipes in this collection
      for (let i = 0; i < data.collection.ids.length; i++) {
        const input = document.createElement("input");
        input.type = "checkbox";
        input.classList.add("checkbox");
        input.setAttribute("recipeId", data.collection.ids[i]);
        form.appendChild(input);
        const text = document.createElement("p");
        text.classList.add("options");
        // Getting id
        const id = data.collection.ids[i];
        // Comparing the id to the saved recipes
        for (let j = 0; j < data.savedRecipes.length; j++) {
          if (id === data.savedRecipes[j].id) {
            text.textContent = "Recipe: " + data.savedRecipes[j].name;
          }
        }

        form.appendChild(text);
        const lineBreak = document.createElement("br");
        form.appendChild(lineBreak);
      }

      // Button to remove the recipes
      const removeButton = document.createElement("button");
      removeButton.classList.add("addRemoveButton");
      removeButton.textContent = "Remove Recipes";
      removeButton.addEventListener("click", () => {
        const checkboxArray = form.querySelectorAll("input");
        const recipeCardArray = this.shadowRoot.querySelectorAll("recipe-card");

        // It deletes in reverse order to make sure there are no index problems
        for (let i = checkboxArray.length - 1; i >= 0; i--) {
          // Checks which recipes were checked and deletes them
          if (checkboxArray[i].checked) {
            const idToRemove = checkboxArray[i].getAttribute("recipeId");
            // Removing from collection
            this.removeFromCollection(idToRemove, data.collection.name);
            // Removing the recipe card
            Array.from(recipeCardArray)
              .find((cardElem) => {
                return cardElem.getAttribute("recipeId") === idToRemove;
              })
              .remove();
          }
        }
        this.shadowRoot.removeChild(form);
      });

      // Button to remove the form without removing the recipes
      const neverMindButton = document.createElement("button");
      neverMindButton.classList.add("neverMindButton");
      neverMindButton.textContent = "Don't Remove Recipes";
      neverMindButton.addEventListener("click", () => {
        this.shadowRoot.removeChild(form);
      });

      form.appendChild(removeButton);
      form.appendChild(neverMindButton);

      this.shadowRoot.appendChild(form);
    });

    this.shadowRoot.appendChild(deleteButton);

    const recipeCardContainer = document.createElement("section");
    recipeCardContainer.classList.add("saved-recipes");
    this.renderRecipes(data.collection.ids, recipeCardContainer);

    this.shadowRoot.appendChild(recipeCardContainer);
    this.shadowRoot.appendChild(styleElem);
  }
}

customElements.define("user-collection", UserCollection);
