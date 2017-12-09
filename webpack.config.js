var webpack = require('webpack');
var path    = require('path');

module.exports = {
  context: path.resolve(__dirname, "./src"),
  entry: {
    "index": './main.js',
    "score_board": './score_board.js',
  },
  output: {
    path: path.resolve(__dirname, './'),
    publicPath: '/',
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(js|html)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: 'svelte-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.html'],
    modules: [
      'node_modules',
      'src'
    ]
  },

  devServer: {
    contentBase: './',
    port: 3000
  },

  plugins: [
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      output: {
        comments: false
      },
      compressor: {
        warnings: false
      }
    }),
  ]
}
