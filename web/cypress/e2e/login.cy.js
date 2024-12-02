/// <reference types="cypress" />

describe('Login', () => {
  it('Deve logar com sucesso', () => {
    cy.visit('/')

    cy.get('header nav a[href="entrar"]')
        .click()

    cy.get('form h2')
        .should('be.visible')
        .and('have.text', 'Seus dados')

    cy.get('input[placeholder="Nome"]')
        .type('Leonardo Padilha')

    cy.get('input[placeholder="E-mail"]')
        .type('leonardo@email.com')

    cy.get('input[placeholder="Whatsapp"]')
        .type('11999999999')

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