/// <reference types="cypress" />

import { matricula, senha, agendamentos } from '../fixtures/agendamentos.json'

describe('GET /api/agendamentos', () => {

  before(() => {
    cy.postAgendamentos(matricula, agendamentos)
  })

  it('Deve listar os agendamentos do funcionário', () => {

  })

})