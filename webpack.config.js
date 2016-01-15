'use strict';
var webpack = require('webpack');

module.exports = {
  context: __dirname,
  entry: [
    // Add the client which connects to our middleware
    'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr',
    // useful if you run your app from another point like django
    //'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    // And then the actual application
    './public/js/app.js'
  ],
  output: {
    path: __dirname,
    publicPath: '/public/js/',
    filename: 'bundle.js'
  },
  devtool: '#source-map',
  module: {
      loaders: [
        { test: /\.css$/, exclude: /\.useable\.css$/, loader: "style!css" },
        { test: /\.useable\.css$/, loader: "style/useable!css" }
      ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
};
