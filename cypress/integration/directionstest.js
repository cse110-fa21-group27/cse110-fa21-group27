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
    cy.visit("./__tests__/unit_html/directions_test.html");
  });

  it("check how many recipes there are", () => {
    cy.get("directions-info").should("have.length", 1);
  });
});
