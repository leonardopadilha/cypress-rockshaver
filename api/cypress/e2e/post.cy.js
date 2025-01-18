/// <reference types="cypress" />

describe('POST /api/agendamentos', () => {
  it('Deve criar um novo agendamento', () => {
    const body = {
      "emailCliente": "testeApi@email.com",
      "nomeCliente": "Teste Api",
      "data": "20/12/2024",
      "hora": "14:00",
      "matricula": "1001",
      "codigoServico": "1"
    }

    cy.request({
      method: 'POST',
      url: '/api/agendamentos',
      body: body
    }).should((response) => {
      expect(response.status).to.eq(201)
    })
  })
})