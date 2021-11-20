class RecipeCard extends HTMLElement {
  constructor() {
    super();
    let shadow = this.attachShadow({mode: 'open'});
  }

  set data(data) {
    const cleanData = {};
    // process raw data into cleanData
    cleanData.thumbnail = searchForKey(data,'thumbnailUrl');
    cleanData.title = getRecipeTitle(data);
    cleanData.url = getUrl(data);
    cleanData.organization = getOrganization(data);
    let cookTime = searchForKey(data,'cookTime');
    let prepTime = searchForKey(data,'prepTime');
    let totalTime = searchForKey(data,'totalTime');
    cleanData.cookTime = convertTime(cookTime);
    cleanData.prepTime = convertTime(prepTime);
    cleanData.totalTime = convertTime(totalTime);
    cleanData.ingredients = createIngredientList(searchForKey(data,'recipeIngredient'));
    let tempRating = searchForKey(data,'aggregateRating');
    if (tempRating) {
      cleanData.rating = {
        count: tempRating.ratingCount,
        score: tempRating.ratingValue
      }
    }

  }

}

customElements.define('recipe-card', RecipeCard);