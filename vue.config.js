const generateToken = require('./lib/generate-token')
const getCommitHash = require('./lib/get-commit-hash')

Object.assign(process.env, {
  VUE_APP_BUILD_ID: generateToken(),
  VUE_APP_COMMIT: getCommitHash()
})

module.exports = {
  chainWebpack(config) {
    config.module
      .rule('markdown')
        .test(/\.md$/)
        .use('html')
          .loader('html-loader')
          .end()
        .use('markdown')
          .loader('markdown-loader')
          .end()
  },
  devServer: {
    proxy: {
      '^/api': {
        target: process.env.DEV_API_SERVER,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  }
}
