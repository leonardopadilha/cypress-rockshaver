
import homePage from "../support/pages/home-page"
import preRegPage from "../support/pages/pre-reg.page"

describe('Pré-cadastro', () => {
    it('Deve realizar o pré-cadastro do cliente', () => {
        const nome = 'Leonardo Padilha'
        const email = 'leonardo@email.com'
        homePage.go()
        homePage.header.goToPreReg()
        preRegPage.fillForm(nome, email)
        preRegPage.submit()
        homePage.header.verifyPreReg('Leonardo', email)
    })

    it('Campos obrigatórios', () => {
        homePage.go()
        homePage.header.goToPreReg()
        //preRegPage.fillForm('Leonardo Padilha', 'leonardo@email.com')
        preRegPage.submit()

        cy.get('.alert-msg')
            .should('be.visible')
            .and('include.text', 'O campo nome é obrigatório.')

        cy.get('.alert-msg')
            .should('be.visible')
            .and('include.text', 'O campo e-mail é obrigatório.')
        
    })

    it('Campos obrigatórios, validação com xpath', () => {
        homePage.go()
        homePage.header.goToPreReg()
        //preRegPage.fillForm('Leonardo Padilha', 'leonardo@email.com')
        preRegPage.submit()

        //label[text()="Nome Completo"]/..//div[contains(@class, "alert-msg")]

        preRegPage.alertHave('Nome Completo', 'O campo nome é obrigatório.')
        preRegPage.alertHave('E-mail', 'O campo e-mail é obrigatório.')
    })

    it('Não deve fazer o pré-cadastro apenas com o primeiro nome', () => {
        homePage.go()
        homePage.header.goToPreReg()
        preRegPage.fillForm('Leonardo', 'leonardo@email.com')
        preRegPage.submit()

        //label[text()="Nome Completo"]/..//div[contains(@class, "alert-msg")]
        preRegPage.alertHave('Nome Completo', 'Informe seu nome completo.')
    })

    it('Não deve fazer o pré-cadastro apenas com email incorreto', () => {
        homePage.go()
        homePage.header.goToPreReg()
        preRegPage.fillForm('Leonardo Padilha', 'www.teste.com.br')
        preRegPage.submit()
        
        //label[text()="Nome Completo"]/..//div[contains(@class, "alert-msg")]
        preRegPage.alertHave('E-mail', 'O e-mail inserido é inválido.')
    })
})