import React from 'react';

const HomePage = React.createClass({
  render() {
    return (
      <div>
        <h1>Hello from Shiver!</h1>
        <a href="http://localhost:3000/auth/twitch">Login</a>
      </div>
    );
  }
});

export default HomePage;
