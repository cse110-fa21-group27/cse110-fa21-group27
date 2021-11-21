class RecipePage extends HTMLElement {
    constructor() {
      super();
      let shadow = this.attachShadow({mode: 'open'});
    }

    set data(data) {
        const page = document.createElement('article');
        const info = document.createElement('recipe-info');
        const directions = document.createElement('directions-info');
        info.data = data;
        directions.data = data;
        page.appendChild(info);
        page.appendChild(directions);

        this.shadowRoot.appendChild(page);
    }
}

customElements.define('recipe-page', RecipePage);