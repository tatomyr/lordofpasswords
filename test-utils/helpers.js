function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function getRandomString(min, max) {
  const n = getRandomInt(min, max)
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890 !@#$%^&*()_+=-'\"\\/?:;[]()<>"
  let text = ""
  for (let i = 0; i < n; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

function getRandomPlainString(min, max) {
  const n = getRandomInt(min, max)
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz "
  let text = ""
  for (let i = 0; i < n; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

export const getRandom = {
  int: getRandomInt,
  string: getRandomString,
  plainString: getRandomPlainString,
}

export const countOf = value => re => {
  const arr = value.match(re)
  return arr ? arr.length : 0
}
