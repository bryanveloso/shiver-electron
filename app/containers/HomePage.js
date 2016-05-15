import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ActionCreators as UserActions } from '../actions/user'
import Greeter from '../components/Greeter';
import LoginButton from '../components/login-button';
import LogoutButton from '../components/logout-button';

function stateToProps(state) {
	return { user: state.user }
}

function dispatchToProps(dispatch) {
	return { actions: bindActionCreators(UserActions, dispatch) };
}

const HomePage = React.createClass({
  componentDidMount() {
  },
  getLoggedOutContent() {
    return (<LoginButton/>);
  },
  getLoggedInContent() {
	return (
		<div>
			<LogoutButton/>
			<Greeter {...this.props.user}/>
		</div>)
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
