import { LOGIN, USER_LOGOUT_SUCCESS } from '../action/userAction';

const INITIAL_STATE = {
  account: {
    access_token: '',
    refresh_token: '',
    username: '',
    image: '',
    role: '',
  },
  isAuthenticated: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      console.log('check action', action);
      return {
        ...state,
        account: {
          // Added colon here
          access_token: action?.payload?.DT?.access_token,
          refresh_token: action?.payload?.DT?.refresh_token,
          username: action?.payload?.DT?.username,
          image: action?.payload?.DT?.image,
          role: action?.payload?.DT?.role, // Fixed key for role
        },
        isAuthenticated: true,
      };

    case USER_LOGOUT_SUCCESS:
      return {
        ...state,
        account: {
          access_token: '',
          refresh_token: '',
          username: '',
          image: '',
          role: '',
        },
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default userReducer;
