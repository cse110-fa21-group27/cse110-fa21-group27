describe("Basic user flow for Website", () => {
  /**
   * Helper function. Delays operation so the page can finish loading.
   * @param {number} time - delay amount in ms.
   * @return {Promise} Promise object that resolves after a certain time.
   */
  function delay(time) {
    return new Promise(function (resolve) {
      setTimeout(resolve, time);
    });
  }
  // First, visit the lab 8 website
  beforeAll(async () => {
    await page.goto("https://spudly-f0411.web.app/", {
      waitUntil: "load",
    });
    page.once("load", () => {
      console.log("pageloaded!");
    });
  });

  // Next, check to make sure that all 266 <recipe-card> elements have loaded
  it("Initial Home Page - Check for 266 recipecards", async () => {
    // NOTE: DELAY. ADD TO ALL TESTS
    await delay(4000);

    console.log("Checking for 266 product items...");
    // Query select all of the <recipe-card> elements and return
    // the length of that array
    await page.screenshot({ path: "scrrenshot57.png" });
    const numCards = await page.$$eval("recipe-card", (prodItems) => {
      return prodItems.length;
    });
    // Expect that array from earlier to be of length 266,
    // meaning 266 <recipe-card> elements were found
    expect(numCards).toBe(266);
  });

  // Check to make sure that all 266 <recipe-card> elements
  // have "good" data in them
  it("Make sure <recipe-card> elements are populated", async () => {
    console.log(
      "Checking to make sure <recipe-card> elements are populated..."
    );
    await delay(4000);
    // Start as true, if any don't have data, swap to false
    let allArePopulated = true;
    let plainValue;
    let img;
    let imgSrc;
    let p;
    let innerText;

    // Query select all of the <recipe-card> elements
    const prodItems = await page.$$("recipe-card");
    // await page.screenshot({ path: "scrrenshot57.png" });

    // loop through and check them all
    for (let i = 0; i < prodItems.length; i++) {
      // console.log(`Checking recipe card ${i + 1}/${prodItems.length}`);

      // Grab the shadowRoot and pull the img, and p tags
      const itemShadow = await prodItems[i].getProperty("shadowRoot");
      img = await itemShadow.$("img");
      imgSrc = await img.getProperty("src");
      plainValue = await imgSrc.jsonValue();

      p = await itemShadow.$("p");
      innerText = await p.getProperty("innerText");
      innerText = await innerText.jsonValue();
      // console.log(plainValue);
      if (
        plainValue == "" ||
        plainValue === "https://spudly-f0411.web.app/undefined" ||
        innerText == ""
      ) {
        allArePopulated = false;
        console.log(
          `Recipe card #${i + 1} either doesn't have an image or a description`
        );
      }
    }
    // Expect allArePopulated to still be true
    expect(allArePopulated).toBe(true);
  }, 20000);

  it("Click a recipe", async () => {
    console.log("going to click a recipe");
    await delay(4000);

    // pick out all the recipes
    const prodItems = await page.$$("recipe-card");

    // click a recipe page!
    await prodItems[0].click();
    // await page.screenshot({ path: "scrrenshot57.png" });

    // Navigate to where we can access the img and title.
    const prodItem = await page.$("recipe-page");
    const prodItemSR = await prodItem.getProperty("shadowRoot");
    const prodItemRInfo = await prodItemSR.$("recipe-info");
    const prodItemartRInfoSR = await prodItemRInfo.getProperty("shadowRoot");

    // Get the imagesrc, the title and the rating-time
    const img = await prodItemartRInfoSR.$("img");
    const imgSrc = await img.getProperty("src");
    const title = await prodItemartRInfoSR.$("p");
    let titleText = await title.getProperty("innerText");
    const ratingTime = await prodItemartRInfoSR.$$(".rating-time p");
    const rating = ratingTime[1];
    const time = ratingTime[0];
    const starsimg = await prodItemartRInfoSR.$(".rating-time img");
    let ratingText = await rating.getProperty("innerText");
    let timeText = await time.getProperty("innerText");
    let starsimgSrc = await starsimg.getProperty("src");

    // Convert to readable
    titleText = await titleText.jsonValue();
    const plainValue = await imgSrc.jsonValue();
    ratingText = await ratingText.jsonValue();
    timeText = await timeText.jsonValue();
    starsimgSrc = await starsimgSrc.jsonValue();

    // console.log("")
    // console.log(titleText);
    // console.log(plainValue);
    // console.log(ratingText);
    // console.log(timeText);
    // console.log(starsimgSrc);

    let populated = true;
    populated = !(
      titleText == "" ||
      plainValue === "https://spudly-f0411.web.app/undefined" ||
      ratingText == "" ||
      timeText == "" ||
      starsimgSrc === "https://spudly-f0411.web.app/undefined"
    );
    await page.goBack();
    expect(populated).toBe(true);
  }, 20000);

  // Click a recipe and then come back
  it("click a recipe and then come back", async () => {
    console.log("going to click a recipe and then come back");
    await delay(4000);

    const numCardspre = await page.$$eval("recipe-card", (prodItems) => {
      return prodItems.length;
    });

    const prodItems = await page.$$("recipe-card");
    // click a recipe page!
    await prodItems[0].click();

    // There should be 0 recipe cards now
    const numCards = await page.$$eval("recipe-card", (prodItems) => {
      return prodItems.length;
    });

    await page.goBack();

    const numCardspos = await page.$$eval("recipe-card", (prodItems) => {
      return prodItems.length;
    });

    expect(numCardspre).toBe(266);
    expect(numCards).toBe(0);
    expect(numCardspos).toBe(266);
  }, 20000);
});
