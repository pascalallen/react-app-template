import _ from 'lodash';
import facultyApiRequest from '@/api/apiServices/facultyApiRequest';
import systemApi from '@/api/systemApi';
import apiUrl from '@/constants/apiUrl';
import httpMethod from '@/constants/httpMethod';

jest.mock('@/api/apiServices/facultyApiRequest', () => ({
  send: jest.fn()
}));

describe('systemApi', () => {
  // module tests
  it('systemApi has proper type and keys', () => {
    expect(_.isObject(systemApi)).toBe(true);
    expect(_.keys(systemApi)).toEqual(['getValidations', 'getJob']);
  });

  // getValidations tests
  it('expect getValidations to call facultyApiRequest.send with proper params', () => {
    const formName = 'fakeForm';
    systemApi.getValidations(formName);
    expect(facultyApiRequest.send).toHaveBeenCalledWith({
      method: httpMethod.GET,
      uri: `${apiUrl.URL_VALIDATIONS}/${formName}`
    });
  });

  // getJob tests
  it('expect getJob to call facultyApiRequest.send with proper params', () => {
    const jobId = 'fake_job_id';
    systemApi.getJob(jobId);
    expect(facultyApiRequest.send).toHaveBeenCalledWith({
      method: httpMethod.GET,
      uri: `${apiUrl.URL_JOBS}/${jobId}`,
      options: { auth: true }
    });
  });
});
