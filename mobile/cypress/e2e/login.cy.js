/// <reference types="cypress" />

describe('Login', () => {
  beforeEach(() => {
    cy.viewport('iphone-xr')
    cy.visit('/')


    cy.contains('p', 'Faça login com a sua conta')
        .should('be.visible')
  });


  it('Deve logar como barbeiro', () => {

    const funcionario = {
      matricula: 1007,
      senha: 'pwd123',
      nome: 'Slash'
    }

    cy.login(funcionario)
    cy.verificaUsuarioLogado(funcionario)
  })
})