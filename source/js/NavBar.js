/**
 * Upon construction, this custom webcomponent is empty.
 * When its .data property is set, the webcomponent is filled
 */
class NavBar extends HTMLElement {
  /** Constructs the Component and allows access to the shadow */
  constructor() {
    super();
    // eslint-disable-next-line no-unused-vars
    const shadow = this.attachShadow({ mode: "open" });
  }
  /**
   * Creates the Nav Bar Component and and displays it with some CSS styling.
   * @param {object} data - the recipe json file
   */
  set data(data) {
    // Creates CSS for the Nav Bar Component
    const style = ` 
    @font-face {
      font-family: font;
      src: URL('font.ttf') format('truetype');
    }
    
    .navBar {
      position: absolute;
      width: 100%;
      height: 10%;
      left: 0%;
      top: 0%;
      /* this is the main banner */
      background: #302B27;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }
    
    .spudly_png {
      position: absolute;
      width: 14%;
      height: 90%;
      left: 2%;
      top: 5%;
    }
    
    .search_text {
      position: absolute;
      width: 40%;
      height: 66%;
      left: 30%;
      top: 15%;
      font-family: font;
      font-style: normal;
      font-weight: normal;
      font-size: 24px;
      font-color: black;
      line-height: 28px;
      display: flex;
      align-items: center;
      color: #FFFFFF;
      background: black;
      border-color: white;
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

  button {
    background: transparent;
    border: none !important;
  }

  .roadmap_png {
    position: absolute;
    left: 81%;
    right: 10.88%;
    top: 20%;
    width: 4%;
    height: 72%;
    background: white;
    border-radius: 10em;
  }
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
    navAct2.addEventListener("submit", (e) => {
      const query = navText.value;
      e.preventDefault();
      this.goSearchPage(query);
    });

    // search button/image
    const searchAct = document.createElement("button");
    const searchImg = document.createElement("input");
    searchImg.type = "image";
    searchImg.className = "search_png";
    searchImg.id = "se_search_png";
    searchImg.src = "./images/search.png";
    searchImg.addEventListener("click", (e) => {
      const query = navText.value;
      e.preventDefault();
      this.goSearchPage(query);
    });

    // shopping cart image/button
    const shoppingAct = document.createElement("form");
    const shoppingImg = document.createElement("input");
    shoppingImg.type = "image";
    shoppingImg.className = "cart_png";
    shoppingImg.id = "se_cart_png";
    shoppingImg.src = "./images/cart.png";
    shoppingImg.name = "se_cart_png";
    shoppingImg.addEventListener("click", (e) => {
      e.preventDefault();
      this.goGrocery();
    });

    // roadmap button/img
    const roadmapAct = document.createElement("button");
    const roadmapImg = document.createElement("input");
    roadmapImg.type = "image";
    roadmapImg.className = "roadmap_png";
    roadmapImg.id = "se_roadmap_png";
    roadmapImg.name = "se_roadmap_png";
    roadmapImg.src = "./images/cook_icon.png";
    roadmapAct.addEventListener("click", (event) => {
      this.goRoadmap();
    });

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

    searchAct.appendChild(searchImg);
    navBar.appendChild(searchAct);

    roadmapAct.appendChild(roadmapImg);
    navBar.appendChild(roadmapAct);

    roadmapAct.appendChild(roadmapImg);
    navBar.appendChild(roadmapAct);

    shoppingAct.appendChild(shoppingImg);
    navBar.appendChild(shoppingAct);

    savedAct.appendChild(savedImg);
    navBar.appendChild(savedAct);

    this.shadowRoot.appendChild(styleElem);
    this.shadowRoot.appendChild(navBar);
  }
}

customElements.define("nav-bar", NavBar);
