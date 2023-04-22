# Frontend coding challenge

This is the coding challenge for people who applied to a frontend developer position at SeQura. It's been designed to be a simplified version of the same problems we deal with.

## The challenge

SeQura provides e-commerce shops (merchants) a flexible payment method so their customers (shoppers) can purchase the goods paying in instalments. SeQura has analyzed, that this kind of payment method requires a biggest effort in promotion by part of the merchant to make a difference in purchases quantity and average amount.

The marketing team is now asking you to make a prototype of a widget that displays the financing cost for a given product for merchant's product page. They also ask you that they would want to know any shopper interaction with the widget to analyze if the widget has any impact.

We expect you to:

* Create the prototype for the mockups that the marketing team has given you (`mockups.pdf`)
  * Integrate the prototype with SeQura `CreditAgreementAPI` (`docs/credit_agreement_api.md`) to fetch financing information for a given product value.
  * Integrate the prototype with SeQura `EventsAPI` (`docs/events_api.md`) triggering an event for each shopper interaction.
* Integrate the prototype in the merchant sample site (`merchant-site/product-page.html`) so that every time the product price changes the financing value is updated.
* Write up a paragraph with the way you would distribute this prototype to all our merchants.

## Instructions

* Please read carefully the challenge and if you have any doubt or need extra info please don't hesitate to ask us before starting.
* You shouldn't spend more than 3h on the challenge.
* You should consider this code ready for production as it were a PR to be reviewed by a colleague. Also commit as if it were a real assignment.
* Design, test, develop and document the code. It should be a performant, clean and well structured solution. **Then send us a link or a zip with a git repo**.
* Remember you're dealing with resources that will be loaded on merchant's sites, so you should be careful with dependencies, styles and code clashing.
* Create a README explaining how to setup and run your solution and a short explanation of your technical choices, tradeoffs, ...
* You don't need to finish. We value quality over feature-completeness. If you have to leave things aside you can mention them on the README explaining why and how you would resolve them.
* You can code the solution in a language or framework of your choice.
* In order to use SeQura mocked APIs you need to start the environment found in folder `api`

**HAPPY CODING!!**
