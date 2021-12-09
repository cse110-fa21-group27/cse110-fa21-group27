# Long overdue Cypress ADR

- Status: accepted
- Deciders: Arturo Amaya, Tucker Frandsen, Steven Schaeffer
- Date: 2021-12-1

## Context and Problem Statement

Decision whether or not to continue using Jest/Puppeteer in the face of new information that Cypress is "better"

## Decision Drivers

- Jest is very annoying
- Jest was, at the time, throwing up a severe yet inexplicable error
- Cypress has a visual dashboard
- Cypress can run on local code without needing to deploy to firebase first. That is, we can check new code without pulling the deploy URL from firebase, which was very annoying.
- Cypress has easier querying and more flexible assertions.

## Considered Options

- Jest/Puppeteer
- Cypress

## Decision Outcome

Chosen option: " Cypress ", because it has a visual interface, easier querying and actually works right now.

### Positive Consequences

- Anyone can see the test bench run without a CLI. Accessing elements and their attributes became easier. Can test new code "locally", without Firebase.
- …

### Negative Consequences

- Lost existing work time on Jest/Puppeteer. Have to learn to finagle Cypress's few quirks and syntax.
