/**
 * This assumes that the following properties are passed into this object before .data is called or set
 * @property {function} renderRecipes
 * @property {function} addCollection
 * @property {function} removeCollection
 * @property {function} addToCollection
 * @property {function} removeFromCollection
 */
class SavedRecipePage extends HTMLElement {
  /** Constructs the Component and allows access to the shadow */
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
  }

  /**
   * Populates the Saved Recipe Page HTML Component with information from the
   * recipe json file and displays it with some CSS styling.
   * @param {String[]} userInfo - array of userInfo that contains collections
   * and the saved recipes
   */
  set data(userInfo) {
    this.shadowRoot.innerHTML = "";
    const style = `
    button {
      height: 10vh;
      width: 20vw;
    }

    div {
      display: inline-block property;
      width: 50vw;
      margin-left: 25vw;
      margin-right: 25vw;
      margin-top: 25vh;
      background: grey;
      z-index: 1;
    }

    .saved-recipes {
      display: flex;
      flex-wrap: wrap;
      gap: 1em;
    }`;

    const styleElem = document.createElement("style");
    styleElem.innerHTML = style;

    const h = document.createElement("h1");
    h.textContent = "All Saved Recipes";
    this.shadowRoot.appendChild(h);

    const addButton = document.createElement("button");
    addButton.textContent = "Create New Collection";

    // Create the form for the user to create a new collection
    addButton.addEventListener("click", () => {
      let form = document.createElement("div");
      let name = document.createElement("input");
      name.type = "text";
      name.value = "New Collection";
      form.appendChild(name);
      // Add options to add each of the user's saved recipes
      for (let i = 0; i < userInfo.savedRecipes.length; i++) {
        let input = document.createElement("input");
        input.type = "checkbox";
        input.classList.add("checkbox");
        form.appendChild(input);
        let text = document.createElement("p");
        text.textContent = "Recipe Name: " + userInfo.savedRecipes[i].name;
        form.appendChild(text);
        let lineBreak = document.createElement("br");
        form.appendChild(lineBreak);
      }

      // Create an array of recipe ids to render the new collection
      let idArray = [];
      // Button to create the collection
      let createButton = document.createElement("button");
      createButton.textContent = "Create Collection";
      // Create the collection, add the recipes, and delete the form
      createButton.addEventListener("click", () => {
        this.addCollection(name.value);
        let checkboxArray = form.querySelectorAll("input");
        for (let i = 0; i < checkboxArray.length; i++) {
          // There is an extra input for the user to input collection name, 
          // all the other inputs need to be checked for a checkmark from user
          if (checkboxArray[i].checked) {
            this.addToCollection(userInfo.savedRecipes[i-1].id, name.value);
            idArray.push(userInfo.savedRecipes[i-1].id);
          }
        }
        
        // Rendering the new Collection
        // Collection name
        let headerName = document.createElement("h1");
        headerName.textContent = name.value;
        this.shadowRoot.appendChild(headerName);
        // Create the section to render the colletion recipe cards
        let collection = document.createElement("section");
        collection.classList.add("saved-recipes");
        // Render the cards.
        this.renderRecipes(idArray, collection).then(() => {
          this.shadowRoot.appendChild(collection);
        });

        this.shadowRoot.removeChild(form);
      });

      // Button to remove the form without creating the collection
      let neverMindButton = document.createElement("button");
      neverMindButton.textContent = "Don't Create Collection";
      neverMindButton.addEventListener("click", () => {
        this.shadowRoot.removeChild(form);
      });

      form.appendChild(createButton);
      form.appendChild(neverMindButton);
      this.shadowRoot.appendChild(form);
    });
    this.shadowRoot.appendChild(addButton);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete Collection";
    // Create the form for the user to delete collections
    deleteButton.addEventListener("click", () => {
      let form = document.createElement("div");
      let name = document.createElement("p");
      name.textContent = "Delete Collection";
      form.appendChild(name);
      
      // Add options to remove each of the user's collections
      for (let i = 0; i < userInfo.collections.length; i++) {
        let input = document.createElement("input");
        input.type = "checkbox";
        input.classList.add("checkbox");
        form.appendChild(input);
        let text = document.createElement("p");
        text.textContent = "Collection Name: " + userInfo.collections[i].name;
        form.appendChild(text);
        let lineBreak = document.createElement("br");
        form.appendChild(lineBreak);
      }

      // Button to delete the collections
      let deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete Collections";
      // Select the collections, delete them, and delete the form
      deleteButton.addEventListener("click", () => {
        let checkboxArray = form.querySelectorAll("input");
        for (let i = checkboxArray.length-1; i >= 0 ; i--) {
          // Checks which collections were checked and deletes them
          if (checkboxArray[i].checked) {
            this.removeCollection(userInfo.collections[i].name);
          }
        }
        this.shadowRoot.removeChild(form);
      });

      // Button to remove the form without creating the collection
      let neverMindButton = document.createElement("button");
      neverMindButton.textContent = "Don't Delete Collections";
      neverMindButton.addEventListener("click", () => {
        this.shadowRoot.removeChild(form);
      });

      form.appendChild(deleteButton);
      form.appendChild(neverMindButton);
      this.shadowRoot.appendChild(form);
    });
    this.shadowRoot.appendChild(deleteButton);

    const page = document.createElement("section");
    page.classList.add("saved-recipes");
    
    let idList = [];
    for (let i = 0; i < userInfo.savedRecipes.length; i++) {
      //Only display 3 recipes
      if (i < 3) {
        idList.push(userInfo.savedRecipes[i].id);
      } 
    }
    this.renderRecipes(idList, page);

    this.shadowRoot.appendChild(styleElem);
    this.shadowRoot.appendChild(page);
    this.shadowRoot.appendChild(document.createElement("hr"));
       
    // Displaying previously created collections
    for (let i = 0; i < userInfo.collections.length; i++) {
      // Collection name
      let headerName = document.createElement("h1");
      headerName.textContent = userInfo.collections[i].name;
      this.shadowRoot.appendChild(headerName);
      // Create the section to render the colletion recipe cards
      let collection = document.createElement("section");
      collection.classList.add("saved-recipes");

      // Create the collection page
      collection.addEventListener('click', () => {
        const main = document.querySelector("main");
        // delete everyting in main
        main.innerHTML = "";
        // make user-collection visible
        const userCollection = document.createElement("user-collection");
        // pass the renderrecipes function
        userCollection.renderRecipes = this.renderRecipes;
        // pass the collections functions
        userCollection.addToCollection = this.addToCollection;
        userCollection.removeFromCollection = this.removeFromCollection;
        // give it the array of userInfo for data
        userCollection.data = userInfo.collections[i];
        main.appendChild(userCollection);
      });

      // Getting the ids from the collection
      let idArray = [];
      for (let j = 0; j < userInfo.collections[i].ids.length; j++) {
        // Only display 3 recipes
        if (j < 3) {
          idArray.push(userInfo.collections[i].ids[j]);
        }
      }

      // Render the collection
      this.renderRecipes(idArray, collection);
      this.shadowRoot.appendChild(collection);
      this.shadowRoot.appendChild(document.createElement("hr"));
    }
  }
}

customElements.define("saved-recipes", SavedRecipePage);