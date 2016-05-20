import React from 'react';

import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';
import configureStore from './store/configureStore';
import './app.global.css';

import initialState from './initial-state';
import TwitchAPI from './twitch-api';

const store = configureStore(initialState);
const history = syncHistoryWithStore(hashHistory, store);

TwitchAPI.init(store);

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('app')
);

