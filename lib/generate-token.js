const crypto = require('crypto')

function generateToken (length = 40, timestamp = true) {
  if (length < 16) {
    throw new Error('Cannot generate token with less than 16 characters')
  }

  let token = ''

  if (timestamp) {
    token += Date.now().toString(16)
  }

  const bytes = Math.ceil((length - token.length) / 2)
  token += crypto.randomBytes(bytes).toString('hex').slice(0, length - token.length)

  return token
}

module.exports = generateToken
