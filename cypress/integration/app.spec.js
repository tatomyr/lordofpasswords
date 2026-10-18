/* eslint-disable no-undef */
import {getRecurrPw} from "../../app.js"

const generate = input => {
  let result
  getRecurrPw(input, password => {
    result = password
  })
  return result
}

const countOf = (password, re) => (password.match(re) || []).length

describe("getRecurrPw", () => {
  it("generates a password of length 6 with the standard charset", () => {
    expect(generate({service: "service", salt: "salt", pwLength: 6})).to.equal(
      "9Kb6vH"
    )
  })
  it("generates a password of length 6 with special characters", () => {
    expect(
      generate({service: "service", salt: "salt", pwLength: 6, special: true})
    ).to.equal("6Bt$70")
  })
  it("generates a password for a case sensitive service", () => {
    expect(generate({service: "Service", salt: "salt", pwLength: 6})).to.equal(
      "THkT33"
    )
  })
  it("generates a password for a one-character service", () => {
    expect(generate({service: "a", salt: "b", pwLength: 6})).to.equal("XqW21e")
  })
  it("generates a password of length 64", () => {
    expect(generate({service: "service", salt: "salt", pwLength: 64})).to.equal(
      "hdKngDUPZiv4mQna6e0A8BQ22DYH7oYQrUfkCtMF03y8HZdLzMqfDZj0kzbbh7qg"
    )
  })
  it("generates a password of length 10 for a case sensitive service", () => {
    expect(generate({service: "Service", salt: "salt", pwLength: 10})).to.equal(
      "IDtJ7sA3RU"
    )
  })
  it("generates a password for a long service name and a long masterpassword", () => {
    expect(
      generate({
        service: "a very long service name",
        salt: "a long master password",
        pwLength: 32,
      })
    ).to.equal("eKjmjEz9KnI03a7NkXQlojPGd94ZEkvG")
  })
  it("generates a password for service aEJ--O and masterpassword *D6hR", () => {
    expect(generate({service: "aEJ--O", salt: "*D6hR", pwLength: 6})).to.equal(
      "A5Zf8U"
    )
  })
  it(`
    passes the special "long" case for
    service aEJ--O
    masterpassword *D6hR
    length 6
    using special characters
  `, () => {
    expect(
      generate({service: "aEJ--O", salt: "*D6hR", pwLength: 6, special: true})
    ).to.equal("8u@0CK")
  })
  it("contains the required number of symbols of each type at the minimal length", () => {
    const password = generate({service: "service", salt: "salt", pwLength: 4})
    expect(password).to.have.length(4)
    expect(countOf(password, /[0-9]/g)).to.gte(2)
    expect(countOf(password, /[A-Z]/g)).to.gte(1)
    expect(countOf(password, /[a-z]/g)).to.gte(1)
  })
  it("contains a special character at the minimal length with special characters", () => {
    const password = generate({
      service: "service",
      salt: "salt",
      pwLength: 5,
      special: true,
    })
    expect(password).to.have.length(5)
    expect(countOf(password, /[0-9]/g)).to.gte(2)
    expect(countOf(password, /[A-Z]/g)).to.gte(1)
    expect(countOf(password, /[a-z]/g)).to.gte(1)
    expect(countOf(password, /[!$\-+,.#@]/g)).to.gte(1)
  })
  it("throws on an empty service name", () => {
    expect(() => generate({service: "", salt: "salt", pwLength: 6})).to.throw(
      "The service name must be a non-empty string."
    )
  })
  it("throws on an empty masterpassword", () => {
    expect(() =>
      generate({service: "service", salt: "", pwLength: 6})
    ).to.throw("The masterpassword must be a non-empty string.")
  })
  it("throws on a missing password length", () => {
    expect(() => generate({service: "service", salt: "salt"})).to.throw(
      "The password length must be an integer of at least 4, got undefined."
    )
  })
  it("throws on a password length below the minimum", () => {
    expect(() =>
      generate({service: "service", salt: "salt", pwLength: 3})
    ).to.throw("The password length must be an integer of at least 4, got 3.")
  })
  it("throws on a password length below the minimum with special characters", () => {
    expect(() =>
      generate({service: "service", salt: "salt", pwLength: 4, special: true})
    ).to.throw("The password length must be an integer of at least 5, got 4.")
  })
})
