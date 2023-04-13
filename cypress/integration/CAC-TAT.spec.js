/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
  beforeEach(() => {
    cy.visit('src/index.html')

  })

  it('verifica o título da aplicação', () => {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('span[class="success"]').should('be.visible')
    cy.contains('span[class="success"] > strong', 'Mensagem enviada com sucesso.')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('input[id="email"]').type('testemail.email.com')
    cy.get('button[type="submit"]').click()
    cy.get('span[class="error"]').should('be.visible')

  })

  it('campo telefone aceita apenas valores numericos', () => {
    cy.get('input[id="phone"]').type('a! asdsd/').should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('input[id="phone-checkbox"]').check()
    cy.get('input[id="phone"]').should('have.attr', 'required')
    cy.get('button[type="submit"]').click()

    cy.get('input[id="firstName"]').should('be.visible').type('Mateus').should('have.value', 'Mateus')

    //input Sobrenome
    cy.get('input[id="lastName"]').should('be.visible').type('Gondim').should('have.value', 'Gondim')

    //input E-mail
    cy.get('input[id="email"]').should('be.visible').type('mateus@email.com').should('have.value', 'mateus@email.com')

    //input Como podemos te ajudar?
    cy.get('textarea[id="open-text-area"]').should('be.visible').type('Contrary to popular belief, Lorem Ipsum is not simply random text.', {
      delay: 0
    }).should('have.value', 'Contrary to popular belief, Lorem Ipsum is not simply random text.')

    cy.get('button[type="submit"]').click()
    cy.get('span[class="error"]').should('be.visible')

  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.fillAllFields()
    cy.get('input[id="firstName"]').clear().should('have.value', '')

    //input Sobrenome
    cy.get('input[id="lastName"]').clear().should('have.value', '')

    //input E-mail
    cy.get('input[id="email"]').clear().should('have.value', '')

    cy.get('input[id="phone"]').clear().should('have.value', '')

    cy.get('textarea[id="open-text-area"]').clear().should('have.value', '')

  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.get('button[type="submit"]').click()
    cy.get('span[class="error"]').should('be.visible')

  })

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('select[id="product"]')
      .select('YouTube')
      .should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('select[id="product"]')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('select[id="product"]')
      .select(1)
      .should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('have.value', 'feedback')
  })

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .should('have.length', 3)
      .each(($radio) => {
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')

      })
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
      .check()

    cy.get('input[type="checkbox"]')
      .each(checkbox => {
        expect(checkbox[0].checked).to.equal(true)
      })

    cy.get('input[type="checkbox"]')
      .last()
      .uncheck()
      .should('not.be.checked')

  })

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('input[type="file"]').selectFile('./cypress/fixtures/example.json').should(
      ($input) => {
        expect($input[0].files[0].name).to.equal('example.json')
      }
    )
  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('input[type="file"]').selectFile('./cypress/fixtures/example.json', {
      action: 'drag-drop'
    }).should(
      ($input) => {
        expect($input[0].files[0].name).to.equal('example.json')
      }
    )
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('sampleFile')
    cy.get('input[type="file"]')
      .selectFile('@sampleFile')
      .should(($input) => {
        expect($input[0].files[0].name).to.equal('example.json')
      }
      )
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.get('a')
      .should('have.attr', 'target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.get('a')
      .invoke('removeAttr', 'target')
      .click()

    cy.contains('Talking About Testing').should('be.visible')
  })


})