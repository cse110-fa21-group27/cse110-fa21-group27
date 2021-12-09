describe("Basic user flow for Website", () => {
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

  // Next, check to make sure that all 264 <recipe-card> elements have loaded
  it("Initial Home Page - Check for 264 recipecards", async () => {
    // NOTE: DELAY. ADD TO ALL TESTS
    await delay(4000);

    console.log("Checking for 264 product items...");
    // Query select all of the <recipe-card> elements and return the length of that array
    await page.screenshot({ path: "scrrenshot57.png" });
    const numCards = await page.$$eval("recipe-card", (prodItems) => {
      return prodItems.length;
    });
    // Expect that array from earlier to be of length 264, meaning 264 <recipe-card> elements were found
    expect(numCards).toBe(266);
  });

  // Check to make sure that all 264 <recipe-card> elements have "good" data in them
  it("Make sure <recipe-card> elements are populated", async () => {
    console.log(
      "Checking to make sure <recipe-card> elements are populated..."
    );
    await delay(4000);
    // Start as true, if any don't have data, swap to false
    let allArePopulated = true;
    let plainValue, img, imgSrc, p, innerText;

    // Query select all of the <recipe-card> elements
    const prodItems = await page.$$("recipe-card");
    //await page.screenshot({ path: "scrrenshot57.png" });

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
        plainValue == "https://spudly-f0411.web.app/undefined" ||
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
    let prodItem = await page.$("recipe-page");
    let prodItemSR = await prodItem.getProperty("shadowRoot");
    let prodItemRInfo = await prodItemSR.$("recipe-info");
    let prodItemartRInfoSR = await prodItemRInfo.getProperty("shadowRoot");

    // Get the imagesrc, the title and the rating-time
    let img = await prodItemartRInfoSR.$("img");
    let imgSrc = await img.getProperty("src");
    let title = await prodItemartRInfoSR.$("p");
    let titleText = await title.getProperty("innerText");
    let ratingTime = await prodItemartRInfoSR.$$(".rating-time p");
    let rating = ratingTime[1];
    let time = ratingTime[0];
    let starsimg = await prodItemartRInfoSR.$(".rating-time img");
    let ratingText = await rating.getProperty("innerText");
    let timeText = await time.getProperty("innerText");
    let starsimgSrc = await starsimg.getProperty("src");

    // Convert to readable
    titleText = await titleText.jsonValue();
    let plainValue = await imgSrc.jsonValue();
    ratingText = await ratingText.jsonValue();
    timeText = await timeText.jsonValue();
    starsimgSrc = await starsimgSrc.jsonValue();

    //console.log("")
    //console.log(titleText);
    //console.log(plainValue);
    //console.log(ratingText);
    //console.log(timeText);
    //console.log(starsimgSrc);

    let populated = true;
    populated = !(
      titleText == "" ||
      plainValue == "https://spudly-f0411.web.app/undefined" ||
      ratingText == "" ||
      timeText == "" ||
      starsimgSrc == "https://spudly-f0411.web.app/undefined"
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

    expect(numCardspre).toBe(264);
    expect(numCards).toBe(0);
    expect(numCardspos).toBe(264);
  }, 20000);
  // TODO TESTS
  /**
   * Click a recipe and see the rest of the reipce page
   * CLick a recipe and then click the show ingredients button
   * Click a recipe and click the show nutritions button
   * Click a recipe and click save
   * Click a recipe, save, come back and check how many recipes there are, including saved
   * Click a recipe. save, leave the page and then come back and check its the same
   * Open all the directions
   * Check all the boxes
   * Check that the name button works
   * Check that the search bar works
   * ADD MORE AS THE PAGE DEVELOPS
   */

  /*
  // Check to make sure that when you click "Add to Cart" on the first <recipe-card> that
  // the button swaps to "Remove from Cart"
  it('Clicking the "Add to Cart" button should change button text', async () => {
    console.log('Checking the "Add to Cart" button...');
    const prodItem = await page.$("recipe-card");
    const itemShadow = await prodItem.getProperty("shadowRoot");
    let shadowButton = await itemShadow.$("button");
    await shadowButton.click();
    const innerText = await shadowButton.getProperty("innerText");
    const newbuttontext = innerText["_remoteObject"].value;
    expect(newbuttontext).toBe("Remove from Cart");
    // TODO - Step 2
    // Query a <recipe-card> element using puppeteer ( checkout page.$() and page.$$() in the docs )
    // Grab the shadowRoot of that element (it's a property), then query a button from that shadowRoot.
    // Once you have the button, you can click it and check the innerText property of the button.
    // Once you have the innerText property, use innerText['_remoteObject'].value to get the text value of it
  }, 2500);

  // Check to make sure that after clicking "Add to Cart" on every <recipe-card> that the Cart
  // number in the top right has been correctly updated
  it("Checking number of items in cart on screen", async () => {
    console.log("Checking number of items in cart on screen...");
    // TODO - Step 3
    // Query select all of the <recipe-card> elements, then for every single product element
    // get the shadowRoot and query select the button inside, and click on it.
    // use $$ to select all
    const prodItems = await page.$$("recipe-card");
    // start at 1 because we already clicked the first one
    for (let i = 1; i < prodItems.length; i++) {
      const itemShadow = await prodItems[i].getProperty("shadowRoot");
      let shadowButton = await itemShadow.$("button");
      await shadowButton.click();
      //const innerText = await shadowButton.getProperty('innerText');
      //const newbuttontext = innerText['_remoteObject'].value;
      //expect(newbuttontext).toBe('Remove from Cart');
    }

    // Check to see if the innerText of #cart-count is 20
    const cart = await page.$("#cart-count");
    let cartText = await cart.getProperty("innerText");
    cartText = cartText["_remoteObject"].value;
    expect(cartText).toBe("20");
  }, 10000);

  // Check to make sure that after you reload the page it remembers all of the items in your cart
  it("Checking number of items in cart on screen after reload", async () => {
    console.log("Checking number of items in cart on screen after reload...");
    // TODO - Step 4
    // Reload the page, then select all of the <recipe-card> elements, and check every
    // element to make sure that all of their buttons say "Remove from Cart".
    // Also check to make sure that #cart-count is still 20
    await page.reload();
    const prodItems = await page.$$("recipe-card");
    for (let i = 0; i < prodItems.length; i++) {
      const itemShadow = await prodItems[i].getProperty("shadowRoot");
      let shadowButton = await itemShadow.$("button");
      const innerText = await shadowButton.getProperty("innerText");
      const newbuttontext = innerText["_remoteObject"].value;
      expect(newbuttontext).toBe("Remove from Cart");
    }
    // Check to see if the innerText of #cart-count is 20
    const cart = await page.$("#cart-count");
    let cartText = await cart.getProperty("innerText");
    cartText = cartText["_remoteObject"].value;
    expect(cartText).toBe("20");
  }, 10000);

  // Check to make sure that the cart in localStorage is what you expect
  it("Checking the localStorage to make sure cart is correct", async () => {
    // TODO - Step 5
    // At this point he item 'cart' in localStorage should be
    // '[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]', check to make sure it is

    const localStorage = await page.evaluate(() =>
      Object.assign({}, window.localStorage)
    );
    const cart = localStorage["cart"];
    const expectedCart = "[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]";
    expect(cart).toBe(expectedCart);
  });

  // Checking to make sure that if you remove all of the items from the cart that the cart
  // number in the top right of the screen is 0
  it("Checking number of items in cart on screen after removing from cart", async () => {
    console.log("Checking number of items in cart on screen...");
    // TODO - Step 6
    // Go through and click "Remove from Cart" on every single <recipe-card>, just like above.
    // Once you have, check to make sure that #cart-count is now 0
    const prodItems = await page.$$("recipe-card");
    for (let i = 0; i < prodItems.length; i++) {
      const itemShadow = await prodItems[i].getProperty("shadowRoot");
      let shadowButton = await itemShadow.$("button");
      await shadowButton.click();
    }

    // Check to see if the innerText of #cart-count is 20
    const cart = await page.$("#cart-count");
    let cartText = await cart.getProperty("innerText");
    cartText = cartText["_remoteObject"].value;
    expect(cartText).toBe("0");
  }, 10000);

  // Checking to make sure that it remembers us removing everything from the cart
  // after we refresh the page
  it("Checking number of items in cart on screen after reload", async () => {
    console.log("Checking number of items in cart on screen after reload...");
    // TODO - Step 7
    // Reload the page once more, then go through each <recipe-card> to make sure that it has remembered nothing
    // is in the cart - do this by checking the text on the buttons so that they should say "Add to Cart".
    // Also check to make sure that #cart-count is still 0
    await page.reload();
    const prodItems = await page.$$("recipe-card");
    for (let i = 0; i < prodItems.length; i++) {
      const itemShadow = await prodItems[i].getProperty("shadowRoot");
      let shadowButton = await itemShadow.$("button");
      const innerText = await shadowButton.getProperty("innerText");
      const newbuttontext = innerText["_remoteObject"].value;
      expect(newbuttontext).toBe("Add to Cart");
    }
    // Check to see if the innerText of #cart-count is 0
    const cart = await page.$("#cart-count");
    let cartText = await cart.getProperty("innerText");
    cartText = cartText["_remoteObject"].value;
    expect(cartText).toBe("0");
  }, 10000);

  // Checking to make sure that localStorage for the cart is as we'd expect for the
  // cart being empty
  it("Checking the localStorage to make sure cart is correct", async () => {
    console.log("Checking the localStorage...");
    // TODO - Step 8
    // At this point he item 'cart' in localStorage should be '[]', check to make sure it is
    const localStorage = await page.evaluate(() =>
      Object.assign({}, window.localStorage)
    );
    const cart = localStorage["cart"];
    const expectedCart = "[]";
    expect(cart).toBe(expectedCart);
  });*/
});
