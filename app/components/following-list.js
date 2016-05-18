import * as Immutable from 'immutable';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import TwitchAPI from '../twitch-api';
import { ActionCreators } from '../actions/followed-channels';


const INTERVAL = 15000;

function stateToProps(state) {
  return {
    items: state.followedChannels
  };
}


function dispatchToProps(dispatch) {
  return { actions: bindActionCreators(ActionCreators, dispatch) };
}


const FollowingList = React.createClass({
  mixins: [PureRenderMixin],
  propTypes: {
    items: PropTypes.instanceOf(Immutable.Map).isRequired
  },
  componentDidMount() {
    this.loopId = this.fetchItems(0);
    console.info('fetch loop started');
  },
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    // TODO: can compare the item lists here to create notifications/alerts
  },
  componentWillUnmount() {
    global.cancelAnimationFrame(this.loopId);
    console.info('fetch loop stopped');
  },
  fetchItems(lastFetch) {
    return global.requestAnimationFrame(() => {
      if (Date.now() - lastFetch > INTERVAL) {
        console.debug('tick...');
        TwitchAPI.getLiveChannels().then(channels => {
          if (!Immutable.is(channels.keySeq(), this.props.items.keySeq())) {
            this.props.actions.followedChannelsUpdated(channels);
          }
          this.loopId = this.fetchItems(Date.now());
        }).catch((reason) => {
          console.error(reason);
          this.loopId = this.fetchItems(lastFetch);
        });
      }
      else {
        this.loopId = this.fetchItems(lastFetch);
      }
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
      <h3>Followed Channels ({this.props.items.size})</h3>
      {this.props.items.size ?
          (<ul>
            {this.props.items.toList().map(x => <li key={x._id}>{this.formatChannel(x)}</li>)}
          </ul>) :
          (<p>No channels found</p>)
      }
    </div>);
  }
});

export default connect(stateToProps, dispatchToProps)(FollowingList);
