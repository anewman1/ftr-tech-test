# FtrTechTest

This is my first Angular project since 1.5 and I'm quite certain that there would be better ways to structure this application if I was spending much more time in learning the nuances of Angular 16. However given this is a rather small technical assessment I thought it best to show that I have a working understanding of TypeScript, some testing and can still get a project running in a language that I'm unfamiliar in. I also included some rxjs functionality which I also haven't made use of before.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Part 2

> You have a new requirement to implement for your application: its logic should stay
> exactly the same but it will need to have a different user interface (e.g. if you wrote a
> web app, a different UI may be a REPL).
> Please describe how you would go about implementing this new UI in your application?
> Would you need to restructure your solution in any way?

- Given my knowledge of Angular, I'm sure there are many ways I could improve on the application.
  - With more time I would look to split out the rxjs timer/pause/resume functionality into its own utility function and added testing for it
  - Splitting out the two forms into separate components or maybe directives, again that's more of an Angular nuance that I didn't really delve into
  - In a production application I'd look to have a common input/button component for reusability and consistent styling across the application

> Please describe the steps you’d need to take to deploy to production

- Create the production build (at Flight Centre and build using GitHub Actions)
  - Host the asset somewhere, we use Artifactory
  - Deploy the build using some tools, we use Kubernetes to deploy our applications

> What did you think about this coding test - is there anything you’d suggest in order to
> improve it?

- I found the test fairly interesting. I probably could have done it a lot faster/more easily using React but I did learn about some quirks that I hadn't had to deal with before. Namely large numbers in JavaScript and I imagine there's a better way to handle that which I'll be interested to hear about. Just Playing around with Angular in general was a bit of fun and I'll likely continue with it over the next couple of weeks. I hadn't dealt with timers either so I spent a bit of time playing around with different options like setIntervals but happened upon an rxjs example and was able to add to it to get the outcome I wanted for the most part. It seems like an interesting and powerful tool in itself.
