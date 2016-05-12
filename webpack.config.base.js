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
  node: {
	__dirname: true
  },
  plugins: [
	  new webpack.DefinePlugin({
		  'global.GENTLY': false,
		  'process.env': {
			  TWITCH_CLIENT_ID: process.env.TWITCH_CLIENT_ID,
			  TWITCH_CLIENT_SECRET: process.env.TWITCH_CLIENT_SECRET
		  }
	  })
  ],
  externals: [
    // put your node 3rd party libraries which can't be built with webpack here
    // (mysql, mongodb, and so on..)
  ]
};
