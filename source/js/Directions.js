class Directions extends HTMLElement {
    constructor() {
      super();
      let shadow = this.attachShadow({mode: 'open'});
    }

    set data(data) {
        const style=`
        .example {

        }
        `;

    const styleElem = document.createElement('style');
    styleElem.innerHTML=style;

    let directionList = searchForKey(data, 'recipeInstructions');

    const wrapper = document.createElement('article');
    wrapper.classList.add('example');

    const directions = document.createElement('p');
    directions.classList.add("directions");
    directions.textContent = "Directions";
    wrapper.appendChild(directions);

    // Parsing data to create the direction list.
    const list = document.createElement('ol');
    for (let i = 0; i < directionList.length; i++) {
      let listItem = document.createElement('li');
      listItem.textContent = `${directionList[i].name}`;
      list.appendChild(listItem);

      // If there are inner steps, display them as well
      if (directionList[i].itemListElement != undefined) {
        for (let j = 0; j < directionList[i].itemListElement.length; j++) {
          let innerListItem = document.createElement('li');
          innerListItem.textContent = `${directionList[i].itemListElement[j].text}`;
          list.appendChild(innerListItem);
        }
      }
    }
    wrapper.appendChild(list);

    this.shadowRoot.appendChild(styleElem);
    this.shadowRoot.appendChild(wrapper);
  }
}

customElements.define('directions', Directions);