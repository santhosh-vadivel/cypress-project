// ***********************************************
// This example commands.js shows you how to
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

//COMPARE TEXTS
export function compareText(expected, actual) {
    cy.get(expected, { timeout: 50000 })
      .invoke('text')
      .then(name => {
        expect(actual.trim()).to.eq(name.trim());
    });
}

// COMPARE VALUES
export function compareValues(expected, actual) {
    cy.get(expected, { timeout: 20000 })
      .invoke('val')
      .then(name => {
        expect(actual).to.eq(name);
    });
}