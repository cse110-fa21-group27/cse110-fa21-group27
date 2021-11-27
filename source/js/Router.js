t; /**his is just my Router from lab7 - miguel */
export class Router {
  static routes = {};

  /**
   * Constructor sets up the home function
   * @param {Function} homeFunc - the function to run to route the page to home
   */
  constructor(homeFunc) {
    this["home"] = homeFunc;
  }

  /**
   * Adds a page name & function to the router so that
   * the function can be called later to route the page
   * the added page
   * @param {string} page - The name of the page to route to
   * @param {Function} pageFunc - The function to run when the page is called
   */
  addPage(page, pageFunc) {
    this[page] = pageFunc;
  }

  /**
   * Changes the page visually to the page that has been passed in.
   * statePopped is used to manage back/forward
   * @param {string} page - the name of the page to route to
   * @param {Boolean} statePopped - True if this function is being called by back/forward
   * 'popstate' event
   */
  navigate(page, statePopped) {
    // check if we have the route
    if (!this[page]) {
      console.log(`${page} does not exist.`);
      return;
    }

    let hash = "#" + page;
    if (page == "home") hash = "";

    // if this isn't from a back/forward and we're not already on the page,
    // we add it to the history
    if (!statePopped & (window.location.hash != hash)) {
      history.pushState({ page: page }, "", hash);
      window.location.hash = hash;
    }

    // run the function that changes the page
    this[page]();
  }
}
