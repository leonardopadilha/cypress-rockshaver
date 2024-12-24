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
    cy.iniciarAgendamento()
    cy.escolherProfissional(agendamento.profissional)
    cy.selecionarServico(agendamento.servico.descricao)
    cy.escolherDia(agendamento.dia)
    cy.escolherHorario(agendamento.hora)
    cy.finalizarAgendamento()

    // Desfecho
    cy.get('h2')
        .should('be.visible')
        .and('have.text', 'Let`s Rock')

    cy.get('h3')
        .should('be.visible')
        .and('have.text', 'Tudo certo por aqui! Seu horário está confirmado.')
  })
})
