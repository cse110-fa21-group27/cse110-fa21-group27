/** this is the navbar component for all pages */
class NavBar extends HTMLElement {
  /** constructs the component and allows access to the shadow */
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
  }
  /** we did not know how to get this navbar without using the data func even tho it tech shouldnt need it
   * @param {object} data - the recipe json file
   */
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

    .spudly_png{
        position: absolute;
        width: 15%;
        height: 80%;
        left: 2%;
        top: 10%;
    }

    .search_text{
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

    .search_png {
        position: absolute;
        width: 4%;
        height: 70%;
        left: 65%;
        top: 20%;
    }

    .cart_png {
        position: absolute;
        left: 88%;
        right: 6.88%;
        top: 20%;
        width: 4%;
        height: 70%;
    }

    .saved_png {
      position: absolute;
      left: 95%;
      right: 2.01%;
      top: 20%;
      width: 3.2%;
      height: 70%;
  }
}
      `;
    const styleElem = document.createElement("style");
    styleElem.innerHTML = style;

    // the whole bar itself
    const navBar = document.createElement("article");
    navBar.classList.add("navBar");

    // this is the spudly home button/img
    const spudlyImg = document.createElement("input");
    spudlyImg.type = "image";
    spudlyImg.className = "spudly_png";
    spudlyImg.id = "se_spudly_png";
    spudlyImg.src = "./images/Spudly.png";
    spudlyImg.addEventListener("click", () => {
      this.goHome();
    });

    // search bar
    const navAct2 = document.createElement("form");
    const navText = document.createElement("input");
    navText.type = "text";
    navText.className = "search_text";
    navText.id = "se_search_text";
    navText.name = "se_search_text";
    navText.placeholder = "Find a recipe";

    // search button/image
    //change img to form so it is able to click - kevin 11/29
    const searchImg = document.createElement("form");
    const searchImgClick = document.createElement("input");
    searchImgClick.type = "image";
    searchImgClick.className = "search_png";
    searchImgClick.id = "se_search_png";
    searchImgClick.name = "se_search_png";
    searchImgClick.src = "./images/search.png";

    // shopping cart image/button
    const shoppingAct = document.createElement("form");
    const shoppingImg = document.createElement("input");
    shoppingImg.type = "image";
    shoppingImg.className = "cart_png";
    shoppingImg.id = "se_cart_png";
    shoppingImg.src = "./images/cart.png";
    shoppingImg.name = "se_cart_png";

    // saved button/img
    const savedAct = document.createElement("form");
    const savedImg = document.createElement("input");
    savedImg.type = "image";
    savedImg.className = "saved_png";
    savedImg.id = "se_saved_png";
    savedImg.name = "se_saved_png";
    savedImg.src = "./images/saved.png";
    savedImg.addEventListener("click", (e) => {
      e.preventDefault();
      this.goToSaved();
    });

    // navAct.appendChild(spudlyImg);
    navBar.appendChild(spudlyImg);

    navAct2.appendChild(navText);
    navBar.appendChild(navAct2);

    searchImg.appendChild(searchImgClick);
    navBar.appendChild(searchImg);

    shoppingAct.appendChild(shoppingImg);
    navBar.appendChild(shoppingAct);

    savedAct.appendChild(savedImg);
    navBar.appendChild(savedAct);

    this.shadowRoot.appendChild(styleElem);
    this.shadowRoot.appendChild(navBar);

    // search feature - kevin
    // navAct2.addEventListener('submit', (e) => {
    //   e.preventDefault();
    //   window.location = `${window.location.origin}/source/index.html?searchRecipe=${navText.value}`;
    //   constructSearchPage();
    // });
    // searchImg.addEventListener('click', (e) => {
    //     e.preventDefault();
    //     window.location = `${window.location.origin}/source/index.html?searchRecipe=${navText.value}`;
    //     constructSearchPage();
    //   });
  }
}

customElements.define("nav-bar", NavBar);
