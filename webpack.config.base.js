import webpack from 'webpack';
import path from 'path';
require('dotenv').config({ silent: true });

export default {
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel-loader'],
      exclude: /node_modules/
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main'],
    alias: {
      'superagent': 'superagent/lib/client'
    }
  },
  plugins: [
	  new webpack.DefinePlugin({
		  'global.GENTLY': false,
		  'global.TWITCH_CLIENT_ID': JSON.stringify(process.env.TWITCH_CLIENT_ID),
		  'global.TWITCH_CLIENT_SECRET': JSON.stringify(process.env.TWITCH_CLIENT_SECRET)

	  })
  ],
  node: {
    fs: 'empty',
    electron: 'empty'
  },
  externals: [
    // put your node 3rd party libraries which can't be built with webpack here
    // (mysql, mongodb, and so on..)
  ]
};
