/* eslint no-console: 0 */

require('dotenv').config({ silent: true });

import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';

import http from 'http';
const logger = require('morgan');
import path from 'path';

import config from './webpack.config.development';
import router from './config/routes';
import passport from './config/passport';

const app = express();
const compiler = webpack(config);
const PORT = 3030;


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cookieSession({ secret: 'shiver' }));

app.use(passport.initialize());
app.use(passport.session());

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true
  }
}));

app.use(webpackHotMiddleware(compiler));
app.use(router);

app.listen(PORT, 'localhost', err => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(`Listening at http://localhost:${PORT}`);
});

