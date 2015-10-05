var ExtractTextPlugin = require('extract-text-webpack-plugin');

var isProd = process.env.NODE_ENV === 'production';

module.exports = {
  entry: './src/js/index.js',
  output: {
    path: __dirname + '/build/',
    publicPath: '/build/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: isProd ? ['babel-loader'] : ['react-hot', 'babel-loader']
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css')
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('style.css')
  ]
};
