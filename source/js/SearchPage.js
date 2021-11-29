class SearchPage extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    const style = `
          .background {
            margin-left: 25vw;
            margin-right: 25vw;
            display: static;
            background: green;
          }
          `;
    const styleElem = document.createElement("style");
    styleElem.innerHTML = style;

    const filter = document.createElement("div");
    wrapper.classList.add("background");

    let txt = document.createElement("p");
    txt.innerHTML = "hello";
    wrapper.appendChild(txt);

    this.shadowRoot.appendChild(wrapper);
    this.shadowRoot.appendChild(styleElem);
  }
}

customElements.define("search-page", SearchPage);
