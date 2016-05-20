import keyMirror from 'keymirror';

export const ActionTypes = keyMirror({
  LOGGED_IN: null,
  LOGGED_OUT: null
});


// function asyncAction() {
//  return (dispatch, getState) => {
//    const { user } = getState();
//    const someAction = ???
//    dispatch(someAction);
//  };
//}

export const ActionCreators = {
  loggedIn: (user) => ({ type: ActionTypes.LOGGED_IN, user }),
  logout: () => ({ type: ActionTypes.LOGGED_OUT })
};
