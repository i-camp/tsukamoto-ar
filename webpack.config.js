var webpack = require('webpack');
var path    = require('path');

module.exports = {
  entry: [
    './src/main.js',
  ],
  output: {
    path: path.resolve(__dirname, './'),
    publicPath: '/',
    filename: 'index.js'
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
    // new webpack.optimize.UglifyJsPlugin({
    //   debug: false,
    //   minimize: true,
    //   output: {
    //     comments: false
    //   },
    //   compressor: {
    //     warnings: false
    //   }
    // }),
  ]
}