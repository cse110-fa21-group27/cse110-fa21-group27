/**
 * Upon construction, this custom webcomponent is empty.
 * When its .data property is set, the webcomponent is filled
 * in with the recipe data passed into .data
 */
class RecipeCard extends HTMLElement {
  /** Constructs the Component and allows access to the shadow */
  constructor() {
    super();
    // legacy from lab. Don't break
    // eslint-disable-next-line no-unused-vars
    const shadow = this.attachShadow({ mode: "open" });
  }

  /**
   * Populates the Recipe Card HTML Component with information from the recipe
   * json file and displays it with some CSS styling.
   * @param {Object} data - The recipe json
   */
  set data(data) {
    // Creates CSS for the Recipe Card Component
    const style = `
    @font-face {
      font-family: 'font';
      src: url('font.ttf') format('truetype');
    }

    @font-face {
      font-family: 'boldFont';
      src: url('semiBold.ttf') format('truetype');
    }
    
    .recipe-card {
      font-weight: 900px;
      color: #FFEFEB;
      margin-right: auto;
      margin-left: 25%;
      width: 350px;
      display: grid;
      justify-content: center;
      grid-template-rows: [top] 50% [image-bottom] 1.5em [title-bottom] 1.5em [info-bottom] [bottom];
      grid-template-columns: [left] auto [right];
      background: #004152;
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
      border-bottom-left-radius: 20px;
      border-bottom-right-radius: 20px;
      border: 10px solid #004152;
    }
    
    .title {
      grid-template-rows: [top] auto [bottom];
      font-family: boldFont;
      font-size: 21px;
    }
    
    .thumbnail-photo {
      margin: auto;
      height: 205px;
      object-fit: cover;
      width: 100%;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    }
    
    .rating-time {
      font-size: 15px;
      display: flex;
      flex-direction: row;
      margin-left: 22%;
      display: inline-flex;
      justify-content: center;
      justify-content: space-around;
      width: 190px;
    }
    `;

    // Adds the style sheet to the shadow
    const styleElem = document.createElement("style");
    styleElem.innerHTML = style;

    // Creating an Overall Container
    const card = document.createElement("article");
    card.classList.add("recipe-card");

    // Adding the Recipe Photo
    const photo = document.createElement("img");
    photo.classList.add("thumbnail-photo");
    photo.setAttribute("src", data.image);
    card.appendChild(photo);

    // Adding the Recipe Title
    const title = document.createElement("p");
    title.classList.add("title");
    title.textContent = data.title;
    card.appendChild(title);

    // Adding a Container called Info
    const info = document.createElement("div");
    info.classList.add("rating-time");

    // Adding the Rating to Info
    const rating = document.createElement("p");
    rating.textContent = `${(data.spoonacularScore * 5.0) / 100.0} stars`;

    // Adding the Star Picture to Info
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

// Creating a custom Recipe-Card Element
customElements.define("recipe-card", RecipeCard);
