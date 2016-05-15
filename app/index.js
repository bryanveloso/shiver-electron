import React from 'react';
import Twitch from 'twitch-sdk/twitch';

import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';
import configureStore from './store/configureStore';
import './app.global.css';

import initialState from './initial-state';
import { ActionCreators as UserActions } from './actions/user';


const store = configureStore(initialState);
const history = syncHistoryWithStore(hashHistory, store);

function handleLogin() {
  Twitch.api({ method: 'user' }, (err, user) => {
    store.dispatch(UserActions.loggedIn(user));
  });
}

function handleLogout() {
  store.dispatch(UserActions.logout());
}

Twitch.events.addListener('auth.login', handleLogin);
Twitch.events.addListener('auth.logout', handleLogout);

Twitch.init(
    { clientId: global.TWITCH_CLIENT_ID, electron: true },
    (err, status) => {
      if (status.authenticated) {
        handleLogin();
      }
    });

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('app')
);
