/* eslint-disable no-undef */
import {getRandom, countOf} from "../../test-utils/helpers"

describe("Modern Password Generator", () => {
  let stub
  beforeEach(() => {
    cy.visit("/")
    stub = cy.stub()
    cy.on("window:alert", stub)
  })
  it("passes all the flow", () => {
    cy.get("#passwordlength").clear().type(6)
    cy.get("#service").type("service")
    cy.get("#masterpassword").type("salt")
    cy.get("#special").click()
    cy.get("[name=showpassword]")
      .click()
      .then(() => {
        cy.wait(1000).then(() => {
          expect(stub.getCall(0)).to.be.calledWith("6Bt$70")
        })
      })
    cy.get("#service:focus").should("have.value", "")
  })
  it(`
    should pass special "long" case for
    service aEJ--O
    masterpassword *D6hR
    length 6
    using special characters
  `, () => {
    cy.get("#passwordlength").clear().type(6)
    cy.get("#service").type("aEJ--O")
    cy.get("#masterpassword").type("*D6hR")
    cy.get("#special").click()
    cy.get("#casesensitive").click()
    cy.get("[name=showpassword]")
      .click()
      .then(() => {
        cy.wait(1000).then(() => {
          expect(stub.getCall(0)).to.be.calledWith("8u@0CK")
        })
      })
  })
  it("should contain required number of symbols of each type", () => {
    const service = getRandom.string(1, 32)
    const masterpassword = getRandom.string(1, 32)
    const passwordLength = getRandom.int(6, 64)
    cy.get("#service").type(service)
    cy.get("#masterpassword").type(masterpassword)
    cy.get("#passwordlength").clear().type(passwordLength)
    cy.get("#special").click()
    cy.get("[name=showpassword]")
      .click()
      .then(() => {
        cy.wait(1000).then(() => {
          const password = stub.getCall(0).args[0]
          expect(password).to.have.length(passwordLength)
          const countForPassword = countOf(password)
          expect(countForPassword(/[A-Z]/g)).to.gte(1)
          expect(countForPassword(/[a-z]/g)).to.gte(1)
          expect(countForPassword(/[0-9]/g)).to.gte(2)
          expect(countForPassword(/[!$\-+,.#@]/g)).to.gte(1)
        })
      })
  })
  it("should contain required number of symbols of each type for minimal password length", () => {
    const service = getRandom.string(1, 32)
    const masterpassword = getRandom.string(1, 32)
    cy.get("#service").type(service)
    cy.get("#masterpassword").type(masterpassword)
    let passwordLength
    cy.get("#passwordlength")
      .clear()
      .type(0)
      .type("{uparrow}")
      .should(([{value}]) => {
        passwordLength = +value
        expect(passwordLength).to.eq(6)
      })
    cy.get("#special").click()
    cy.get("[name=showpassword]")
      .click()
      .then(() => {
        cy.wait(1000).then(() => {
          const password = stub.getCall(0).args[0]
          expect(password).to.have.length(passwordLength)
          const countForPassword = countOf(password)
          expect(countForPassword(/[A-Z]/g)).to.gte(1)
          expect(countForPassword(/[a-z]/g)).to.gte(1)
          expect(countForPassword(/[0-9]/g)).to.gte(2)
          expect(countForPassword(/[!$\-+,.#@]/g)).to.gte(1)
        })
      })
  })
  it("should not have collisions (ideally)", () => {
    const passwords = []
    let service = getRandom.string(1, 32)
    const masterpassword = getRandom.string(1, 32)
    const passwordLength = getRandom.int(6, 64)
    cy.get("#service").type(service)
    cy.get("#masterpassword").type(masterpassword)
    cy.get("#passwordlength").clear().type(passwordLength)
    cy.get("[name=showpassword]")
      .click()
      .then(() => {
        cy.wait(1000).then(() => {
          passwords.push(stub.getCall(0).args[0])
          expect(passwords.length).to.eq(1)
        })
      })
    service = getRandom.string(1, 32)
    cy.get("#service").type(service)
    cy.get("#masterpassword").type(masterpassword)
    cy.get("[name=showpassword]")
      .click()
      .then(() => {
        cy.wait(1000).then(() => {
          passwords.push(stub.getCall(1).args[0])
          expect(passwords.length).to.eq(2)
          expect(passwords[0]).to.not.equal(passwords[1])
        })
      })
  })
  it("should produce different hashes for case sensitive and insensitive strategies", () => {
    cy.get("#passwordlength").clear().type(6)
    cy.get("#service").type("Service")
    cy.get("#masterpassword").type("salt")
    cy.get("#casesensitive").click()
    cy.get("[name=showpassword]")
      .click()
      .then(() => {
        cy.wait(1000).then(() => {
          expect(stub.getCall(0)).to.be.calledWith("THkT33")
        })
      })

    cy.get("#service").type("Service")
    cy.get("#masterpassword").type("salt")
    cy.get("[name=showpassword]")
      .click()
      .then(() => {
        cy.wait(1000).then(() => {
          expect(stub.getCall(1)).to.be.calledWith("9Kb6vH")
        })
      })
  })
  it("should contain a link to the repository with documentation", () => {
    cy.contains("a", "GitHub").should(
      "have.attr",
      "href",
      "https://github.com/tatomyr/lordofpasswords#lord-of-passwords"
    )
  })
})
