var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',

  entry: [
    './components/index'
  ],
  module: {
    loaders: [
      { test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel'] },
      { test: /\.scss$/,
        exclude: /node_modules/,
        loaders: ['style', 'css', 'postcss-loader', 'sass?outputStyle=expanded'] },
      { test: /\.(eot|woff|woff2|ttf|otf|mp3|wav|ogg)/,
        loader: 'file' }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  output: {
    path: path.join(__dirname, 'public'),
    publicPath: '/public/',
    filename: 'bundle.js'
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
}
