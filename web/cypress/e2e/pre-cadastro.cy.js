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

    it('Campos obrigatórios', () => {
        cy.visit('/')

        cy.get('header nav a[href="pre-cadastro"]')
        .click()

        cy.get('form h2')
            .should('be.visible')
            .and('have.text', 'Seus dados')

        cy.contains('button[type="submit"]', 'Continuar')
            .click()

        cy.get('.alert-msg')
            .should('be.visible')
            .and('include.text', 'O campo nome é obrigatório.')

        cy.get('.alert-msg')
            .should('be.visible')
            .and('include.text', 'O campo e-mail é obrigatório.')
        
    })

    it('Campos obrigatórios, validação com xpath', () => {
        cy.visit('/')
    
        cy.get('header nav a[href="pre-cadastro"]')
        .click()
    
        cy.get('form h2')
            .should('be.visible')
            .and('have.text', 'Seus dados')
    
        cy.contains('button[type="submit"]', 'Continuar')
            .click()

        //label[text()="Nome Completo"]/..//div[contains(@class, "alert-msg")]

        cy.contains('label', 'Nome Completo')
            .parent()
            .find('.alert-msg')
            .should('be.visible')
            .and('have.text', 'O campo nome é obrigatório.')

        cy.contains('label', 'Nome Completo')
            .parent()
            .find('.alert-msg')
            .should('be.visible')
            .and('have.text', 'O campo e-mail é obrigatório.')
        
    })
})