
describe('Pré-cadastro', () => {
    it('Deve realizar o pré-cadastro do cliente', () => {
        const nome = 'Leonardo Padilha'
        const email = 'leonardo@email.com'

        cy.startPreRegistration(nome, email)
        cy.verifyPreRegistratered('Leonardo', email)
    })

    it('Campos obrigatórios', () => {
        cy.startPreRegistration()

        cy.get('.alert-msg')
            .should('be.visible')
            .and('include.text', 'O campo nome é obrigatório.')

        cy.get('.alert-msg')
            .should('be.visible')
            .and('include.text', 'O campo e-mail é obrigatório.')
        
    })

    it('Campos obrigatórios, validação com xpath', () => {
        cy.startPreRegistration()
        cy.alertHave('Nome Completo', 'O campo nome é obrigatório.')
        cy.alertHave('E-mail', 'O campo e-mail é obrigatório.')
    })

    it('Não deve fazer o pré-cadastro apenas com o primeiro nome', () => {
        cy.startPreRegistration('Leonardo', 'leonardo@email.com')
        cy.alertHave('Nome Completo', 'Informe seu nome completo.')
    })

    it('Não deve fazer o pré-cadastro apenas com email incorreto', () => {
        cy.startPreRegistration('Leonardo Padilha', 'www.teste.com.br')
        cy.alertHave('E-mail', 'O e-mail inserido é inválido.')
    })
})