require('../config/env')
const paths = require('../config/paths')
const config = require('../config/config')

module.exports = {
  entry: [require.resolve('../config/polyfills'), paths.appIndexJs],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: config.cssUse('DEV'),
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]'
        }
      },
    ],
  },
  resolve: config.resolve,
}
