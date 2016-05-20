import keyMirror from 'keymirror';

export const ActionTypes = keyMirror({
  FOLLOWED_CHANS_UPDATED: null
});

export const ActionCreators = {
  followedChannelsUpdated: (followedChannels) => ({ type: ActionTypes.FOLLOWED_CHANS_UPDATED, followedChannels })
};
