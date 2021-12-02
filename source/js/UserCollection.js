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
     * @param {String[]} collections - collection object that contains information 
     * about the recipes inside it
     */
    set data(collections) {
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
      headerName.textContent = collections.name;
      this.shadowRoot.appendChild(headerName);

      let addButton = document.createElement("button");
      addButton.textContent = "Add Recipes";
      this.shadowRoot.appendChild(addButton);
      let deleteButton = document.createElement("button");
      deleteButton.textContent = "Remove Recipes";
      this.shadowRoot.appendChild(deleteButton);

      const div = document.createElement("div");
      this.renderRecipes(collections.ids, div);

      this.shadowRoot.appendChild(div);
      this.shadowRoot.appendChild(styleElem);
    }
  }
  
  customElements.define("user-collection", UserCollection);
  