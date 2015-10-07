var ExtractTextPlugin = require('extract-text-webpack-plugin');
var StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
var webpack = require('webpack');

var postcssImport = require('postcss-import');
var autoprefixer = require('autoprefixer');
var postcssCustomProperties = require('postcss-custom-properties');

var isProduction = process.env.NODE_ENV === 'production';

var props = {
  isProduction: isProduction,
  date: new Date(),
  format: '%B %d, %Y - %H:%M:%S'
};

module.exports = {
  entry: './index.js',
  output: {
    path: __dirname,
    filename: 'bundle.js',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: isProduction ? ['babel?stage=0'] : ['react-hot', 'babel?stage=0']
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss')
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('bundle.css'),
    new webpack.NoErrorsPlugin(),
    new StaticSiteGeneratorPlugin('bundle.js', '', props)
  ],
  postcss: function() {
    return [
      postcssImport({
        onImport: function (files) {
            files.forEach(this.addDependency);
        }.bind(this)
      }),
      autoprefixer,
      postcssCustomProperties
    ];
  }
};

