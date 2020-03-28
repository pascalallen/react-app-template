import _ from 'lodash';
import moxios from 'moxios';
import axios from 'axios';
import facultyApiService from '@/api/apiServices/facultyApiService';

// mocked data
const testToken =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1Nzk1MzMyOTUsImlkIjoidGVzdC1pZCIsImlhdCI6MTU3OTUzMjM5NX0.7IQ9_Ka8jmy5wuGQ3cIPMnsYmG83jWOBPJ1KmJFDKZ4';
const testUser = { id: 'test-id' };

// mocked modules
jest.mock('@/lib/helpers/apiHelper', () => ({
  getCurrentApiToken: jest
    .fn()
    // @1
    .mockImplementationOnce(() => '')
    // @2
    .mockImplementationOnce(() => '')
    // @3
    .mockImplementationOnce(() => '')
    // @4
    .mockImplementationOnce(() => '')
    // @5 - expired token
    .mockImplementationOnce(() => testToken),

  isApiTokenExpired: jest.fn().mockImplementation(() => {
    return true;
  })
}));

describe('facultyApiService', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  // module tests
  it('facultyApiService has proper type and keys', () => {
    expect(_.isObject(facultyApiService)).toBe(true);
    expect(_.keys(facultyApiService)).toEqual(['makeFacultyApi']);
  });

  // makeFacultyApi tests
  it('makeFacultyApi should create an AxiosInstance', async () => {
    const api = await facultyApiService.makeFacultyApi();
    expect(typeof axios === typeof api).toBe(true);
  });

  it('makeFacultyApi should attach proper baseUrl and headers for each kind of requests', async () => {
    const api = await facultyApiService.makeFacultyApi();
    const apiHeaders = {
      read: { Accept: 'application/json' },
      write: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
    };

    expect(api.defaults.baseURL).toEqual('/api/v1/');
    expect(api.defaults.headers.get).toEqual(apiHeaders.read);
    expect(api.defaults.headers.post).toEqual(apiHeaders.write);
    expect(api.defaults.headers.put).toEqual(apiHeaders.write);
    expect(api.defaults.headers.patch).toEqual(apiHeaders.write);
    expect(api.defaults.headers.delete).toEqual(apiHeaders.write);
  });

  //@1
  it('makeFacultyApi should attach an empty Bearer Token header if options.auth is passed in and it fails to get a data object back from api', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 200, response: { data: null } });
    });

    const api = await facultyApiService.makeFacultyApi({ auth: true });

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 200, response: { data: { test: 'ok!' } } });
    });

    const res = await api.get('/test-url');

    expect(res.config.headers.Authorization).toEqual('Bearer ');
  });

  //@2
  it('makeFacultyApi should attach an empty Bearer Token header if options.auth is passed in and it fails to get a token back from api', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 200, response: { data: { user: testUser } } });
    });

    const api = await facultyApiService.makeFacultyApi({ auth: true });

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 200, response: { data: { test: 'ok!' } } });
    });

    const res = await api.get('/test-url');

    expect(res.config.headers.Authorization).toEqual('Bearer ');
  });

  //@3
  it('makeFacultyApi should attach an empty Bearer Token header if options.auth is passed in and it fails to get a a user back from api', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 200, response: { data: { token: testToken } } });
    });

    const api = await facultyApiService.makeFacultyApi({ auth: true });

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 200, response: { data: { test: 'ok!' } } });
    });

    const res = await api.get('/test-url');

    expect(res.config.headers.Authorization).toEqual('Bearer ');
  });

  //@4
  it('makeFacultyApi should attach Bearer Token header if options.auth is passed in and there is no token', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 200, response: { data: { token: testToken, user: testUser } } });
    });

    const api = await facultyApiService.makeFacultyApi({ auth: true });

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 200, response: { data: { test: 'ok!' } } });
    });

    const res = await api.get('/test-url');

    expect(res.config.headers.Authorization).toEqual(`Bearer ${testToken}`);
  });

  // @5
  it('makeFacultyApi should attach Bearer Token header if options.auth is passed in and token is expired', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 200, response: { data: { token: testToken, user: testUser } } });
    });

    const api = await facultyApiService.makeFacultyApi({ auth: true });

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 200, response: { data: { test: 'ok!' } } });
    });

    const res = await api.get('/test-url');

    expect(res.config.headers.Authorization).toEqual(`Bearer ${testToken}`);
  });

  // @6
  it('makeFacultyApi should attach key-value pair for options.headers that are passed in', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 200, response: { data: { token: testToken, user: testUser } } });
    });

    const api = await facultyApiService.makeFacultyApi({ headers: { foo: 'bar' } });

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 200, response: { data: { test: 'ok!' } } });
    });

    const res = await api.get('/test-url');

    expect(res.config.headers.foo).toEqual('bar');
  });
});
