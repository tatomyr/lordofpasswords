// eslint-disable-next-line no-unused-vars
const app = (() => {
  // Define constants
  const NUMBERS = '0123456789'
  const UPPERCASED = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const LOWERCASED = 'abcdefghijklmnopqrstuvwxyz'
  const SPECIALS = '!$-+,.#@'
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
    if (!((salt.length + 1) % service.length && service.length % (salt.length + 1))) {
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
    for (let i = 0; !(i >= pwLength && i >= service.length && i >= salt.length + 1); i++) {
      const innerSalt = salt + pwChar(i)
      // Service & salt offsets:
      const j = (i + jOffset) % service.length
      const k = (i + kOffset) % innerSalt.length
      // eslint-disable-next-line max-len
      pwArr[i % pwLength] = (pwArr[i % pwLength] || 0) + i + service.charCodeAt(j) ** 2 + innerSalt.charCodeAt(k) ** 2
    }
    const password = pwArr.reduce((prev, item) => prev + pwChar(item), '')
    return password
  }

  const testFor = char => charsArray => (charsArray.indexOf(char) === -1 ? 0 : 1)

  // Rehashing password to match needed conditions
  const getRecurrPw = ({
    service, salt, pwLength, special,
  }, callback) => {
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
    // FIXME: delete log
    console.log(password, ':::', upperCasedCount, lowerCasedCount, numbersCount, specialsCount)
    if (
      numbersCount >= 2
      && upperCasedCount >= 1
      && lowerCasedCount >= 1
      && (!special || specialsCount >= 1)
    ) {
      // this.setState({ displaySpinner: 'none' })
      return callback(password)
    }
    return getRecurrPw(
      {
        service: password,
        salt,
        pwLength,
        special,
      },
      callback
    )
  }

  const inputAdapter = ({
    length: { value: length },
    service: { value: service },
    masterpassword: { value: masterpassword },
    special: { checked: special },
  }) => ({
    pwLength: +length,
    service,
    salt: masterpassword,
    special,
  })

  // Define elements selectors
  const $element = {
    length: document.getElementById('length'),
    service: document.getElementById('service'),
    password: document.getElementById('password'),
    submitButton: document.getElementById('submit'),
    notification: document.getElementById('notification'),
    key: document.getElementById('key'),
  }

  const savePasswordLength = ({
    target: {
      length: { value },
    },
  }) => {
    localStorage.setItem('passwordLength', value)
  }

  const lengthReset = () => {
    if (+localStorage.passwordLength) {
      $element.length.value = +localStorage.passwordLength
    }
    $element.length.className = ''
  }

  const handleSubmit = e => {
    e.preventDefault()
    $element.key.className = 'generated'
    savePasswordLength(e)
    getRecurrPw(inputAdapter(e.target), password => {
      e.target.reset()
      lengthReset()
      $element.submitButton.className = 'hidden'
      $element.password.className = ''
      $element.password.value = password
      $element.password.select()
      if (document.execCommand('copy')) {
        $element.notification.className = 'visible'
        setTimeout(() => {
          $element.service.focus()
          $element.submitButton.className = ''
          $element.password.className = 'hidden'
          $element.password.value = ''
          $element.notification.className = ''
          $element.key.className = ''
        }, 1000)
      }
    })
  }

  // Startup initial settings
  // eslint-disable-next-line semi-style
  ;(function STARTUP() {
    lengthReset()
    $element.service.focus()
    setTimeout(() => {
      // Make notification element displayable
      // This is needed for some browsers that cashe the visible state…
      // …so we have to hide the notification element completely a first time
      $element.notification.className = ''
    })
  }())

  return {
    handleSubmit,
  }
})()
