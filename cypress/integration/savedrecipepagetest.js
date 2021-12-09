const { cyan } = require("chalk");
const { createDocument } = require("parse5/lib/tree-adapters/default");
const magicNumbers = require("../magictestNumbers");
function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

// https://on.cypress.io/writing-first-test
describe("Test the saved recipe feature", { timeout: 10000 }, () => {
  it("Opens index.html", () => {
    cy.visit("./source/index.html");
  });

  // Navigating to each of 5 pages, saving and returning to index
  it("Saving a few recipes", () => {
    for (let i = 1; i < 6; i++)
      cy.get(`.recipes > :nth-child(${i})`)
        .shadow()
        .find("article")
        .click()
        .get("recipe-page")
        .shadow()
        .find("article")
        .find("recipe-info")
        .shadow()
        .find("button")
        .then(($el) => {
          $el[2].click();
          cy.visit("./source/index.html");
        });
  });

  // Making sure the page exists
  it("navigating to saved recipe page", () => {
    cy.get("nav-bar").shadow().find(".navBar").find(".saved_png").click();
  });

  it("Creating a new collection form", () => {
    cy.get("saved-recipes")
      .shadow()
      .find("button")
      .then(($el) => {
        $el[0].click();
      });
  });

  it("Setting name for new collection", () => {
    cy.get("saved-recipes")
      .shadow()
      .find("div")
      .find("input")
      .then(($el) => {
        $el[0].value = "Test 1";
      });
  });

  it("Selecting options for new collection", () => {
    cy.get("saved-recipes")
      .shadow()
      .find("div")
      .find("input")
      .then(($el) => {
        for (let i = 1; i < 4; i++) {
          $el[i].click();
        }
      });
  });

  it("Creating new collection", () => {
    cy.get("saved-recipes")
      .shadow()
      .find("div")
      .find("button")
      .then(($el) => {
        $el[0].click();
      });
  });

  it("Creating a new collection form", () => {
    cy.get("saved-recipes")
      .shadow()
      .find("button")
      .then(($el) => {
        $el[0].click();
      });
  });

  it("Setting name for new collection", () => {
    cy.get("saved-recipes")
      .shadow()
      .find("div")
      .find("input")
      .then(($el) => {
        $el[0].value = "Test 2";
      });
  });

  it("Selecting options for new collection", () => {
    cy.get("saved-recipes")
      .shadow()
      .find("div")
      .find("input")
      .then(($el) => {
        for (let i = 1; i < 3; i++) {
          $el[i].click();
        }
      });
  });

  it("Cancelling new collection", () => {
    cy.get("saved-recipes")
      .shadow()
      .find("div")
      .find("button")
      .then(($el) => {
        $el[1].click();
      });
  });

  it("Creating a new collection form", () => {
    cy.get("saved-recipes")
      .shadow()
      .find("button")
      .then(($el) => {
        $el[0].click();
      });
  });

  it("Setting name for new collection", () => {
    cy.get("saved-recipes")
      .shadow()
      .find("div")
      .find("input")
      .then(($el) => {
        $el[0].value = "Test 3";
      });
  });

  it("Selecting options for new collection", () => {
    cy.get("saved-recipes")
      .shadow()
      .find("div")
      .find("input")
      .then(($el) => {
        for (let i = 1; i < 5; i++) {
          $el[i].click();
        }
      });
  });

  it("Creating new collection", () => {
    cy.get("saved-recipes")
      .shadow()
      .find("div")
      .find("button")
      .then(($el) => {
        $el[0].click();
      });
  });

  it("Creating a delete collection form", () => {
    cy.get("saved-recipes")
      .shadow()
      .find("button")
      .then(($el) => {
        $el[1].click();
      });
  });

  it("Selecting options for deleting collections", () => {
    cy.get("saved-recipes")
      .shadow()
      .find("div")
      .find("input")
      .then(($el) => {
        $el[0].click();
      });
  });

  it("Deleting the collection", () => {
    cy.get("saved-recipes")
      .shadow()
      .find("div")
      .find("button")
      .then(($el) => {
        $el[0].click();
      });
  });

  it("Creating a delete collection form", () => {
    cy.get("saved-recipes")
      .shadow()
      .find("button")
      .then(($el) => {
        $el[1].click();
      });
  });

  it("Selecting options for deleting collections", () => {
    cy.get("saved-recipes")
      .shadow()
      .find("div")
      .find("input")
      .then(($el) => {
        $el[0].click();
      });
  });

  it("Cancelling the Delete", () => {
    cy.get("saved-recipes")
      .shadow()
      .find("div")
      .find("button")
      .then(($el) => {
        $el[1].click();
      });
  });
});
