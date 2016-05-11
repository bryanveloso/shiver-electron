import initialState from '../initial-state';
import { ActionTypes } from '../actions/user';


export default function user(state = initialState.user, action) {
  switch (action.type) {
    case ActionTypes.LOGGED_IN:
      return action.user;
    case ActionTypes.LOGGED_OUT:
      return null;
    default:
      return state;
  }
}