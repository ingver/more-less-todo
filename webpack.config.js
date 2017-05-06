const path = require('path');
const Webpack = require('webpack');

const clientDir = path.join(__dirname, 'app/client');

module.exports = {
  context: clientDir,

  entry: {
    local: './local-todo/main.js',
    user: './user-todo/main.js'
  },

  output: {
    path: path.join(clientDir, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/dist/'
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/
      }
    ]
  },

  devServer: {
    contentBase: path.join(__dirname, 'app/client/dist'),
    port: 9000,
    hot: true,
    noInfo: true,
    overlay: true,
    proxy: {
      '/': { target: 'http://localhost:5000' }
    },
  },

  devtool: 'cheap-eval-sourcemaps',

  plugins: [
    new Webpack.HotModuleReplacementPlugin()
  ]

};
