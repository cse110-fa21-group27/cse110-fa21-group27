class RecipePage extends HTMLElement {
    constructor() {
      super();
      let shadow = this.attachShadow({mode: 'open'});
    }

    set data(data) {
        const page = document.createElement('article');
        const info = document.createElement('recipe-info');
        info.data = data;
        page.appendChild(info);

        this.shadowRoot.appendChild(page);
    }
}

customElements.define('recipe-page', RecipePage);