// sample_spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:

const { cyan } = require("chalk");
const { createDocument } = require("parse5/lib/tree-adapters/default");
const magicNumbers = require("./magictestNumbers");
function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

// https://on.cypress.io/writing-first-test
describe("Open Page", { timeout: 10000 }, () => {
  it("Opens index.html", () => {
    cy.visit("./source/index.html");
  });

  it("check how many recipes there are", () => {
    cy.get("recipe-card").should("have.length", magicNumbers.numOfRecipes);
  });

  // Check that *a* recipe thumbnail isn't empty
  it(
    "check that a random recipe thumbnail isn't empty",
    { timeout: 10000 },
    () => {
      cy.get(
        `.recipes > :nth-child(${Math.floor(
          Math.random() * (magicNumbers.numOfRecipes + 1)
        )})`
      )
        .shadow()
        .find(".thumbnail-photo")
        .invoke("attr", "src")
        .then(($el) => {
          expect($el).to.not.be.empty;
        });
    }
  );

  for (let i = 1; i < magicNumbers.numOfRecipes + 1; i++) {
    let allPop = true;
    // Check that *all* recipe thumbnails aren't empty
    it(`check that recipe ${i} isn't empty`, { timeout: 10000 }, () => {
      let populated = true;

      cy.get(`.recipes > :nth-child(${i})`)
        .shadow()
        .find(".thumbnail-photo")
        .invoke("attr", "src")
        .then(($el) => {
          if ($el == "undefined" || !$el) {
            console.error(`Something is wrong with the image from recipe ${i}`);
            populated = false;
          } else {
            populated = true;
          }
          expect(populated).to.be.true;
        });
    });
  }

  it(
    "try to get the src of a recipe card thumbnail",
    { timeout: 10000 },
    () => {
      cy.get(".recipes > :nth-child(1)")
        .shadow()
        .find(".thumbnail-photo")
        .invoke("attr", "src")
        .then(($el) => {
          expect($el).to.contain("jpg");
        });
    }
  );
});
