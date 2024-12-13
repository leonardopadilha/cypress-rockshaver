
import preReg from "../support/actions/pre-reg"

describe('Pré-cadastro', () => {
    it('Deve realizar o pré-cadastro do cliente', () => {
        const nome = 'Leonardo Padilha'
        const email = 'leonardo@email.com'

        preReg.start(nome, email)
        preReg.verify('Leonardo', email)
    })

    it('Campos obrigatórios', () => {
        preReg.start()

        cy.get('.alert-msg')
            .should('be.visible')
            .and('include.text', 'O campo nome é obrigatório.')

        cy.get('.alert-msg')
            .should('be.visible')
            .and('include.text', 'O campo e-mail é obrigatório.')
        
    })

    it('Campos obrigatórios, validação com xpath', () => {
        preReg.start()
        preReg.alert('Nome Completo', 'O campo nome é obrigatório.')
        preReg.alert('E-mail', 'O campo e-mail é obrigatório.')
    })

    it('Não deve fazer o pré-cadastro apenas com o primeiro nome', () => {
        preReg.start('Leonardo', 'leonardo@email.com')
        preReg.alert('Nome Completo', 'Informe seu nome completo.')
    })

    it('Não deve fazer o pré-cadastro apenas com email incorreto', () => {
        preReg.start('Leonardo Padilha', 'www.teste.com.br')
        preReg.alert('E-mail', 'O e-mail inserido é inválido.')
    })
})