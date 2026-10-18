// Define constants
const NUMBERS = "0123456789"
const UPPERCASED = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const LOWERCASED = "abcdefghijklmnopqrstuvwxyz"
const SPECIALS = "!$-+,.#@"
const STANDARD_CHARSET = `${NUMBERS}${UPPERCASED}${LOWERCASED}`
const EXTENDED_CHARSET = `${STANDARD_CHARSET}${SPECIALS}`

const pickChar = charset => code => charset[code % charset.length]

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

// A good password has at least this many characters of each type
const REQUIREMENTS = [
  {charset: NUMBERS, min: 2},
  {charset: UPPERCASED, min: 1},
  {charset: LOWERCASED, min: 1},
]
const SPECIAL_REQUIREMENT = {charset: SPECIALS, min: 1}

const getRequirements = special =>
  special ? [...REQUIREMENTS, SPECIAL_REQUIREMENT] : REQUIREMENTS

const countChars = (password, charset) =>
  [...password].filter(char => charset.includes(char)).length

const isGoodPassword = (password, special) =>
  getRequirements(special).every(
    ({charset, min}) => countChars(password, charset) >= min
  )

const getMinLength = special => {
  let minLength = 0
  for (const {min} of getRequirements(special)) {
    minLength += min
  }
  return minLength
}

const validateInput = ({service, salt, pwLength, special}) => {
  if (typeof service !== "string" || service.length === 0) {
    throw new Error("The service name must be a non-empty string.")
  }
  if (typeof salt !== "string" || salt.length === 0) {
    throw new Error("The masterpassword must be a non-empty string.")
  }
  const minLength = getMinLength(special)
  if (!Number.isInteger(pwLength) || pwLength < minLength) {
    throw new Error(
      `The password length must be an integer of at least ${minLength}, got ${pwLength}.`
    )
  }
}

// Rehashing password to match needed conditions
const rehash = ({service, salt, pwLength, special = false}, callback) => {
  const password = pw3(service, salt, pwLength, special)
  return isGoodPassword(password, special)
    ? callback(password)
    : rehash({service: password, salt, pwLength, special}, callback)
}

export const getRecurrPw = (input, callback) => {
  validateInput(input)
  return rehash(input, callback)
}

export const inputAdapter = target => ({
  pwLength: +target.passwordlength.value,
  service: target.casesensitive.checked
    ? target.service.value
    : target.service.value.toLowerCase(),
  salt: target.masterpassword.value,
  special: target.special.checked,
})
