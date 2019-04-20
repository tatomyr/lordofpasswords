const getRecurrPw = require('../../test-utils/v0.2.0-generator-for-test')
const getRandom = require('../../test-utils/get-random')

describe('Compatibility with the Classical Password Generator', () => {
  let password
  beforeEach(() => {
    cy.visit('/')
  })
  it('generating password of length 6 with the standard charset', () => {
    cy.get('#length')
      .clear()
      .type(6)
    cy.get('#service').type('service')
    cy.get('#masterpassword').type('salt')
    cy.get('#submit').click()
    cy.get('#password').should('have.value', '9Kb6vH')
  })
  it('generating password of length 6 with the standard charset', () => {
    let data = ['service', 'salt', 6]
    getRecurrPw(...data, pw => {
      password = pw
    })
    cy.get('#length')
      .clear()
      .type(data[2])
    cy.get('#service').type(data[0])
    cy.get('#masterpassword').type(data[1])
    cy.get('#submit').click()
    cy.get('#password').should('have.value', password)
  })
  it('generating password of length 64 with the standard charset', () => {
    let data = ['service', 'salt', 64]
    getRecurrPw(...data, pw => {
      password = pw
    })
    cy.get('#length')
      .clear()
      .type(data[2])
    cy.get('#service').type(data[0])
    cy.get('#masterpassword').type(data[1])
    cy.get('#submit').click()
    cy.get('#password').should('have.value', password)
  })
  it('generating password of big random length with the standard charset', () => {
    let data = [
      getRandom.string(1, 32), // service
      getRandom.string(1, 32), // masterpassword (salt)
      getRandom.int(6, 64), // password length
    ]
    getRecurrPw(...data, pw => {
      password = pw
    })
    cy.get('#length')
      .clear()
      .type(data[2])
    cy.get('#service').type(data[0])
    cy.get('#masterpassword').type(data[1])
    cy.get('#submit').click()
    cy.get('#password').should('have.value', password)
  })
  it('generating password of moderate random length with the standard charset', () => {
    let data = [
      getRandom.string(1, 12), // service
      getRandom.string(1, 8), // masterpassword (salt)
      getRandom.int(6, 10), // password length
    ]
    getRecurrPw(...data, pw => {
      password = pw
    })
    cy.get('#length')
      .clear()
      .type(data[2])
    cy.get('#service').type(data[0])
    cy.get('#masterpassword').type(data[1])
    cy.get('#submit').click()
    cy.get('#password').should('have.value', password)
  })
})

describe('Modern Password Generator', () => {
  let password
  beforeEach(() => {
    cy.visit('/')
  })
  // TODO: provide more valid cases
  it('passes all the flow', () => {
    cy.get('#length')
      .clear()
      .type(6)
    cy.get('#service').type('service')
    cy.get('#masterpassword').type('salt')
    cy.get('#special').click()
    cy.get('#submit').click()
    cy.get('#password').should('have.value', '6Bt$70')
    // cy.get('#notification').should('have.class', 'visible')
  })
})
