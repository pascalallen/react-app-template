import _ from 'lodash';
import jwtDecode from 'jwt-decode';
import reduxHelper from '@/lib/helpers/reduxHelper';
import errorHelper from '@/lib/helpers/errorHelper';
import { appErrorMessages } from '@/constants/errors';
import { StringObject } from '@/types/common';

const decodeToken = (token: string): StringObject => {
  try {
    return jwtDecode(token);
  } catch (err) {
    throw errorHelper.makeAppError(appErrorMessages.BAD_TOKEN);
  }
};

const hasPermissions = (permissions: string[]): boolean => {
  const { state } = reduxHelper.mapReduxProps();
  return _.every(permissions, permission => _.get(state, `user.permissions.${permission}`) === permission);
};

const hasRole = (role: string): boolean => {
  const { state } = reduxHelper.mapReduxProps();
  return _.get(state, `user.roles.${role}`) === role;
};

export default Object.freeze({
  decodeToken,
  hasPermissions,
  hasRole
});
