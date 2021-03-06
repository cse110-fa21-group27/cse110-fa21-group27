/**
 * Upon construction, this custom webcomponent is empty.
 * When its .data property is set, the webcomponent is filled
 */
class RoadmapPage extends HTMLElement {
  /** Constructs the Component and allows access to the shadow */
  constructor() {
    super();
    // eslint-disable-next-line no-unused-vars
    const shadow = this.attachShadow({ mode: "open" });
    // Creates CSS for the Nav Bar Component
    const style = `
        .header-wrapper{

        }
        .header-first{
          font-size
        }
        .header-second{
          font-size
        }
        .wrapper{
          margin-top: 7%;
          display: flex;
          flex-direction: column;
          gap: 50px;
        }
        .wrapper2{
          width: 30%;
          margin-top: 3%;
          margin-left: auto;
          margin-right: auto;
          display: flex;
          flex-direction: column;
          gap: 10px;
          background: white;
          border: 10px solid #5ba459;
          border-radius: 0.5em;
        }
        .container1 {
          display: block;
          margin-left: auto;
          margin-right: auto;
          width: 98%;
          height: 30%;
          align-items: center;
          border: 10px solid #004152;
          border-radius: 1em;
          border-style: solid none solid solid ;
          background: #5b8775 ;
        }
        .container2 {
          display: block;
          margin-left: auto;
          margin-right: auto;
          width: 98%;
          height: 30%;
          align-items: center;
          border: 10px solid #004152;
          border-radius: 1em;
          border-style: solid solid solid none ;
          background: #5b8775;
        }
        .progress_container1{
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          gap: 0em;
          margin-left: auto;
          margin-right: 0em;
          width: 90vw;
          background: #5b8775;
        }

        .progress_container2{
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          gap: 0em;
          margin-left: 0em;
          margin-right: 0em;
          width: 90vw;
          background: #5b8775;
        }
        .rectangle{
          display: flex;
          flex-direction: column;
          gap: 0.5em;
          width: 20%;
          height: auto;
          background: white;
          border: 2px solid #004152;
          border-radius: 0.5em;
        }
        .rectangle-after{
          display: flex;
          flex-direction: column;
          gap: 0.5em;
          width: 20%;
          background: white;
          border: 2px solid #5ba459;
          border-radius: 0.5em;
        }
        .rectangle_line{
          display: flex;
          align-items: center;
          width: 20%;
          background: transparent;
          
        }
        .rectangle_line_connect{
          display: flex;
          align-items: center;
          width:auto
          background: transparent;
        }

        .image{
          margin-top: 0.2em;
          margin-left: auto;
          margin-right: auto;
          background: white;
          border: solid #004152;
          border-radius: 10em;
          width: 9em;
          height: 9em;
        }
        .title{
          margin-left: auto;
          margin-right: auto;
        }
        .button1{
          margin-left: 0.5em;
          margin-right: 0.5em;
          border: 2px solid #004152;
          border-radius: 10em;
        }
        .button2{
          margin-left: 2em;
          margin-right: 2em;
          border: 2px solid #004152;
          border-radius: 10em;
        }
        .button2-after{
          margin-left: 2em;
          margin-right: 2em;
          border: 2px solid #004152;
          border-radius: 10em;
          background: #5ba459;
        }
        .step{
          margin-left: auto;
          margin-right: auto;
        }
        .line{
          width: 100%;
          display: block;
          border: 1px inset #004152;
          border-radius: 1em;
          overflow: hidden;
        }
        .line-after{
          width: 100%;
          display: block;
          border: 3px solid #5ba459;
          border-radius: 1em;
          overflow: hidden;
        }
        .checkmark{
          width: 2em;
          height: 2em;
        }

        .gordon{
          width: 100%;
          height: 90%;
        }
        .congrat_text{
          font-size: 24px;
        }

      }

        `;

    const line = document.createElement("hr");
    const line2 = document.createElement("hr");
    const line3 = document.createElement("hr");
    const line4 = document.createElement("hr");
    const line5 = document.createElement("hr");
    const line21 = document.createElement("hr");
    const line22 = document.createElement("hr");
    const line23 = document.createElement("hr");
    const line24 = document.createElement("hr");

    const wrapper2 = document.createElement("article");

    const styleElem = document.createElement("style");
    styleElem.innerHTML = style;

    const header = document.createElement("div");
    header.classList.add("header-wrapper");
    const h1 = document.createElement("h1");
    h1.classList.add("header-first");
    h1.innerText = "10 Cooking Basics Everyone Should Know";
    header.appendChild(h1);
    const h2 = document.createElement("h1");
    h2.classList.add("header-first");
    h2.innerText = "How Many Have You Mastered?";
    header.appendChild(h2);

    const wrapper = document.createElement("article");
    wrapper.classList.add("wrapper");

    const container = document.createElement("div");
    container.classList.add("container1");
    const progressContainer = document.createElement("div");
    progressContainer.classList.add("progress_container1");
    container.appendChild(progressContainer);
    wrapper.appendChild(container);

    // 1 rectangle object
    const rectangle1 = document.createElement("div");
    rectangle1.classList.add("rectangle");
    progressContainer.appendChild(rectangle1);

    // 1 image object
    const image1 = document.createElement("img");
    image1.setAttribute("src", "./images/scramble.png");
    image1.classList.add("image");
    rectangle1.appendChild(image1);

    // 1 title object
    const title1 = document.createElement("text");
    title1.innerText = "Scrambled Eggs";
    title1.classList.add("title");
    rectangle1.appendChild(title1);

    // 1 button object
    const button11 = document.createElement("button");
    button11.classList.add("button1");
    const text11 = document.createElement("text");
    text11.innerText = "View Recipe";
    button11.appendChild(text11);
    rectangle1.appendChild(button11);
    button11.addEventListener("click", () => {
      // scrambled eggs
      const recipeId = "55501";
      this.goRecipe(recipeId);
    });

    // 1 button object
    const button12 = document.createElement("button");
    button12.classList.add("button2");
    const checkImg1 = document.createElement("img");
    checkImg1.setAttribute("src", "./images/round_done.png");
    checkImg1.classList.add("checkmark");
    button12.appendChild(checkImg1);
    rectangle1.appendChild(button12);
    button12.addEventListener("click", () => {
      if (rectangle1.classList.contains("rectangle")) {
        rectangle1.classList.remove("rectangle");
        rectangle1.classList.add("rectangle-after");
        button12.classList.remove("button2");
        button12.classList.add("button2-after");
        line.classList.remove("line");
        line.classList.add("line-after");
      } else {
        rectangle1.classList.add("rectangle");
        rectangle1.classList.remove("rectangle-after");
        button12.classList.add("button2");
        button12.classList.remove("button2-after");
        line.classList.add("line");
        line.classList.remove("line-after");
      }
    });

    // 1 step number object
    const step1 = document.createElement("text");
    step1.innerText = "Step 1";
    step1.classList.add("step");
    rectangle1.appendChild(step1);

    // 1 line object
    const rectangle2 = document.createElement("div");
    rectangle2.classList.add("rectangle_line");

    line.classList.add("line");
    rectangle2.appendChild(line);
    progressContainer.appendChild(rectangle2);

    // 2 rectangle object
    const rectangle3 = document.createElement("div");
    rectangle3.classList.add("rectangle");
    progressContainer.appendChild(rectangle3);

    // 2 image object
    const image2 = document.createElement("img");
    image2.setAttribute("src", "./images/omelet.png");
    image2.classList.add("image");
    rectangle3.appendChild(image2);

    // 2 title object
    const title2 = document.createElement("text");
    title2.innerText = "Omelet";
    title2.classList.add("title");
    rectangle3.appendChild(title2);

    // 2 button object
    const button21 = document.createElement("button");
    button21.classList.add("button1");
    const text21 = document.createElement("text");
    text21.innerText = "View Recipe";
    button21.appendChild(text21);
    rectangle3.appendChild(button21);
    button21.addEventListener("click", () => {
      // omelet
      const recipeId = "55502";
      this.goRecipe(recipeId);
    });

    // 2 button object
    const button22 = document.createElement("button");
    button22.classList.add("button2");
    const checkImg2 = document.createElement("img");
    checkImg2.setAttribute("src", "./images/round_done.png");
    checkImg2.classList.add("checkmark");
    button22.appendChild(checkImg2);
    rectangle3.appendChild(button22);
    button22.addEventListener("click", () => {
      if (rectangle3.classList.contains("rectangle")) {
        rectangle3.classList.remove("rectangle");
        rectangle3.classList.add("rectangle-after");
        button22.classList.remove("button2");
        button22.classList.add("button2-after");
        line2.classList.remove("line");
        line2.classList.add("line-after");
      } else {
        rectangle3.classList.add("rectangle");
        rectangle3.classList.remove("rectangle-after");
        button22.classList.add("button2");
        button22.classList.remove("button2-after");
        line2.classList.add("line");
        line2.classList.remove("line-after");
      }
    });

    // 2 step number object
    const step2 = document.createElement("text");
    step2.innerText = "Step 2";
    step2.classList.add("step");
    rectangle3.appendChild(step2);

    // 2 line object
    const rectangle4 = document.createElement("div");
    rectangle4.classList.add("rectangle_line");

    line2.classList.add("line");
    rectangle4.appendChild(line2);
    progressContainer.appendChild(rectangle4);

    // 3 rectangle object
    const rectangle5 = document.createElement("div");
    rectangle5.classList.add("rectangle");
    progressContainer.appendChild(rectangle5);

    // 3 image object
    const image3 = document.createElement("img");
    image3.setAttribute("src", "./images/pancake.png");
    image3.classList.add("image");
    rectangle5.appendChild(image3);

    // 3 title object
    const title3 = document.createElement("text");
    title3.innerText = "Pancakes";
    title3.classList.add("title");
    rectangle5.appendChild(title3);

    // 3 button object
    const button31 = document.createElement("button");
    button31.classList.add("button1");
    const text31 = document.createElement("text");
    text31.innerText = "View Recipe";
    button31.appendChild(text31);
    rectangle5.appendChild(button31);
    button31.addEventListener("click", () => {
      // pancakes
      const recipeId = "55503";
      this.goRecipe(recipeId);
    });

    // 3 button object
    const button32 = document.createElement("button");
    button32.classList.add("button2");
    const checkImg3 = document.createElement("img");
    checkImg3.setAttribute("src", "./images/round_done.png");
    checkImg3.classList.add("checkmark");
    button32.appendChild(checkImg3);
    rectangle5.appendChild(button32);
    button32.addEventListener("click", () => {
      if (rectangle5.classList.contains("rectangle")) {
        rectangle5.classList.remove("rectangle");
        rectangle5.classList.add("rectangle-after");
        button32.classList.remove("button2");
        button32.classList.add("button2-after");
        line3.classList.remove("line");
        line3.classList.add("line-after");
      } else {
        rectangle5.classList.add("rectangle");
        rectangle5.classList.remove("rectangle-after");
        button32.classList.add("button2");
        button32.classList.remove("button2-after");
        line3.classList.add("line");
        line3.classList.remove("line-after");
      }
    });

    // 3 step number object
    const step3 = document.createElement("text");
    step3.innerText = "Step 3";
    step3.classList.add("step");
    rectangle5.appendChild(step3);

    // 3 line object
    const rectangle6 = document.createElement("div");
    rectangle6.classList.add("rectangle_line");

    line3.classList.add("line");
    rectangle6.appendChild(line3);
    progressContainer.appendChild(rectangle6);

    // 4 rectangle object
    const rectangle7 = document.createElement("div");
    rectangle7.classList.add("rectangle");
    progressContainer.appendChild(rectangle7);

    // 4 image object
    const image4 = document.createElement("img");
    image4.setAttribute("src", "./images/salad.png");
    image4.classList.add("image");
    rectangle7.appendChild(image4);

    // 4 title object
    const title4 = document.createElement("text");
    title4.innerText = "Salad";
    title4.classList.add("title");
    rectangle7.appendChild(title4);

    // 4 button object
    const button41 = document.createElement("button");
    button41.classList.add("button1");
    const text41 = document.createElement("text");
    text41.innerText = "View Recipe";
    button41.appendChild(text41);
    rectangle7.appendChild(button41);
    button41.addEventListener("click", () => {
      // salad
      const recipeId = "645265";
      this.goRecipe(recipeId);
    });

    // 4 button object
    const button42 = document.createElement("button");
    button42.classList.add("button2");
    const checkImg4 = document.createElement("img");
    checkImg4.setAttribute("src", "./images/round_done.png");
    checkImg4.classList.add("checkmark");
    button42.appendChild(checkImg4);
    rectangle7.appendChild(button42);
    button42.addEventListener("click", () => {
      if (rectangle7.classList.contains("rectangle")) {
        rectangle7.classList.remove("rectangle");
        rectangle7.classList.add("rectangle-after");
        button42.classList.remove("button2");
        button42.classList.add("button2-after");
        line4.classList.remove("line");
        line4.classList.add("line-after");
      } else {
        rectangle7.classList.add("rectangle");
        rectangle7.classList.remove("rectangle-after");
        button42.classList.add("button2");
        button42.classList.remove("button2-after");
        line4.classList.add("line");
        line4.classList.remove("line-after");
      }
    });

    // 4 step number object
    const step4 = document.createElement("text");
    step4.innerText = "Step 4";
    step4.classList.add("step");
    rectangle7.appendChild(step4);

    // 4 line object
    const rectangle8 = document.createElement("div");
    rectangle8.classList.add("rectangle_line");

    line4.classList.add("line");
    rectangle8.appendChild(line4);
    progressContainer.appendChild(rectangle8);

    // 5 rectangle object
    const rectangle9 = document.createElement("div");
    rectangle9.classList.add("rectangle");
    progressContainer.appendChild(rectangle9);

    // 5 image object
    const image5 = document.createElement("img");
    image5.setAttribute("src", "./images/hamburger.png");
    image5.classList.add("image");
    rectangle9.appendChild(image5);

    // 5 title object
    const title5 = document.createElement("text");
    title5.innerText = "Burger";
    title5.classList.add("title");
    rectangle9.appendChild(title5);

    // 5 button object
    const button51 = document.createElement("button");
    button51.classList.add("button1");
    const text51 = document.createElement("text");
    text51.innerText = "View Recipe";
    button51.appendChild(text51);
    rectangle9.appendChild(button51);
    button51.addEventListener("click", () => {
      // burger
      const recipeId = "632874";
      this.goRecipe(recipeId);
    });

    // 5 button object
    const button52 = document.createElement("button");
    button52.classList.add("button2");
    const checkImg5 = document.createElement("img");
    checkImg5.setAttribute("src", "./images/round_done.png");
    checkImg5.classList.add("checkmark");
    button52.appendChild(checkImg5);
    rectangle9.appendChild(button52);
    button52.addEventListener("click", () => {
      if (rectangle9.classList.contains("rectangle")) {
        rectangle9.classList.remove("rectangle");
        rectangle9.classList.add("rectangle-after");
        button52.classList.remove("button2");
        button52.classList.add("button2-after");
        line5.classList.remove("line");
        line5.classList.add("line-after");
      } else {
        rectangle9.classList.add("rectangle");
        rectangle9.classList.remove("rectangle-after");
        button52.classList.add("button2");
        button52.classList.remove("button2-after");
        line5.classList.add("line");
        line5.classList.remove("line-after");
      }
    });

    // 5 step number object
    const step5 = document.createElement("text");
    step5.innerText = "Step 5";
    step5.classList.add("step");
    rectangle9.appendChild(step5);

    /**
     * Second layer of the tutorial
     */

    const container2 = document.createElement("div");
    container2.classList.add("container2");
    const progressContainer2 = document.createElement("div");
    progressContainer2.classList.add("progress_container2");
    container2.appendChild(progressContainer2);
    wrapper.appendChild(container2);

    // 5 line object
    const rectangle10 = document.createElement("div");
    rectangle10.classList.add("rectangle_line");

    line5.classList.add("line");
    rectangle10.appendChild(line5);
    progressContainer2.appendChild(rectangle10);

    // 2 1 rectangle object
    const rectangle21 = document.createElement("div");
    rectangle21.classList.add("rectangle");
    progressContainer2.appendChild(rectangle21);

    // 2 1 image object
    const image21 = document.createElement("img");
    image21.setAttribute("src", "./images/steak.png");
    image21.classList.add("image");
    rectangle21.appendChild(image21);

    // 2 1 title object
    const title21 = document.createElement("text");
    title21.innerText = "Steak";
    title21.classList.add("title");
    rectangle21.appendChild(title21);

    // 2 1 1 button object
    const button211 = document.createElement("button");
    button211.classList.add("button1");
    const text211 = document.createElement("text");
    text211.innerText = "View Recipe";
    button211.appendChild(text211);
    rectangle21.appendChild(button211);
    button211.addEventListener("click", () => {
      // steak
      const recipeId = "55504";
      this.goRecipe(recipeId);
    });

    // 2 1 2 button object
    const button212 = document.createElement("button");
    button212.classList.add("button2");
    const checkImg21 = document.createElement("img");
    checkImg21.setAttribute("src", "./images/round_done.png");
    checkImg21.classList.add("checkmark");
    button212.appendChild(checkImg21);
    rectangle21.appendChild(button212);
    button212.addEventListener("click", () => {
      if (rectangle21.classList.contains("rectangle")) {
        rectangle21.classList.remove("rectangle");
        rectangle21.classList.add("rectangle-after");
        button212.classList.remove("button2");
        button212.classList.add("button2-after");
        line21.classList.remove("line");
        line21.classList.add("line-after");
      } else {
        rectangle21.classList.add("rectangle");
        rectangle21.classList.remove("rectangle-after");
        button212.classList.add("button2");
        button212.classList.remove("button2-after");
        line21.classList.add("line");
        line21.classList.remove("line-after");
      }
    });

    // 2 1 step number object
    const step6 = document.createElement("text");
    step6.innerText = "Step 6";
    step6.classList.add("step");
    rectangle21.appendChild(step6);

    // 2 1 line object
    const rectangle22 = document.createElement("div");
    rectangle22.classList.add("rectangle_line");

    line21.classList.add("line");
    rectangle22.appendChild(line21);
    progressContainer2.appendChild(rectangle22);

    // 2 2 rectangle object
    const rectangle23 = document.createElement("div");
    rectangle23.classList.add("rectangle");
    progressContainer2.appendChild(rectangle23);

    // 2 2 image object
    const image22 = document.createElement("img");
    image22.setAttribute("src", "./images/chicken.png");
    image22.classList.add("image");
    rectangle23.appendChild(image22);

    // 2 2 title object
    const title22 = document.createElement("text");
    title22.innerText = "Chicken";
    title22.classList.add("title");
    rectangle23.appendChild(title22);

    // 2 2 1 button object - view recipe button
    const button221 = document.createElement("button");
    button221.classList.add("button1");
    const text221 = document.createElement("text");
    text221.innerText = "View Recipe";
    button221.appendChild(text221);
    rectangle23.appendChild(button221);
    button221.addEventListener("click", () => {
      // chicken
      const recipeId = "55505";
      this.goRecipe(recipeId);
    });

    // 2 2 2 button object - completed button
    const button222 = document.createElement("button");
    button222.classList.add("button2");
    const checkImg22 = document.createElement("img");
    checkImg22.setAttribute("src", "./images/round_done.png");
    checkImg22.classList.add("checkmark");
    button222.appendChild(checkImg22);
    rectangle23.appendChild(button222);
    button222.addEventListener("click", () => {
      if (rectangle23.classList.contains("rectangle")) {
        rectangle23.classList.remove("rectangle");
        rectangle23.classList.add("rectangle-after");
        button222.classList.remove("button2");
        button222.classList.add("button2-after");
        line22.classList.remove("line");
        line22.classList.add("line-after");
      } else {
        rectangle23.classList.add("rectangle");
        rectangle23.classList.remove("rectangle-after");
        button222.classList.add("button2");
        button222.classList.remove("button2-after");
        line22.classList.add("line");
        line22.classList.remove("line-after");
      }
    });

    // 2 2 step number object
    const step7 = document.createElement("text");
    step7.innerText = "Step 7";
    step7.classList.add("step");
    rectangle23.appendChild(step7);

    // 2 2 line object
    const rectangle24 = document.createElement("div");
    rectangle24.classList.add("rectangle_line");
    line22.classList.add("line");
    rectangle24.appendChild(line22);
    progressContainer2.appendChild(rectangle24);

    // 2 3 rectangle object
    const rectangle25 = document.createElement("div");
    rectangle25.classList.add("rectangle");
    progressContainer2.appendChild(rectangle25);

    // 2 3 image object
    const image23 = document.createElement("img");
    image23.setAttribute("src", "./images/roastmeat.png");
    image23.classList.add("image");
    rectangle25.appendChild(image23);

    // 2 3 title object
    const title23 = document.createElement("text");
    title23.innerText = "Roast Meat";
    title23.classList.add("title");
    rectangle25.appendChild(title23);

    // 2 3 1button object
    const button231 = document.createElement("button");
    button231.classList.add("button1");
    const text231 = document.createElement("text");
    text231.innerText = "View Recipe";
    button231.appendChild(text231);
    rectangle25.appendChild(button231);
    button231.addEventListener("click", () => {
      // pot roast meat
      const recipeId = "639628";
      this.goRecipe(recipeId);
    });

    // 2 3 2 button object
    const button232 = document.createElement("button");
    button232.classList.add("button2");
    const checkImg23 = document.createElement("img");
    checkImg23.setAttribute("src", "./images/round_done.png");
    checkImg23.classList.add("checkmark");
    button232.appendChild(checkImg23);
    rectangle25.appendChild(button232);
    button232.addEventListener("click", () => {
      if (rectangle25.classList.contains("rectangle")) {
        rectangle25.classList.remove("rectangle");
        rectangle25.classList.add("rectangle-after");
        button232.classList.remove("button2");
        button232.classList.add("button2-after");
        line23.classList.remove("line");
        line23.classList.add("line-after");
      } else {
        rectangle25.classList.add("rectangle");
        rectangle25.classList.remove("rectangle-after");
        button232.classList.add("button2");
        button232.classList.remove("button2-after");
        line23.classList.add("line");
        line23.classList.remove("line-after");
      }
    });

    // 2 3 step number object
    const step8 = document.createElement("text");
    step8.innerText = "Step 8";
    step8.classList.add("step");
    rectangle25.appendChild(step8);

    // 2 3 line object
    const rectangle26 = document.createElement("div");
    rectangle26.classList.add("rectangle_line");
    line23.classList.add("line");
    rectangle26.appendChild(line23);
    progressContainer2.appendChild(rectangle26);

    // 2 4 rectangle object
    const rectangle27 = document.createElement("div");
    rectangle27.classList.add("rectangle");
    progressContainer2.appendChild(rectangle27);

    // 2 4 image object
    const image24 = document.createElement("img");
    image24.setAttribute("src", "./images/sauce.png");
    image24.classList.add("image");
    rectangle27.appendChild(image24);

    // 2 4 title object
    const title24 = document.createElement("text");
    title24.innerText = "Sauce";
    title24.classList.add("title");
    rectangle27.appendChild(title24);

    // 2 4 1 button object
    const button241 = document.createElement("button");
    button241.classList.add("button1");
    const text241 = document.createElement("text");
    text241.innerText = "View Recipe";
    button241.appendChild(text241);
    rectangle27.appendChild(button241);
    button241.addEventListener("click", () => {
      // bolognase sauce
      const recipeId = "633068";
      this.goRecipe(recipeId);
    });

    // 2 4 2 button object
    const button242 = document.createElement("button");
    button242.classList.add("button2");
    const checkImg24 = document.createElement("img");
    checkImg24.setAttribute("src", "./images/round_done.png");
    checkImg24.classList.add("checkmark");
    button242.appendChild(checkImg24);
    rectangle27.appendChild(button242);
    button242.addEventListener("click", () => {
      if (rectangle27.classList.contains("rectangle")) {
        rectangle27.classList.remove("rectangle");
        rectangle27.classList.add("rectangle-after");
        button242.classList.remove("button2");
        button242.classList.add("button2-after");
        line24.classList.remove("line");
        line24.classList.add("line-after");
      } else {
        rectangle27.classList.add("rectangle");
        rectangle27.classList.remove("rectangle-after");
        button242.classList.add("button2");
        button242.classList.remove("button2-after");
        line24.classList.add("line");
        line24.classList.remove("line-after");
      }
    });

    // 2 4 step number object
    const step9 = document.createElement("text");
    step9.innerText = "Step 9";
    step9.classList.add("step");
    rectangle27.appendChild(step9);

    // 2 4 line object
    const rectangle28 = document.createElement("div");
    rectangle28.classList.add("rectangle_line");
    line24.classList.add("line");
    rectangle28.appendChild(line24);
    progressContainer2.appendChild(rectangle28);

    // 2 5 rectangle object
    const rectangle29 = document.createElement("div");
    rectangle29.classList.add("rectangle");
    progressContainer2.appendChild(rectangle29);

    // 2 5 image object
    const image25 = document.createElement("img");
    image25.setAttribute("src", "./images/cookies.png");
    image25.classList.add("image");
    rectangle29.appendChild(image25);

    // 2 5 title object
    const title25 = document.createElement("text");
    title25.innerText = "Cookies";
    title25.classList.add("title");
    rectangle29.appendChild(title25);

    // 2 5 button object
    const button251 = document.createElement("button");
    button251.classList.add("button1");
    const text251 = document.createElement("text");
    text251.innerText = "View Recipe";
    button251.appendChild(text251);
    rectangle29.appendChild(button251);
    button251.addEventListener("click", (event) => {
      // Cookies
      const recipeId = "638940";
      this.goRecipe(recipeId);
    });

    // 2 5 button object
    const button252 = document.createElement("button");
    button252.classList.add("button2");
    const checkImg25 = document.createElement("img");
    checkImg25.setAttribute("src", "./images/round_done.png");
    checkImg25.classList.add("checkmark");
    button252.appendChild(checkImg25);
    rectangle29.appendChild(button252);
    button252.addEventListener("click", () => {
      if (rectangle29.classList.contains("rectangle")) {
        rectangle29.classList.remove("rectangle");
        rectangle29.classList.add("rectangle-after");
        button252.classList.remove("button2");
        button252.classList.add("button2-after");
      } else {
        rectangle29.classList.add("rectangle");
        rectangle29.classList.remove("rectangle-after");
        button252.classList.add("button2");
        button252.classList.remove("button2-after");
      }
    });

    // tutorial finished display fuction
    document.addEventListener("click", () => {
      if (
        rectangle29.classList.contains("rectangle-after") &&
        rectangle27.classList.contains("rectangle-after") &&
        rectangle25.classList.contains("rectangle-after") &&
        rectangle23.classList.contains("rectangle-after") &&
        rectangle21.classList.contains("rectangle-after") &&
        rectangle9.classList.contains("rectangle-after") &&
        rectangle7.classList.contains("rectangle-after") &&
        rectangle5.classList.contains("rectangle-after") &&
        rectangle3.classList.contains("rectangle-after") &&
        rectangle1.classList.contains("rectangle-after")
      ) {
        rectangle29.classList.remove("rectangle");
        rectangle29.classList.add("rectangle-after");
        button252.classList.remove("button2");
        button252.classList.add("button2-after");
        this.shadowRoot.removeChild(wrapper);
        this.shadowRoot.appendChild(wrapper2);
        this.shadowRoot.appendChild(wrapper);
      } else {
        this.shadowRoot.removeChild(wrapper2);
      }
    });

    // 2 5 step number object
    const step10 = document.createElement("text");
    step10.innerText = "Step 10";
    step10.classList.add("step");
    rectangle29.appendChild(step10);

    wrapper2.classList.add("wrapper2");

    // after step 10 completed
    const congratImage = document.createElement("img");
    congratImage.setAttribute("src", "./images/gordon_happy_image.jpeg");
    congratImage.classList.add("gordon");
    wrapper2.appendChild(congratImage);
    const congratText = document.createElement("text");
    congratText.innerText = "Congratulations you completed the tutorial!";
    congratText.classList.add("congrat_text");
    wrapper2.appendChild(congratText);

    this.shadowRoot.appendChild(header);
    this.shadowRoot.appendChild(wrapper);
    this.shadowRoot.appendChild(styleElem);
  }
}

customElements.define("roadmap-page", RoadmapPage);
