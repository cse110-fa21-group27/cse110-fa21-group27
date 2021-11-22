class NavBar extends HTMLElement {
  constructor() {
    super();
    let shadow = this.attachShadow({ mode: "open" });
  }

  set data(data) {
    const style = `
    .navBar {
        position: absolute;
        width: 100%;
        height: 10%;
        left: 0%;
        top: 0%;
    
        background: #FFBB71;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }

    .spudlyImg{
        position: absolute;
        width: 15%;
        height: 80%;
        left: 2%;
        top: 10%;
    }

    .navText{
        position: absolute;
        width: 40%;
        height: 66%;
        left: 30%;
        top: 15%;
    
        font-family: Roboto;
        font-style: normal;
        font-weight: normal;
        font-size: 24px;
        line-height: 28px;
        display: flex;
        align-items: center;
    
        color: #000000;
        background: #FFBB71;
        border-color: #FFFFFF;
    }

    .searchImg {
        position: absolute;
        width: 4%;
        height: 70%;
        left: 65%;
        top: 20%;
    }

    .shoppingImg {
        position: absolute;
        left: 88%;
        right: 6.88%;
        top: 20%;
        width: 4%;
        height: 70%;
    }
}
      `;
    const styleElem = document.createElement("style");
    styleElem.innerHTML = style;
    /*
       
      */

    //the whole bar itself
    const navBar = document.createElement("article");
    navBar.classList.add("navBar");

    // this is the spudly home button/img
    const navAct = document.createElement("form");
    const spudlyImg = document.createElement("input");
    spudlyImg.classList.add("spudlyImg");
    spudlyImg.type = "image";
    spudlyImg.className = "spudly_png";
    spudlyImg.id = "se_spudly_png";
    spudlyImg.src = "./images/Spudly.png";

    //search bar
    const navAct2 = document.createElement("form");
    const navText = document.createElement("input");
    navText.classList.add("navText");
    navText.type = "text";
    navText.className = "search_text";
    navText.id = "se_search_text";
    navText.name = "se_search_text";
    navText.placeholder = "Find a recipe";

    //search button/image
    const searchImg = document.createElement("img");
    searchImg.classList.add("searchImg");
    searchImg.className = "search_png";
    searchImg.id = "se_search_png";
    searchImg.src = "./images/search.png";

    //shopping cart image/button
    const shoppingAct = document.createElement("form");
    const shoppingImg = document.createElement("input");
    shoppingImg.classList.add("shoppingImg");
    shoppingImg.type = "image";
    shoppingImg.className = "cart_png";
    shoppingImg.id = "se_cart_png";
    shoppingImg.name = "se_cart_png";
    shoppingImg.src = "./images/cart.png";

    //saved button/img
    const savedAct = document.createElement("form");
    const savedImg = document.createElement("input");
    savedImg.classList.add("savedImg");
    savedImg.type = "image";
    savedImg.className = "saved_png";
    savedImg.id = "se_saved_png";
    savedImg.name = "se_saved_png";
    savedImg.src = "./images/saved.png";

    navAct.appendChild(spudlyImg);
    navBar.appendChild(navAct);

    navAct2.appendChild(navText);
    navBar.appendChild(navAct2);

    navBar.appendChild(searchImg);

    shoppingAct.appendChild(shoppingImg);
    navBar.appendChild(shoppingAct);

    savedAct.appendChild(savedImg);
    navBar.appendChild(savedAct);

    this.shadowRoot.appendChild(styleElem);
    this.shadowRoot.appendChild(navBar);
  }
}

customElements.define("nav-bar", NavBar);
