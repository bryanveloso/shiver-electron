import Twitch from 'twitch-sdk/twitch'
import * as Immutable from 'immutable'
import { ActionCreators as UserActions } from './actions/user';
const SESSION = global.localStorage;


const API = {
  init(store) {

    const handleLogin = () => {
      Twitch.getStatus((err, status) => {
        Object.assign(SESSION, status);
      });
      Twitch.api({ method: 'user' }, (err, user) => {
        store.dispatch(UserActions.loggedIn(user));
      });
    };


    Twitch.events.addListener('auth.login', handleLogin);
    Twitch.events.addListener('auth.logout', () => store.dispatch(UserActions.logout()));

    Twitch.init(
        {
          clientId: global.TWITCH_CLIENT_ID,
          electron: true,
          session: SESSION
        },
        (err, status) => {
          console.log(status);
          if (status.authenticated) {
            handleLogin();
          }
        });
  },

  login() {

    const scope = [
      'channel_feed_read',
      'channel_read',
      'chat_login',
      'user_follows_edit',
      'user_read',
      'user_subscriptions'
    ];

    Twitch.login({
      scope,
      popup: false
    });
  },
  logout() {
    Twitch.logout(() => {
      require('electron').remote.getCurrentWindow().clearStorage();
    });
  },
  getLiveChannels() {
    // TODO: do we want to test for auth status first?
    return new Promise((resolve, reject) => {
      Twitch.api({ method: 'streams/followed', stream_type: 'live' }, (err, resp) => {
        if (err) {
          reject(err);
        }

        const chans = Immutable.Map(resp.streams.map(x => [x.channel._id, x.channel]));
        resolve(chans);
      });
    });
  }
};

export default API;
