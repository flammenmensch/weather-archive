const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env) => ({
  entry: {
    bundle: [
      'babel-polyfill',
      path.resolve(__dirname, 'src/index.js')
    ]
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  devtool: "source-map",
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new CopyPlugin([
      { context: 'public', from: '**/*' }
    ])
  ]
});
