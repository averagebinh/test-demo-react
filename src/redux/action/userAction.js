export const LOGIN = 'LOGIN';
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';

export const doLogin = (data) => {
  return {
    type: LOGIN,
    payload: data,
  };
};

export const doLogout = () => {
  return {
    type: USER_LOGOUT_SUCCESS,
  };
};
