import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ActionCreators as UserActions } from '../actions/user'
import Greeter from '../components/greeter';
import LoginButton from '../components/login-button';
import LogoutButton from '../components/logout-button';
import FollowingList from '../components/following-list';


function stateToProps(state) {
	return {
    user: state.user
  };
}

const HomePage = React.createClass({
  componentDidMount() {},
  getLoggedOutContent() {
    return (<LoginButton/>);
  },
  getLoggedInContent() {
	return (
		<div>
			<LogoutButton/>
			<Greeter {...this.props.user}/>
      <FollowingList/>
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

export default connect(stateToProps)(HomePage);
