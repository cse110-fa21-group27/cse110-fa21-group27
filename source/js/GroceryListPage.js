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
  set data(data) {}
}

customElements.define("grocery-list-page");
