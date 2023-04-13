
describe('Central de Atendimento ao Cliente TAT', () => {
    beforeEach(() => {
        cy.visit('src/privacy.html')

    })

    it('testa a página da política de privacidade de forma independente', () => {

        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT - Política de privacidade')

        cy.contains('h1[id="title"]', 'CAC TAT - Política de privacidade').should('be.visible')
    })
})