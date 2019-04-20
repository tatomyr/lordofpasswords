// Legacy password hash generator v0.2.0

function pwChar(code) {
  const pwCharSet =
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz' // 62 symbols
  return pwCharSet[code % pwCharSet.length]
}

function pw3(service_, salt_, pwLength) {
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
  /* // Mobile IE doesn't support this
  for (let item of service) {
    sum += item.charCodeAt();
  }
  for (let item of salt) {
    sum += item.charCodeAt();
  }
  /* */
  for (let j = 0; j < service.length; j++) {
    sum += service.charCodeAt(j)
  }
  for (let k = 0; k < salt.length; k++) {
    sum += salt.charCodeAt(k)
  }
  /* */

  const jOffset = sum % service.length
  const kOffset = sum % (salt.length + 1)

  // I don't know why, but Array(pwLength).fill(0) doesn't create an array properly
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

    pwArr[i % pwLength] =
      (pwArr[i % pwLength] || 0) +
      i +
      service.charCodeAt(j) ** 2 +
      innerSalt.charCodeAt(k) ** 2
  }

  const password = pwArr.reduce((prev, item) => prev + pwChar(item), '')
  return password
}

function getRecurrPw(service, salt, pwLength, callback) {
  const password = pw3(service, salt, pwLength)

  let upperCasedCount = 0
  let lowerCasedCount = 0
  let numbersCount = 0
  /* // Mobile IE doesn't support this
  for (let val of password) {
    numbersCount += !isNaN(+val) && 1 || 0;
    upperCasedCount += val.toUpperCase() === val && isNaN(+val) && 1 || 0;
    lowerCasedCount += val.toLowerCase() === val && isNaN(+val) && 1 || 0;
  }
  /* */
  for (let index = 0; index < password.length; index++) {
    const val = password[index]
    numbersCount += (!isNaN(+val) && 1) || 0
    upperCasedCount += (val.toUpperCase() === val && isNaN(+val) && 1) || 0
    lowerCasedCount += (val.toLowerCase() === val && isNaN(+val) && 1) || 0
  }
  /* */

  if (numbersCount >= 2 && upperCasedCount >= 1 && lowerCasedCount >= 1) {
    // this.setState({ displaySpinner: 'none' })
    return callback(password)
  }

  return getRecurrPw(password, salt, pwLength, callback)
}

module.exports = getRecurrPw
