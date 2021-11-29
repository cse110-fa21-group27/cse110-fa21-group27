describe("Basic homepage check", () => {
  // Go to the website
  beforeAll(async () => {
    await page.goto("https://spudly-f0411.web.app/#");
  });

  it("Check number of recipes", async () => {
    console.log("checking number fo recipes");

    // select all of the recipe cards
    const numRecipes = await page.$$eval("recipe-card", (recipeItems) => {
      return recipeItems.length;
    });

    expect(numRecipes).toBe(300);
  });
});
