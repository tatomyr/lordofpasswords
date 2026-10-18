import {test, expect} from "@playwright/test"
import {getRecurrPw} from "../app.js"

const generate = input => {
  let result
  getRecurrPw(input, password => {
    result = password
  })
  return result
}

const countOf = (password, re) => (password.match(re) || []).length

test.describe("getRecurrPw", () => {
  test("generates a password of length 6 with the standard charset", () => {
    expect(generate({service: "service", salt: "salt", pwLength: 6})).toBe(
      "9Kb6vH"
    )
  })
  test("generates a password of length 6 with special characters", () => {
    expect(
      generate({service: "service", salt: "salt", pwLength: 6, special: true})
    ).toBe("6Bt$70")
  })
  test("generates a password for a case sensitive service", () => {
    expect(generate({service: "Service", salt: "salt", pwLength: 6})).toBe(
      "THkT33"
    )
  })
  test("generates a password for a one-character service", () => {
    expect(generate({service: "a", salt: "b", pwLength: 6})).toBe("XqW21e")
  })
  test("generates a password of length 64", () => {
    expect(generate({service: "service", salt: "salt", pwLength: 64})).toBe(
      "hdKngDUPZiv4mQna6e0A8BQ22DYH7oYQrUfkCtMF03y8HZdLzMqfDZj0kzbbh7qg"
    )
  })
  test("generates a password of length 10 for a case sensitive service", () => {
    expect(generate({service: "Service", salt: "salt", pwLength: 10})).toBe(
      "IDtJ7sA3RU"
    )
  })
  test("generates a password for a long service name and a long masterpassword", () => {
    expect(
      generate({
        service: "a very long service name",
        salt: "a long master password",
        pwLength: 32,
      })
    ).toBe("eKjmjEz9KnI03a7NkXQlojPGd94ZEkvG")
  })
  test("generates a password for service aEJ--O and masterpassword *D6hR", () => {
    expect(generate({service: "aEJ--O", salt: "*D6hR", pwLength: 6})).toBe(
      "A5Zf8U"
    )
  })
  test(`
    passes the special "long" case for
    service aEJ--O
    masterpassword *D6hR
    length 6
    using special characters
  `, () => {
    expect(
      generate({service: "aEJ--O", salt: "*D6hR", pwLength: 6, special: true})
    ).toBe("8u@0CK")
  })
  test("contains the required number of symbols of each type at the minimal length", () => {
    const password = generate({service: "service", salt: "salt", pwLength: 4})
    expect(password).toHaveLength(4)
    expect(countOf(password, /[0-9]/g)).toBeGreaterThanOrEqual(2)
    expect(countOf(password, /[A-Z]/g)).toBeGreaterThanOrEqual(1)
    expect(countOf(password, /[a-z]/g)).toBeGreaterThanOrEqual(1)
  })
  test("contains a special character at the minimal length with special characters", () => {
    const password = generate({
      service: "service",
      salt: "salt",
      pwLength: 5,
      special: true,
    })
    expect(password).toHaveLength(5)
    expect(countOf(password, /[0-9]/g)).toBeGreaterThanOrEqual(2)
    expect(countOf(password, /[A-Z]/g)).toBeGreaterThanOrEqual(1)
    expect(countOf(password, /[a-z]/g)).toBeGreaterThanOrEqual(1)
    expect(countOf(password, /[!$\-+,.#@]/g)).toBeGreaterThanOrEqual(1)
  })
  test("throws on an empty service name", () => {
    expect(() => generate({service: "", salt: "salt", pwLength: 6})).toThrow(
      "The service name must be a non-empty string."
    )
  })
  test("throws on an empty masterpassword", () => {
    expect(() => generate({service: "service", salt: "", pwLength: 6})).toThrow(
      "The masterpassword must be a non-empty string."
    )
  })
  test("throws on a missing password length", () => {
    expect(() => generate({service: "service", salt: "salt"})).toThrow(
      "The password length must be an integer of at least 4, got undefined."
    )
  })
  test("throws on a password length below the minimum", () => {
    expect(() =>
      generate({service: "service", salt: "salt", pwLength: 3})
    ).toThrow("The password length must be an integer of at least 4, got 3.")
  })
  test("throws on a password length below the minimum with special characters", () => {
    expect(() =>
      generate({service: "service", salt: "salt", pwLength: 4, special: true})
    ).toThrow("The password length must be an integer of at least 5, got 4.")
  })
})
