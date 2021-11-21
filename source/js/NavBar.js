class NavBar extends HTMLElement {
    constructor() {
      super();
      let shadow = this.attachShadow({mode: 'open'});
    }

    set data(data) {
      const style = `
      
      `;
        
        const navBar = document.createElement('article');
        // this is the spudly home button
        const navAct = document.createElement('form');
        const navImg = document.createElement('input');

        //text location/ search navigation
        const navAct2 = document.createElement('form');
        const navText = document.createElement('input');
        navText.textContent = "Navigation Bar";
        
        //search button/image
        const searchImg = document.createElement('img');

        //shopping cart image/button
        const shoppingAct = document.createElement('form');
        const shoppingImg = document.createElement('input');

        //saved button
        const savedAct = document.createElement('form');
        const savedImg = document.createElement('input');

        // info.data = data;
        // directions.data = data;
        // page.appendChild(info);
        // page.appendChild(directions);

        navAct.appendChild(navImg);
        navBar.appendChild(navAct);

        navAct2.appendChild(navText);
        navBar.appendChild(navAct2);

        navBar.appendChild(searchImg);

        shoppingAct.appendChild(shoppingImg);
        navBar.appendChild(shoppingAct);

        savedAct.appendChild(savedImg);
        navBar.appendChild(savedAct);
        
        this.shadowRoot.appendChild(navBar);
    }
}

customElements.define('nav-bar', NavBar);