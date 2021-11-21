class RecipePage extends HTMLElement {
    constructor() {
      super();
      let shadow = this.attachShadow({mode: 'open'});
    }

    set data(data) {
      const style = `
      .recipe-page{
        display: grid;
        grid-template-columns: [leftmost]25% [endOfIng]50% [endOfRecipe]25% [rightmost]25%;
      /* e.g. 
          1fr 1fr
          minmax(10px, 1fr) 3fr
          repeat(5, 1fr)
          50px auto 100px 1fr
      */
      grid-template-rows: 25% 75% 400px;
      /* e.g. 
          min-content 1fr min-content
          100px 1fr max-content
      */
    }
    .item-1 {
        grid-column-start: leftmost;
        grid-column-end: endOfIng;
        grid-row-start: 3;
        grid-row-end: auto;
        background-color: black;
      }
    
      .item-2 {
        grid-column-start: endOfIng;
        grid-column-end: endOfRecipe;
        grid-row-start: 2;
        grid-row-end: 4;
        background-color: forestgreen;
      }
    
      .item-3{
        grid-column-start: endOfRecipe;
        grid-column-end: rightmost;
        grid-row-start: 3;
        grid-row-end: auto;
        background-color: blue;
      }
      `;
        const page = document.createElement('article');
        const info = document.createElement('recipe-info');
        info.data = data;
        page.appendChild(info);

        this.shadowRoot.appendChild(page);
    }
}

customElements.define('recipe-page', RecipePage);