const { cyan } = require("chalk");
const { createDocument } = require("parse5/lib/tree-adapters/default");
const magicNumbers = require("./magictestNumbers");
const recipe1 = require("./../../__tests__/unit_js/directions");
const numSteps = recipe1.recipe1.analyzedInstructions[0].steps.length;

// https://on.cypress.io/writing-first-test
describe("Open Page", { timeout: 10000 }, () => {
  it("Opens index.html", () => {
    cy.visit("./__tests__/unit_html/directions_test.html");
  });

  // Check how many direction pages there are
  it("check how many direction pages there are", () => {
    cy.get("directions-info").should("have.length", 1);
  });

  // Check that the title says "Directions"
  it('check that the title says "Directions"', () => {
    cy.get("directions-info")
      .shadow()
      .find("p")
      .then(($el) => {
        expect($el[0].innerHTML).to.be.equal("Directions");
      });
  });
  // Check how many directions there are. Should be greater than 0.
  it("check how many steps there are", () => {
    cy.get("directions-info")
      .shadow()
      .find(".direction")
      .then(($el) => {
        expect($el.length).to.be.greaterThan(0);
        expect($el.length).to.be.equal(numSteps);
      });
  });

  for (let i = 0; i < numSteps; i++) {
    it(`check that instruction ${i} is non-empty`, () => {
      cy.get("directions-info")
        .shadow()
        .find(".text")
        .then(($el) => {
          expect($el).to.not.be.equal("");
        });
    });
  }
  // check that the instructions have been correctly parsed out
  // check that the instructions are non-0
  // check that there's a checkbox for each
  // check that there's a down-arrow src for each
  // check that clicking the button does stuff (DEFINE STUFF)
});
