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

    // Passo: Iniciar agendamento
    cy.contains('a', 'Agendar um horário').click()

    // Passo: Escolher profissional
    cy.contains('span', 'Membros da Equipe').should('be.visible')

    cy.contains('div', agendamento.profissional.nome)
        .parent()
        .click()

    // Passo: Selecionar serviço
    cy.contains('span', 'Serviços').should('be.visible')

    cy.contains('div', agendamento.servico.descricao)
        .parent()
        .click()

    // Passo: Escolher o dia do agendamento
    cy.contains('span', 'Dias Disponíveis').should('be.visible')  
    cy.contains('.dia-semana', agendamento.dia).click()

    // Passo: Escolher horário do agendamento
    cy.contains('span', 'Horários Disponíveis').should('be.visible')  
    cy.contains('.hora-opcao', agendamento.hora).click()

    // Passo: Finalizar agendamento
    cy.contains('button', 'Confirmar e reservar').click()

    // Desfecho
    cy.get('h2')
        .should('be.visible')
        .and('have.text', 'Let`s Rock')

    cy.get('h3')
        .should('be.visible')
        .and('have.text', 'Tudo certo por aqui! Seu horário está confirmado.')
  })
})