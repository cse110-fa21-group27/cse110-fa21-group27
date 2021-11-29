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

const sampleData2 = {
  "@context": "http://schema.org",
  "@type": "Recipe",
  mainEntityOfPage:
    "https://www.allrecipes.com/recipe/232247/tennessee-meatloaf/",
  name: "Tennessee Meatloaf",
  image: {
    "@type": "ImageObject",
    url: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F1044986.jpg",
    width: 3888,
    height: 2592,
  },
  datePublished: "2020-03-05T05:10:31.000Z",
  description:
    "My Grandmother 'Nanaw' Rowan made the most delicious meatloaf in the state. When she passed away, she didn't leave me her recipe, but she left me the desire to recreate it. I think this is it, in flavor and texture. Don't let the number of ingredients discourage you. It's part of the magic in creating a masterpiece!",
  prepTime: "P0DT0H40M",
  cookTime: "P0DT1H0M",
  totalTime: "P0DT1H55M",
  recipeYield: "2 9x5-inch loaves",
  recipeIngredient: [
    "½ cup ketchup",
    "¼ cup brown sugar",
    "2 tablespoons cider vinegar",
    "cooking spray",
    "1 onion, chopped",
    "½ green bell pepper, chopped",
    "2 cloves garlic, minced",
    "2 large eggs, lightly beaten",
    "1 teaspoon dried thyme",
    "1 teaspoon seasoned salt",
    "½ teaspoon ground black pepper",
    "2 teaspoons prepared mustard",
    "2 teaspoons Worcestershire sauce",
    "½ teaspoon hot pepper sauce (such as Tabasco®)",
    "½ cup milk",
    "⅔ cup quick cooking oats",
    "1 pound ground beef",
    "½ pound ground pork",
    "½ pound ground veal",
  ],
  recipeInstructions: [
    {
      "@type": "HowToStep",
      text: "Combine ketchup, brown sugar, and cider vinegar in a bowl; mix well.\n",
    },
    {
      "@type": "HowToStep",
      text: "Preheat oven to 350 degrees F (175 degrees C). Spray two 9x5-inch loaf pans with cooking spray or line with aluminum foil for easier cleanup (see Cook's Note).\n",
    },
    {
      "@type": "HowToStep",
      text: "Place onion and green pepper in covered microwave container and cook until softened, 1 to 2 minutes. Set aside to cool.\n",
    },
    {
      "@type": "HowToStep",
      text: "In large mixing bowl, combine garlic, eggs, thyme, seasoned salt, black pepper, mustard, Worcestershire sauce, hot sauce, milk, and oats. Mix well. Stir in cooked onion and green pepper. Add ground beef, pork, and veal. With gloved hands, work all ingredients together until completely mixed and uniform.\n",
    },
    {
      "@type": "HowToStep",
      text: "Divide meatloaf mixture in half and pat half of mixture into each prepared loaf pan. Brush loaves with half of the glaze; set remainder of glaze aside.\n",
    },
    {
      "@type": "HowToStep",
      text: "Bake in preheated oven for 50 minutes. Remove pans from oven; carefully drain fat. Brush loaves with remaining glaze. Return to oven and bake for 10 minutes more. Remove pans from oven and allow meatloaf to stand for 15 minutes before slicing.\n",
    },
  ],
  recipeCategory: ["Meat and Poultry", "Pork", "Ground Pork Recipes"],
  recipeCuisine: [],
  author: [
    {
      "@type": "Person",
      name: "Leigh Ann Rowan Kiraly",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: 4.54054054054054,
    ratingCount: 148,
    itemReviewed: "Tennessee Meatloaf",
    bestRating: "5",
    worstRating: "1",
  },
  nutrition: {
    "@type": "NutritionInformation",
    calories: "233.3 calories",
    carbohydrateContent: "15.9 g",
    cholesterolContent: "92 mg",
    fatContent: "11.2 g",
    fiberContent: "1.2 g",
    proteinContent: "17.1 g",
    saturatedFatContent: "4.2 g",
    servingSize: null,
    sodiumContent: "324.1 mg",
    sugarContent: "10 g",
    transFatContent: null,
    unsaturatedFatContent: null,
  },
  review: [
    {
      "@type": "Review",
      datePublished: "2013-09-18T03:44:32.283Z",
      reviewBody:
        "Not outstanding, not extraordinary, but good and satisfying.  Flavor is good – I used fresh thyme (the equivalent in fresh is three times that of dried) and added some celery just because I generally do. I didn’t bother cooking the vegetables first just because I generally don’t.  There is minimal filler and I appreciated that.  I like the brown, crusty exterior on meatloaf so I shaped this as one loaf on a cookie sheet and baked it for 1-1/2 hours.  I did not use the brown sugar glaze as the sugar did not appeal to me so I served this with a simple brown mushroom gravy.  As this recipe’s first reviewer I’m happy to report that while there is much wiggle-room with this recipe to make it “your own,” this basic, old-fashioned meatloaf is good  just as it stands.",
      reviewRating: {
        "@type": "Rating",
        worstRating: "1",
        bestRating: "5",
        ratingValue: 4,
      },
      author: {
        "@type": "Person",
        name: "naples34102",
        image: null,
        sameAs: "https://www.allrecipes.com/cook/naples34102/",
      },
    },
    {
      "@type": "Review",
      datePublished: "2021-09-17T21:04:01.577Z",
      reviewBody:
        "2021 update: This is my recipe! It is still the best meatloaf I have ever eaten and the finished product, if you follow the recipe for the glaze and baking time, does NOT look like the main photo shown above. It is much more pleasing to the eye. When I made my meatloaf this last week, I jazzed it up just a bit by substituting Johnsonville Hot Italian Sausage for the pork and added a couple dashes hot sauce to the topping before stirring it together and spreading on top. It took this A+ recipe up to the next level. A++ I guess! \nP.S. I have tried to post my photo to this site and it always says, \n\"Not enough pixels\". My iPhone just doesn't do the trick. Guess I'm better in the kitchen than behind the camera?",
      reviewRating: {
        "@type": "Rating",
        worstRating: "1",
        bestRating: "5",
        ratingValue: 5,
      },
      author: {
        "@type": "Person",
        name: "Leigh Ann Rowan Kiraly",
        image: null,
        sameAs: "https://www.allrecipes.com/cook/630862/",
      },
    },
    {
      "@type": "Review",
      datePublished: "2014-08-05T02:32:22.137Z",
      reviewBody:
        'As a veteran meatloaf chef, this is a terrific recipe. I actually added more brown sugar to the sauce and added winch (Worcestershire) sauce plus sweet chili sauce. I never use loaf pans when I make meatloaf. Instead, I shape the meatloaf recipe on top of a foil lined jelly roll sheet. A 3 pound meatloaf with recipe ingredients approximates: 2" high x 5" wide x 10" long. Pour the sauce/glaze on top of this Bigfoot meatloaf, roll up the sides of the foil a bit to hold in the sauce and pop it into your oven. Thank you for this great recipe, Leigh Ann. We thoroughly enjoyed it here in Texas!!',
      reviewRating: {
        "@type": "Rating",
        worstRating: "1",
        bestRating: "5",
        ratingValue: 5,
      },
      author: {
        "@type": "Person",
        name: "Vanessa Orr",
        image: null,
        sameAs: "https://www.allrecipes.com/cook/8957187/",
      },
    },
    {
      "@type": "Review",
      datePublished: "2014-02-07T02:38:27.007Z",
      reviewBody:
        "I don't care what anyone says this is an outstanding meatloaf!! The only things I did different was I used an equal amount of panko bread crumbs in place of the oatmeal and made a brown gravy instead of the ketchup based glaze. I'm just not a fan of ketchup. This was simply the best meatloaf I've ever made. I can finally stop looking for a recipe for…",
    },
  ],
};

const sampleData3 = {
  "@context": "http://schema.org",

  "@type": ["Recipe", "NewsArticle"],
  headline: "Southwestern Vegetarian Casserole",
  datePublished: "2021-11-18T18:45:05.129-05:00",
  dateModified: "2021-11-18T18:45:05.129-05:00",
  author: [
    {
      "@type": "Person",
      name: "Laurel Randolph",
      description:
        "Laurel has over 10 years of experience developing recipes and writing about food. She is the author of 4 cookbooks, including the bestselling The Instant Pot Electric Cookbook.",
      url: "https://www.simplyrecipes.com/laurel-randolph-5194532",
      sameAs: ["https://www.instagram.com/joyofcookingmilhouse/"],
      knowsAbout: [
        "Healthy cooking, Quick and weeknight meals, Instant Pot, Baking",
      ],
      alumniOf: [
        {
          "@type": "Organization",
          Name: "Emerson College",
        },
      ],
    },
  ],
  description:
    "This is vegetarian comfort food at its best! A flavorful filling of beans, veggies, and spices is topped with fluffy cheddar drop biscuits and baked to perfection.",
  image: [
    {
      "@type": "ImageObject",
      url: "https://www.simplyrecipes.com/thmb/2XQ8REPNvM1TR69xba53PdFdY2Q=/4256x2394/smart/filters:no_upscale()/Simply-Recipes-Southwest-Pot-Pie-LEAD-3-5e59fb5bc6dd46329b06a625d562b1d5.jpg",
      height: 2394,
      width: 4256,
    },
    {
      "@type": "ImageObject",
      url: "https://www.simplyrecipes.com/thmb/D_mu9iVclXHqhM5vT4iWGBoyjGI=/3776x2832/smart/filters:no_upscale()/Simply-Recipes-Southwest-Pot-Pie-LEAD-3-5e59fb5bc6dd46329b06a625d562b1d5.jpg",
      height: 2832,
      width: 3776,
    },
    {
      "@type": "ImageObject",
      url: "https://www.simplyrecipes.com/thmb/_B6Adwrk93VTY144ToIWodTjLSo=/2832x2832/smart/filters:no_upscale()/Simply-Recipes-Southwest-Pot-Pie-LEAD-3-5e59fb5bc6dd46329b06a625d562b1d5.jpg",
      height: 2832,
      width: 2832,
    },
  ],
  publisher: {
    "@type": "Organization",
    name: "Simply Recipes",
    url: "https://www.simplyrecipes.com",
    logo: {
      "@type": "ImageObject",
      url: "https://www.simplyrecipes.com/thmb/QvixEwCD02s_lnkgkVb6mHwKS7c=/1125x320/filters:no_upscale():max_bytes(150000):strip_icc()/SimplyRecipesLogoTransparent-07a297c54b2142ae9c079abb2f0fa639.png",
      width: 1125,
      height: 320,
    },
    brand: "Simply Recipes",
    publishingPrinciples:
      "https://www.simplyrecipes.com/about-us-5096129#editorial-guidelines",
  },
  name: "Southwestern Vegetarian Casserole",
  cookTime: "PT40M",
  keywords:
    "zucchini, yellow squash, cremini mushrooms, bell pepper, jalapeno, kale, curly kale, pinto beans, black beans, diced tomatoes, green chilies, salsa verde, flour, butter, buttermilk, shredded sharp cheddar cheese, vegetarian casserole, vegetarian comfort food, vegetarian dinner, Southwestern Vegetarian Casserole",
  prepTime: "PT25M",
  recipeCategory: ["Entree", "Dinner"],
  recipeCuisine: ["American"],
  recipeIngredient: [
    "Cooking spray, for the casserole dish",
    "2 teaspoons olive oil",
    "1 small red onion, diced",
    "2 medium yellow squash or zucchini, chopped",
    "8 ounces cremini mushrooms, stems trimmed and diced",
    "1 large red, orange, or yellow bell pepper, seeded and chopped",
    "1 jalapeño, seeded and diced, optional",
    "1/2 large bunch (about 3 cups tightly packed) curly leaf kale, stems removed and leaves roughly chopped",
    "3 cloves garlic, minced",
    "2 teaspoons chili powder, plus more to taste",
    "1/2 teaspoon kosher salt, plus more to taste",
    "1/2 teaspoon freshly ground black pepper",
    "2 (15-ounce) cans pinto or black beans, rinsed and drained",
    "1 (10-ounce) can diced tomatoes with green chilies, drained",
    "1 (7-ounce) can salsa verde",
    "For the cheddar biscuit",
    "2 1/3 cups (326g) all-purpose flour, divided",
    "1 tablespoon baking powder",
    "1 tablespoon sugar",
    "3/4 teaspoon kosher salt",
    "1/2 teaspoon baking soda",
    "4 tablespoons unsalted butter, cold and cubed",
    "1 1/2 cups buttermilk",
    "1 1/2 cups shredded sharp cheddar cheese, divided",
  ],
  recipeInstructions: [
    {
      "@type": "HowToStep",
      text: "Heat the oven: Preheat the oven to 450°F and grease a 9x13-inch casserole dish with cooking spray.",
    },
    {
      "@type": "HowToStep",
      image: {
        "@type": "ImageObject",
        url: "https://www.simplyrecipes.com/thmb/dMwhtMvCO-MueyehZtEnsPgRTGo=/4256x2832/filters:no_upscale()/Simply-Recipes-Southwest-Pot-Pie-METHOD-1-4e35176d8b5f4a7e99dab6ea1b3c4f6a.jpg",
        height: 2832,
        width: 4256,
      },
      text: "Cook the vegetables: Heat a large, deep skillet or Dutch oven over medium heat. Add the oil and onion. Sauté until the onion begins to soften, about 2 minutes. Add the squash, mushrooms, bell pepper, and jalapeño, if using, and sauté until the squash begins to soften, 3 to 4 minutes. Add the kale, garlic, chili powder, salt, and black pepper. Sauté until the kale is wilted, about 3 minutes.",
    },
    {
      "@type": "HowToStep",
      image: {
        "@type": "ImageObject",
        url: "https://www.simplyrecipes.com/thmb/E4IbhOmcIOmPH4IeqvcTKwE9voY=/4256x2832/filters:no_upscale()/Simply-Recipes-Southwest-Pot-Pie-METHOD-3-2e25da8fc3034aa88aa53aa1c9f8dfed.jpg",
        height: 2832,
        width: 4256,
      },
      text: "Assemble the filling: Make sure the canned beans and tomatoes are drained well. Otherwise, the filling will be too wet. Add the beans, tomatoes, and salsa to the skillet. Cook, stirring frequently, until it comes up to a boil, then turn off the heat. Taste the filling and adjust the seasoning with chili powder and salt. Carefully pour the filling into the prepared casserole dish and set it aside while you make the biscuits.",
    },
    {
      "@type": "HowToStep",
      image: {
        "@type": "ImageObject",
        url: "https://www.simplyrecipes.com/thmb/KQ3VXM8I7zpWYLCBq9SWaqJKuxk=/4256x2832/filters:no_upscale()/Simply-Recipes-Southwest-Pot-Pie-METHOD-5-d4a4489e37e1478fba100d6c13bcfa27.jpg",
        height: 2832,
        width: 4256,
      },
      text: "Make the biscuit dough: In a medium bowl, mix 2 cups (280g) of flour, baking powder, sugar, salt, and baking soda with a wooden spoon or rubber spatula. Add the cubed butter and cut it into the flour using a pastry cutter or two butter knives until the mixture resembles small peas covered in flour. Add the buttermilk and 1 cup of cheddar cheese. Gently mix until just combined with no big pockets of dry flour left. Do not overmix.",
    },
    {
      "@type": "HowToStep",
      image: {
        "@type": "ImageObject",
        url: "https://www.simplyrecipes.com/thmb/HfYhBHO_ZtUKwWDIFOIAbVwcB5Y=/4256x2832/filters:no_upscale()/Simply-Recipes-Southwest-Pot-Pie-METHOD-7-ccda160d1d2e4c0da405fe00b1199050.jpg",
        height: 2832,
        width: 4256,
      },
      text: "Form the biscuits: In a shallow bowl, add the remaining 1/3 cup (46g) flour. Using a measuring cup, scoop about 1/2 cup of the biscuit dough and add it to the flour. Cover the top of the dough with flour using your fingers. Lift the dough and gently toss it back and forth between your hands to remove any excess flour. Place the dough on top of the vegetable filling—you’ll be making 6 biscuits total, placing them in two rows of 3 biscuits. Top the biscuits with the remaining 1/2 cup cheese.",
    },
    {
      "@type": "HowToStep",
      image: {
        "@type": "ImageObject",
        url: "https://www.simplyrecipes.com/thmb/8qexSJZmUqRF1bB7PIR67_2J84I=/4256x2832/filters:no_upscale()/Simply-Recipes-Southwest-Pot-Pie-LEAD-3-5e59fb5bc6dd46329b06a625d562b1d5.jpg",
        height: 2832,
        width: 4256,
      },
      text: "Bake and serve: Bake the casserole for 20 to 25 minutes, until the filling is bubbly, and the biscuits are golden brown and puffy. If the tops of the biscuits are becoming too dark before the 20-minute mark, cover the casserole dish with a piece of foil and continue baking them to make sure they cook all the way through. Let it cool for 5 to 10 minutes before scooping and serving.",
    },
  ],
  recipeYield: "6",
  totalTime: "PT65M",
  mainEntityOfPage: {
    "@type": ["WebPage"],
    "@id":
      "https://www.simplyrecipes.com/southwestern-vegetarian-casserole-recipe-5209206",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: {
            "@id":
              "https://www.simplyrecipes.com/dinner-recipes-by-diet-5091431",
            name: "Dinners By Diets",
          },
        },
        {
          "@type": "ListItem",
          position: 2,
          item: {
            "@id":
              "https://www.simplyrecipes.com/healthy-dinner-recipes-5091429",
            name: "Healthy Dinners",
          },
        },
        {
          "@type": "ListItem",
          position: 3,
          item: {
            "@id":
              "https://www.simplyrecipes.com/southwestern-vegetarian-casserole-recipe-5209206",
            name: "Southwestern Vegetarian Casserole",
          },
        },
      ],
    },
  },
  about: [],
};
/**
 * TODO: search for key tests
 */

