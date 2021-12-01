/** Class that creates a Saved Recipe Page HTML Component */
class SavedRecipePage extends HTMLElement {
  /** Constructs the Component and allows access to the shadow */
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
  }

  /**
   * Populates the Saved Recipe Page HTML Component with information from the
   * recipe json file and displays it with some CSS styling.
   * @param {Object} data - Unknown at this point
   */
  set data(data) {
    const style = `
      button {
        height: 5vh;
        width: 10vw;
      }`;

    const styleElem = document.createElement("style");
    styleElem.innerHTML = style;

    const page = document.createElement("article");
    const form = document.createElement("form");
    const input = document.createElement("input");
    input.textContent = "Collection Name";
    form.appendChild(input);

    const newCollection = document.createElement("button");
    newCollection.textContent = "Create new Collection";
    newCollection.addEventListener("click", () => {
      if (input.textContent != "Collection Name" && input.textContent != "") {
        // Create new Collection
        // Somehow add saved recipes to it
      }
    });

    const removeCollection = document.createElement("button");
    removeCollection.textContent = "Remove Collection";
    removeCollection.addEventListener("click", () => {
      // Remove Selected Collection?
    });

    this.shadowRoot.appendChild(styleElem);
    this.shadowRoot.appendChild(page);
  }
}

customElements.define("saved-recipe-page", SavedRecipePage);
