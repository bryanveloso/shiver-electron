var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',

  entry: [
    'webpack-hot-middleware/client?http://localhost:3030',
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
    contentBase: './public',
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
