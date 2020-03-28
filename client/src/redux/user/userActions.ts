import moment from 'moment';
import { Dispatch } from 'redux';
import appActionTypes from '@/redux/appActionTypes';
import userActionTypes from '@/redux/user/userActionTypes';
import institutionActionTypes from '@/redux/institution/institutionActionTypes';
import authApi from '@/api/authApi';
import userHelper from '@/lib/helpers/userHelper';
import errorHelper from '@/lib/helpers/errorHelper';
import { appErrorMessages } from '@/constants/errors';

const login = (params: { email: string; password: string; remember_me: boolean }) => async (
  dispatch: Dispatch
): Promise<void> => {
  const res = await authApi.initUserSession(params);

  if (!res.data || !res.data?.token || !res.data?.user) {
    throw errorHelper.makeAppError(appErrorMessages.BAD_USER_DATA);
  }

  dispatch({
    type: userActionTypes.SET_TOKEN,
    payload: {
      token: res.data.token,
      token_data: userHelper.decodeToken(res.data.token),
      client_logged_at: moment().unix()
    }
  });

  dispatch({
    type: userActionTypes.SET_USER,
    payload: {
      data: res.data.user
    }
  });

  dispatch({
    type: institutionActionTypes.SET_INSTITUTION,
    payload: {
      data: res.data.user.institution
    }
  });
};

const refreshToken = () => async (dispatch: Dispatch): Promise<void> => {
  try {
    const res = await authApi.refreshUserSession();

    if (!res.data || !res.data?.token || !res.data?.user) {
      throw errorHelper.makeAppError(appErrorMessages.BAD_USER_DATA);
    }

    dispatch({
      type: userActionTypes.SET_TOKEN,
      payload: {
        token: res.data.token,
        token_data: userHelper.decodeToken(res.data.token),
        client_logged_at: moment().unix()
      }
    });

    dispatch({
      type: userActionTypes.SET_USER,
      payload: {
        data: res.data.user
      }
    });

    dispatch({
      type: institutionActionTypes.SET_INSTITUTION,
      payload: {
        data: res.data.user.institution
      }
    });
  } catch (error) {
    dispatch({ type: appActionTypes.APP_CLEAR_STATE });
    throw error;
  }
};

const logout = () => async (dispatch: Dispatch): Promise<void> => {
  try {
    await authApi.endUserSession();
  } finally {
    dispatch({ type: appActionTypes.APP_CLEAR_STATE });
  }
};

const resetPassword = (params: { password: string; confirm_password: string; token: string }) => async (
  dispatch: Dispatch
): Promise<void> => {
  const res = await authApi.resetPassword(params);

  if (!res.data || !res.data?.token || !res.data?.user) {
    throw errorHelper.makeAppError(appErrorMessages.BAD_USER_DATA);
  }

  dispatch({
    type: userActionTypes.SET_TOKEN,
    payload: {
      token: res.data.token,
      token_data: userHelper.decodeToken(res.data.token),
      client_logged_at: moment().unix()
    }
  });

  dispatch({
    type: userActionTypes.SET_USER,
    payload: {
      data: res.data.user
    }
  });

  dispatch({
    type: institutionActionTypes.SET_INSTITUTION,
    payload: {
      data: res.data.user.institution
    }
  });
};

const activate = (params: { password: string; confirm_password: string; token: string }) => async (
  dispatch: Dispatch
): Promise<void> => {
  const res = await authApi.activate(params);

  if (!res.data || !res.data?.token || !res.data?.user) {
    throw errorHelper.makeAppError(appErrorMessages.BAD_USER_DATA);
  }

  dispatch({
    type: userActionTypes.SET_TOKEN,
    payload: {
      token: res.data.token,
      token_data: userHelper.decodeToken(res.data.token),
      client_logged_at: moment().unix()
    }
  });

  dispatch({
    type: userActionTypes.SET_USER,
    payload: {
      data: res.data.user
    }
  });

  dispatch({
    type: institutionActionTypes.SET_INSTITUTION,
    payload: {
      data: res.data.user.institution
    }
  });
};

const welcome = (params: { password: string; confirm_password: string; token: string }) => async (
  dispatch: Dispatch
): Promise<void> => {
  const res = await authApi.welcome(params);

  if (!res.data || !res.data?.token || !res.data?.user) {
    throw errorHelper.makeAppError(appErrorMessages.BAD_USER_DATA);
  }

  dispatch({
    type: userActionTypes.SET_TOKEN,
    payload: {
      token: res.data.token,
      token_data: userHelper.decodeToken(res.data.token),
      client_logged_at: moment().unix()
    }
  });

  dispatch({
    type: userActionTypes.SET_USER,
    payload: {
      data: res.data.user
    }
  });

  dispatch({
    type: institutionActionTypes.SET_INSTITUTION,
    payload: {
      data: res.data.user.institution
    }
  });
};

export default Object.freeze({
  login,
  refreshToken,
  logout,
  resetPassword,
  activate,
  welcome
});
