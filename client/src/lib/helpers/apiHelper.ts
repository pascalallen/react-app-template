import { AxiosResponse } from 'axios';
import moment from 'moment';
import reduxHelper from '@/lib/helpers/reduxHelper';

const transformApiResponse = (res: AxiosResponse) => {
  return { statusText: res.data?.status ?? '', data: res.data?.data ?? {} };
};

const getCurrentApiToken = (): string => {
  const { state } = reduxHelper.mapReduxProps();
  return state.user.token;
};

const isApiTokenExpired = (): boolean => {
  const { state } = reduxHelper.mapReduxProps();
  try {
    /**
     * Calculates serverNowTimestamp based on the difference of the login timestamps
     *
     * diff = client - server
     * server = client - diff
     */
    const clientLoginTimestamp = state.user.client_logged_at;
    const serverLoginTimestamp = state.user.token_data.iat;
    const serverTokenExpTimestamp = state.user.token_data.exp;
    const clientNowTimestamp = moment().unix();
    const clientServerDiff = clientLoginTimestamp - serverLoginTimestamp || 0;
    const calculatedServerNowtimestamp = clientNowTimestamp - clientServerDiff;
    const serverTokenExpTime = moment.unix(serverTokenExpTimestamp || 0).subtract(5, 'minutes');
    const serverNow = moment.unix(calculatedServerNowtimestamp);
    return serverNow.isSameOrAfter(serverTokenExpTime);
  } catch (error) {
    return true;
  }
};

export default Object.freeze({
  transformApiResponse,
  getCurrentApiToken,
  isApiTokenExpired
});
