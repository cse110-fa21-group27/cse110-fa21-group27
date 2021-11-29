/** glider component. hopeful that it will hold recipe cards in a pretty way.*/
class GliderRecipe extends HTMLElement {
  /** constructs the component and allows access to the shadow */
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
  }
  /**
   * @param {object} data - the recipe json file
   */
  set data(data) {
    const cleanData = {};
    /**
     * Making a more organized object for getting
     * the info from messy recipe json. Might not end up using all of it,
     * I just yoinked this from my lab code
     *
     * cleanData should have
     * cleanData.thumbnail - link to the photo of recipe
     * cleanData.title - title of the recipe
     * cleanData.url - url for the recipe
     * cleanData.organization - organization of the recipe
     * cleanData.time - cook time of the recipe
     * cleanData.ingredients - string of ingredients
     *
     * cleanData.rating is optional and should be
     * rating.score - review score out of 5
     * rating.count - number of reviews
     */

    // process raw data into cleanData
    cleanData.thumbnail = searchForKey(data, "thumbnailUrl");
    cleanData.title = getRecipeTitle(data);
    cleanData.url = getUrl(data);
    cleanData.organization = getOrganization(data);
    let tempTime = searchForKey(data, "cookTime");
    if (!tempTime) tempTime = searchForKey(data, "totalTime");
    cleanData.time = convertTime(tempTime);
    cleanData.ingredients = createIngredientList(
      searchForKey(data, "recipeIngredient")
    );
    const tempRating = searchForKey(data, "aggregateRating");
    if (tempRating) {
      cleanData.rating = {
        count: tempRating.ratingCount,
        score: tempRating.ratingValue,
      };
    }

    // alright cool we got everything, time to actually build it

    // this is gonna be the root element we'll slap everything else onto
    const entry = document.createElement("li");
    entry.classList.add("glide__slide");

    const picture = document.createElement("img");
    picture.setAttribute("src", cleanData.thumbnail);
    picture.setAttribute("alt", cleanData.title);
    picture.setAttribute("id", "rec");
    entry.appendChild(picture);

    this.shadowRoot.appendChild(entry);
  }
}

// define custom element!!
customElements.define("glider-recipe", GliderRecipe);
