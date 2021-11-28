# {API Choice}

- Status: { accepted }
- Deciders: {Miguel Christian Sanchez, Dilara Marasli, Steven Christensen, Tucker Frandsen}
- Date: {112721}

## Context and Problem Statement

{Describe the context and problem statement, e.g., in free form using two to three sentences. You may want to articulate the problem in form of a question.}
We need to have some sort of database of recipes or some way to retrieve new recipes. We can either continue with manually scraping json from websites ourselves, or use an existing API.

## Considered Options

- Spoonacular
  - pros
    - provides easy search api
    - no need to code recipe scraping
    - no need to pay for firebase cloud functions
    - lets us do extra [stuff](https://spoonacular.com/food-api/docs) like nutrition facts and automatic ingredient scaling
    - no need to worry about scraping edge cases
  - cons
    - need to restructure recipe data handling in the backend
      - format of json is different from what we have
      - going to need to process it in the back-end so front-end can behave the same way without having to restructure each component
    - limited to 150 pts a day
      - searching costs 1 pt, 0.01 pts per search result
      - getting recipe costs 1 pt
      - getting the recipe's instructions is a separate call and also 1 pt
      - this means every dev refreshing/testing is gonna be a handful of calls
- Our own data scraping with google cloud functions
  - pros
    - no need to restructure backend
    - less dependencies
    - firebase cloud functions free version isn't as restricted
      - pay as you use [blaze plan](https://firebase.google.com/pricing)
      - calls: free for the first 2M calls each month, $0.40 per million after
      - [RAM/CPU second](https://firebase.google.com/pricing)
  - cons
    - we have to put billing information in for when we get past the "free" quotas
    - have to assume the json file in the webpage conforms to [schema](https://schema.org/Recipe)
    - we have to handle the data
    - have to implement our own search

## Decision Outcome

Chosen option: Spoonacular because it implements a lot of functions for us. Additionally, everyone can easily pick up how to do fetch requests for the API calls, instead of having only a couple people know how the data scraping works.
