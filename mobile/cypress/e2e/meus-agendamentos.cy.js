/// <reference types="cypress" />

import { profissional, agendamentos } from '../fixtures/agendamentos.json' 

describe('Meus agendamentos', () => {

  before(() => {
    cy.deleteMany(
      { matricula: profissional.matricula },
      { collection: 'agendamentos' }
    )

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

  beforeEach(() => {
    cy.viewport('iphone-xr')
    cy.visit('/')

    cy.contains('p', 'Faça login com a sua conta')
        .should('be.visible')

    cy.login(profissional)
    cy.verificarUsuarioLogado(profissional)
  })

  it('Deve exibir os meus agendamentos', () => {

    cy.get('ul li')
        .should('be.visible')
        .and('have.length', agendamentos.length)
        .each(($li, index) => {
          const agendamento = agendamentos[index]

          const resultado = `${agendamento.servico.descricao} no dia ${agendamento.data} às ${agendamento.hora}`

          cy.wrap($li)
              .invoke('text')
              .should('contain', agendamento.usuario.nome)
              .and('contain', resultado)
        })
  })

  it('Deve cancelar um agendamento', () => {
    const agendamento = agendamentos.find(x => x.usuario.email === "peter.parker@stark.com")

    cy.contains('ul li', agendamento.usuario.nome)
        .as('agendamentoItem')

    cy.get('@agendamentoItem')
        .should('be.visible')
        .click()

    cy.contains('span', 'Cancelar agendamento')
        .should('be.visible')
        .click()

    cy.verificarToast('Agendamento cancelado com sucesso!')

    cy.contains('@agendamentoItem')
        .should('not.exist')
  })
})