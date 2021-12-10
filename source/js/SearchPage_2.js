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
      hr.style.marginTop = "25%";
      hr.style.width = "90%";
      hr.style.textAlign = "center";
      hr.style.color = "black";
      filter.appendChild(hr);
  
      //label Rating
      const label_1 = document.createElement("div");
      label_1.classList.add("label");
      label_1.style.top = "80px";
      label_1.innerHTML = "Rating";
      filter.appendChild(label_1);
  
      //label Cooking Time
      const label_2 = document.createElement("div");
      label_2.classList.add("label");
      label_2.style.top = "160px";
      label_2.innerHTML = "Cooking Time";
      filter.appendChild(label_2);
  
      //form 1
      const form_1 = document.createElement("form");
      form_1.classList.add("form");
      form_1.style.top = "140px";
  
      const input_1 = document.createElement("input");
      input_1.classList.add("input");
      input_1.setAttribute("list", "input_list_1");
      input_1.id = "input_1";
      input_1.name = "input_1";
  
      const data_list_1 = document.createElement("datalist");
      data_list_1.id = "input_list_1";
      const option_1 = document.createElement("option");
      option_1.value = "4 or more stars";
      data_list_1.appendChild(option_1);
      const option_2 = document.createElement("option");
      option_2.value = "3 or more stars";
      data_list_1.appendChild(option_2);
      const option_3 = document.createElement("option");
      option_3.value = "2 or more stars";
      data_list_1.appendChild(option_3);
      const option_4 = document.createElement("option");
      option_4.value = "1 or more stars";
      data_list_1.appendChild(option_4);
  
      input_1.appendChild(data_list_1);
      form_1.appendChild(input_1);
      filter.appendChild(form_1);
  
      //form 2
      const form_2 = document.createElement("form");
      form_2.classList.add("form");
      form_2.style.top = "220px";
  
      const input_2 = document.createElement("input");
      input_2.classList.add("input");
      input_2.setAttribute("list", "input_list_2");
      input_2.id = "input_2";
      input_2.name = "input_2";
  
      const data_list_2 = document.createElement("datalist");
      data_list_2.id = "input_list_2";
      const option_5 = document.createElement("option");
      option_5.value = "15 minutes or less";
      data_list_2.appendChild(option_5);
      const option_6 = document.createElement("option");
      option_6.value = "30 minutes or less";
      data_list_2.appendChild(option_6);
      const option_7 = document.createElement("option");
      option_7.value = "45 minutes or less";
      data_list_2.appendChild(option_7);
  
      input_2.appendChild(data_list_2);
      form_2.appendChild(input_2);
      filter.appendChild(form_2);
  
      //label Vegetarian
      const label_3 = document.createElement("div");
      label_3.classList.add("label2");
      label_3.style.top = "265px";
      label_3.innerHTML = "Vegetarian";
      filter.appendChild(label_3);
  
      //form 3
      const form_3 = document.createElement("form");
      form_3.classList.add("form");
      form_3.style.top = "270px";
  
      const div_3 = document.createElement("div");
      div_3.classList.add("box");
  
      const input_3 = document.createElement("input");
      input_3.type = "checkbox";
      input_3.id = "input_3";
      input_3.name = "input_3";
      input_3.value = "Vegetarian";
      input_3.style.width = "40px";
      input_3.style.height = "40px";
  
      div_3.appendChild(input_3);
      form_3.appendChild(div_3);
      filter.appendChild(form_3);
  
      //label Vegan
      const label_4 = document.createElement("div");
      label_4.classList.add("label2");
      label_4.style.top = "345px";
      label_4.innerHTML = "Vegan";
      filter.appendChild(label_4);
  
      //form 4
      const form_4 = document.createElement("form");
      form_4.classList.add("form");
      form_4.style.top = "350px";
  
      const div_4 = document.createElement("div");
      div_4.classList.add("box");
  
      const input_4 = document.createElement("input");
      input_4.type = "checkbox";
      input_4.id = "input_4";
      input_4.name = "input_4";
      input_4.value = "Vegan";
      input_4.style.width = "40px";
      input_4.style.height = "40px";
  
      div_4.appendChild(input_4);
      form_4.appendChild(div_4);
      filter.appendChild(form_4);
      
      //label Gluten Free
      const label_5 = document.createElement("div");
      label_5.classList.add("label2");
      label_5.style.top = "425px";
      label_5.innerHTML = "Gluten Free";
      filter.appendChild(label_5);
  
      //form 5
      const form_5 = document.createElement("form");
      form_5.classList.add("form");
      form_5.style.top = "430px";
  
      const div_5 = document.createElement("div");
      div_5.classList.add("box");
  
      const input_5 = document.createElement("input");
      input_5.type = "checkbox";
      input_5.id = "input_5";
      input_5.name = "input_5";
      input_5.value = "Gluten Free";
      input_5.style.width = "40px";
      input_5.style.height = "40px";
  
      div_5.appendChild(input_5);
      form_5.appendChild(div_5);
      filter.appendChild(form_5);
  
      //label Diary Free
      const label_6 = document.createElement("div");
      label_6.classList.add("label2");
      label_6.style.top = "505px";
      label_6.innerHTML = "Diary Free";
      filter.appendChild(label_6);
  
      //form 5
      const form_6 = document.createElement("form");
      form_6.classList.add("form");
      form_6.style.top = "510px";
  
      const div_6 = document.createElement("div");
      div_6.classList.add("box");
  
      const input_6 = document.createElement("input");
      input_6.type = "checkbox";
      input_6.id = "input_6";
      input_6.name = "input_6";
      input_6.value = "Diary Free";
      input_6.style.width = "40px";
      input_6.style.height = "40px";
  
      div_6.appendChild(input_6);
      form_6.appendChild(div_6);
      filter.appendChild(form_6);
  
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
      // create recipe cards for each result
      this.renderRecipes(data, body);
  
      search_page.appendChild(body);
      //##### end of search body #####
  
      this.shadowRoot.appendChild(styleElem);
      this.shadowRoot.appendChild(search_page);
    }
  }
  
  customElements.define("search-page", SearchPage);
  