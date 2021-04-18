module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/SYNTHER/' : '/',
  devServer: {
    proxy: {
      '/token': {
        target: 'https://account.kkbox.com/oauth2/token',
        ws: true,
        changeOrigin: true
      }
    }
  }
}
