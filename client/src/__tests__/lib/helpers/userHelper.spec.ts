import _ from 'lodash';
import userHelper from '@/lib/helpers/userHelper';
import errorHelper from '@/lib/helpers/errorHelper';
import { appErrorMessages } from '@/constants/errors';

// mocked objects
const userToken =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1Nzk1MzMyOTUsImlkIjoidGVzdElkIiwiZmlyc3QiOiJVc2VyIiwibGFzdCI6IlRlc3QiLCJyb2xlcyI6WyJST0xFX1VTRVIiLCJST0xFX1NVUEVSX0FETUlOIl0sInBlcm1zIjpbIlJFR0lTVEVSX09NRV9BRE1JTiIsIkFOT1RIRVJfUEVSTUlTU0lPTiJdLCJpYXQiOjE1Nzk1MzIzOTV9.Wj_f1dNoc9zNVgUQovJrT_yotlf6Z_Ufnq5wVZ2xh74';

const userTokenDecoded = {
  exp: 1579533295,
  id: 'testId',
  first: 'User',
  last: 'Test',
  roles: ['ROLE_USER', 'ROLE_SUPER_ADMIN'],
  perms: ['REGISTER_OME_ADMIN', 'ANOTHER_PERMISSION'],
  iat: 1579532395
};

const mockState = {
  user: {
    permissions: {
      REGISTER_OME_ADMIN: 'REGISTER_OME_ADMIN',
      ANOTHER_PERMISSION: 'ANOTHER_PERMISSION'
    },
    roles: { TEST_ROLE: 'TEST_ROLE' }
  }
};

// mocked modules
jest.mock('@/lib/helpers/reduxHelper', () => ({
  mapReduxProps: jest.fn().mockImplementation(() => ({
    state: mockState,
    dispatch: jest.fn()
  }))
}));

describe('userHelper', () => {
  // module tests
  it('userHelper has proper type and keys', () => {
    expect(_.isObject(userHelper)).toBe(true);
    expect(_.keys(userHelper)).toEqual(['decodeToken', 'hasPermissions', 'hasRole']);
  });
  // userHelper.decodeToken tests
  it('userHelper.decodeToken should throw when a bad token is passed', () => {
    try {
      userHelper.decodeToken('bad_token');
      expect(userHelper.decodeToken).toThrow();
    } catch (error) {
      expect(error).toEqual(errorHelper.makeAppError(appErrorMessages.BAD_TOKEN));
    }
  });

  it('userHelper.decodeToken should decode token data when proper token is passed', () => {
    const data = userHelper.decodeToken(userToken);
    expect(data).toEqual(userTokenDecoded);
  });

  // userHelper.hasPermissions tests
  it('userHelper.hasPermissions should return true if user has all permissions required', () => {
    const hasPermission = userHelper.hasPermissions(userTokenDecoded.perms);
    expect(hasPermission).toBe(true);
  });

  it('userHelper.hasPermissions should return false if user does not have required permissions', () => {
    let hasPermission = userHelper.hasPermissions(['NOT_IN_THERE_PERMISSION']);
    expect(hasPermission).toBe(false);
    hasPermission = userHelper.hasPermissions(['TEST_PERMISSION', 'NOT_IN_THERE_PERMISSION']);
    expect(hasPermission).toBe(false);
  });

  // userHelper.hasRole tests
  it('userHelper.hasRole should return true if user has permission', () => {
    const hasRole = userHelper.hasRole('TEST_ROLE');
    expect(hasRole).toBe(true);
  });

  it('userHelper.hasRole should return false if user does not have permission', () => {
    const hasRole = userHelper.hasRole('NOT_IN_THERE_ROLE');
    expect(hasRole).toBe(false);
  });
});
