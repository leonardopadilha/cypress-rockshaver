import calendario from '../fixtures/calendario.json'
import agendamentos from '../fixtures/agendamentos.json'

describe('Agendamento', () => {
  
  it('Deve fazer um novo agendamento', () => {

    const agendamento = agendamentos.sucesso

    cy.dropCollection('agendamentos', { failSilently: 'true' }).then(result => {
      cy.log(result); 
  });

    cy.intercept('GET', 'http://localhost:3333/api/calendario', {
      statusCode: 200,
      body: calendario
    }).as('getCalendario')

    cy.iniciarPreCadastro(agendamento.usuario)
    cy.verificarPreCadastro(agendamento.usuario)

    cy.contains('a', 'Agendar um horário').click()

    // Checkpoint
    cy.contains('span', 'Membros da Equipe').should('be.visible')

    cy.contains('div', 'Tina')
        .parent()
        .click()

    // Checkpoint
    cy.contains('span', 'Serviços').should('be.visible')

    cy.contains('div', agendamento.servico.descricao)
        .parent()
        .click()

    // Checkpoint
    cy.contains('span', 'Dias Disponíveis').should('be.visible')  
    cy.contains('span', 'Horários Disponíveis').should('be.visible')  

    cy.contains('.dia-semana', agendamento.dia).click()

    cy.contains('.hora-opcao', agendamento.hora).click()

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