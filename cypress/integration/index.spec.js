/* eslint-disable no-undef */
import { getRandom, countOf } from '../../test-utils/helpers'

describe('Modern Password Generator', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('passes all the flow', () => {
    cy.get('#background').should('have.class', 'transparent')
    cy.get('#password').should('have.class', 'hidden')
    cy.get('#passwordLength')
      .clear()
      .type(6)
    cy.get('#service').type('service')
    cy.get('#masterpassword').type('salt')
    cy.get('#special').click()
    cy.get('#submit')
      .should('have.class', '')
      .click()
      .should('have.class', 'hidden')
    cy.get('#password')
      .should('have.class', '')
      .should('have.value', '6Bt$70')
    // We have to click to copy and proceed because it stucks due to known cypress issue:
    // https://github.com/cypress-io/cypress/issues/2851
    cy.get('#background')
      .should('have.class', '')
      .click('left')
      .should('have.class', 'transparent')
    cy.get('#submit').should('have.class', '')
    cy.get('#password')
      .should('have.class', 'hidden')
      .should('have.value', '')
    cy.get('#service:focus').should('have.value', '')
  })
  it(`
    should pass special "long" case for
    service aEJ--O
    masterpassword *D6hR
    length 6
    using special characters
  `, () => {
    cy.get('#passwordLength')
      .clear()
      .type(6)
    cy.get('#service').type('aEJ--O')
    cy.get('#masterpassword').type('*D6hR')
    cy.get('#special').click()
    cy.get('#submit').click()
    cy.get('#password').should('have.value', '8u@0CK')
  })
  it('should contain required number of symbols of each type', () => {
    const service = getRandom.string(1, 32)
    const masterpassword = getRandom.string(1, 32)
    const passwordLength = getRandom.int(6, 64)
    cy.get('#service').type(service)
    cy.get('#masterpassword').type(masterpassword)
    cy.get('#passwordLength')
      .clear()
      .type(passwordLength)
    cy.get('#special').click()
    cy.get('#submit').click()
    cy.get('#password').should(([{ value }]) => {
      expect(value).to.have.length(passwordLength)
      const countForValue = countOf(value)
      expect(countForValue(/[A-Z]/g)).to.gte(1)
      expect(countForValue(/[a-z]/g)).to.gte(1)
      expect(countForValue(/[0-9]/g)).to.gte(2)
      expect(countForValue(/[!$\-+,.#@]/g)).to.gte(1)
    })
  })
  it('should contain required number of symbols of each type for minimal password length', () => {
    const service = getRandom.string(1, 32)
    const masterpassword = getRandom.string(1, 32)
    cy.get('#service').type(service)
    cy.get('#masterpassword').type(masterpassword)
    let passwordLength
    cy.get('#passwordLength')
      .clear()
      .type(0)
      .type('{uparrow}')
      .should(([{ value }]) => {
        passwordLength = +value
        expect(passwordLength).to.eq(6)
      })
    cy.get('#special').click()
    cy.get('#submit').click()
    cy.get('#password').should(([{ value }]) => {
      expect(value).to.have.length(passwordLength)
      const countForValue = countOf(value)
      expect(countForValue(/[A-Z]/g)).to.gte(1)
      expect(countForValue(/[a-z]/g)).to.gte(1)
      expect(countForValue(/[0-9]/g)).to.gte(2)
      expect(countForValue(/[!$\-+,.#@]/g)).to.gte(1)
    })
  })
  it('should not have collisions', () => {
    let service = getRandom.string(1, 32)
    const masterpassword = getRandom.string(1, 32)
    const passwordLength = getRandom.int(6, 64)
    cy.get('#service').type(service)
    cy.get('#masterpassword').type(masterpassword)
    cy.get('#passwordLength')
      .clear()
      .type(passwordLength)
    cy.get('#submit').click()
    let password1
    cy.get('#password').should(([{ value }]) => {
      password1 = value
    })
    cy.get('#background').click('right')
    service = getRandom.string(1, 32)
    cy.get('#service').type(service)
    cy.get('#masterpassword').type(masterpassword)
    cy.get('#submit').click()
    cy.get('#password').should(([{ value }]) => {
      expect(value).to.have.length(passwordLength)
      expect(value).to.not.equal(password1)
    })
  })
  it('should redirect to the Info Page', () => {
    cy.get('footer ul li a')
      .first()
      .click()
    cy.location('pathname').should('eq', '/info.html')
  })
})
