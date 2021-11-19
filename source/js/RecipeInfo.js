class RecipeInfo extends HTMLElement {
  constructor() {
    super();

    let shadow = this.attachShadow({mode: "open"});
  }

  set data(cleanData) {
    const preptime = document.createElement('p');
    preptime.innerText = cleanData.time;
    this.shadowRoot.appendChild(preptime);

    const cookTime = document.createElement('p');
    cookTime.innerText = cleanData.time;
    this.shadowRoot.append(cookTime);

    const rating = document.createElement('p');
    rating.innerText = `${cleanData.rating.ratingValue} stars, ${cleanData.rating.ratingCount} ratings`;
    this.shadowRoot.append(rating);

    const button = document.createElement('button');
    button.innerText = 'save';
    this.shadowRoot.append(button);
  }
}

customElements.define('recipe-info', RecipeInfo);