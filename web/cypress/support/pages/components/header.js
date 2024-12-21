/// <reference types="cypress" />

class Header {
  goToPreReg() {
    cy.get('header nav a[href="pre-cadastro"]')
      .click()
  }

  verifyPreReg(firstname, email) {
    cy.get('.usuario-nome')
      .should('be.visible')
      .and('have.text', `Olá, ${firstname}`)

    cy.get('.usuario-email')
        .should('be.visible')
        .and('have.text', email)
  }
}

export default new Header()