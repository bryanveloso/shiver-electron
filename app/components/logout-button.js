import React from 'react';
import TwitchAPI from '../twitch-api';

const LogoutButton = React.createClass({
  handleClick(event) {
    event.preventDefault();
    TwitchAPI.logout();
  },
  render() {
    return <button onClick={this.handleClick}>Logout</button>
  }
});

export default LogoutButton;