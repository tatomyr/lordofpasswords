/* eslint-disable no-undef */
import getRecurrPw from "../../test-utils/v0.2.0-generator-for-test"
import {getRandom} from "../../test-utils/helpers"

describe("Compatibility with the Classical Password Generator", () => {
  let password
  let stub
  beforeEach(() => {
    cy.visit("/")
    stub = cy.stub()
    cy.on("window:alert", stub)
  })
  it("should generate password of length 6 with the standard charset", () => {
    const service = "service"
    const masterpassword = "salt"
    const passwordlength = 6
    getRecurrPw(service.toLowerCase(), masterpassword, passwordlength, pw => {
      password = pw
    })
    cy.get("#service").type(service)
    cy.get("#masterpassword").type(masterpassword)
    cy.get("#passwordlength").clear().type(passwordlength)
    cy.get("[name=showpassword]")
      .click()
      .then(() => {
        cy.wait(1000).then(() => {
          const pw = stub.getCall(0).args[0]
          expect(pw).to.equal(password)
        })
      })
  })
  it("should generate password of length 64 with the standard charset", () => {
    const service = "Service"
    const masterpassword = "salt"
    const passwordlength = 64
    getRecurrPw(service.toLowerCase(), masterpassword, passwordlength, pw => {
      password = pw
    })
    cy.get("#service").type(service)
    cy.get("#masterpassword").type(masterpassword)
    cy.get("#passwordlength").clear().type(passwordlength)
    cy.get("[name=showpassword]")
      .click()
      .then(() => {
        cy.wait(1000).then(() => {
          const pw = stub.getCall(0).args[0]
          expect(pw).to.equal(password)
        })
      })
  })
  it("should generate password of big random length with the standard charset", () => {
    const service = getRandom.string(1, 32)
    const masterpassword = getRandom.string(1, 32)
    const passwordlength = getRandom.int(6, 64)
    getRecurrPw(service.toLowerCase(), masterpassword, passwordlength, pw => {
      password = pw
    })
    cy.get("#service").type(service)
    cy.get("#masterpassword").type(masterpassword)
    cy.get("#passwordlength").clear().type(passwordlength)
    cy.get("[name=showpassword]")
      .click()
      .then(() => {
        cy.wait(1000).then(() => {
          const pw = stub.getCall(0).args[0]
          expect(pw).to.equal(password)
        })
      })
  })
  it("should generate password of moderate random length with the standard charset", () => {
    const service = getRandom.string(1, 12)
    const masterpassword = getRandom.string(1, 8)
    const passwordlength = getRandom.int(6, 10)
    getRecurrPw(service.toLowerCase(), masterpassword, passwordlength, pw => {
      password = pw
    })
    cy.get("#service").type(service)
    cy.get("#masterpassword").type(masterpassword)
    cy.get("#passwordlength").clear().type(passwordlength)
    cy.get("[name=showpassword]")
      .click()

      .then(() => {
        cy.wait(1000).then(() => {
          const pw = stub.getCall(0).args[0]
          expect(pw).to.equal(password)
        })
      })
  })
  it("should generate password for case sensitive service", () => {
    const service = getRandom.plainString(10, 10)
    const masterpassword = getRandom.string(1, 8)
    const passwordlength = getRandom.int(6, 10)
    getRecurrPw(service, masterpassword, passwordlength, pw => {
      password = pw
    })
    cy.get("#service").type(service)
    cy.get("#masterpassword").type(masterpassword)
    cy.get("#passwordlength").clear().type(passwordlength)
    cy.get("#casesensitive").click()
    cy.get("[name=showpassword]")
      .click()
      .then(() => {
        cy.wait(1000).then(() => {
          const pw = stub.getCall(0).args[0]
          expect(pw).to.equal(password)
        })
      })
  })
})
