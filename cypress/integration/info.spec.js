/* eslint-disable no-undef */
describe('Info Page', () => {
  beforeEach(() => {
    cy.visit('/info.html')
  })
  it('contains link to home', () => {
    cy.get('footer ul li a')
      .first()
      .contains('Home')
      .click()
    cy.location('pathname').should('eq', '/')
  })
  it('anchors to links', () => {
    cy.get('main section#why-use a')
      .contains('Why use Lord of Passwords?')
      .click()
    cy.location('hash').should('eq', '#why-use')
  })
})
