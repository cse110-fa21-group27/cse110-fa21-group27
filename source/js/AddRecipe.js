class AddRecipe extends HTMLElement {
  constructor(){
    super();
    let shadow = this.attachShadow({mode: "open"});
    
    const styles = `
    article {
      position: absolute;
      top: calc(50% - 4em);
      left: calc(50% - 5.5em);
      background: #888888;

      display: grid;
      grid-template-columns: 3em 9em;
      grid-template-rows: auto;
      justify-items: start;
      align-items: center;

      padding: 2em;
    }

    article > input {
      width: 9em;
    }
    `;
    const stylesElem = document.createElement('style');
    stylesElem.innerHTML = styles;

    const card = document.createElement('article');
    const button = document.createElement('button');
    button.innerText = "Add";
    card.appendChild(button);

    const textBox = document.createElement('input');
    textBox.setAttribute('type','url');
    card.appendChild(textBox);

    // we expect storage.addRecipeToSaved to be passed to this function
    button.addEventListener('click', ()=>{
      const url = textBox.value;
      this.addRecipeToSaved(url);
    })
    
    shadow.appendChild(stylesElem);
    shadow.appendChild(card);
  }
}

customElements.define('add-recipe', AddRecipe);