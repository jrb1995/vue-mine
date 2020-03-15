const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  devServer: {
    contentBase: './dist'
  },
  entry: './src/index.js',
  devtool: 'inline-source-map',
  plugins: [
    new CleanWebpackPlugin({}),
    new HtmlWebpackPlugin({
      title: 'vue'
    })
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'vue.mine.js'
  }
};