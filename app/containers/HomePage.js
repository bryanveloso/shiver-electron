import React from 'react';

const HomePage = React.createClass({
  render() {
    return (
      <div>
        <h1>Hello from Shiver!</h1>
		  <ul>
			  <li><a href="http://localhost:3000/auth/twitch">Login</a></li>
			  <li><a href="http://localhost:3000/logout">Logout</a></li>
		  </ul>
      </div>
    );
  }
});

export default HomePage;
