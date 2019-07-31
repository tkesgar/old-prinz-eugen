const getCommitHash = require('./lib/get-commit-hash')

Object.assign(process.env, {
  VUE_APP_COMMIT: getCommitHash()
})

module.exports = {
  chainWebpack (config) {
    config.resolve.alias
      .set('bootstrap-vue$', 'bootstrap-vue/src/index.js')

    config.module
      .rule('markdown')
      .test(/\.md$/)
      .use('html')
      .loader('html-loader')
      .end()
      .use('markdown')
      .loader('markdown-loader')
      .end()
  }
}
