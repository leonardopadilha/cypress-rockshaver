describe('Login', () => {
  it('Deve logar como barbeiro', () => {
    cy.viewport('iphone-xr')
    cy.visit('/')

    const funcionario = {
      matricula: 1007,
      senha: 'pwd123',
      nome: 'Slash'
    }

    cy.contains('p', 'Faça login com a sua conta')
        .should('be.visible')

    cy.login(funcionario)
    cy.verificaUsuarioLogado(funcionario)
  })
})

Cypress.Commands.add('login', (funcionario) => {
  cy.get('input[name="matricula"]')
      .type(funcionario.matricula)

  cy.get('input[name="senha"]')
      .type(funcionario.senha)

  cy.contains('button', 'Entrar')
      .click()
})

Cypress.Commands.add('verificaUsuarioLogado', (funcionario) => {
    // trabalhando com escopo do elemento (elementos filhos)
    cy.get('.usuario-logado').within(() => {
      cy.get('small')
          .should('be.visible')
          .and('have.text', `Olá ${funcionario.nome},`)

      cy.get('h2')
          .should('be.visible')
          .and('have.text', 'esse é o seu painel de atendimento!')
    })
})