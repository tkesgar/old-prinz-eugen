const getCommitHash = require('./lib/get-commit-hash')

Object.assign(process.env, {
  VUE_APP_COMMIT: getCommitHash()
})

module.exports = {
  chainWebpack (config) {
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
  pwa: {
    name: 'CharaDB',
    themeColor: '#0080f0',
    msTileColor: '#000000'
  }
}
