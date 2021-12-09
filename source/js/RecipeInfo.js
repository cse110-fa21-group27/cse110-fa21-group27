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
class RecipeInfo extends HTMLElement {
  /** Constructs the Component and allows access to the shadow */
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
  }

  /**
   * Populates the Recipe Info HTML Component with information from the recipe
   * json file and displays it with some CSS styling.
   * @param {Object} data - The recipe json
   */
  set data(data) {
    // Creates CSS for the Recipe Info Component
    const styleRecipe = `

    @font-face {
      font-family: 'font';
      src: local('font.ttf') format('truetype');
    }

    @font-face {
      font-family: 'boldFont';
      src: url('semiBold.ttf') format('truetype');
    }
    
    .recipe-info {
      margin-left: auto;
      margin-right: auto;
      width: 50vw;
      background: #5b8775;
      border: 10px solid #302B27;
      border-top-left-radius: 60px;
      border-top-right-radius: 60px;
    }
    
    .thumbnail-photo {
      height: 50vh;
      object-fit: cover;
      width: 50vw;
      border-bottom: 20px solid #302B27;
      border-top-left-radius: 60px;
      border-top-right-radius: 60px;
    }
    
    .title {
      font-family: font;
      color: #FFEFEB;
      text-align: center;
      font-size: 3vh;
      font-weight: bolder;
      font-family: font;

    }
    
    .rating-time {
      background: #b1c9b5;
      border: 5px solid #395645;
      font-family: font;
      font-size: 20px;
      padding-right: -3px;
      display: inline-flex;
      justify-content: space-between;
      flex-direction: row;
      width: 98%;
    }
    
    .star-image {
      height: 6vh;
      width: 6vw;
      float: center;
    }
    
    .directions {
      color: white;
      text-align: left;
      font-size: 5vh;
      font-style: italic;
      font-family: font;
      padding: none;
    }
    
    button {
      height: 5vh;
      width: 10vw;
    }
        `;

    // Adds the style sheet to the shadow
    const styleElem = document.createElement("style");
    styleElem.innerHTML = styleRecipe;

    // Creating an Overall Container
    const info = document.createElement("article");
    info.classList.add("recipe-info");

    // Adding the Recipe Photo
    const photo = document.createElement("img");
    photo.classList.add("thumbnail-photo");
    photo.setAttribute("src", data.image);
    info.appendChild(photo);

    // Adding the Recipe Title
    const title = document.createElement("p");
    title.classList.add("title");
    title.textContent = data.title;
    info.appendChild(title);

    // Adding a Container called Review
    const review = document.createElement("div");
    review.classList.add("rating-time");

    // Adding the Time to make the Recipe to  Review
    const time = document.createElement("p");
    time.textContent = `${data.readyInMinutes} mins`;
    review.appendChild(time);

    // Adding the Rating of the Recipe to  Review
    const rating = document.createElement("p");
    rating.textContent = `${(data.spoonacularScore * 5.0) / 100.0} stars`;

    // Adding the Star Picture to  Review
    const starPicture = document.createElement("img");
    starPicture.classList.add("star-image");
    switch (Math.round((data.spoonacularScore * 5.0) / 100.0)) {
      case 0:
        starPicture.src = "images/0-star.svg";
        break;
      case 1:
        starPicture.src = "images/1-star.svg";
        break;
      case 2:
        starPicture.src = "images/2-star.svg";
        break;
      case 3:
        starPicture.src = "images/3-star.svg";
        break;
      case 4:
        starPicture.src = "images/4-star.svg";
        break;
      case 5:
        starPicture.src = "images/5-star.svg";
        break;
    }
    review.appendChild(rating);
    review.appendChild(starPicture);

    info.appendChild(review);

    // Adding an Ingredients Button with Event Listener to display
    // Ingredients-Info Element
    // Ingredients Info will contain the list of Ingredients and Quanitities
    const ingredients = document.createElement("button");
    ingredients.classList.add("button");
    ingredients.textContent = "Show Ingredients";
    const showIngredients = document.createElement("ingredients-info");
    showIngredients.data = data;
    ingredients.addEventListener("click", (event) => {
      if (ingredients.textContent === "Show Ingredients") {
        info.appendChild(showIngredients);
        ingredients.textContent = "Hide Ingredients";
      } else {
        info.removeChild(showIngredients);
        ingredients.textContent = "Show Ingredients";
      }
    });

    // Adding a Nutrition Button with Event Listener to display
    // Nutrition Element(Not Created)
    // Nutrition will contain the list of Nutrition for the Recipe
    const nutrition = document.createElement("button");
    nutrition.classList.add("button");
    nutrition.textContent = "Show Nutritions";

    // Adding a Save Recipe Button with Event Listener that
    // will call a function to add/remove the
    // Recipe to the User's Saved Recipes
    const saveRecipe = document.createElement("button");
    saveRecipe.classList.add("button");
    saveRecipe.textContent = this.isSaved ? "Unsave Recipe" : "Save Recipe";
    saveRecipe.addEventListener("click", () => {
      if (!this.isSaved) {
        this.addRecipeToSaved(this.id, data.title).then(() => {
          this.isSaved = true;
          saveRecipe.textContent = "Unsave Recipe";
        });
      } else {
        this.removeRecipeFromSaved(this.id).then(() => {
          this.isSaved = false;
          saveRecipe.textContent = "Save Recipe";
        });
      }
    });

    info.appendChild(ingredients);
    info.appendChild(nutrition);
    info.appendChild(saveRecipe);

    this.shadowRoot.appendChild(styleElem);
    this.shadowRoot.appendChild(info);
  }
}

// Creating a custom Recipe-Info Element
customElements.define("recipe-info", RecipeInfo);
