import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import user from './user';
console.log(user);
const rootReducer = combineReducers({
  user,
  routing
});

export default rootReducer;
