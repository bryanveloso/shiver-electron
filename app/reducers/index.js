import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import followedChannels from './followed-channels';
import user from './user';

const rootReducer = combineReducers({
  followedChannels,
  routing,
  user
});

export default rootReducer;
