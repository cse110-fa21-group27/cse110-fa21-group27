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
    
    .saved-recipes[collectionName]:hover {
      background: #5B8775;
      cursor: pointer;
    }

    h1[collectionName] {
      cursor: pointer;
    }

    .createRemoveButton {
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
      top: 18vh;
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
      margin-top: 17vh;
    }
    
    .deleteInput {
      margin-top: 20vh;
    }

    p {
      position: absolute;
      display: block;
      left: 8vw;
      margin-top: 17vh;
    }

    .deleteP {
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

    const h = document.createElement("h1");
    h.textContent = "All Saved Recipes";

    const addButton = document.createElement("button");
    addButton.textContent = "Create New Collection";

    // Create the form for the user to create a new collection
    addButton.addEventListener("click", () => {
      let form = document.createElement("div");
      form.classList.add("form");
      let name = document.createElement("input");
      name.type = "text";
      name.value = "New Collection";
      name.classList.add("title");
      form.appendChild(name);
      form.appendChild(document.createElement("br"));
      // Add options to add each of the user's saved recipes
      for (let i = 0; i < userInfo.savedRecipes.length; i++) {
        let input = document.createElement("input");
        input.type = "checkbox";
        input.classList.add("checkbox");
        form.appendChild(input);
        let text = document.createElement("p");
        text.textContent = userInfo.savedRecipes[i].name;
        text.classList.add("options");
        form.appendChild(text);
        let lineBreak = document.createElement("br");
        form.appendChild(lineBreak);
      }

      // Create an array of recipe ids to render the new collection
      let idArray = [];
      // Button to create the collection
      let createButton = document.createElement("button");
      createButton.classList.add("createRemoveButton");
      createButton.textContent = "Create Collection";
      // Create the collection, add the recipes, and delete the form
      createButton.addEventListener("click", () => {
        this.addCollection(name.value).then(() => {
          let checkboxArray = form.querySelectorAll("input");
          for (let i = 0; i < checkboxArray.length; i++) {
            // There is an extra input for the user to input collection name,
            // all the other inputs need to be checked for a checkmark from user
            if (checkboxArray[i].checked) {
              this.addToCollection(userInfo.savedRecipes[i - 1].id, name.value);
              // Only display the first three recipes
              if (idArray.length < 3) {
                idArray.push(userInfo.savedRecipes[i - 1].id);
              }
            }
          }

          // Rendering the new Collection
          // Collection name
          let headerName = document.createElement("h1");
          headerName.textContent = name.value;
          headerName.setAttribute("collectionName", name.value);
          headerName.addEventListener("click", () => {
            this.goToCollection(
              userInfo.collections[userInfo.collections.length - 1]
            );
          });
          this.shadowRoot.appendChild(headerName);
          // Create the section to render the colletion recipe cards
          let collection = document.createElement("section");
          collection.classList.add("saved-recipes");
          collection.setAttribute("collectionName", name.value);
          // Render the cards.
          this.renderRecipes(idArray, collection, false).then(() => {
            this.shadowRoot.appendChild(collection);
            const br = document.createElement("hr");
            br.setAttribute("collectionName", name.value);
            this.shadowRoot.appendChild(br);

            // Create the collection page
            collection.addEventListener("click", () => {
              this.goToCollection(
                userInfo.collections[userInfo.collections.length - 1]
              );
            });
          });

          this.shadowRoot.removeChild(form);
        });
      });

      // Button to remove the form without creating the collection
      let neverMindButton = document.createElement("button");
      neverMindButton.classList.add("neverMindButton");
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
      form.classList.add("form");
      let name = document.createElement("p");
      name.textContent = "Delete Collection";
      name.classList.add("title");
      form.appendChild(name);

      // Add options to remove each of the user's collections
      for (let i = 0; i < userInfo.collections.length; i++) {
        let input = document.createElement("input");
        input.type = "checkbox";
        input.classList.add("checkbox");
        input.classList.add("deleteInput");
        input.setAttribute("collectionName", userInfo.collections[i].name);
        form.appendChild(input);
        let text = document.createElement("p");
        text.classList.add("options");
        text.classList.add("deleteP");
        text.textContent = "Collection Name: " + userInfo.collections[i].name;
        form.appendChild(text);
        let lineBreak = document.createElement("br");
        form.appendChild(lineBreak);
      }

      // Grab the sections/headers/brs
      let sectionArray = this.shadowRoot.querySelectorAll("section");
      let headerArray = this.shadowRoot.querySelectorAll("h1");
      let lineArray = this.shadowRoot.querySelectorAll("hr");

      // Button to delete the collections
      let deleteButton = document.createElement("button");
      deleteButton.classList.add("createRemoveButton");
      deleteButton.textContent = "Delete Collections";
      // Select the collections, delete them, and delete the form
      deleteButton.addEventListener("click", () => {
        let checkboxArray = form.querySelectorAll("input");
        // It deletes in reverse order to make sure there are no index problems
        for (let i = checkboxArray.length - 1; i >= 0; i--) {
          // Checks which collections were checked and deletes them
          if (checkboxArray[i].checked) {
            const nameToRemove =
              checkboxArray[i].getAttribute("collectionName");
            this.removeCollection(nameToRemove);
            // Removing the html elements

            Array.from(sectionArray)
              .find((elem) => {
                return elem.getAttribute("collectionName") == nameToRemove;
              })
              .remove();
            Array.from(headerArray)
              .find((elem) => {
                return elem.getAttribute("collectionName") == nameToRemove;
              })
              .remove();
            Array.from(lineArray)
              .find((elem) => {
                return elem.getAttribute("collectionName") == nameToRemove;
              })
              .remove();
          }
        }
        this.shadowRoot.removeChild(form);
      });

      // Button to remove the form without creating the collection
      let neverMindButton = document.createElement("button");
      neverMindButton.classList.add("neverMindButton");
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
    // Loading the saved recipes into an array to pass to render recipes
    let idList = [];
    for (let i = 0; i < userInfo.savedRecipes.length; i++) {
      idList.push(userInfo.savedRecipes[i].id);
    }
    this.renderRecipes(idList, page);

    this.shadowRoot.appendChild(h);
    this.shadowRoot.appendChild(page);

    this.shadowRoot.appendChild(document.createElement("hr"));
    this.shadowRoot.appendChild(styleElem);

    // Displaying previously created collections
    for (let i = 0; i < userInfo.collections.length; i++) {
      // Collection name
      let headerName = document.createElement("h1");
      headerName.textContent = userInfo.collections[i].name;
      headerName.setAttribute("collectionName", userInfo.collections[i].name);
      headerName.addEventListener("click", () => {
        this.goToCollection(userInfo.collections[i]);
      });
      this.shadowRoot.appendChild(headerName);
      // Create the section to render the collection recipe cards
      let collection = document.createElement("section");
      collection.classList.add("saved-recipes");
      collection.setAttribute("collectionName", userInfo.collections[i].name);

      // Create the collection page
      collection.addEventListener("click", () => {
        this.goToCollection(userInfo.collections[i]);
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
      this.renderRecipes(idArray, collection, false);
      this.shadowRoot.appendChild(collection);
      const br = document.createElement("hr");
      br.setAttribute("collectionName", userInfo.collections[i].name);
      this.shadowRoot.appendChild(br);
    }
  }
}

customElements.define("saved-recipes", SavedRecipePage);
