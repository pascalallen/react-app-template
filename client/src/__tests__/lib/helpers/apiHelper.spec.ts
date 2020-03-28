import _ from 'lodash';
import moment from 'moment';
import moxios from 'moxios';
import facultyApiService from '@/api/apiServices/facultyApiService';
import apiHelper from '@/lib/helpers/apiHelper';

// mocked objects
const testToken = 'test-token';

// mocked modules
jest.mock('@/lib/helpers/reduxHelper', () => ({
  mapReduxProps: jest
    .fn()
    //@1
    .mockImplementationOnce(() => {
      const mockState = {
        user: { token: testToken }
      };

      return { state: mockState };
    })
    .mockImplementationOnce(() => {
      return { state: null };
    })
    //@2
    .mockImplementationOnce(() => {
      const mockState = {
        user: {
          token_data: {
            exp: 1000,
            iat: 0
          },
          client_logged_at: 0
        }
      };
      return { state: mockState };
    })
    //@3
    .mockImplementationOnce(() => {
      const mockState = {
        user: {
          token_data: {
            exp: moment()
              .add(15, 'minutes')
              .unix(),
            iat: 0
          },
          client_logged_at: 0
        }
      };
      return { state: mockState };
    })
    //@4
    .mockImplementationOnce(() => {
      const mockState = {
        user: {
          token_data: {
            exp: moment()
              .add(15, 'minutes')
              .unix(),
            iat: 0
          },
          client_logged_at: 599 // 1 sec less than 10 min (15min + leeway)
        }
      };
      return { state: mockState };
    })
    //@5
    .mockImplementationOnce(() => {
      const mockState = {
        user: {
          token_data: {
            exp: moment()
              .add(15, 'minutes')
              .unix(),
            iat: 599 // 1 sec less than 10 min (15min + leeway)
          },
          client_logged_at: 0
        }
      };
      return { state: mockState };
    })
}));

describe('apiHelper', () => {
  // module tests
  it('apiHelper has proper type and keys', () => {
    expect(_.isObject(apiHelper)).toBe(true);
    expect(_.keys(apiHelper)).toEqual(['transformApiResponse', 'getCurrentApiToken', 'isApiTokenExpired']);
  });

  // transformApiResponse tests
  it('transformApiResponse should return proper object structure', async () => {
    moxios.install();
    const mockRes = { status: 'ok', data: 'some data' };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 200, response: mockRes });
    });
    const api = await facultyApiService.makeFacultyApi();
    const res = await api.get('/test-url');

    const apiRes = apiHelper.transformApiResponse(res);
    expect(apiRes.statusText).toEqual(mockRes.status);
    expect(apiRes.data).toEqual(mockRes.data);

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({});
    });

    const res2 = await api.get('/test-url');
    const apiRes2 = apiHelper.transformApiResponse(res2);
    expect(apiRes2.statusText).toEqual('');
    expect(apiRes2.data).toEqual({});
    moxios.uninstall();
  });

  // getCurrentApiToken tests
  it('getCurrentApiToken returns user token from state', () => {
    const token = apiHelper.getCurrentApiToken();
    expect(token).toBe(testToken);
  });

  // isApiTokenExpired tests
  //@1
  it('isApiTokenExpired returns true if something fails', () => {
    const isExpired = apiHelper.isApiTokenExpired();
    expect(isExpired).toBe(true);
  });

  //@2
  it('isApiTokenExpired returns true token is expired', () => {
    const isExpired = apiHelper.isApiTokenExpired();
    expect(isExpired).toBe(true);
  });

  //@3
  it('isApiTokenExpired returns false if token is not expired', () => {
    const isExpired = apiHelper.isApiTokenExpired();
    expect(isExpired).toBe(false);
  });

  //@4
  it('isApiTokenExpired returns false if token is not expired taking into account that server and client might have different times', () => {
    const isExpired = apiHelper.isApiTokenExpired();
    expect(isExpired).toBe(false);
  });

  //@5
  it('isApiTokenExpired returns false if token is not expired taking into account that server and client might have different times', () => {
    const isExpired = apiHelper.isApiTokenExpired();
    expect(isExpired).toBe(false);
  });
});
