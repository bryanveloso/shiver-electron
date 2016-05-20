/* eslint no-console: 0 */

require('dotenv').config({ silent: true });

import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import http from 'http';
import path from 'path';

import config from './webpack.config.development';

const app = express();
const compiler = webpack(config);
const PORT = 3030;


app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true
  }
}));

app.use(webpackHotMiddleware(compiler));

app.listen(PORT, 'localhost', err => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(`Listening at http://localhost:${PORT}`);
});
