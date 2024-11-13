export const LOGIN = 'LOGIN';
export const doLogin = (data) => {
  return {
    type: LOGIN,
    payload: data,
  };
};
