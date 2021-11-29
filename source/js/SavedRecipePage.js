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
    .saved-recipes {
      display: flex;
      flex-wrap: wrap;
      gap: 1em;
    }`;

    const styleElem = document.createElement("style");
    styleElem.innerHTML = style;

    const page = document.createElement("section");
    page.classList.add("saved-recipes");
    const h = document.createElement("h1");
    h.textContent = "Saved Recipes";
    this.shadowRoot.appendChild(h);

    this.renderRecipes(data, page);

    this.shadowRoot.appendChild(styleElem);
    this.shadowRoot.appendChild(page);
  }
}

customElements.define("saved-recipes", SavedRecipePage);
