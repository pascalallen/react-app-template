import { Dispatch } from 'redux';
import appActionTypes from '@/redux/appActionTypes';
import userActionTypes from '@/redux/user/userActionTypes';
import auth from '@/api/auth';

const login = (params: { email: string; password: string; remember_me: boolean }) => async (
  dispatch: Dispatch
): Promise<void> => {
  const res = await auth.login(params);

  if (!res.data) {
    throw new Error('Login failed!');
  }

  dispatch({
    type: userActionTypes.SET_USER,
    payload: {
      data: res.data
    }
  });
};

const logout = () => async (dispatch: Dispatch): Promise<void> => {
  try {
    await auth.logout();
  } finally {
    dispatch({ type: appActionTypes.APP_CLEAR_STATE });
  }
};

export default Object.freeze({
  login,
  logout,
});
