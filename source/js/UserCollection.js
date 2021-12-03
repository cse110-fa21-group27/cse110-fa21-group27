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
  