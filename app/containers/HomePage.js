import React from 'react';
import request from 'superagent';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators as UserActions } from '../actions/user'
import Greeter from '../components/Greeter';

const { __BACKEND__ } = global;

function stateToProps(state) {
	return { user: state.user }
}

function dispatchToProps(dispatch) {
	return { actions: bindActionCreators(UserActions, dispatch) };
}

const HomePage = React.createClass({
  componentDidMount() {
	  request.get(`${__BACKEND__}/user`)
		  .end((err, resp) => {
			  if (err) {
				  throw new Error(err);
			  }
			  else {
				  if (resp.body.user) {
					  this.props.actions.loggedIn(resp.body.user);
				  }
				  else {
					  this.props.actions.logout();
				  }
			  }
		  });
  },
  getLoggedOutContent() {
    return (<a href={`${__BACKEND__}/auth/twitch`}>Login</a>);
  },
  getLoggedInContent() {
	return (<Greeter {...this.props.user}/>)
  },
  render() {
	const content = this.props.user ? this.getLoggedInContent() : this.getLoggedOutContent();
    return (
      <div>
        <h1>Hello from Shiver!</h1>
	    {content}
      </div>
    );
  }
});

export default connect(stateToProps, dispatchToProps)(HomePage);
