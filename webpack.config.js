const path = require('path');

const clientDir = path.join(__dirname, 'app/client');

module.exports = {
  context: clientDir,

  entry: {
    local: './local-todo/main.js',
    user: './user-todo/main.js'
  },

  output: {
    path: clientDir,
    filename: './dist/[name].bundle.js',
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

  //devServer: {
    //publicPath: 'http://localhost:9000/dist/',
    //port: 9000,
    //proxy: {
      ////'/': 'http://localhost:5000'
      //'/': {
        //target: 'http://localhost:5000',
        //bypass: function(req) {
          //if (req.path.indexOf('/dist') !== -1) {
            //console.log(req.path);
            //return '/';
          //}
        //}
      //}
    //},
    //historyApiFallback: true,
    ////noInfo: true,
    //stats: 'errors-only',
  //}
};
