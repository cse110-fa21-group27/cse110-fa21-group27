/**
 * @class
 * This is the custom web component used to display the grocery list page
 * It assumes the following properties are set before .data is set
 * @property {function} removeFromGroceryList
 * @property {function} updateEntryInGrocery
 */
class GroceryListPage extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
  }

  /**
   * @function
   * After this function is run, the grocery list component will be populated
   * with the information retrieved from the data parameter
   * @param {Array} data - array of grocery list items.
   * Each object in the array contains
   * {
   *   name: the name of the item
   *   checked: boolean if the item is checked or not
   * }
   */
  set data(data) {
    const style = `
    .groceryList {
      background: #302B27;
      display: flex;
      flex-direction: column;
      width: 50vw;
      margin-left: 25vw;
      margin-right: 25vw;
      padding: 0.5em;
    }
    p.ingredientName {
      color: white;
      display: inline;
    }
    input[type=checkbox] {
      display: inline;
      float: right;
    }
    input[type=image] {
      display: inline;
      float: right;
      height: 1em;
      padding-top: 0.25em;
    }

    .listEntry{
      text-align: left;
      padding: 0.25em;
      background: #5B8775;
      margin-top: 0.5em;
    }`;
    const page = document.createElement("div");

    const list = document.createElement("div");
    list.classList.add("groceryList");
    data.forEach((groceryEntry) => {
      // container
      const entry = document.createElement("div");
      entry.classList.add("listEntry");

      //label
      const name = document.createElement("p");
      name.textContent = groceryEntry.name;
      name.classList.add("ingredientName");
      entry.appendChild(name);

      // remove button
      const rm = document.createElement("input");
      rm.setAttribute("type", "image");
      rm.setAttribute("src", "./images/clear_black_24dp.svg");
      rm.addEventListener("click", () => {
        this.removeFromGroceryList(groceryEntry.name).then((e) => {
          entry.remove();
        });
      });
      entry.appendChild(rm);

      // checkbox
      const cb = document.createElement("input");
      cb.setAttribute("type", "checkbox");
      cb.checked = groceryEntry.checked;
      // checkbox event listener
      cb.addEventListener("change", () => {
        this.updateEntryInGrocery(groceryEntry.name, cb.checked).catch((e) => {
          // revert if failed
          cb.checked = !cb.checked;
        });
      });
      entry.appendChild(cb);

      list.appendChild(entry);
    });

    page.appendChild(list);

    const styleElem = document.createElement("style");
    styleElem.innerHTML = style;
    this.shadowRoot.appendChild(styleElem);
    this.shadowRoot.appendChild(page);
  }
}

customElements.define("grocery-list-page", GroceryListPage);
