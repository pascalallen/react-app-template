import errorHelper from '@/lib/helpers/errorHelper';
import { appErrorTypes } from '@/constants/errors';
import axios from 'axios';
import moxios from 'moxios';
import httpStatus from 'http-status-codes';

describe('errors', () => {
  // errorHelper.makeApiError tests
  it('errorHelper.makeApiError should retrieve an error with proper object structure', async () => {
    moxios.install();

    const mockApiError = { status: 'fail', response: { message: 'some error', data: null } };

    const mockProcApiError = {
      type: appErrorTypes.API_ERROR,
      status: httpStatus.BAD_REQUEST,
      statusText: 'fail',
      message: 'Api error',
      data: {}
    };

    const emptyProcApiError = {
      type: 'API_ERROR',
      status: 400,
      statusText: '',
      message: 'Api error',
      data: {}
    };

    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith({ status: httpStatus.BAD_REQUEST, response: mockApiError });
    });

    try {
      await axios.get('/test-url');
    } catch (error) {
      const procError = errorHelper.makeApiError(error);
      expect(procError).toEqual(mockProcApiError);
    }

    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith({ status: httpStatus.BAD_REQUEST, response: {} });
    });

    try {
      await axios.get('/test-url');
    } catch (error) {
      const procError = errorHelper.makeApiError(error);
      expect(procError).toEqual(emptyProcApiError);
    }

    moxios.uninstall();
  });

  // errorHelper.makeAppError tests
  it('errorHelper.makeAppError should retrieve an error with proper object structure', () => {
    const error1 = errorHelper.makeAppError();
    const expectedError1 = { type: appErrorTypes.APP_ERROR, message: 'An unexpected error occurred' };
    expect(error1).toEqual(expectedError1);

    const error2Message = 'test error';
    const error2 = errorHelper.makeAppError(error2Message);
    const expectedError2 = { type: appErrorTypes.APP_ERROR, message: error2Message };
    expect(error2).toEqual(expectedError2);
  });
});
