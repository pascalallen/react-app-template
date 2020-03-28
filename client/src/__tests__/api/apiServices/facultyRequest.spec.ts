import _ from 'lodash';
import moxios from 'moxios';
import httpStatus from 'http-status-codes';
import httpMethod from '@/constants/httpMethod';
import facultyApiRequest from '@/api/apiServices/facultyApiRequest';
import { appErrorTypes } from '@/constants/errors';

// mocked objects
const testURL = '/test/url';
const mockApiRes = { status: 'ok ', data: 'some data' };
const mockProcApiRes = { statusText: mockApiRes.status, data: mockApiRes.data };
const mockApiError = { status: 'fail', response: { message: 'some error', data: null } };
const mockProcApiError = {
  type: appErrorTypes.API_ERROR,
  status: httpStatus.BAD_REQUEST,
  statusText: 'fail',
  message: 'Api error',
  data: {}
};

describe('facultyApiRequest', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  // module tests
  it('facultyApiRequest has proper type and keys', () => {
    expect(_.isObject(facultyApiRequest)).toBe(true);
    expect(_.keys(facultyApiRequest)).toEqual(['send']);
  });

  // delete
  it('send should make a DELETE request to proper url', async () => {
    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith({ status: httpStatus.OK, response: mockApiRes });
    });

    await facultyApiRequest.send({ method: httpMethod.DELETE, uri: testURL });
    const req = moxios.requests.mostRecent();
    expect(req.config.url).toEqual(testURL);
    expect(req.config.method).toEqual('delete');
  });

  it('send should transform DELETE request res to standard app res and error to standard app error on throw', async () => {
    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith({ status: httpStatus.OK, response: mockApiRes });
    });

    const res = await facultyApiRequest.send({ method: httpMethod.DELETE, uri: testURL });
    expect(res).toEqual(mockProcApiRes);

    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith({ status: httpStatus.BAD_REQUEST, response: mockApiError });
    });
    try {
      await facultyApiRequest.send({ method: httpMethod.DELETE, uri: testURL });
    } catch (error) {
      expect(error).toEqual(mockProcApiError);
    }
  });

  // get
  it('send should make a GET request to proper url', async () => {
    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith({ status: httpStatus.OK, response: mockApiRes });
    });

    await facultyApiRequest.send({ method: httpMethod.GET, uri: testURL });
    const req = moxios.requests.mostRecent();
    expect(req.config.url).toEqual(testURL);
    expect(req.config.method).toEqual('get');
  });

  it('send should transform GET request res to standard app res and error to standard app error on throw', async () => {
    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith({ status: httpStatus.OK, response: mockApiRes });
    });

    const res = await facultyApiRequest.send({ method: httpMethod.GET, uri: testURL });
    expect(res).toEqual(mockProcApiRes);

    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith({ status: httpStatus.BAD_REQUEST, response: mockApiError });
    });
    try {
      await facultyApiRequest.send({ method: httpMethod.GET, uri: testURL });
    } catch (error) {
      expect(error).toEqual(mockProcApiError);
    }
  });

  // patch
  it('send should make a PATCH request to proper url', async () => {
    const body = { some: 'paramater' };

    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith({ status: httpStatus.OK, response: mockApiRes });
    });

    await facultyApiRequest.send({ method: httpMethod.PATCH, uri: testURL, body });
    const req = moxios.requests.mostRecent();
    expect(req.config.url).toEqual(testURL);
    expect(req.config.method).toEqual('patch');
    expect(req.config.data).toEqual(JSON.stringify(body));
  });

  it('send should transform PATCH request res to standard app res and error to standard app error on throw', async () => {
    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith({ status: httpStatus.OK, response: mockApiRes });
    });

    const res = await facultyApiRequest.send({ method: httpMethod.PATCH, uri: testURL });
    expect(res).toEqual(mockProcApiRes);

    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith({ status: httpStatus.BAD_REQUEST, response: mockApiError });
    });
    try {
      await facultyApiRequest.send({ method: httpMethod.PATCH, uri: testURL });
    } catch (error) {
      expect(error).toEqual(mockProcApiError);
    }
  });

  // post
  it('send should make a POST request to proper url', async () => {
    const body = { some: 'paramater' };

    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith({ status: httpStatus.OK, response: mockApiRes });
    });

    await facultyApiRequest.send({ method: httpMethod.POST, uri: testURL, body });
    const req = moxios.requests.mostRecent();
    expect(req.config.url).toEqual(testURL);
    expect(req.config.method).toEqual('post');
    expect(req.config.data).toEqual(JSON.stringify(body));
  });

  it('send should transform POST request res to standard app res and error to standard app error on throw', async () => {
    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith({ status: httpStatus.OK, response: mockApiRes });
    });

    const res = await facultyApiRequest.send({ method: httpMethod.PATCH, uri: testURL });
    expect(res).toEqual(mockProcApiRes);

    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith({ status: httpStatus.BAD_REQUEST, response: mockApiError });
    });
    try {
      await facultyApiRequest.send({ method: httpMethod.PATCH, uri: testURL });
    } catch (error) {
      expect(error).toEqual(mockProcApiError);
    }
  });

  // put
  it('send should make a PUT request to proper url', async () => {
    const body = { some: 'paramater' };

    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith({ status: httpStatus.OK, response: mockApiRes });
    });

    await facultyApiRequest.send({ method: httpMethod.PUT, uri: testURL, body });
    const req = moxios.requests.mostRecent();
    expect(req.config.url).toEqual(testURL);
    expect(req.config.method).toEqual('put');
    expect(req.config.data).toEqual(JSON.stringify(body));
  });

  it('send should transform PUT request res to standard app res and error to standard app error on throw', async () => {
    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith({ status: httpStatus.OK, response: mockApiRes });
    });

    const res = await facultyApiRequest.send({ method: httpMethod.PATCH, uri: testURL });
    expect(res).toEqual(mockProcApiRes);

    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith({ status: httpStatus.BAD_REQUEST, response: mockApiError });
    });
    try {
      await facultyApiRequest.send({ method: httpMethod.PATCH, uri: testURL });
    } catch (error) {
      expect(error).toEqual(mockProcApiError);
    }
  });

  it('send should throw an error if method is not DELETE, GET, PATCH, POST or PUT', async () => {
    try {
      await facultyApiRequest.send({ method: 'NOT_A_METHOD', uri: testURL });
    } catch (error) {
      expect(error).toEqual({
        type: 'API_ERROR',
        status: 500,
        statusText: '',
        message: 'Api error',
        data: {}
      });
    }
  });
});
