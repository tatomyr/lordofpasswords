function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function getRandomString(min, max) {
  var n = getRandomInt(min, max)
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890 !@#$%^&*()_+=-\'"\\/?:;[]()<>'
  var text = ''
  for (var i = 0; i < n; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  return text
}

module.exports = { int: getRandomInt, string: getRandomString }
