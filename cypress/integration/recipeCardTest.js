// import component
import { cyan } from "chalk";
import { printAnnotation } from "jest-diff/build/printDiffs";
import RecipeCard from "../..//source/js/RecipeCard";

//const card = new RecipeCard();
// document.createElement("recipe-card");
//RecipeCard.setAttribute("id", "RecipeCard");
window.RecipeCard = document.createElement("recipe-card");

describe("check page", () => {
  it("render", () => {
    cy.window().then((win) => {
      expect(win.RecipeCard).to.exist;
    });
  });
});
