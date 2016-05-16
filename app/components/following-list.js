import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Twitch from 'twitch-sdk/twitch';
import { ActionCreators } from '../actions/followed-channels';


function stateToProps(state) {
  return {
    items: state.followedChannels,
    user: state.user
  };
}


function dispatchToProps(dispatch) {
  return { actions: bindActionCreators(ActionCreators, dispatch) };
}


const FollowingList = React.createClass({
  mixins: [PureRenderMixin],
  propTypes: {
    items: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired
  },
  componentDidMount() {
    if(this.props.user) {
      this.fetchItems();
    }
  },
  componentWillReceiveProps(nextProps) {
    if (nextProps.user && nextProps.user !== this.props.user) {
      this.fetchItems();
    }
  },
  fetchItems() {
    Twitch.api({ method: 'streams/followed', stream_type: 'live' }, (err, resp) => {
      this.props.actions.followedChannelsUpdated(resp.streams.map(x => x.channel));
    });
  },
  formatChannel(channel) {
    return (<dl>
      <dt>Title</dt>
      <dd>{channel.status}</dd>
      <dt>Game</dt>
      <dd>{channel.game}</dd>
      <dt>Who</dt>
      <dd>{channel.display_name}</dd>
    </dl>);
  },
  render() {
    return (
    <div>
      <h3>Followed Channels</h3>
      <button onClick={this.fetchItems}>refresh</button>
      {this.props.items.length ?
          (<ul>
            {this.props.items.map(x => <li key={x._id}>{this.formatChannel(x)}</li>)}
          </ul>) :
          (<p>No channels found</p>)
      }
    </div>);
  }
});

export default connect(stateToProps, dispatchToProps)(FollowingList);
