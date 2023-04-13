
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('input[id="firstName"]').should('be.visible').type('Mateus').should('have.value', 'Mateus')

    //input Sobrenome
    cy.get('input[id="lastName"]').should('be.visible').type('Gondim').should('have.value', 'Gondim')

    //input E-mail
    cy.get('input[id="email"]').should('be.visible').type('mateus@email.com').should('have.value', 'mateus@email.com')

    //input Como podemos te ajudar?
    cy.get('textarea[id="open-text-area"]').should('be.visible').type('Contrary to popular belief, Lorem Ipsum is not simply random text.', {
        delay: 0
    }).should('have.value', 'Contrary to popular belief, Lorem Ipsum is not simply random text.')

    cy.get('button[type="submit"]').click()
})

Cypress.Commands.add('fillAllFields', () => {
    cy.get('input[id="firstName"]').should('be.visible').type('Mateus')

    //input Sobrenome
    cy.get('input[id="lastName"]').should('be.visible').type('Gondim')

    //input E-mail
    cy.get('input[id="email"]').should('be.visible').type('mateus@email.com')

    cy.get('input[id="phone"]').should('be.visible').type('9999999999')

    //input Como podemos te ajudar?
    cy.get('textarea[id="open-text-area"]').should('be.visible').type('Contrary to popular belief, Lorem Ipsum is not simply random text.')


})



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
