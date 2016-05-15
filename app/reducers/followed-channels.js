import initialState from '../initial-state';
import { ActionTypes } from '../actions/followed-channels';


export default function user(state = initialState.followedChannels, action) {
  switch (action.type) {
    case ActionTypes.FOLLOWED_CHANS_UPDATED:
      return action.followedChannels;
    default:
      return state;
  }
}