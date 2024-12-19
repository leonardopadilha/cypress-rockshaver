describe('Agendamento', () => {
  it('Deve fazer um novo agendamento', () => {

    cy.dropCollection('agendamentos', { failSilently: 'true' }).then(result => {
      cy.log(result); 
  });

    
    const usuario = {
      nome: 'Usuário para Agendamento',
      email: 'usuario_ag@email.com'
    }
    cy.iniciarPreCadastro(usuario)
    cy.verificarPreCadastro(usuario)

    cy.contains('a', 'Agendar um horário').click()

    // Checkpoint
    cy.contains('span', 'Membros da Equipe').should('be.visible')

    cy.contains('div', 'Tina')
        .parent()
        .click()

    // Checkpoint
    cy.contains('span', 'Serviços').should('be.visible')

    cy.contains('div', 'Combo')
        .parent()
        .click()

    // Checkpoint
    cy.contains('span', 'Dias Disponíveis').should('be.visible')  
    cy.contains('span', 'Horários Disponíveis').should('be.visible')  

    cy.contains('.dia-semana', '21').click()

    cy.contains('.hora-opcao', '09:00').click()

    cy.contains('button', 'Confirmar e reservar').click()

    // Checkpoint
    cy.get('h2')
        .should('be.visible')
        .and('have.text', 'Let`s Rock')

    cy.get('h3')
        .should('be.visible')
        .and('have.text', 'Tudo certo por aqui! Seu horário está confirmado.')
  })
})