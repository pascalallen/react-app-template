import _ from 'lodash';
import facultyApiRequest from '@/api/apiServices/facultyApiRequest';
import authApi from '@/api/authApi';
import httpMethod from '@/constants/httpMethod';
import apiUrl from '@/constants/apiUrl';

jest.mock('@/api/apiServices/facultyApiRequest', () => ({
  send: jest.fn()
}));

describe('authApi', () => {
  // module tests
  it('authApi has proper type and keys', () => {
    expect(_.isObject(authApi)).toBe(true);
    expect(_.keys(authApi)).toEqual([
      'initUserSession',
      'refreshUserSession',
      'endUserSession',
      'requestPasswordReset',
      'resetPassword',
      'activate',
      'welcome'
    ]);
  });

  // initUserSession tests
  it('expect initUserSession to call facultyApiRequest.send with proper params', () => {
    const params = { email: 'test@test.com', password: 'test', remember_me: true };
    authApi.initUserSession(params);
    expect(facultyApiRequest.send).toHaveBeenCalledWith({
      method: httpMethod.POST,
      uri: apiUrl.URL_AUTH_SESSION,
      body: params
    });
  });

  // refreshUserSession tests
  it('expect refreshUserSession to call facultyApiRequest.send with proper params', () => {
    authApi.refreshUserSession();
    expect(facultyApiRequest.send).toHaveBeenCalledWith({ method: httpMethod.PATCH, uri: apiUrl.URL_AUTH_SESSION });
  });

  // endUserSession tests
  it('expect endUserSession to call facultyApiRequest.send with proper params', () => {
    authApi.endUserSession();
    expect(facultyApiRequest.send).toHaveBeenCalledWith({ method: httpMethod.DELETE, uri: apiUrl.URL_AUTH_SESSION });
  });

  // requestPasswordReset tests
  it('expect requestPasswordReset to call facultyApiRequest.send with proper params', () => {
    const params = { email: 'test@test.com' };
    authApi.requestPasswordReset(params);
    expect(facultyApiRequest.send).toHaveBeenCalledWith({
      method: httpMethod.POST,
      uri: apiUrl.URL_AUTH_RESET,
      body: params
    });
  });

  // resetPassword tests
  it('expect resetPassword to call facultyApiRequest.send with proper params', () => {
    const params = { password: 'fakepass', confirm_password: 'fakepass', token: 'faketoken' };
    authApi.resetPassword(params);
    expect(facultyApiRequest.send).toHaveBeenCalledWith({
      method: httpMethod.POST,
      uri: apiUrl.URL_AUTH_PASSWORD,
      body: params
    });
  });

  // activate tests
  it('expect activate to call facultyApiRequest.send with proper params', () => {
    const params = { password: 'fakepass', confirm_password: 'fakepass', token: 'faketoken' };
    authApi.activate(params);
    expect(facultyApiRequest.send).toHaveBeenCalledWith({
      method: httpMethod.POST,
      uri: apiUrl.URL_AUTH_ACTIVATE,
      body: params
    });
  });

  // welcome tests
  it('expect welcome to call facultyApiRequest.send with proper params', () => {
    const params = { password: 'fakepass', confirm_password: 'fakepass', token: 'faketoken' };
    authApi.welcome(params);
    expect(facultyApiRequest.send).toHaveBeenCalledWith({
      method: httpMethod.POST,
      uri: apiUrl.URL_AUTH_WELCOME,
      body: params
    });
  });
});
