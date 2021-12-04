/**
 * This assumes that the following properties are passed into this object before .data is called or set
 * @property {function} renderRecipes
 * @property {function} addToCollection
 * @property {function} removeFromCollection
 */
 class UserCollection extends HTMLElement {
    /** Constructs the Component and allows access to the shadow */
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: "open" });
    }
  
    /**
     * Populates the User Collection HTML Component with information from the
     * recipe json file and displays it with some CSS styling.
     * @param {Object} data - object that contains information 
     * about the collection in question and all the user's saved recipes
     */
    set data(data) {
      this.shadowRoot.innerHTML = "";
      const style = `
      button {
        height: 5vh;
        width: 10vw;
      }
  
      .saved-recipes {
        display: flex;
        flex-wrap: wrap;
        gap: 1em;
      }`;
  
      const styleElem = document.createElement("style");
      styleElem.innerHTML = style;

      let headerName = document.createElement("h1");
      headerName.textContent = data.collection.name;
      this.shadowRoot.appendChild(headerName);

      let addButton = document.createElement("button");
      addButton.textContent = "Add Recipes";
      this.shadowRoot.appendChild(addButton);
      addButton.addEventListener('click', () => {
        let form = document.createElement("div");
        let name = document.createElement("p");
        name.textContent = "Add Recipes";
        form.appendChild(name);

        // Find the recipes that are not duplicates
        let recipesToDisplay = data.savedRecipes;
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
          let input = document.createElement("input");
          input.type = "checkbox";
          input.classList.add("checkbox");
          form.appendChild(input);

          let text = document.createElement("p");
          text.textContent = recipesToDisplay[i].name;
          form.appendChild(text);
          let lineBreak = document.createElement("br");
          form.appendChild(lineBreak);
        }

        // Button to add the recipes
        let addButton = document.createElement("button");
        addButton.textContent = "Add Recipes";
        addButton.addEventListener("click", () => {
          let checkboxArray = form.querySelectorAll("input");
          
          for (let i = 0; i <checkboxArray.length ; i++) {
            // Checks which recipes were checked and deletes them
            if (checkboxArray[i].checked) {
              // Adding to collection
              this.addToCollection(recipesToDisplay[i].id, data.collection.name);
            }
          }
          
          this.shadowRoot.removeChild(form);
        });

        // Button to remove the form without adding the recipes
        let neverMindButton = document.createElement("button");
        neverMindButton.textContent = "Don't Add Recipes";
        neverMindButton.addEventListener("click", () => {
          this.shadowRoot.removeChild(form);
        });

        form.appendChild(addButton);
        form.appendChild(neverMindButton);

        this.shadowRoot.appendChild(form);
      });

      let deleteButton = document.createElement("button");
      deleteButton.textContent = "Remove Recipes";
      // Create the form for the user to delete collections
      deleteButton.addEventListener('click', () => {
        let form = document.createElement("div");
        let name = document.createElement("p");
        name.textContent = "Remove Recipes";
        form.appendChild(name);
        
        // Add options to remove each of the user's recipes in this collection
        for (let i = 0; i < data.collection.ids.length; i++) {
          let input = document.createElement("input");
          input.type = "checkbox";
          input.classList.add("checkbox");
          form.appendChild(input);
          let text = document.createElement("p");
          text.textContent = "Recipe: " + data.collection.ids[i];
          form.appendChild(text);
          let lineBreak = document.createElement("br");
          form.appendChild(lineBreak);
        }

        // Button to remove the recipes
        let removeButton = document.createElement("button");
        removeButton.textContent = "Remove Recipes";
        removeButton.addEventListener("click", () => {
          let checkboxArray = form.querySelectorAll("input");
          // let divSelector = this.shadowRoot.querySelectorAll("div");
          // let recipeCardArray = divSelector[0].querySelectorAll("recipe-card");
          // It deletes in reverse order to make sure there are no index problems
          for (let i = checkboxArray.length-1; i >= 0 ; i--) {
            // Checks which recipes were checked and deletes them
            if (checkboxArray[i].checked) {
              // Removing from collection
              this.removeFromCollection(data.collection.ids[i], data.collection.name);
              // Removing the recipe card
              // divSelector.removeChild(recipeCardArray[i]);
            }
          }
          this.shadowRoot.removeChild(form);
        });

        // Button to remove the form without removing the recipes
        let neverMindButton = document.createElement("button");
        neverMindButton.textContent = "Don't Remove Recipes";
        neverMindButton.addEventListener("click", () => {
          this.shadowRoot.removeChild(form);
        });

        form.appendChild(removeButton);
        form.appendChild(neverMindButton);

        this.shadowRoot.appendChild(form);
      });

      this.shadowRoot.appendChild(deleteButton);

      const div = document.createElement("div");
      this.renderRecipes(data.collection.ids, div);

      this.shadowRoot.appendChild(div);
      this.shadowRoot.appendChild(styleElem);
    }
  }
  
  customElements.define("user-collection", UserCollection);
  