# CI Pipeline Phase 2:
## Completed
- Linting/Code Style Enforcement
We have installed Prettier and ESLint, common linters, to run on everyone's VS Code such that all code is the same before any commits are even made. In addition, we have both CSS and HTML validators that run on push and pull requests for .css and .html files that ensure there is no major violations of style. 

- Code Quality
We have implemented branch protection that protects certain branches from direct commits and requires pull requests. On these pull requests we require peer review by enforcing that a certain number of people look over the pull request and approve of it. In addition we also require an outside code quality tool, Codacy, to also pass the pull request and not have any major problems before the merge can happen.

- JS Docs
We have implemented JS Docs which will automatically generate Documentation for every file as long as the correct comments are created above every function and class. This will help save a ton of time if someone makes small changes in a file. They will no longer have to also go adjust the documentation in a completely different folder. It also autodeploys it to our github pages.

- Unit Tests through Jest/Puppeteer and Cypress
We used Jest/Puppeteer and Cypress to write unit tests to systemically check all the recipes on our home page, their images, and titles. In addition we check that the directions JS component we made currently functions with sample recipes, including closing of the directions to declutter the screen.

- E2E Tests through Cypress
We used Cypress to test the functionality of our saved recipes and user created collections. It saves a few recipes and then creates collections, fully testing the buttons. It then deletes some specific collections, again fully testing the buttons.

- Packaging and Deployment 
We have our project deployed using firebase. A workflow runs on PRs such that a preview link of the proposed changes can be viewed and inspected. Once a PR is merged into main, it auto deploys to our hosting site on firebase.

## In Progress
- More Testing
We will continue adding testing until we are satisified that everything is being accounted for.

*[Diagram](phase2.drawio.png)*
