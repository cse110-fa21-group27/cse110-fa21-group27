class SearchPage extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    const style = `
          .filter {
            margin-left: 25vw;
            margin-right: 25vw;
            display: static;
            background: green;
          }
          `;

    const styleElem = document.createElement("style");
    styleElem.innerHTML = style;

    const filterBox = document.createElement("div");
    filterBox.className = "filter";
    const filterLabel = document.createElement("div");
    filterLabel.className = "filter_label";
    filterLabel.innerText = "Filter";
    filterBox.appendChild(filterLabel);

    const clear = document.createElement("button");
    clear.onclick = "window.location.reload();";
    clear.className = "clear_all";
    clear.innerText = "CLEAR ALL";

    filterBox.appendChild(clear);
    /**
     * <div class="filter">
      <div class="filter_label">Filter</div>
      <button onclick="window.location.reload();" class="clear_all">
        CLEAR ALL
      </button>
      <hr
        style="margin-top: 25%; width: 90%; text-align: center; color: black"
      />

      <div class="label" style="top: 18%">Cusine</div>
      <div class="label" style="top: 38%">Diet</div>
      <div class="label" style="top: 60%">Ingredient</div>

      <!--#todo-->
      <form>
        <!--cusine area-->
        <div
          class="filter_column"
          id="filter_column1"
          style="left: 1%; top: 28%"
        >
          <input type="checkbox" id="filter1" name="filter1" value="filter1" />
          <label for="filter1"> 1</label><br />
          <input type="checkbox" id="filter2" name="filter2" value="filter2" />
          <label for="filter2"> 2</label><br />
          <input type="checkbox" id="filter3" name="filter3" value="filter3" />
          <label for="filter3"> 3</label><br /><br />
        </div>
        <div
          class="filter_column"
          id="filter_column2"
          style="left: 51%; top: 28%"
        >
          <input type="checkbox" id="filter4" name="filter4" value="filter4" />
          <label for="filter4"> 4</label><br />
          <input type="checkbox" id="filter5" name="filter5" value="filter5" />
          <label for="filter5"> 5</label><br />
          <input type="checkbox" id="filter6" name="filter6" value="filter6" />
          <label for="filter6"> 6</label><br /><br />
        </div>
        <!--diet area-->
        <div
          class="filter_column"
          id="filter_column3"
          style="left: 1%; top: 48%"
        >
          <input type="checkbox" id="filter7" name="filter7" value="filter7" />
          <label for="filter7"> 7</label><br />
          <input type="checkbox" id="filter8" name="filter8" value="filter8" />
          <label for="filter8"> 8</label><br />
          <input type="checkbox" id="filter9" name="filter9" value="filter9" />
          <label for="filter9"> 9</label><br /><br />
        </div>
        <div
          class="filter_column"
          id="filter_column4"
          style="left: 51%; top: 48%"
        >
          <input
            type="checkbox"
            id="filter10"
            name="filter10"
            value="filter10"
          />
          <label for="filter10"> 10</label><br />
          <input
            type="checkbox"
            id="filter11"
            name="filter11"
            value="filter11"
          />
          <label for="filter11"> 11</label><br />
          <input
            type="checkbox"
            id="filter12"
            name="filter12"
            value="filter12"
          />
          <label for="filter12"> 12</label><br /><br />
        </div>
        <!--Ingre. area-->
        <div
          class="filter_column"
          id="filter_column5"
          style="left: 1%; top: 70%"
        >
          <input
            type="checkbox"
            id="filter13"
            name="filter13"
            value="filter13"
          />
          <label for="filter13"> 13</label><br />
          <input
            type="checkbox"
            id="filter14"
            name="filter14"
            value="filter14"
          />
          <label for="filter14"> 14</label><br />
          <input
            type="checkbox"
            id="filter15"
            name="filter15"
            value="filter15"
          />
          <label for="filter15"> 15</label><br /><br />
        </div>
        <div
          class="filter_column"
          id="filter_column6"
          style="left: 51%; top: 70%"
        >
          <input
            type="checkbox"
            id="filter16"
            name="filter16"
            value="filter16"
          />
          <label for="filter16"> 16</label><br />
          <input
            type="checkbox"
            id="filter17"
            name="filter17"
            value="filter17"
          />
          <label for="filter17"> 17</label><br />
          <input
            type="checkbox"
            id="filter18"
            name="filter18"
            value="filter18"
          />
          <label for="filter18"> 18</label><br /><br />
        </div>
        <!--#todo-->
        <button onclick="" class="apply">APPLY</button>
      </form>
    </div>
     */
    // const filterFrame = document.createElement("div"); //this is the box of the filter
    // const title = document.createElement("h1"); //this is title of the filter
    // title.innerText = "FILTER";

    // filterFrame.appendChild(title);
    // filterFrame.className = "background";

    // const clear = document.createElement("button"); //this is the clear button
    // clear.innerText = "CLEAR ALL";

    // filterFrame.appendChild(clear);

    //filter buttons
    // const btnContainer = document.createElement("div");
    // const btn1 = document.createElement("button");
    // btn1.innerText = "Vegitarian";
    // const btn2 = document.createElement("button");
    // btn2.innerText = "meat";
    // const btn3 = document.createElement("button");
    // btn3.innerText = "hail satan";
    // btnContainer.appendChild(btn1);
    // btnContainer.appendChild(btn2);
    // btnContainer.appendChild(btn3);

    // const filterBar = document.createElement("form");
    // const filterSelect = document.createElement("select");
    // //options to select from
    // const opt1 = document.createElement("option");
    // const opt2 = document.createElement("option");
    // const opt3 = document.createElement("option");
    // filterSelect.appendChild(opt1);
    // filterSelect.appendChild(opt2);
    // filterSelect.appendChild(opt3);

    // filterBar.appendChild(filterSelect);
    // filterFrame.appendChild(filterBar);

    this.shadowRoot.appendChild(filterBox);
    this.shadowRoot.appendChild(styleElem);
  }
}

customElements.define("search-page", SearchPage);
