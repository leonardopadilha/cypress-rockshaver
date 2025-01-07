/// <reference types="cypress" />

import { profissional, agendamentos } from '../fixtures/agendamentos.json' 

describe('Meus agendamentos', () => {
  it('Deve exibir os meus agendamentos', () => {
    agendamentos.forEach((a) => {

      cy.request({
        method: 'POST',
        url: `${Cypress.env('baseApi')}/api/agendamentos`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 3a8a9b8fae87baf503e7c5fe5b97fd72'
        },
        body: {
          nomeCliente: a.usuario.nome,
          emailCliente: a.usuario.email,
          data: a.data,
          hora: a.hora,
          matricula: profissional.matricula,
          codigoServico: a.servico.codigo
        }
      }).then((response) => {
        expect(response.status).to.eq(201)
      })

    })
  })
})