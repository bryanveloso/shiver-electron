import React from 'react';
import Twitch from 'twitch-sdk/twitch'

const LogoutButton = React.createClass({
  handleClick(event) {
    event.preventDefault();
    Twitch.logout(() => {
      require('electron').remote.getCurrentWindow().clearStorage();
    });
  },
  render() {
    return <button onClick={this.handleClick}>Logout</button>
  }
});

export default LogoutButton;