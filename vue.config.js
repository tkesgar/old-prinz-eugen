const generateToken = require('./lib/generate-token')
const getCommitHash = require('./lib/get-commit-hash')

Object.assign(process.env, {
  VUE_APP_BUILD_ID: generateToken(),
  VUE_APP_COMMIT: getCommitHash()
})

module.exports = { }
