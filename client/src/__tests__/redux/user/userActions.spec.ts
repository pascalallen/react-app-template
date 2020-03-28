import _ from 'lodash';
import authApi from '@/api/authApi';
import userActions from '@/redux/user/userActions';
import appActionTypes from '@/redux/appActionTypes';
import userActionTypes from '@/redux/user/userActionTypes';
import makeMockStore from '@/lib/test/makeMockStore';

// mocked objects
const testToken =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6InRlc3QtaWQiLCJleHAiOjE1Nzk1MzMyOTUsImlhdCI6MTU3OTUzMjM5NX0.jI8EmFHjm9sqCLURVHPlPXu0dtLypvDMIYvUFdIm_Ss';

const testTokenData = {
  id: 'test-id',
  iat: 1579532395,
  exp: 1579533295
};

const testUserData = {
  id: 'test-id',
  last_name: 'Test',
  first_name: 'User',
  email_address: 'user@test.com',
  activation_status: 'ACTIVE',
  institution: null,
  roles: ['ROLE_USER', 'ROLE_SUPER_ADMIN'],
  permissions: ['REGISTER_OME_ADMIN'],
  registered_at: 'some-date',
  modified_at: 'some-date'
};

const testError = {
  type: 'TEST_ERROR',
  message: 'test error!'
};

const loginUserParams = {
  email: 'test@test.com',
  password: 'test',
  remember_me: true
};

const resetPasswordParams = {
  password: 'testPassword',
  confirm_password: 'testPassword',
  token: testToken
};

const activateParams = {
  password: 'testPassword',
  confirm_password: 'testPassword',
  token: testToken
};

const welcomeParams = {
  password: 'testPassword',
  confirm_password: 'testPassword',
  token: testToken
};

// mocked modules
jest.mock('@/api/authApi', () => ({
  initUserSession: jest
    .fn()
    //@1a
    .mockImplementationOnce(() => {
      return Promise.resolve({ data: { token: testToken, user: testUserData } });
    })
    //@2a
    .mockImplementationOnce(() => {
      return Promise.resolve({ data: null });
    })
    //@3a
    .mockImplementationOnce(() => {
      return Promise.reject(testError);
    }),
  refreshUserSession: jest
    .fn()
    //@1b
    .mockImplementationOnce(() => {
      return Promise.resolve({ data: { token: testToken, user: testUserData } });
    })
    //@2b
    .mockImplementationOnce(() => {
      return Promise.resolve({ data: null });
    })
    //@3b
    .mockImplementationOnce(() => {
      return Promise.reject(testError);
    }),
  endUserSession: jest
    .fn()
    //@1c
    .mockImplementationOnce(() => {
      return Promise.resolve({ data: { token: testToken, user: testUserData } });
    })
    //@2c
    .mockImplementationOnce(() => {
      return Promise.reject(testError);
    }),
  resetPassword: jest
    .fn()
    //@1d
    .mockImplementationOnce(() => {
      return Promise.resolve({ data: { token: testToken, user: testUserData } });
    })
    //@2d
    .mockImplementationOnce(() => {
      return Promise.resolve({ data: null });
    })
    //@3d
    .mockImplementationOnce(() => {
      return Promise.reject(testError);
    }),
  activate: jest
    .fn()
    //@1e
    .mockImplementationOnce(() => {
      return Promise.resolve({ data: { token: testToken, user: testUserData } });
    })
    //@2e
    .mockImplementationOnce(() => {
      return Promise.resolve({ data: null });
    })
    //@3e
    .mockImplementationOnce(() => {
      return Promise.reject(testError);
    }),
  welcome: jest
    .fn()
    //@1f
    .mockImplementationOnce(() => {
      return Promise.resolve({ data: { token: testToken, user: testUserData } });
    })
    //@2f
    .mockImplementationOnce(() => {
      return Promise.resolve({ data: null });
    })
    //@3f
    .mockImplementationOnce(() => {
      return Promise.reject(testError);
    })
}));

