/* eslint-disable no-undef */
describe("Modern Password Generator", () => {
  let stub
  beforeEach(() => {
    cy.visit("/")
    stub = cy.stub()
    cy.on("window:alert", stub)
  })
  it("passes all the flow", () => {
    cy.get("#passwordlength").clear().type(6)
    cy.get("#service").type("Service")
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
  it("passes the case sensitive flow", () => {
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
  })
  it("steps the password length up from 0 to the minimal length 6", () => {
    cy.get("#service").type("service")
    cy.get("#masterpassword").type("salt")
    cy.get("#passwordlength")
      .clear()
      .type(0)
      .type("{uparrow}")
      .should("have.value", "6")
    cy.get("#special").click()
    cy.get("[name=showpassword]")
      .click()
      .then(() => {
        cy.wait(1000).then(() => {
          expect(stub.getCall(0)).to.be.calledWith("6Bt$70")
        })
      })
  })
  it("contains a link to the repository with documentation", () => {
    cy.contains("a", "GitHub").should(
      "have.attr",
      "href",
      "https://github.com/tatomyr/lordofpasswords#lord-of-passwords"
    )
  })
})

describe("Copy password to clipboard", () => {
  it("shows a notification after the password is copied", () => {
    cy.visit("/", {
      onBeforeLoad(win) {
        cy.stub(win.navigator.clipboard, "writeText").resolves()
      },
    })
    cy.get("#passwordlength").clear().type(6)
    cy.get("#service").type("service")
    cy.get("#masterpassword").type("salt")
    cy.get("[name=copypassword]").click()
    cy.contains(".notification", "Copied to clipboard")
  })
  it("shows a prompt with the password when the clipboard write fails", () => {
    let prompt
    cy.visit("/", {
      onBeforeLoad(win) {
        cy.stub(win.navigator.clipboard, "writeText").rejects(new Error())
        prompt = cy.stub(win, "prompt")
      },
    })
    cy.get("#passwordlength").clear().type(6)
    cy.get("#service").type("service")
    cy.get("#masterpassword").type("salt")
    cy.get("[name=copypassword]").click()
    cy.wrap(null).then(() => {
      expect(prompt).to.be.calledWith(
        "Could not copy the password. Please do it manually:",
        "9Kb6vH"
      )
    })
  })
})
