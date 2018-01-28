const webpack = require('webpack');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'dist');
const SRC_DIR = path.resolve(__dirname, 'src');

module.exports = {
  entry: `${SRC_DIR}/index.js`,
  // output: {
  //   path: BUILD_DIR,
  //   filename: 'main.js',
  // },
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js?/,
        use: ['babel-loader'],
      },
    ],
  },
};
