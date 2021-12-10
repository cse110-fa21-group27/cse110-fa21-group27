// Created by cypress, I don't want to mess with that.

// eslint-disable-next-line no-unused-vars
const { cyan } = require("chalk");
// eslint-disable-next-line no-unused-vars
const { createDocument } = require("parse5/lib/tree-adapters/default");
const magicNumbers = require("./magictestNumbers");

// https://on.cypress.io/writing-first-test
describe("Test the home page", { timeout: 10000 }, () => {
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
        `.recipes > :nth-child(${
          Math.ceil(Math.random() * (magicNumbers.numOfRecipes - 1)) + 1
        })`
      )
        .shadow()
        .find(".thumbnail-photo")
        .invoke("attr", "src")
        .then(($el) => {
          expect($el).to.not.be.equal("undefined");
        });
    }
  );

  for (let i = 1; i < magicNumbers.numOfRecipes + 1; i++) {
    // Check that *all* recipe thumbnails aren't empty
    it(
      `check that recipe ${i}'s thumbnail isn't empty`,
      { timeout: 10000 },
      () => {
        let populated = true;

        cy.get(`.recipes > :nth-child(${i})`)
          .shadow()
          .find(".thumbnail-photo")
          .invoke("attr", "src")
          .then(($el) => {
            if ($el === "undefined" || !$el) {
              console.error(
                `Something is wrong with the image from recipe ${i}`
              );
              populated = false;
            } else {
              populated = true;
            }
            expect(populated).to.be.true;
          });
      }
    );
  }

  // Check that *a* recipe title isn't empty
  it("check that a recipe title isn't empty", { timeout: 10000 }, () => {
    /* cy.get(
      `.recipes > :nth-child(${Math.ceil(
        Math.random() * (magicNumbers.numOfRecipes - 1) + 1
      )})`
    )
      .shadow()
      .find("p")
      .invoke("text")
      .then(($el) => {
        expect($el[0]).to.not.be.empty;
      });
    */
    cy.get(
      `.recipes > :nth-child(${
        Math.ceil(Math.random() * (magicNumbers.numOfRecipes - 1)) + 1
      })`
    )
      .shadow()
      .find("p")
      .then((paragraphs) => {
        expect(paragraphs[0].innerHTML).to.not.be.empty;
      });

    /*
    let stuff = cy
      .get(
        `.recipes > :nth-child(${Math.ceil(
          Math.random() * (magicNumbers.numOfRecipes - 1) + 1
        )})`
      )
      .shadow()
      .find("p");
    stuff[0].invoke("text").then(($el) => {
      expect($el).to.not.be.empty;
    });*/
  });

  for (let i = 1; i < magicNumbers.numOfRecipes + 1; i++) {
    it(
      `check that recipe #${i} has a non empty recipe title`,
      { timeout: 10000 },
      () => {
        cy.get(`.recipes > :nth-child(${i})`)
          .shadow()
          .find("p")
          .then((paragraphs) => {
            expect(paragraphs[0].innerHTML).to.not.be.empty;
          });
      }
    );
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
