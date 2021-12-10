/**
 * This custom web component handles displaying search results
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
  
        .input {
          width: 90%;
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

    // filter label
    const filterLabel = document.createElement("div");
    filterLabel.id = "filter_label";
    filterLabel.innerHTML = "Filter";
    filter.appendChild(filterLabel);

    // clear all button
    const clearAll = document.createElement("button");
    clearAll.id = "clear_all";
    clearAll.innerHTML = "CLEAR ALL";
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

    const input1 = document.createElement("input");
    input1.classList.add("input");
    input1.setAttribute("list", "input_list_1");
    input1.id = "input1";
    input1.name = "input1";

    const resultsList1 = document.createElement("resultslist");
    resultsList1.id = "input_list_1";
    const option1 = document.createElement("option");
    option1.value = "4 or more stars";
    resultsList1.appendChild(option1);
    const option2 = document.createElement("option");
    option2.value = "3 or more stars";
    resultsList1.appendChild(option2);
    const option3 = document.createElement("option");
    option3.value = "2 or more stars";
    resultsList1.appendChild(option3);
    const option4 = document.createElement("option");
    option4.value = "1 or more stars";
    resultsList1.appendChild(option4);

    input1.appendChild(resultsList1);
    form1.appendChild(input1);
    filter.appendChild(form1);

    // form 2
    const form2 = document.createElement("form");
    form2.classList.add("form");
    form2.style.top = "220px";

    const input2 = document.createElement("input");
    input2.classList.add("input");
    input2.setAttribute("list", "input_list_2");
    input2.id = "input2";
    input2.name = "input2";

    const resultsList2 = document.createElement("resultslist");
    resultsList2.id = "input_list_2";
    const option5 = document.createElement("option");
    option5.value = "15 minutes or less";
    resultsList2.appendChild(option5);
    const option6 = document.createElement("option");
    option6.value = "30 minutes or less";
    resultsList2.appendChild(option6);
    const option7 = document.createElement("option");
    option7.value = "45 minutes or less";
    resultsList2.appendChild(option7);

    input2.appendChild(resultsList2);
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

    const div3 = document.createElement("div");
    div3.classList.add("box");

    const input3 = document.createElement("input");
    input3.type = "checkbox";
    input3.id = "input3";
    input3.name = "input3";
    input3.value = "Vegetarian";
    input3.style.width = "40px";
    input3.style.height = "40px";

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

    const div4 = document.createElement("div");
    div4.classList.add("box");

    const input4 = document.createElement("input");
    input4.type = "checkbox";
    input4.id = "input4";
    input4.name = "input4";
    input4.value = "Vegan";
    input4.style.width = "40px";
    input4.style.height = "40px";

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

    const div5 = document.createElement("div");
    div5.classList.add("box");

    const input5 = document.createElement("input");
    input5.type = "checkbox";
    input5.id = "input5";
    input5.name = "input5";
    input5.value = "Gluten Free";
    input5.style.width = "40px";
    input5.style.height = "40px";

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

    const div6 = document.createElement("div");
    div6.classList.add("box");

    const input6 = document.createElement("input");
    input6.type = "checkbox";
    input6.id = "input6";
    input6.name = "input6";
    input6.value = "Diary Free";
    input6.style.width = "40px";
    input6.style.height = "40px";

    div6.appendChild(input6);
    form6.appendChild(div6);
    filter.appendChild(form6);

    // apply button
    const apply = document.createElement("button");
    apply.id = "apply";
    apply.innerHTML = "APPLY";
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
