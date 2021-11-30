/**
 * Upon construction, this custom webcomponent is empty.
 * When its .data property is set, the webcomponent is filled
 * in with the recipe data passed into .data
 *
 * This assumes the following properties are set before .data
 * @property {Function} addRecipeToSaved
 * @property {Function} removeRecipeFromSaved
 * @property {Boolean} isSaved
 * @property {string} id - the id for the recipe page this component is displaying
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
   * @param {Object} data - The recipe json file
   */
  set data(data) {
    // Creates CSS for the Recipe Info Component
    const style = `
        .recipe-info {
          margin-left: 25vw;
          margin-right: 25vw;
          width: 50vw;
          background: #FFF6EC;
        }
    
        .thumbnail-photo {
          height: 50vh;
          object-fit: cover;
          width: 50vw;
        }

        .title {
          text-align: center;
          font-size: 3vh;
          font-weight: bolder;
        }

        .rating-time {
          padding-left: 1vw;
          padding-right: 1vw;
          display: grid;
          grid-template-rows: [top] auto [bottom];
          grid-template-columns: [left] 50% [middle] 50% [right];
          border: 1px solid orange;
        }

        .star-image {
          height: 5vh;
          width: 5vw;
          float: right;
        }

        .directions {
          text-align: center;
          font-size: 2.5vh;
          font-style: italic;
          font-weight: bold;
          padding: none;
        }

        button {
          height: 5vh;
          width: 10vw;
        }
        `;

    const styleElem = document.createElement("style");
    styleElem.innerHTML = style;

    const info = document.createElement("article");
    info.classList.add("recipe-info");

    const photo = document.createElement("img");
    photo.classList.add("thumbnail-photo");
    photo.setAttribute("src", data.image);
    info.appendChild(photo);

    const title = document.createElement("p");
    title.classList.add("title");
    title.textContent = data.title;
    info.appendChild(title);

    const review = document.createElement("div");
    review.classList.add("rating-time");

    const time = document.createElement("p");
    time.textContent = `${data.readyInMinutes} mins`;
    review.appendChild(time);

    const rating = document.createElement("p");
    rating.textContent = `${(data.spoonacularScore * 5.0) / 100.0} stars`;
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

    const ingredients = document.createElement("button");
    ingredients.classList.add("button");
    ingredients.textContent = "Show Ingredients";
    const showIngredients = document.createElement("ingredients-info");
    showIngredients.data = data;
    ingredients.addEventListener("click", (event) => {
      if (ingredients.textContent == "Show Ingredients") {
        info.appendChild(showIngredients);
        ingredients.textContent = "Hide Ingredients";
      } else {
        info.removeChild(showIngredients);
        ingredients.textContent = "Show Ingredients";
      }
    });
    const nutrition = document.createElement("button");
    nutrition.classList.add("button");
    nutrition.textContent = "Show Nutritions";

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

customElements.define("recipe-info", RecipeInfo);
