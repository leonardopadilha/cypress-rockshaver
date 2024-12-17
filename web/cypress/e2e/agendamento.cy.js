describe('Agendamento', () => {
  it('Deve fazer um novo agendamento', () => {
    const usuario = {
      nome: 'Usuário para Agendamento',
      email: 'usuario_ag@email.com'
    }
    cy.iniciarPreCadastro(usuario)
    cy.verificarPreCadastro(usuario)

    cy.contains('a', 'Agendar um horário').click()

    // Checkpoint
    cy.contains('span', 'Membros da Equipe').should('be.visible')
  })
})