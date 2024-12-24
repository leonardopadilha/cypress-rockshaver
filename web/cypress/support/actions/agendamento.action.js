// Passo: Iniciar agendamento
Cypress.Commands.add('iniciarAgendamento', () => {
  cy.contains('a', 'Agendar um horário').click()
})

// Passo: Escolher o profissional
Cypress.Commands.add('escolherProfissional', (nomeProfissional) => {
  cy.contains('span', 'Membros da Equipe').should('be.visible')
  cy.contains('div', nomeProfissional)
    .parent()
    .click()
})

// Passo: Selecionar serviço
Cypress.Commands.add('selecionarServico', (descricaoServico) => {
  cy.contains('span', 'Serviços').should('be.visible')
  cy.contains('div', descricaoServico)
    .parent()
    .click()
})

// Passo: Escolher dia do agendamento
Cypress.Commands.add('escolherDia', (dia) => {
  cy.contains('span', 'Dias Disponíveis').should('be.visible')
  cy.contains('.dia-semana', dia).click()
})

// Passo: Escolher horário do agendamento
Cypress.Commands.add('escolherHorario', (hora) => {
  cy.contains('span', 'Horários Disponíveis').should('be.visible')
  cy.contains('.hora-opcao', hora).click()
})

// Passo: Finalizar agendamento
Cypress.Commands.add('finalizarAgendamento', () => {
  cy.contains('button', 'Confirmar e reservar').click()
})

