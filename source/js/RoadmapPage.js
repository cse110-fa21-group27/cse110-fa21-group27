class RoadmapPage extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    const style = `
        .container {
          margin-top: 20vw;
          display: block;
          margin-left: auto;
          margin-right: auto;
          width: 90vw;
          border: 2em solid #FFF6EC;
          border-radius: 10em;
        }
        .progress_container{
          display: flex;
          flex-direction: row-wrap;
          gap: 0em;
          margin-left: auto;
          margin-right: auto;
          width: 90vw;
          background: #FFF6EC;
        }
        

        .rectangle{
          display: flex;
          flex-direction: column;
          gap: 0.5em;
          width: 20%;
          background: white;
          border: 2px solid orange;
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
          background: white;
          
        }
        .image{
          margin-top: 0.2em;
          margin-left: auto;
          margin-right: auto;
          background: white;
          border: solid orange;
          border-radius: 10em;
          width: 50%;
          height: 50%;
        }
        .title{
          margin-left: auto;
          margin-right: auto;
        }
        .button1{
          margin-left: 0.5em;
          margin-right: 0.5em;
          border: 2px solid orange;
          border-radius: 10em;
        }
        .button2{
          margin-left: 2em;
          margin-right: 2em;
          border: 2px solid orange;
          border-radius: 10em;
        }
        .button2-after{
          margin-left: 2em;
          margin-right: 2em;
          border: 2px solid orange;
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
          border: 1px inset orange;
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
      }

        `;
    const styleElem = document.createElement("style");
    styleElem.innerHTML = style;
    
    const container = document.createElement("div");
    container.classList.add("container");
    const progress_container = document.createElement("div");
    progress_container.classList.add("progress_container");
    container.appendChild(progress_container);
    
   
    // 1 rectangle object
    const rectangle1 = document.createElement("div");
    rectangle1.classList.add("rectangle");
    progress_container.appendChild(rectangle1);
    
    //1 image object
    const image1 = document.createElement("img");
    image1.setAttribute("src", "./images/scramble.png");
    image1.classList.add("image");
    rectangle1.appendChild(image1);

    //1 title object
    const title1 = document.createElement("text");
    title1.innerText = "Scrambled Eggs";
    title1.classList.add("title");
    rectangle1.appendChild(title1);


    //1 button object
    const button11 = document.createElement("button");
    button11.classList.add("button1");
    const text11 = document.createElement("text");
    text11.innerText = "View Recipe";
    button11.appendChild(text11);
    rectangle1.appendChild(button11);

    //1 button object
    const button12 = document.createElement("button");
    button12.classList.add("button2");
    const text12 = document.createElement("text");
    let check_img = document.createElement("img");
    check_img.setAttribute("src", "./images/round_done.png");
    check_img.classList.add("checkmark");
    button12.appendChild(text12);
    button12.appendChild(check_img);
    rectangle1.appendChild(button12);
    button12.addEventListener("click", (event) => {
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

    //1 step number object
    const step1 = document.createElement("text");
    step1.innerText = "Step 1";
    step1.classList.add("step");
    rectangle1.appendChild(step1);
    

    //1 line object
    const rectangle2 = document.createElement("div");
    rectangle2.classList.add("rectangle_line");
    const line = document.createElement("hr");
    line.classList.add("line");
    rectangle2.appendChild(line);
    progress_container.appendChild(rectangle2);
    
    //2 rectangle object
    const rectangle3 = document.createElement("div");
    rectangle3.classList.add("rectangle");
    progress_container.appendChild(rectangle3);
    
    //2 image object
    const image2 = document.createElement("img");
    image2.setAttribute("src", "./images/pancake.png");
    image2.classList.add("image");
    rectangle3.appendChild(image2);

    //2 title object
    const title2 = document.createElement("text");
    title2.innerText = "Pancake";
    title2.classList.add("title");
    rectangle3.appendChild(title2);


    //2 button object
    const button21 = document.createElement("button");
    button21.classList.add("button1");
    const text21 = document.createElement("text");
    text21.innerText = "View Recipe";
    button21.appendChild(text21);
    rectangle3.appendChild(button21);

    //2 button object
    const button22 = document.createElement("button");
    button22.classList.add("button2");
    const text22 = document.createElement("text");
    text22.innerText = "Completed";
    button22.appendChild(text22);
    rectangle3.appendChild(button22);

    //2 step number object
    const step2 = document.createElement("text");
    step2.innerText = "Step 2";
    step2.classList.add("step");
    rectangle3.appendChild(step2);
    

    //2 line object
    const rectangle4 = document.createElement("div");
    rectangle4.classList.add("rectangle_line");
    const line2 = document.createElement("hr");
    line2.classList.add("line");
    rectangle4.appendChild(line2);
    progress_container.appendChild(rectangle4);

    //3 rectangle object
    const rectangle5 = document.createElement("div");
    rectangle5.classList.add("rectangle");
    progress_container.appendChild(rectangle5);
    
    //3 image object
    const image3 = document.createElement("img");
    image3.setAttribute("src", "./images/salad.png");
    image3.classList.add("image");
    rectangle5.appendChild(image3);

    //3 title object
    const title3 = document.createElement("text");
    title3.innerText = "Salad";
    title3.classList.add("title");
    rectangle5.appendChild(title3);


    //3 button object
    const button31 = document.createElement("button");
    button31.classList.add("button1");
    const text31 = document.createElement("text");
    text31.innerText = "View Recipe";
    button31.appendChild(text31);
    rectangle5.appendChild(button31);

    //3 button object
    const button32 = document.createElement("button");
    button32.classList.add("button2");
    const text32 = document.createElement("text");
    text32.innerText = "Completed";
    button32.appendChild(text32);
    rectangle5.appendChild(button32);

    //3 step number object
    const step3 = document.createElement("text");
    step3.innerText = "Step 3";
    step3.classList.add("step");
    rectangle5.appendChild(step3);
    

    //3 line object
    const rectangle6 = document.createElement("div");
    rectangle6.classList.add("rectangle_line");
    const line3 = document.createElement("hr");
    line3.classList.add("line");
    rectangle6.appendChild(line3);
    progress_container.appendChild(rectangle6);
    
    //4 rectangle object
    const rectangle7 = document.createElement("div");
    rectangle7.classList.add("rectangle");
    progress_container.appendChild(rectangle7);
    
    //4 image object
    const image4 = document.createElement("img");
    image4.setAttribute("src", "./images/hamburger.png");
    image4.classList.add("image");
    rectangle7.appendChild(image4);

    //4 title object
    const title4 = document.createElement("text");
    title4.innerText = "Hamburger";
    title4.classList.add("title");
    rectangle7.appendChild(title4);


    //4 button object
    const button41 = document.createElement("button");
    button41.classList.add("button1");
    const text41 = document.createElement("text");
    text41.innerText = "View Recipe";
    button41.appendChild(text41);
    rectangle7.appendChild(button41);

    //4 button object
    const button42 = document.createElement("button");
    button42.classList.add("button2");
    const text42 = document.createElement("text");
    text42.innerText = "Completed";
    button42.appendChild(text42);
    rectangle7.appendChild(button42);

    //4 step number object
    const step4 = document.createElement("text");
    step4.innerText = "Step 4";
    step4.classList.add("step");
    rectangle7.appendChild(step4);
    

    //4 line object
    const rectangle8 = document.createElement("div");
    rectangle8.classList.add("rectangle_line");
    const line4 = document.createElement("hr");
    line4.classList.add("line");
    rectangle8.appendChild(line4);
    progress_container.appendChild(rectangle8);

    //5 rectangle object
    const rectangle9 = document.createElement("div");
    rectangle9.classList.add("rectangle");
    progress_container.appendChild(rectangle9);
    
    //5 image object
    const image5 = document.createElement("img");
    image5.setAttribute("src", "./images/hamburger.png");
    image5.classList.add("image");
    rectangle9.appendChild(image5);

    //5 title object
    const title5 = document.createElement("text");
    title5.innerText = "Hamburger";
    title5.classList.add("title");
    rectangle9.appendChild(title5);


    //4 button object
    const button51 = document.createElement("button");
    button51.classList.add("button1");
    const text51 = document.createElement("text");
    text51.innerText = "View Recipe";
    button51.appendChild(text51);
    rectangle9.appendChild(button51);

    //4 button object
    const button52 = document.createElement("button");
    button52.classList.add("button2");
    const text52 = document.createElement("text");
    text52.innerText = "Completed";
    button52.appendChild(text52);
    rectangle9.appendChild(button52);

    //4 step number object
    const step5 = document.createElement("text");
    step5.innerText = "Step 5";
    step5.classList.add("step");
    rectangle9.appendChild(step5);
    

    //4 line object
    const rectangle10 = document.createElement("div");
    rectangle10.classList.add("rectangle_line");
    const line5 = document.createElement("hr");
    line5.classList.add("line");
    rectangle10.appendChild(line5);
    progress_container.appendChild(rectangle10);



    this.shadowRoot.appendChild(container);
    this.shadowRoot.appendChild(styleElem);
  }

  
}


customElements.define("roadmap-page", RoadmapPage);
