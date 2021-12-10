/**
 * Upon construction, this custom webcomponent is empty.
 * When its .data property is set, the webcomponent is filled
 * in with the recipe data passed into .data
 *
 * This assumes the following properties are set before .data
 * @property {Function} addRecipeToSaved
 * @property {Function} removeRecipeFromSaved
 * @property {Boolean} isSaved
 * @property {string} id - The id for the recipe displayed
 */
class RecipePage extends HTMLElement {
  /** Constructs the Component and allows access to the shadow */
  constructor() {
    super();
    // legacy from lab. don't break.
    // eslint-disable-next-line no-unused-vars
    const shadow = this.attachShadow({ mode: "open" });
  }

  /**
   * Creates the Recipe-Info and Directions-Info Elements and passes the
   * data object that has the recipe json file.
   * @param {object} data - The recipe json
   */
  set data(data) {
    // Creating an Overall Container
    const page = document.createElement("article");

    // Creating a Recipe-Info Element from RecipeInfo.js
    const info = document.createElement("recipe-info");

    // Creating a Directions-Info Element from Directions.js
    const directions = document.createElement("directions-info");

    // Allowing the User to save Recipe from this Recipe Page
    info.addRecipeToSaved = this.addRecipeToSaved;
    info.removeRecipeFromSaved = this.removeRecipeFromSaved;
    info.isSaved = this.isSaved;
    // pass recipeId to info
    info.id = this.id;

    // Passing in Data to Recipe-Info and Directions-Info Elements to
    // Populate the Page
    info.data = data;
    directions.data = data;
    page.appendChild(info);
    page.appendChild(directions);

    this.shadowRoot.appendChild(page);
  }
}

// Creating a custom Recipe-Page Element
customElements.define("recipe-page", RecipePage);
