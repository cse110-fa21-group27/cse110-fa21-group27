/**
 * This custom web component handles displaying search results.
 * It assumes the following properties are set before .data
 * @property {Function} renderRecipes
 * @property {Function} search
 */
class SearchPage extends HTMLElement {
  /** constructs the component and allows access to the shadow */
  constructor() {
    super();
    // eslint-disable-next-line no-unused-vars
    const shadow = this.attachShadow({ mode: "open" });
  }
  /**
   * @param {object} data - the object containing the search request
   * and the search results
   */
  set data(data) {
    const { results, request } = data;
    const style = `
        #filter {
          position: fixed;
          left: 0%;
          top: 17%;
          width: 23%;
          height: 80%;
          border-style: solid;
          border-color: #ffbb71;
          background-color: #fff6ec;
        }
        
        #filter_label {
          position: absolute;
          left: 3%;
          top: 1%;
          font-family: DM Sans;
          font-style: normal;
          font-weight: normal;
          font-size: 58px;
          line-height: 62px;
        }
  
        #clear_all {
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
          font-size: 36px;
          line-height: 62px;
        }
  
        .label2 {
          position: absolute;
          left: 15%;
        
          font-family: DM Sans;
          font-style: normal;
          font-weight: normal;
          font-size: 36px;
          line-height: 62px;
        }
        
        .form {
          position: absolute;
          left: 1%;
        }
  
        .box {
          width: 100%;
          height: 80px;
        }
        
        #apply {
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
  
        #search_body {
          position: absolute;
          left: 30%;
          top: 20%;
          height: 70%;
          width: 60%;
  
          display: flex;
          flex-wrap: wrap;
          gap: 1em;
        }
      `;
    const styleElem = document.createElement("style");
    styleElem.innerHTML = style;

    const searchPage = document.createElement("article");

    // ##### start of filter #####
    const filter = document.createElement("div");
    filter.id = "filter";

    const searchAgain = (e) => {
      e.preventDefault();
      const reqCopy = Object.assign({}, request);
      // get elements
      const input1 = filter.querySelector("#input1");
      const input2 = filter.querySelector("#input2");
      const input3 = filter.querySelector("#input3");
      const input4 = filter.querySelector("#input4");
      const input5 = filter.querySelector("#input5");
      const input6 = filter.querySelector("#input6");
      // get minRating
      const minRating = input1.value;
      if (minRating > 0) {
        reqCopy.minRating = minRating;
      } else {
        delete reqCopy.minRating;
      }
      // get maxTime
      const maxTimeString = input2.value;
      if (Number(maxTimeString)) {
        reqCopy.maxTime = Number(maxTimeString);
      } else {
        delete reqCopy.maxTime;
      }
      // get vegetarian
      const vegetarian = input3.checked;
      if (vegetarian) {
        reqCopy.vegetarian = true;
      } else {
        delete reqCopy.vegetarian;
      }
      // get vegan
      const vegan = input4.checked;
      if (vegan) {
        reqCopy.vegan = true;
      } else {
        delete reqCopy.vegan;
      }
      // get glutenFree
      const glutenFree = input5.checked;
      if (glutenFree) {
        reqCopy.glutenFree = true;
      } else {
        delete reqCopy.glutenFree;
      }
      // get dairyFree
      const dairyFree = input6.checked;
      if (dairyFree) {
        reqCopy.dairyFree = true;
      } else {
        delete reqCopy.dairyFree;
      }
      // navigate to searchresults with new request
      this.search(reqCopy);
    };

    // filter label
    const filterLabel = document.createElement("div");
    filterLabel.id = "filter_label";
    filterLabel.innerHTML = "Filter";
    filter.appendChild(filterLabel);

    // clear all button
    const clearAll = document.createElement("button");
    clearAll.id = "clear_all";
    clearAll.innerHTML = "CLEAR ALL";
    clearAll.addEventListener("click", (e) => {
      e.preventDefault();
      const input1 = filter.querySelector("#input1");
      const input2 = filter.querySelector("#input2");
      const input3 = filter.querySelector("#input3");
      const input4 = filter.querySelector("#input4");
      const input5 = filter.querySelector("#input5");
      const input6 = filter.querySelector("#input6");
      input1.value = 0;
      input2.value = "";
      input3.checked = false;
      input4.checked = false;
      input5.checked = false;
      input6.checked = false;
    });
    filter.appendChild(clearAll);

    // hr
    const hr = document.createElement("hr");
    hr.style.marginTop = "25%";
    hr.style.width = "90%";
    hr.style.textAlign = "center";
    hr.style.color = "black";
    filter.appendChild(hr);

    // label Rating
    const label1 = document.createElement("div");
    label1.classList.add("label");
    label1.style.top = "80px";
    label1.innerHTML = "Rating";
    filter.appendChild(label1);

    // label Cooking Time
    const label2 = document.createElement("div");
    label2.classList.add("label");
    label2.style.top = "160px";
    label2.innerHTML = "Cooking Time";
    filter.appendChild(label2);

    // form 1
    const form1 = document.createElement("form");
    form1.classList.add("form");
    form1.style.top = "140px";
    form1.addEventListener("submit", searchAgain);

    const input1 = document.createElement("select");
    input1.classList.add("input");
    input1.id = "input1";
    input1.name = "input1";

    const blankOption = document.createElement("option");
    blankOption.textContent = "--select an option--";
    blankOption.disabled = true;
    blankOption.selected = true;
    blankOption.value = 0;
    input1.appendChild(blankOption);
    const option1 = document.createElement("option");
    option1.value = 4;
    option1.textContent = "4 or more stars";
    input1.appendChild(option1);
    const option2 = document.createElement("option");
    option2.value = 3;
    option2.textContent = "3 or more stars";
    input1.appendChild(option2);
    const option3 = document.createElement("option");
    option3.value = 2;
    option3.textContent = "2 or more stars";
    input1.appendChild(option3);
    const option4 = document.createElement("option");
    option4.value = 1;
    option4.textContent = "1 or more stars";
    input1.appendChild(option4);
    form1.appendChild(input1);
    filter.appendChild(form1);

    // pre-fill with request
    if ("minRating" in request) {
      input1.value = request.minRating;
    }

    // form 2
    const form2 = document.createElement("form");
    form2.classList.add("form");
    form2.style.top = "220px";
    form2.addEventListener("submit", searchAgain);

    const input2 = document.createElement("input");
    input2.classList.add("input");
    input2.setAttribute("type", "text");
    input2.id = "input2";
    input2.name = "input2";
    input2.placeholder = "maximum # of minutes";

    // pre-fill with request
    if ("maxTime" in request) {
      input2.value = request.maxTime;
    }

    form2.appendChild(input2);
    filter.appendChild(form2);

    // label Vegetarian
    const label3 = document.createElement("div");
    label3.classList.add("label2");
    label3.style.top = "265px";
    label3.innerHTML = "Vegetarian";
    filter.appendChild(label3);

    // form 3
    const form3 = document.createElement("form");
    form3.classList.add("form");
    form3.style.top = "270px";
    form3.addEventListener("submit", searchAgain);

    const div3 = document.createElement("div");
    div3.classList.add("box");

    const input3 = document.createElement("input");
    input3.type = "checkbox";
    input3.id = "input3";
    input3.name = "input3";
    input3.value = "Vegetarian";
    input3.style.width = "40px";
    input3.style.height = "40px";

    // pre-fill with request
    if ("vegetarian" in request) {
      input3.checked = true;
    }

    div3.appendChild(input3);
    form3.appendChild(div3);
    filter.appendChild(form3);

    // label Vegan
    const label4 = document.createElement("div");
    label4.classList.add("label2");
    label4.style.top = "345px";
    label4.innerHTML = "Vegan";
    filter.appendChild(label4);

    // form 4
    const form4 = document.createElement("form");
    form4.classList.add("form");
    form4.style.top = "350px";
    form4.addEventListener("submit", searchAgain);

    const div4 = document.createElement("div");
    div4.classList.add("box");

    const input4 = document.createElement("input");
    input4.type = "checkbox";
    input4.id = "input4";
    input4.name = "input4";
    input4.value = "Vegan";
    input4.style.width = "40px";
    input4.style.height = "40px";

    // pre-fill with request
    if ("vegan" in request) {
      input4.checked = true;
    }

    div4.appendChild(input4);
    form4.appendChild(div4);
    filter.appendChild(form4);

    // label Gluten Free
    const label5 = document.createElement("div");
    label5.classList.add("label2");
    label5.style.top = "425px";
    label5.innerHTML = "Gluten Free";
    filter.appendChild(label5);

    // form 5
    const form5 = document.createElement("form");
    form5.classList.add("form");
    form5.style.top = "430px";
    form5.addEventListener("submit", searchAgain);

    const div5 = document.createElement("div");
    div5.classList.add("box");

    const input5 = document.createElement("input");
    input5.type = "checkbox";
    input5.id = "input5";
    input5.name = "input5";
    input5.value = "Gluten Free";
    input5.style.width = "40px";
    input5.style.height = "40px";

    // pre-fill with request
    if ("glutenFree" in request) {
      input5.checked = true;
    }

    div5.appendChild(input5);
    form5.appendChild(div5);
    filter.appendChild(form5);

    // label Diary Free
    const label6 = document.createElement("div");
    label6.classList.add("label2");
    label6.style.top = "505px";
    label6.innerHTML = "Diary Free";
    filter.appendChild(label6);

    // form 5
    const form6 = document.createElement("form");
    form6.classList.add("form");
    form6.style.top = "510px";
    form6.addEventListener("submit", searchAgain);

    const div6 = document.createElement("div");
    div6.classList.add("box");

    const input6 = document.createElement("input");
    input6.type = "checkbox";
    input6.id = "input6";
    input6.name = "input6";
    input6.value = "Dairy Free";
    input6.style.width = "40px";
    input6.style.height = "40px";

    // pre-fill with request
    if ("dairyFree" in request) {
      input6.checked = true;
    }

    div6.appendChild(input6);
    form6.appendChild(div6);
    filter.appendChild(form6);

    // apply button
    const apply = document.createElement("button");
    apply.id = "apply";
    apply.innerHTML = "APPLY";
    apply.addEventListener("click", searchAgain);

    filter.appendChild(apply);

    searchPage.appendChild(filter);
    // ##### end of filter #####

    // ##### start of search body ##### (#todo)
    const body = document.createElement("div");
    body.id = "search_body";
    // create recipe cards for each result
    this.renderRecipes(results, body);

    searchPage.appendChild(body);
    // ##### end of search body #####

    this.shadowRoot.appendChild(styleElem);
    this.shadowRoot.appendChild(searchPage);
  }
}

customElements.define("search-page", SearchPage);
