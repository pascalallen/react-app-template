import reducer, { initialState } from '@/redux/user/userReducer';
import appActionTypes from '@/redux/appActionTypes';
import userActionTypes from '@/redux/user/userActionTypes';

describe('userReducer', () => {
  it('should return the initial state', () => {
    expect(reducer(initialState, { type: '', payload: {} })).toEqual(initialState);
  });

  it('should return previous state if no action matches', () => {
    expect(reducer(initialState, { type: 'NOT_A_MATCH', payload: {} })).toEqual(initialState);
  });

  it('should handle SET_TOKEN action', () => {
    const setTokenAction = {
      type: userActionTypes.SET_TOKEN,
      payload: {
        token: 'test-token',
        token_data: {
          exp: 115,
          iat: 100,
          id: 'test-id'
        },
        client_logged_at: 0
      }
    };

    const expectedState = {
      ...initialState,
      token: setTokenAction.payload.token,
      token_data: setTokenAction.payload.token_data,
      client_logged_at: setTokenAction.payload.client_logged_at
    };

    expect(reducer(initialState, setTokenAction)).toEqual(expectedState);
  });

  it('should handle SET_USER action', () => {
    const setUserAction = {
      type: userActionTypes.SET_USER,
      payload: {
        data: {
          id: 'test-id',
          roles: ['TEST_ROLE'],
          permissions: ['TEST_PERM']
        }
      }
    };

    const expectedState = {
      ...initialState,
      data: setUserAction.payload.data,
      roles: { TEST_ROLE: 'TEST_ROLE' },
      permissions: { TEST_PERM: 'TEST_PERM' }
    };
    expect(reducer(initialState, setUserAction)).toEqual(expectedState);

    const setUserAction2 = {
      type: userActionTypes.SET_USER,
      payload: {
        data: {
          id: 'test-id',
          roles: null,
          permissions: undefined
        }
      }
    };

    const expectedState2 = {
      ...initialState,
      data: setUserAction2.payload.data,
      roles: {},
      permissions: {}
    };

    expect(reducer(initialState, setUserAction2)).toEqual(expectedState2);
  });

  it('should handle CLEAR_USER_STATE action', () => {
    const clearStateAction = {
      type: userActionTypes.CLEAR_USER_STATE,
      payload: {}
    };
    expect(reducer(initialState, clearStateAction)).toEqual(initialState);

    const changedState = {
      ...initialState,
      token: 'changed-token',
      client_logged_at: 100,
      permission: { SOME: 'PERMISSION' },
      roles: { SOME: 'ROLE' }
    };

    expect(reducer(changedState, clearStateAction)).toEqual(initialState);
  });

  it('should handle CLEAR_USER_STATE action', () => {
    const clearAppStateAction = {
      type: appActionTypes.APP_CLEAR_STATE,
      payload: {}
    };
    expect(reducer(initialState, clearAppStateAction)).toEqual(initialState);

    const changedState = {
      ...initialState,
      token: 'changed-token',
      client_logged_at: 100,
      permission: { SOME: 'PERMISSION' },
      roles: { SOME: 'ROLE' }
    };

    expect(reducer(changedState, clearAppStateAction)).toEqual(initialState);
  });
});
