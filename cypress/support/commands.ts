/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add('getBySel', (selector, ...args) => {
	return cy.get(`[data-cy=${selector}]`, ...args);
});

Cypress.Commands.add('getBySelLike', (selector, ...args) => {
	return cy.get(`[data-cy*=${selector}]`, ...args);
});

Cypress.Commands.add('login', (email: string, password: string) => {
	cy.intercept('POST', '/api/auth/sign-in', {
		fixture: 'login-mock.json',
		statusCode: 200,
	}).as('loginUser');

	cy.intercept('GET', '/api/user/me', {
		fixture: 'get-me-mock.json',
		statusCode: 200,
	}).as('getMe');

	cy.visit('/login');
	cy.get('[data-cy=login-email]').type(email);
	cy.get('[data-cy=login-password]').type(password);
	cy.get('[data-cy=login-form]').submit();
});
