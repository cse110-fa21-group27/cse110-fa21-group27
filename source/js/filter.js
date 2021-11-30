class Filter extends HTMLElement {
    /** constructs the component and allows access to the shadow */
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: "open" });
    }
    /** 
     * @param {object} data - the recipe json file
     */
    set data(data) {
      const style = `
      .filter {
        position: absolute;
        left: 0%;
        top: 17%;
        width: 23%;
        height: 70%;
        border-style: solid;
        border-color: #ffbb71;
        background-color: #fff6ec;
      }
      
      .filter_label {
        position: absolute;
        left: 3%;
        top: 1%;
        font-family: DM Sans;
        font-style: normal;
        font-weight: normal;
        font-size: 58px;
        line-height: 62px;
      }
      
      .clear_all {
        position: absolute;
        left: 55%;
        top: 1%;
        font-family: DM Sans;
        font-style: normal;
        font-weight: normal;
        font-size: 24px;
        line-height: 62px;
        background-color: #ffbb71;
      }
      
      .label {
        position: absolute;
        left: 1%;
      
        font-family: DM Sans;
        font-style: normal;
        font-weight: normal;
        font-size: 42px;
        line-height: 62px;
      }
      
      .filter_column {
        position: absolute;
        width: 29%;
        height: 12%;
        font-size: larger;
      }
      
      input[type="checkbox"] {
        -ms-transform: scale(1.5);
        -moz-transform: scale(1.5);
        -webkit-transform: scale(1.5);
        -o-transform: scale(1.5);
        transform: scale(1.5);
        padding: 10px;
      }
      
      .apply {
        position: absolute;
        left: 30%;
        top: 85%;
        width: 40%;
        font-family: DM Sans;
        font-style: normal;
        font-weight: normal;
        font-size: 24px;
        line-height: 62px;
        background-color: #ffbb71;
      }
    `;
    const styleElem = document.createElement("style");
    styleElem.innerHTML = style;

    //filter
    const filter = document.createElement("article");
    filter.classList.add("filter");

    //label of Filter
    const filterLabel = document.createElement("p");
    filterLabel.classList.add("filter_label");
    filterLabel.innerHTML = "Filter";
    filter.appendChild(filterLabel);

    //clear all button
    const clearAll = document.createElement("button");
    clearAll.classList.add("clear_all");
    clearAll.innerHTML = "CLEAR ALL";
    filter.appendChild(clearAll);

    //hr
    const hr = document.createElement("hr");
    hr.style = "margin-top: 25%; width: 90%; text-align: center; color: black";
    filter.appendChild(hr);


    this.shadowRoot.appendChild(styleElem);
    this.shadowRoot.appendChild(filter);
    }
}

customElements.define("filter", Filter);
