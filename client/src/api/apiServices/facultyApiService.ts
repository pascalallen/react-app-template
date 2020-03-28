import _ from 'lodash';
import moment from 'moment';
import axios, { AxiosInstance } from 'axios';
import userHelper from '@/lib/helpers/userHelper';
import reduxHelper from '@/lib/helpers/reduxHelper';
import apiHelper from '@/lib/helpers/apiHelper';
import errorHelper from '@/lib/helpers/errorHelper';
import { appErrorMessages } from '@/constants/errors';
import { FacultyApiServiceOptions } from '@/types/api';
import apiUrl from '@/constants/apiUrl';
import appActionTypes from '@/redux/appActionTypes';
import userActionTypes from '@/redux/user/userActionTypes';

const apiHeaders = {
  read: { Accept: 'application/json' },
  write: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
};

const refreshAndGetToken = async (api: AxiosInstance): Promise<string> => {
  const { dispatch } = reduxHelper.mapReduxProps();
  let token = '';

  try {
    const res = await api.patch(apiUrl.URL_AUTH_SESSION, {});

    if (!res.data.data || !res.data.data?.token || !res.data.data?.user) {
      throw errorHelper.makeAppError(appErrorMessages.BAD_USER_DATA);
    }

    token = res.data.data.token;

    dispatch({
      type: userActionTypes.SET_TOKEN,
      payload: {
        token,
        token_data: userHelper.decodeToken(token),
        client_logged_at: moment().unix()
      }
    });

    dispatch({
      type: userActionTypes.SET_USER,
      payload: {
        data: res.data.data.user
      }
    });

    return token;
  } catch (error) {
    dispatch({ type: appActionTypes.APP_CLEAR_STATE, payload: {} });
    return token;
  }
};

const makeFacultyApi = async (options?: FacultyApiServiceOptions): Promise<AxiosInstance> => {
  const api = axios.create({
    baseURL: '/api/v1/',
    headers: {
      get: apiHeaders.read,
      post: apiHeaders.write,
      put: apiHeaders.write,
      patch: apiHeaders.write,
      delete: apiHeaders.write
    }
  });

  if (options?.auth ?? false) {
    let currentToken = apiHelper.getCurrentApiToken();

    if (_.isEmpty(currentToken)) {
      currentToken = await refreshAndGetToken(api);
    } else if (apiHelper.isApiTokenExpired()) {
      currentToken = await refreshAndGetToken(api);
    }

    api.interceptors.request.use(config => {
      config.headers.Authorization = `Bearer ${currentToken}`;
      return config;
    });
  }

  if (options?.headers ?? null) {
    api.interceptors.request.use(config => {
      _.forEach(options?.headers, (val, key) => {
        config.headers[key] = val;
      });
      return config;
    });
  }

  return api;
};

export default Object.freeze({
  makeFacultyApi
});
