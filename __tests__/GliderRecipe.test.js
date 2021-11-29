/**
 * @jest-environment jsdom
 */
const GliderRecipe = require("../source/js/GliderRecipe.js");

const sampleData1 = {
  "@graph": [
    {
      "@type": "Question",
      text: "What's your favorite type of cookie?",
      suggestedAnswer: [
        { "@type": "Answer", text: "Sugar cookie." },
        { "@type": "Answer", text: "Chocolate chip cookie." },
      ],
    },
  ],
  "@context": "http://schema.org",
  url: "https://www.delish.com/holiday-recipes/halloween/a28637917/ghost-cookies-recipe/",
  publisher: {
    "@type": "Organization",
    name: "Delish",
    logo: {
      "@type": "ImageObject",
      url: "https://assets.hearstapps.com/sites/delish/assets/images/logos/logo-jsonld.58eed96.png",
      width: 219,
      height: 60,
    },
  },
  "@type": "Recipe",
  author: { name: "Makinze Gore", "@type": "Person" },
  datePublished: "2019-08-23T00:38:05.323880Z",
  headline: "Spooky Ghost Cookies",
  image: {
    "@type": "ImageObject",
    height: 1267,
    thumbnail:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-190807-ghost-cookies-0031-landscape-pf-1566483952.jpg?crop=0.668xw:1.00xh;0.160xw,0&resize=100:*",
    url: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-190807-ghost-cookies-0031-landscape-pf-1566483952.jpg",
    width: 1900,
  },
  mainEntityOfPage: {
    "@id":
      "https://www.delish.com/holiday-recipes/halloween/a28637917/ghost-cookies-recipe/",
    "@type": "WebPage",
  },
  thumbnailUrl:
    "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-190807-ghost-cookies-0031-landscape-pf-1566483952.jpg?crop=0.668xw:1.00xh;0.160xw,0&resize=100:*",
  isAccessibleForFree: "False",
  hasPart: [
    {
      "@type": "WebPageElement",
      isAccessibleForFree: "False",
      cssSelector: ".content-container",
    },
  ],
  name: "Spooky Ghost Cookies",
  prepTime: "PT10M",
  cookTime: "PT0S",
  totalTime: "PT2H",
  recipeIngredient: [
    "3 c. <p>all-purpose flour, plus more for surface</p>",
    "1 tsp. <p>baking powder</p>",
    "1/2 tsp. <p>kosher salt</p>",
    "1 c. <p>(2 sticks)&nbsp;butter, softened</p>",
    "1 c. <p>granulated sugar</p>",
    "1 <p>large egg</p>",
    "1 tbsp. <p>milk</p>",
    "1 tsp. <p>pure vanilla extract&nbsp;</p>",
    "3 c. <p>powdered sugar</p>",
    "1/4 c. <p>light corn syrup</p>",
    "1/4 c. <p>milk, plus more for thinning</p>",
    "1/4 tsp. <p>almond (or vanilla)&nbsp;extract</p>",
    "<p>Black food coloring</p>",
  ],
  recipeInstructions:
    "In a large bowl, whisk together flour, baking powder, and salt.&nbsp; In another large bowl, beat butter and sugar together. Add egg, milk, and vanilla and beat until combined, then add flour mixture gradually until just combined. Shape into a disk and wrap in plastic. Refrigerate 1 hour. When ready to roll, preheat oven to 350\u00ba and line two large baking sheets with parchment.&nbsp;Lightly flour a clean work surface and roll out dough until 1/8\u201d thick. Using a ghost cookie cutter, cut out cookies. Re-roll scraps and cut out more cookies.&nbsp;Transfer to prepared baking sheets and freeze for 10 minutes. Bake until edges are lightly golden, 8 to 10 minutes. Place on a wire cooling rack and let cool completely.&nbsp; Meanwhile, make icing:&nbsp;In a medium bowl, combine powdered sugar, corn syrup, milk, and almond extract.&nbsp; Place about 1/4 of icing into a small bowl and dye black with black food coloring.&nbsp; Place about half the&nbsp;white icing in a piping bag fitted with a small round tip and pipe edges around cookies.&nbsp;&nbsp; Thin remaining white icing by adding 1 teaspoon milk at a time until icing runs easily on cookies, but isn't water thin. Place icing in another piping bag with a small round tip and fill in centers of cookies. Use a toothpick to pop any air bubbles and to spread icing to help fill any gaps. Let cookies dry until icing is set, 15 minutes.&nbsp; Place black icing in a piping bag with a small round tip and pipe eyes and mouths onto cookies.&nbsp;",
  video: {
    "@type": "VideoObject",
    contentUrl:
      "https://streaming.hearstdigitalstudios.com/bd452b54-dc1f-4f06-b139-feb518142277/video_rover_16x9_1080p_hd_1574691121_26638.mp4",
    description:
      "Decorating sugar cookies is much easier than you think. Two different types of icings, a buttercream and a royal icing will give you beautiful results.",
    duration: "PT3M",
    embedUrl:
      "https://glimmer.hearstapps.com/?id=5d02b073-887b-437a-9bff-c461000753dd",
    name: "Decorate Sugar Cookies Like A Pro This Holiday Season",
    thumbnailUrl:
      "https://hips.hearstapps.com/hmg-prod/images/delish-sugar-cookies-048-1541789899.jpg",
    uploadDate: "2018-12-11T14:27:03.526517Z",
  },
  recipeCuisine: [],
  aggregateRating: {
    "@context": "http://schema.org/",
    "@type": "AggregateRating",
    ratingValue: 5,
    reviewCount: 1,
    worstRating: 1,
    bestRating: 5,
  },
  review: [
    {
      "@context": "http://schema.org/",
      "@type": "Review",
      datePublished: "2021-10-26",
      author: {
        "@context": "http://schema.org/",
        "@type": "Person",
        name: "Chuckthebaker",
      },
      reviewBody:
        "I don't thin out the frosting for flooding because it is already watery and works just fine will use this icing recipe for all sugar cookies!",
      reviewRating: {
        "@context": "http://schema.org/",
        "@type": "Rating",
        ratingValue: 5,
        worstRating: 1,
        bestRating: 5,
      },
    },
  ],
  recipeCategory: ["cocktail party", "dinner party", "Halloween", "dessert"],
  recipeYield: "24",
  description:
    "These Ghost Cookies will be the cutest and spookiest part of your Halloween spread.",
};

