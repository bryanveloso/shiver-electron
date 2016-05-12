import React from 'react';
import request from 'superagent';

const { __BACKEND__ } = global;

const HomePage = React.createClass({
  componentDidMount() {
	  request.get(`${__BACKEND__}/user`)
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
			  <li><a href={`${__BACKEND__}/auth/twitch`}>Login</a></li>
			  <li><a href={`${__BACKEND__}/logout`}>Logout</a></li>
		  </ul>
      </div>
    );
  }
});

export default HomePage;
