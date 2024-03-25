// Define constants
const NUMBERS = "0123456789"
const UPPERCASED = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const LOWERCASED = "abcdefghijklmnopqrstuvwxyz"
const SPECIALS = "!$-+,.#@"
const STANDARD_CHARSET = `${NUMBERS}${UPPERCASED}${LOWERCASED}`
const EXTENDED_CHARSET = `${STANDARD_CHARSET}${SPECIALS}`

const pickChar = (charset) => (code) => charset[code % charset.length]

// Hashing algorithm
const pw3 = (service_, salt_, pwLength, special) => {
  const pwChar = pickChar(special ? EXTENDED_CHARSET : STANDARD_CHARSET)
  let service = service_.toString()
  if (service.length === 1) {
    service += pwChar(service.charCodeAt())
  }
  let salt = salt_.toString()
  if (
    !((salt.length + 1) % service.length && service.length % (salt.length + 1))
  ) {
    salt += pwChar(salt.length + service.length)
  }
  let sum = 0
  for (let j = 0; j < service.length; j++) {
    sum += service.charCodeAt(j)
  }
  for (let k = 0; k < salt.length; k++) {
    sum += salt.charCodeAt(k)
  }
  const jOffset = sum % service.length
  const kOffset = sum % (salt.length + 1)
  const pwArr = []
  for (
    let i = 0;
    !(i >= pwLength && i >= service.length && i >= salt.length + 1);
    i++
  ) {
    const innerSalt = salt + pwChar(i)
    // Service & salt offsets:
    const j = (i + jOffset) % service.length
    const k = (i + kOffset) % innerSalt.length
    // eslint-disable-next-line max-len
    pwArr[i % pwLength] =
      (pwArr[i % pwLength] || 0) +
      i +
      service.charCodeAt(j) ** 2 +
      innerSalt.charCodeAt(k) ** 2
  }
  const password = pwArr.reduce((prev, item) => prev + pwChar(item), "")
  return password
}

const testFor = (char) => (charsArray) =>
  charsArray.indexOf(char) === -1 ? 0 : 1

// Rehashing password to match needed conditions
export const getRecurrPw = (
  {service = "", salt = "", pwLength = 0, special = false},
  callback
) => {
  const password = pw3(service, salt, pwLength, special)
  let upperCasedCount = 0
  let lowerCasedCount = 0
  let numbersCount = 0
  let specialsCount = 0
  for (let index = 0; index < password.length; index++) {
    const testIn = testFor(password[index])
    numbersCount += testIn(NUMBERS)
    upperCasedCount += testIn(UPPERCASED)
    lowerCasedCount += testIn(LOWERCASED)
    specialsCount += testIn(SPECIALS)
  }

  const goodPassword =
    numbersCount >= 2 &&
    upperCasedCount >= 1 &&
    lowerCasedCount >= 1 &&
    (!special || specialsCount >= 1)

  return goodPassword
    ? callback(password)
    : getRecurrPw(
        {
          service: password,
          salt,
          pwLength,
          special,
        },
        callback
      )
}

export const inputAdapter = ({
  passwordlength: {value: passwordLength},
  service: {value: service},
  masterpassword: {value: masterpassword},
  special: {checked: special},
}) => ({
  pwLength: +passwordLength,
  service,
  salt: masterpassword,
  special,
})
