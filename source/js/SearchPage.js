class SearchPage extends HTMLElement {
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
        width: 30%;
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
      }
    `;
    const styleElem = document.createElement("style");
    styleElem.innerHTML = style;

    const search_page = document.createElement("article");

    //##### start of filter #####
    const filter = document.createElement("div");
    filter.id = "filter";

    //filter label
    const filterLabel = document.createElement("div");
    filterLabel.id = "filter_label";
    filterLabel.innerHTML = "Filter";
    filter.appendChild(filterLabel);

    //clear all button
    const clearAll = document.createElement("button");
    clearAll.id = "clear_all";
    clearAll.innerHTML = "CLEAR ALL";
    filter.appendChild(clearAll);

    //hr
    const hr = document.createElement("hr");
    hr.style.marginTop = '25%';
    hr.style.width = '90%';
    hr.style.textAlign = 'center';
    hr.style.color = 'black';
    filter.appendChild(hr);

    //label Rating
    const label_1 = document.createElement("div");
    label_1.classList.add("label");
    label_1.style.top = '18%';
    label_1.innerHTML = "Rating";
    filter.appendChild(label_1);

    //label Cooking Time
    const label_2 = document.createElement("div");
    label_2.classList.add("label");
    label_2.style.top = '38%';
    label_2.innerHTML = "Cooking Time";
    filter.appendChild(label_2);

    //label 
    const label_3 = document.createElement("div");
    label_3.classList.add("label");
    label_3.style.top = '60%';
    label_3.innerHTML = "";
    filter.appendChild(label_3);

    //form 1
    const form_1 = document.createElement("form");
    form_1.classList.add("form");
    form_1.style.top = '28%';

    const input_1 = document.createElement("input");
    input_1.classList.add("input");
    input_1.list = "input_list_1";
    input_1.id = "input_1";
    input_1.name = "input_1";

    const input_list_1 = document.createElement("datalist");
    input_list_1.id = "input_list_1";
    const option_1 = document.createElement("option");
    option_1.value = "4 or more stars";
    input_list_1.appendChild(option_1);
    const option_2 = document.createElement("option");
    option_2.value = "3 or more stars";
    input_list_1.appendChild(option_2);
    const option_3 = document.createElement("option");
    option_3.value = "2 or more stars";
    input_list_1.appendChild(option_3);
    const option_4 = document.createElement("option");
    option_4.value = "1 or more stars";
    input_list_1.appendChild(option_4);

    input_1.appendChild(input_list_1);
    form_1.appendChild(input_1);
    filter.appendChild(form_1);

    //form 2
    const form_2 = document.createElement("form");
    form_2.classList.add("form");
    form_2.style.top = '48%';

    const input_2 = document.createElement("input");
    input_2.classList.add("input");
    input_2.list = "input_list_2";
    input_2.id = "input_2";
    input_2.name = "input_2";

    const input_list_2 = document.createElement("datalist");
    input_list_2.id = "input_list_2";
    const option_5 = document.createElement("option");
    option_5.value = "15 minutes or less";
    input_list_2.appendChild(option_5);
    const option_6 = document.createElement("option");
    option_6.value = "30 minutes or less";
    input_list_2.appendChild(option_6);
    const option_7 = document.createElement("option");
    option_7.value = "45 minutes or less";
    input_list_2.appendChild(option_7);
    
    input_2.appendChild(input_list_2);
    form_2.appendChild(input_2);
    filter.appendChild(form_2);

    //form 3
    const form_3 = document.createElement("form");
    form_3.classList.add("form");
    form_3.style.top = '70%';

    const input_3 = document.createElement("input");
    input_3.classList.add("input");
    input_3.list = "input_list_3";
    input_3.id = "input_3";
    input_3.name = "input_3";

    const input_list_3 = document.createElement("datalist");
    input_list_3.id = "input_list_3";
    const option_8 = document.createElement("option");
    option_8.value = "";
    input_list_3.appendChild(option_8);
    const option_9 = document.createElement("option");
    option_9.value = "";
    input_list_3.appendChild(option_9);
    const option_10 = document.createElement("option");
    option_10.value = "";
    input_list_3.appendChild(option_10);
    
    input_3.appendChild(input_list_3);
    form_3.appendChild(input_3);
    filter.appendChild(form_3);

    //apply button
    const apply = document.createElement("button");
    apply.id = "apply";
    apply.innerHTML = "APPLY";
    filter.appendChild(apply);

    search_page.appendChild(filter);
    //##### end of filter #####


    //##### start of search body ##### (#todo)
    const body = document.createElement("div");
    body.id = "search_body";

    search_page.appendChild(body);
    //##### end of search body #####

    this.shadowRoot.appendChild(styleElem);
    this.shadowRoot.appendChild(search_page);
    }
}

customElements.define("search-page", SearchPage);
