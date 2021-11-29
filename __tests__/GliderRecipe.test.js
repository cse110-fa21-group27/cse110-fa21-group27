/**
 * @jest-environment jsdom
 */
const GliderRecipe = require("../source/js/GliderRecipe.js");

test("convert time", () => {
  expect(GliderRecipe.convertTime("2021-11-28T22:25:59+0000")).toBe("2021");
});
