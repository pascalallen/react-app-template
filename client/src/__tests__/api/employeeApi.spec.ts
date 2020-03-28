import _ from 'lodash';
import facultyApiRequest from '@/api/apiServices/facultyApiRequest';
import employeeApi from '@/api/employeeApi';
import httpMethod from '@/constants/httpMethod';
import apiUrl from '@/constants/apiUrl';

jest.mock('@/api/apiServices/facultyApiRequest', () => ({
  send: jest.fn()
}));

describe('employeeApi', () => {
  // module tests
  it('employeeApi has proper type and keys', () => {
    expect(_.isObject(employeeApi)).toBe(true);
    expect(_.keys(employeeApi)).toEqual(['register']);
  });

  // register tests
  it('expect register to call facultyApiRequest.send with proper params', () => {
    const params = { first_name: 'user', last_name: 'test', email: 'user@test.com' };
    employeeApi.register(params);
    expect(facultyApiRequest.send).toHaveBeenCalledWith({
      method: httpMethod.POST,
      uri: apiUrl.URL_EMPLOYEES,
      body: params,
      options: { auth: true }
    });
  });
});
