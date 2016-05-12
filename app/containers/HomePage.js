import React from 'react';
import request from 'superagent';


const HomePage = React.createClass({
  componentDidMount() {
	  request.get('http://localhost:3000/user')
		  .end((err, resp) => {
			  if (err) {
				  throw new Error(err);
			  }
			  else {
				  console.log(resp.body);
			  }
		  });
  },
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
