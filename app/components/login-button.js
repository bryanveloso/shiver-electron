import React from 'react';
import TwitchAPI from '../twitch-api';

const LoginButton = React.createClass({
  handleClick(event) {
    event.preventDefault();
    TwitchAPI.login();
  },
  render() {
    return <button onClick={this.handleClick}>Login</button>
  }
});

export default LoginButton;