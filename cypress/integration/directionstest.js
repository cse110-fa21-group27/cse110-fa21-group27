const { cyan } = require("chalk");
const { createDocument } = require("parse5/lib/tree-adapters/default");
const magicNumbers = require("./magictestNumbers");
const recipe = require("./../../__tests__/unit_js/directions");
console.log(recipe);
const numSteps = recipe.recipe1.analyzedInstructions[0].steps.length;

// https://on.cypress.io/writing-first-test
describe(
  "UNIT TEST DIRECTIONS: essentially, given good info does it do what we want?",
  { timeout: 10000 },
  () => {
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

    // check how many checkboxes there are
    it("check how many checkboxes there are", () => {
      cy.get("directions-info")
        .shadow()
        .find("input")
        .then(($el) => {
          expect($el.length).to.be.equal(numSteps);
        });
    });

    // Check all the directions steps
    for (let i = 0; i < numSteps; i++) {
      it(`check that instruction ${i} is non-empty`, () => {
        cy.get("directions-info")
          .shadow()
          .find(".text")
          .then(($el) => {
            expect($el).to.not.be.equal("");
          });
      });

      it(`check that instruction ${i} is correctly parsed`, () => {
        cy.get("directions-info")
          .shadow()
          .find(".text")
          .then(($el) => {
            expect($el[i].innerHTML).to.be.equal(
              `${i + 1}) ` +
                recipe.recipe1.analyzedInstructions[0].steps[i].step
            );
          });
      });

      it(`check that instruction ${i} has a checkbox`, () => {
        cy.get("directions-info")
          .shadow()
          .find("input")
          .then(($el) => {
            expect($el[i].type).to.be.equal("checkbox");
          });
      });

      it(`check that instruction ${i}'s checkbox is unchecked by default`, () => {
        cy.get("directions-info")
          .shadow()
          .find("input")
          .then(($el) => {
            expect($el[i].checked).to.be.equal(false);
          });
      });

      it(`check that instruction ${i}'s checkbox can be checked`, () => {
        cy.get("directions-info")
          .shadow()
          .find("input")
          .then(($el) => {
            expect($el[i].checked).to.be.equal(false);
            $el[i].click();
            expect($el[i].checked).to.be.equal(true);
            $el[i].click();
            expect($el[i].checked).to.be.equal(false);
          });
      });

      it(`check that there is a down-arrow src for instruction ${i}`, () => {
        cy.get("directions-info")
          .shadow()
          .find("img")
          .then(($el) => {
            expect($el[i].src).to.be.contain("/images/arrow-down.png");
          });
      });

      it(`check that the down-arrow is clickable for instruction ${i}`, () => {
        cy.get("directions-info")
          .shadow()
          .find("img")
          .then(($el) => {
            expect($el[i].src).to.be.contain("/images/arrow-down.png");
            $el[i].click();
          });
        cy.get("directions-info")
          .shadow()
          .find("img")
          .then(($el) => {
            expect($el[i].src).to.be.contain("/images/arrowUp.png");
          });
      });
    }

    // check that clicking the button does stuff (DEFINE STUFF)
  }
);