/**
 * TODO: getOrganization test
 */
test("get Organization from sample data 1 from Delish", () => {
  expect(GliderRecipe.getOrganization(sampleData1)).toBe("Delish");
});

test("get Organization from sample data 2 from Allrecipes. \n THIS DOES NOT HAVE AN ORGANIZATION TAG, SHOULD BE NULL", () => {
  expect(GliderRecipe.getOrganization(sampleData2)).toBe(null);
});

test("get Organization from sample data 3 from Simply Recipes", () => {
  expect(GliderRecipe.getOrganization(sampleData3)).toBe("Simply Recipes");
});

/**
 * TODO: getRecipeTitle data
 */
test("get recipe title from sample data 1 from Delish. Should be Spooky Ghost Cookies", () => {
  expect(GliderRecipe.getRecipeTitle(sampleData1)).toBe("Spooky Ghost Cookies");
});

test("get recipe title from sample data 2 from Allrecipes. Should be Tennessee Meatloaf", () => {
  expect(GliderRecipe.getRecipeTitle(sampleData2)).toBe("Tennessee Meatloaf");
});

test("get reipce title from sample data 3 from Simply Recipes. Should be Southwestern Vegetarian Casserole", () => {
  expect(GliderRecipe.getRecipeTitle(sampleData3)).toBe(
    "Southwestern Vegetarian Casserole"
  );
});

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
