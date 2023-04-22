# Sequra-Widget & Sequra-Web

Sequra Widget is a tool built for merchants to help them display financing options to their customers. It is composed of two projects: Sequra Web and Sequra Widget.

## Sequra Web

Sequra Web is the API that users include in their code to have access to all Sequra services. It was built with webpack as a bundler and Jest for testing.

## Sequra Widget

Sequra Widget is a project that contains all the logic and displays the information to the user. It was built with Next.js and TypeScript, and Jest was used for testing.
## Solution Overview

The Sequra Widget uses an iframe to display the financing options to the customer. This approach allows for a clean separation between the merchant's website and the widget's content. By using an API interface, the merchant has full control over how the widget is displayed and can interact with it in a flexible way.

## How to Run the Project

To run the Sequra Web project, navigate to the project directory and run the following commands:

```sh

npm install
npm run build
```

To run the Sequra Widget project, navigate to the project directory and run the following commands:

```sh
npm install
npm run dev
```

Please note that in order to properly run the Sequra Widget project, you must have the API running.

## Considerations (not developed)

I would use svg assets instead of PNG, for performance purposes.

In case of failures, the Sequra Widget will not be displayed at all. I would use a monitoring tool such as Sentry to track these issues. For events API, any errors would be logged in the console as they are not critical for the user flow.

Please note that the frame calls the Next.js dev environment, but in production, I would use something more optimized in terms of performance and bundle size. I would also use environment variables such as .env to switch between development and production environments.

I apologize for the lack of commits in this project. I initially thought that I had to send a zip file only. However, in a real project scenario, I would commit the code more frequently. I would aim to have at least 6 or 7 commits, one for the initial challenge, then one per project initialization, another for the index of the widget, and another for the modal. Finally, I would have one commit per test suite and another for the readme. Moreover, I would break down the large pull request into at least 3 or 4 smaller ones, each with a running version (although reduced) of the code.

For hosting, I would use a Static storage with CDN for the Sequra-web, and for the widget I would use Vercel.

I would add CI/CD config to the repo, that could be a little tricky giving that is a monorepo but here is a [doc](https://vercel.com/docs/concepts/monorepos) that talks about it.
