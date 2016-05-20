import React, { PropTypes } from 'react';

const Greeter = React.createClass({
	propTypes: {
		display_name: PropTypes.string.isRequired,
		logo: PropTypes.string.isRequired
	},
	render() {
		return (
		<div>
			<h1>Hi {this.props.display_name}!</h1>
			<img src={this.props.logo}/>
		</div>);
	}
});

export default Greeter;

