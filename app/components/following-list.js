import * as Immutable from 'immutable';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Twitch from 'twitch-sdk/twitch';
import { ActionCreators } from '../actions/followed-channels';

const notify = require('electron').remote.getCurrentWindow().notify;

const INTERVAL = 5000;

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
  },
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  },
  componentWillUnmount() {
    global.cancelAnimationFrame(this.loopId);
  },
  getInitialState() {
    return { loopId: null };
  },
  fetchItems(lastDrain) {
    return global.requestAnimationFrame(() => {
      if (Date.now() - lastDrain > INTERVAL) {
        Twitch.getStatus((err, status) => {
          if (err) {
            console.error(err);
            this.loopId = this.fetchItems(lastDrain);
          }
          else {
            if (status.authenticated) {
              Twitch.api({
                method: 'streams/followed',
                stream_type: 'live'
              }, (err, resp) => {
                if (err) {
                  console.error(err);
                  this.loopId = this.fetchItems(lastDrain);
                }
                else {
                  const chans = Immutable.Map(resp.streams.map(x => [x.channel._id, x.channel]));
                  if (Immutable.is(chans, this.props.items)) {
                    this.loopId = this.fetchItems(lastDrain);
                  }
                  else {
                    const additions = chans.keySeq().toSet().subtract(this.props.items.keySeq().toSet());
                    this.props.actions.followedChannelsUpdated(chans);

                    additions.map(k => notify(chans.get(k).status)));

                    this.loopId = this.fetchItems(Date.now());
                  }
                }
              });
            }
            else {
              this.loopId = this.fetchItems(lastDrain);
            }
          }
        });
      }
      else {
        this.loopId = this.fetchItems(lastDrain);
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
      <h3>Followed Channels</h3>
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
