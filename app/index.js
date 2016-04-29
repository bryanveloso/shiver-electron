'use strict';

// Environment loading.
const dotenv = require('dotenv').config({ silent: true });

// Electron modules.
const electron = require('electron');
const app = electron.app;  // Module to control application life.
const BrowserWindow = electron.BrowserWindow;  // Module to create native browser window.

// Express modules.
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const express = require('express');
const handlebars  = require('express-handlebars');
const http = require('http');
const logger = require('morgan');
const passport = require('passport');
const path = require('path');

var server;
const expressApp = express();
const port = process.env.PORT || '3030';

// Listeners.
function onListening() {
  mainWindow.loadURL('http://localhost:3030');
}

// Report crashes to our server.
// require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window
// will be closed automatically when the javascript object is GCed.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has done everything
// initialization and ready for creating browser windows.
app.on('ready', function() {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600});

  require('./config/passport')(passport);

  // View engine configuration.
  expressApp.engine('handlebars', handlebars());
  expressApp.set('views', path.join(__dirname, 'views'));
  expressApp.set('view engine', 'handlebars');

  // Express middleware and default options.
  expressApp.use(logger('dev'));
  expressApp.use(bodyParser.json());
  expressApp.use(bodyParser.urlencoded({ extended: true }));
  expressApp.use(cookieParser());
  expressApp.use(cookieSession({ secret: 'shiver' }));
  expressApp.use(passport.initialize());
  expressApp.use(passport.session());
  expressApp.set('port', port);

  require('./routes')(expressApp, passport);

  // Open the devtools.
  mainWindow.openDevTools();

  // Spawn the server.
  const server = http.createServer(expressApp);
  server.listen(port);
  // server.on('error', onError);
  server.on('listening', onListening);

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    mainWindow = null;
    server.close();
  });
});
