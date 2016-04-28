'use strict';

// Electron modules.
const electron = require('electron');
const app = electron.app;  // Module to control application life.
const BrowserWindow = electron.BrowserWindow;  // Module to create native browser window.

// Express modules.
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const http = require('http');
const routes = require('./routes');
var server;

const expressApp = express();

// Listeners.
function onListening() {
  mainWindow.loadURL('http://127.0.0.1:3030');
}

// Report crashes to our server.
require('crash-reporter').start();

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

  // Express middleware and default options.
  expressApp.use(bodyParser.json());
  expressApp.use(bodyParser.urlencoded({ extended: true }));
  expressApp.use(cookieParser());
  expressApp.use(cookieSession({ secret: 'synthformauthentication' }));
  expressApp.use('/', routes);
  expressApp.set('port', process.env.PORT || '3030');

  // Open the devtools.
  mainWindow.openDevTools();

  // Spawn the server.
  const server = http.createServer(expressApp);
  server.listen(3030);
  // server.on('error', onError);
  server.on('listening', onListening);

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    mainWindow = null;
    server.close();
  });
});
