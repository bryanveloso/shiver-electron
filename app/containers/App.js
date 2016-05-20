import React, { PropTypes } from 'react';


const App = React.createClass({
  propTypes: {
    children: PropTypes.element.isRequired
  },
  render() {
    return (
      <div>
        {this.props.children}
        {
          (() => {
            if (process.env.NODE_ENV !== 'production') {
              const DevTools = require('./DevTools');
              return <DevTools />;
            }
          })()
        }
      </div>
    );
  }
});

export default App;
