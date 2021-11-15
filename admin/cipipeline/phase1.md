# CI Pipeline Phase 1:
## Completed
- Linting/Code Style Enforcement
We have installed Prettier, a common linter, to run on everyone's VS Code such that all code is the same before any commits are even made. In addition, we have both CSS and HTML validators that run on push and pull requests for .css and .html files that ensure there is no major violations of style. 

- Code Quality
We have implemented branch protection that protects certain branches from direct commits and requires pull requests. On these pull requests we require peer review by enforcing that a certain number of people look over the pull request and approve of it. In addition we also require an outside code quality tool, Codacy, to also pass the pull request and not have any major problems before the merge can happen.

- JS Docs
We have implemented JS Docs which will automatically generate Documentation for every file as long as the correct comments are created above every function and class. This will help save a ton of time if someone makes small changes in a file. They will no longer have to also go adjust the documentation in a completely different folder. 

## In Progress
- Unit Tests through Jest
We are planning to use Jest to write unit tests, but are waiting on the basic framework of the project to be finished.

## Planned
- Packaging and Deployment 
We would love to have a streamlined process that takes commits and validates, cleans, tests, packages and deploys the code but that will have to wait until the rest is set up.

*[Diagram](phase1.drawio.png)*
