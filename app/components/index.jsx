var React = require('react');
var ReactDom = require('react-dom');

var App = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Hello from Shiver!</h1>
        <a href="/auth/twitch">Login</a>
      </div>
    );
  }
});

ReactDom.render(<App/>, document.getElementById('app'));