describe('userActions', () => {
  // module tests
  it('userActions has proper type and keys', () => {
    expect(_.isObject(userActions)).toBe(true);
    expect(_.keys(userActions)).toEqual(['login', 'refreshToken', 'logout', 'resetPassword', 'activate', 'welcome']);
  });

  // userActions.login tests
  //@1a
  it('userActions.login calls api and sets token and user objects', async () => {
    const store = makeMockStore();

    await store.dispatch(userActions.login(loginUserParams));
    expect(authApi.initUserSession).toHaveBeenCalledWith(loginUserParams);

    const actions = store.getActions();
    expect(actions[0].type).toEqual(userActionTypes.SET_TOKEN);
    expect(actions[0].payload.token).toEqual(testToken);
    expect(actions[0].payload.token_data).toEqual(testTokenData);
    expect(actions[1].type).toEqual(userActionTypes.SET_USER);
    expect(actions[1].payload.data).toEqual(testUserData);
  });

  //@2a
  it('userActions.login should throw error if data object has unexpected shape and not call any actions', async () => {
    const store = makeMockStore();
    try {
      const thunk = userActions.login(loginUserParams);
      await store.dispatch(thunk);
      expect(thunk).toThrow();
    } catch (error) {
      expect(authApi.initUserSession).toHaveBeenCalledWith(loginUserParams);
      const actions = store.getActions();
      expect(_.isEmpty(actions)).toBe(true);
    }
  });

  // @3a
  it('userActions.login should throw error if api call fails', async () => {
    const store = makeMockStore();
    try {
      const thunk = userActions.login(loginUserParams);
      await store.dispatch(thunk);
      expect(thunk).toThrow();
    } catch (error) {
      expect(error).toEqual(testError);
      expect(authApi.initUserSession).toHaveBeenCalledWith(loginUserParams);
      const actions = store.getActions();
      expect(_.isEmpty(actions)).toBe(true);
    }
  });

  // userActions.refreshUserSession tests
  //@1b
  it('userActions.refreshToken  calls api and sets token and user objects', async () => {
    const store = makeMockStore();

    await store.dispatch(userActions.refreshToken());
    expect(authApi.refreshUserSession).toHaveBeenCalled();

    const actions = store.getActions();
    expect(actions[0].type).toEqual(userActionTypes.SET_TOKEN);
    expect(actions[0].payload.token).toEqual(testToken);
    expect(actions[0].payload.token_data).toEqual(testTokenData);
    expect(actions[1].type).toEqual(userActionTypes.SET_USER);
    expect(actions[1].payload.data).toEqual(testUserData);
  });

  //@2b
  it('userActions.refreshToken should throw error if data object has unexpected shape and unset the user', async () => {
    const store = makeMockStore();
    try {
      const thunk = userActions.refreshToken();
      await store.dispatch(thunk);
      expect(thunk).toThrow();
    } catch (error) {
      expect(authApi.refreshUserSession).toHaveBeenCalled();
      const actions = store.getActions();
      expect(actions[0]).toEqual({ type: appActionTypes.APP_CLEAR_STATE });
    }
  });

  //@3b
  it('userActions.refreshToken should throw error if api call fails and unset the user', async () => {
    const store = makeMockStore();
    try {
      const thunk = userActions.refreshToken();
      await store.dispatch(thunk);
      expect(thunk).toThrow();
    } catch (error) {
      expect(error).toEqual(testError);
      expect(authApi.refreshUserSession).toHaveBeenCalled();
      const actions = store.getActions();
      expect(actions[0]).toEqual({ type: appActionTypes.APP_CLEAR_STATE });
    }
  });

  // userActions.logout tests
  //@1c
  it('userActions.logout calls api and unset the user', async () => {
    const store = makeMockStore();

    await store.dispatch(userActions.logout());
    expect(authApi.endUserSession).toHaveBeenCalled();

    const actions = store.getActions();
    expect(actions[0]).toEqual({ type: appActionTypes.APP_CLEAR_STATE });
  });

  //@2c
  it('userActions.logout should throw error if api call fails and unset the user', async () => {
    const store = makeMockStore();
    try {
      const thunk = userActions.logout();
      await store.dispatch(thunk);
      expect(thunk).toThrow();
    } catch (error) {
      expect(error).toEqual(testError);
      expect(authApi.endUserSession).toHaveBeenCalled();
      const actions = store.getActions();
      expect(actions[0]).toEqual({ type: appActionTypes.APP_CLEAR_STATE });
    }
  });

  // userActions.resetPassword tests
  //@1d
  it('userActions.resetPassword calls api and sets token and user objects', async () => {
    const store = makeMockStore();

    await store.dispatch(userActions.resetPassword(resetPasswordParams));
    expect(authApi.resetPassword).toHaveBeenCalledWith(resetPasswordParams);

    const actions = store.getActions();
    expect(actions[0].type).toEqual(userActionTypes.SET_TOKEN);
    expect(actions[0].payload.token).toEqual(testToken);
    expect(actions[0].payload.token_data).toEqual(testTokenData);
    expect(actions[1].type).toEqual(userActionTypes.SET_USER);
    expect(actions[1].payload.data).toEqual(testUserData);
  });

  //@2d
  it('userActions.resetPassword should throw error if data object has unexpected shape and unset the user', async () => {
    const store = makeMockStore();
    try {
      const thunk = userActions.resetPassword(resetPasswordParams);
      await store.dispatch(thunk);
      expect(thunk).toThrow();
    } catch (error) {
      expect(authApi.resetPassword).toHaveBeenCalledWith(resetPasswordParams);
      const actions = store.getActions();
      expect(_.isEmpty(actions)).toBe(true);
    }
  });

  //@3d
  it('userActions.resetPassword should throw error if api call fails', async () => {
    const store = makeMockStore();
    try {
      const thunk = userActions.resetPassword(resetPasswordParams);
      await store.dispatch(thunk);
      expect(thunk).toThrow();
    } catch (error) {
      expect(error).toEqual(testError);
      expect(authApi.resetPassword).toHaveBeenCalledWith(resetPasswordParams);
      const actions = store.getActions();
      expect(_.isEmpty(actions)).toBe(true);
    }
  });

  // userActions.activate tests
  //@1e
  it('userActions.activate  calls api and sets token and user objects', async () => {
    const store = makeMockStore();

    await store.dispatch(userActions.activate(activateParams));
    expect(authApi.activate).toHaveBeenCalledWith(activateParams);

    const actions = store.getActions();
    expect(actions[0].type).toEqual(userActionTypes.SET_TOKEN);
    expect(actions[0].payload.token).toEqual(testToken);
    expect(actions[0].payload.token_data).toEqual(testTokenData);
    expect(actions[1].type).toEqual(userActionTypes.SET_USER);
    expect(actions[1].payload.data).toEqual(testUserData);
  });

  //@2e
  it('userActions.activate should throw error if data object has unexpected shape and unset the user', async () => {
    const store = makeMockStore();
    try {
      const thunk = userActions.activate(activateParams);
      await store.dispatch(thunk);
      expect(thunk).toThrow();
    } catch (error) {
      expect(authApi.activate).toHaveBeenCalledWith(activateParams);
      const actions = store.getActions();
      expect(_.isEmpty(actions)).toBe(true);
    }
  });

  //@3e
  it('userActions.activate should throw error if api call fails', async () => {
    const store = makeMockStore();
    try {
      const thunk = userActions.activate(activateParams);
      await store.dispatch(thunk);
      expect(thunk).toThrow();
    } catch (error) {
      expect(error).toEqual(testError);
      expect(authApi.activate).toHaveBeenCalledWith(activateParams);
      const actions = store.getActions();
      expect(_.isEmpty(actions)).toBe(true);
    }
  });

  // userActions.welcome tests
  //@1f
  it('userActions.welcome  calls api and sets token and user objects', async () => {
    const store = makeMockStore();

    await store.dispatch(userActions.welcome(welcomeParams));
    expect(authApi.welcome).toHaveBeenCalledWith(welcomeParams);

    const actions = store.getActions();
    expect(actions[0].type).toEqual(userActionTypes.SET_TOKEN);
    expect(actions[0].payload.token).toEqual(testToken);
    expect(actions[0].payload.token_data).toEqual(testTokenData);
    expect(actions[1].type).toEqual(userActionTypes.SET_USER);
    expect(actions[1].payload.data).toEqual(testUserData);
  });

  //@2f
  it('userActions.welcome should throw error if data object has unexpected shape and unset the user', async () => {
    const store = makeMockStore();
    try {
      const thunk = userActions.welcome(welcomeParams);
      await store.dispatch(thunk);
      expect(thunk).toThrow();
    } catch (error) {
      expect(authApi.welcome).toHaveBeenCalledWith(welcomeParams);
      const actions = store.getActions();
      expect(_.isEmpty(actions)).toBe(true);
    }
  });

  //@3f
  it('userActions.welcome should throw error if api call fails', async () => {
    const store = makeMockStore();
    try {
      const thunk = userActions.welcome(welcomeParams);
      await store.dispatch(thunk);
      expect(thunk).toThrow();
    } catch (error) {
      expect(error).toEqual(testError);
      expect(authApi.welcome).toHaveBeenCalledWith(welcomeParams);
      const actions = store.getActions();
      expect(_.isEmpty(actions)).toBe(true);
    }
  });
});
