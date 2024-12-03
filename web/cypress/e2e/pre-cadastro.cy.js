/// <reference types="cypress" />

describe('Pré-cadastro', () => {
  it('Deve realizar o pré-cadastro do cliente', () => {
    cy.visit('/')

    cy.get('header nav a[href="pre-cadastro"]')
        .click()

    cy.get('form h2')
        .should('be.visible')
        .and('have.text', 'Seus dados')

    cy.get('input[name="nome"]')
        .type('Leonardo Padilha')

    cy.get('input[name="email"]')
        .type('leonardo@email.com')

    cy.contains('button[type="submit"]', 'Continuar')
        .click()

    cy.get('.user-name')
        .should('be.visible')
        .and('have.text', 'Leonardo Padilha')

    cy.get('.user-email')
        .should('be.visible')
        .and('have.text', 'leonardo@email.com')
  })
})