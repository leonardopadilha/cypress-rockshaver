
describe('Pré-cadastro', () => {
    it('Deve realizar o pré-cadastro do cliente', () => {
        const usuario = {
            nome: 'Leonardo Padilha',
            email: 'leonardo@email.com'
        }

        cy.iniciarPreCadastro(usuario)
        cy.verificarPreCadastro(usuario)
    })

    it('Campos obrigatórios', () => {
        cy.iniciarPreCadastro()

        cy.get('.alert-msg')
            .should('be.visible')
            .and('include.text', 'O campo nome é obrigatório.')

        cy.get('.alert-msg')
            .should('be.visible')
            .and('include.text', 'O campo e-mail é obrigatório.')
        
    })

    it('Campos obrigatórios, validação com xpath', () => {
        cy.iniciarPreCadastro()
        cy.verificarAlerta('Nome Completo', 'O campo nome é obrigatório.')
        cy.verificarAlerta('E-mail', 'O campo e-mail é obrigatório.')
    })

    it('Não deve fazer o pré-cadastro apenas com o primeiro nome', () => {
        const usuario = {
            nome: 'Leonardo',
            email: 'leonardo@email.com'
        }

        cy.iniciarPreCadastro(usuario)
        cy.verificarAlerta('Nome Completo', 'Informe seu nome completo.')
    })

    it('Não deve fazer o pré-cadastro apenas com email incorreto', () => {
        const usuario = {
            nome: 'Leonardo Padilha',
            email: 'www.teste.com.br'
        }

        cy.iniciarPreCadastro(usuario)
        cy.verificarAlerta('E-mail', 'O e-mail inserido é inválido.')
    })
})