/** this is the recipeCard component for all pages */
class RecipeCard extends HTMLElement {
  /** constructs the component and allows access to the shadow */
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
  }
  /** passes the data object that has the recipe json file
   * @param {object} data - the recipe json file
   */
  set data(data) {
    const style = `
    .recipe-card {
      width: 300px;

      display: grid;
      grid-template-rows: [top] 50% [image-bottom] 1.5em [title-bottom] 1.5em [info-bottom]  [bottom];
      grid-template-columns: [left] auto [right];

      background: #FFF6EC;
    }

    .thumbnail-photo {
      height: 225px;
      object-fit: cover;
      width: 100%;
    }

    .rating-time {
      display: grid;
      grid-template-rows: [top] auto [bottom];
      grid-template-columns: [left] 50% [middle] 50% [right];
    }
    `;
    const styleElem = document.createElement("style");
    styleElem.innerHTML = style;

    const card = document.createElement("article");
    card.classList.add("recipe-card");

    const photo = document.createElement("img");
    photo.classList.add("thumbnail-photo");
    photo.setAttribute("src", data.image);
    card.appendChild(photo);

    const title = document.createElement("p");
    title.textContent = data.title;
    card.appendChild(title);

    const info = document.createElement("div");
    info.classList.add("rating-time");

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
    info.appendChild(rating);
    info.appendChild(starPicture);

    const time = document.createElement("p");
    time.textContent = `${data.readyInMinutes} mins`;

    info.appendChild(time);

    card.appendChild(info);

    this.shadowRoot.appendChild(styleElem);
    this.shadowRoot.appendChild(card);
  }
}

customElements.define("recipe-card", RecipeCard);
