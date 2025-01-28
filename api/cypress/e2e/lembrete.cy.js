/// <reference types="cypress" />

import { Types } from 'mongoose'

describe('POST /agendamentos/:id/lembrete', () => {

  beforeEach(() => {
    // Aqui precisamos a autenticação como funcionário par solicitar o cancelamento
    cy.login('1005', 'pwd123')
  })

  context('Quando tenho um agendamento', () => {

    let agendamentoId

    const agendamento = {
      nomeCliente: 'Miguel Dias',
      emailCliente: 'dias@gmail.com',
      data: '10/01/2025',
      hora: '10:00',
      matricula: '1005',
      codigoServico: 2
    }

    before(() => {
      cy.deleteMany(
        { matricula: agendamento.matricula },
        { collection: 'agendamentos' }
      ).then((result) => {
        cy.log(result)
      })

      // Aqui quem faz o agendamento é o cliente
      cy.postAgendamento(agendamento)
          .should((response) => {
            expect(response.status).to.eql(201)
            agendamentoId = response.body.agendamentoId
          })
    })

    it('Deve enviar um lembrete por email', () => {
      cy.postLembrete(agendamentoId)
          .should((response) => {
            expect(response.status).to.eql(200)
            expect(response.body.message).to.eq('Lembrete enviado com sucesso')
          })

      // Função do plugin do mongodb para cypress
      cy.findOne(
        { agendamentoId: new Types.ObjectId(agendamentoId) },
        { collection: 'lembretes' }
      ).then((result) => {
        // conteudoHtml -> Campo no banco / agendamento -> Massa de dados definida acima
        expect(result.conteudoHtml).to.include(agendamento.nomeCliente)
      })
    })
  })

  it('Deve retornar 404 quando o agendamento não existe para envio', () => {
    cy.postLembrete(new Types.ObjectId())
        .should((response) => {
              expect(response.status).to.eql(404)
        })
  })
})