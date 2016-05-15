import React from 'react';
import Twitch from 'twitch-sdk/twitch'

const scope = [
  'channel_feed_read',
  'channel_read',
  'chat_login',
  'user_follows_edit',
  'user_read',
  'user_subscriptions'
];

const LoginButton = React.createClass({
  handleClick(event) {
    event.preventDefault();
    Twitch.login({
      scope,
      popup: false
    });
  },
  render() {
    return <button onClick={this.handleClick}>Login</button>
  }
});

export default LoginButton;