/**
 * TODO: search for key tests
 */

/**
 * TODO: getOrganization test
 */
test("get Organization from sample recipe1", () => {});

/**
 * TODO: getRecipeTitle data
 */

/**
 * TODO: getURL
 */

/** Tests for convertTime function
 *  Testing whole number hours, minutes, and seconds.
 *  Then test decimal hours, minutes, and seconds.
 *  Then test composite: hours with minutes.
 */
test("convert time, PT2H to 2 hr", () => {
  expect(GliderRecipe.convertTime("PT2H")).toBe("2 hr");
});

test("convert time, PT5M to 5 min", () => {
  expect(GliderRecipe.convertTime("PT5M")).toBe("5 min");
});

// Seconds aren't included in normal behavior. PT2S doesn't have the space
// but does remove the PT.
test("convert time, PT2S. Should not be 2 s", () => {
  expect(GliderRecipe.convertTime("PT2S")).not.toBe("2 s");
});

test("convert time, PT2S to 2S", () => {
  expect(GliderRecipe.convertTime("PT2S")).toBe("2S");
});

test("convert time, PT2.5H to 2.5 hr", () => {
  expect(GliderRecipe.convertTime("PT10.5H")).toBe("10.5 hr");
});

test("convert time, PT5.891M to 5.891 min", () => {
  expect(GliderRecipe.convertTime("PT5.891M")).toBe("5.891 min");
});

test("convert time, PT10.1573S. Should not be 10.1573 s", () => {
  expect(GliderRecipe.convertTime("PT10.1573S")).not.toBe("10.1573 s");
});

test("convert time, PT10.1573S to 10.1573S", () => {
  expect(GliderRecipe.convertTime("PT10.1573S")).toBe("10.1573S");
});

test("convert time, PT2H20M to 2 hr 20 min", () => {
  expect(GliderRecipe.convertTime("PT2H20M")).toBe("2 hr 20 min");
});

/**
 * TODO createIngredientList
 */
