/**
 * This assumes that the following properties are passed into this object before .data is called or set
 * @property {function} renderRecipes
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
   * @param {String[]} data - array of recipeids
   */
  set data(data) {
    this.shadowRoot.innerHTML = "";
    const style = `
    button {
      height: 5vh;
      width: 10vw;
    }

    form {
      height: 50vh;
      width: 50vw;
      margin-left: 25vw;
      margin-right: 25vw;
      margin-top: 25vh;
      background: red;
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
    addButton.addEventListener("click", () => {
      let form = document.createElement("form");
      let name = document.createElement("input");
      name.type = "text";
      name.text = "New Collection";
      form.appendChild(name);
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        let input = document.createElement("input");
        input.type = "checkbox";
        input.classList.add("checkbox");
        form.appendChild(input);
        let text = document.createElement("p");
        let id = data[i];
        console.log(id);
        text.textContent = "Recipe ID: " + id;
        form.appendChild(text);
        let lineBreak = document.createElement("br");
        form.appendChild(lineBreak);
      }

      let createButton = document.createElement("button");
      createButton.textContent = "Create Collection";
      createButton.addEventListener("click", () => {
        let removeForm = document.querySelector("form");
        this.shadowRoot.removeChild(removeForm);
      });
      form.appendChild(createButton);
      this.shadowRoot.appendChild(form);
    });
    this.shadowRoot.appendChild(addButton);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete Collection";
    deleteButton.addEventListener("click", () => {
      let form = document.createElement("form");
      let name = document.createElement("input");
      name.type = "text";
      let input = document.createElement("input");
      input.type = "checkbox";
      input.classList.add("checkbox");
      let text = document.createElement("p");
      text.textContent = "";
    });
    this.shadowRoot.appendChild(deleteButton);

    const page = document.createElement("section");
    page.classList.add("saved-recipes");

    this.renderRecipes(data, page);

    this.shadowRoot.appendChild(styleElem);
    this.shadowRoot.appendChild(page);

    this.shadowRoot.appendChild(document.createElement("hr"));
  }
}

customElements.define("saved-recipes", SavedRecipePage);
