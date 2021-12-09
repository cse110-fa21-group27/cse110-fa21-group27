/**
 * Upon construction, this custom webcomponent is empty.
 * When its .data property is set, the webcomponent is filled
 */
class SearchPage extends HTMLElement {
  /** Constructs the Component and allows access to the shadow */
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
  }
  /**
   * Creates the Search Page Component with information from the
   * recipe json file and displays it with some CSS styling.
   * @param {object} data - the recipe json file
   */
  set data(data) {
    // Creates CSS for the Nav Bar Component
    const style = `
      #filter {
        position: absolute;
        left: 0%;
        top: 17%;
        width: 23%;
        height: 70%;
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
        font-size: 42px;
        line-height: 62px;
      }
      
      .form {
        position: absolute;
        left: 1%;
      }

      .input {
        width: 90%;
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
        background-color: cadetblue; /*temp holder*/

        display: flex;
        flex-wrap: wrap;
        gap: 1em;
      }
    `;
    const styleElem = document.createElement("style");
    styleElem.innerHTML = style;

    const searchPage = document.createElement("article");

    // Start of filter
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
    label1.style.top = "18%";
    label1.innerHTML = "Rating";
    filter.appendChild(label1);

    // label Cooking Time
    const label2 = document.createElement("div");
    label2.classList.add("label");
    label2.style.top = "38%";
    label2.innerHTML = "Cooking Time";
    filter.appendChild(label2);

    // label
    const label3 = document.createElement("div");
    label3.classList.add("label");
    label3.style.top = "60%";
    label3.innerHTML = "Vegetarian";
    filter.appendChild(label3);

    // form 1
    const form1 = document.createElement("form");
    form1.classList.add("form");
    form1.style.top = "28%";

    const input1 = document.createElement("input");
    input1.classList.add("input");
    input1.setAttribute("list", "input_list_1");
    input1.id = "input_1";
    input1.name = "input_1";

    const dataList1 = document.createElement("datalist");
    dataList1.id = "input_list_1";
    const option1 = document.createElement("option");
    option1.value = "4 or more stars";
    dataList1.appendChild(option1);
    const option2 = document.createElement("option");
    option2.value = "3 or more stars";
    dataList1.appendChild(option2);
    const option3 = document.createElement("option");
    option3.value = "2 or more stars";
    dataList1.appendChild(option3);
    const option4 = document.createElement("option");
    option4.value = "1 or more stars";
    dataList1.appendChild(option4);

    input1.appendChild(dataList1);
    form1.appendChild(input1);
    filter.appendChild(form1);

    // form 2
    const form2 = document.createElement("form");
    form2.classList.add("form");
    form2.style.top = "48%";

    const input2 = document.createElement("input");
    input2.classList.add("input");
    input2.setAttribute("list", "input_list_2");
    input2.id = "input_2";
    input2.name = "input_2";

    const dataList2 = document.createElement("datalist");
    dataList2.id = "input_list_2";
    const option5 = document.createElement("option");
    option5.value = "15 minutes or less";
    dataList2.appendChild(option5);
    const option6 = document.createElement("option");
    option6.value = "30 minutes or less";
    dataList2.appendChild(option6);
    const option7 = document.createElement("option");
    option7.value = "45 minutes or less";
    dataList2.appendChild(option7);

    input2.appendChild(dataList2);
    form2.appendChild(input2);
    filter.appendChild(form2);

    // form 3
    const form3 = document.createElement("form");
    form3.classList.add("form");
    form3.style.top = "70%";

    const input3 = document.createElement("input");
    input3.classList.add("input");
    input3.setAttribute("list", "input_list_3");
    input3.id = "input_3";
    input3.name = "input_3";

    const dataList3 = document.createElement("datalist");
    dataList3.id = "input_list_3";
    const option8 = document.createElement("option");
    option8.value = "Vegetarian";
    dataList3.appendChild(option8);
    const option9 = document.createElement("option");
    option9.value = "Not vegetarian";
    dataList3.appendChild(option9);

    input3.appendChild(dataList3);
    form3.appendChild(input3);
    filter.appendChild(form3);

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
    this.renderRecipes(data, body);

    searchPage.appendChild(body);
    // ##### end of search body #####

    this.shadowRoot.appendChild(styleElem);
    this.shadowRoot.appendChild(searchPage);
  }
}

customElements.define("search-page", SearchPage);
