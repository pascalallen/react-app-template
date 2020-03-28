import _ from 'lodash';
import facultyApiRequest from '@/api/apiServices/facultyApiRequest';
import rolesApi from '@/api/rolesApi';
import apiUrl from '@/constants/apiUrl';
import httpMethod from '@/constants/httpMethod';

jest.mock('@/api/apiServices/facultyApiRequest', () => ({
  send: jest.fn()
}));

describe('rolesApi', () => {
  // module tests
  it('rolesApi has proper type and keys', () => {
    expect(_.isObject(rolesApi)).toBe(true);
    expect(_.keys(rolesApi)).toEqual(['getRoles']);
  });

  // getRoles tests
  it('expect getRoles to call facultyApiRequest.send with proper params', () => {
    const queryParams = {
      page: 1,
      per_page: 10,
      sort: 'name',
      order: 'asc'
    };
    const uri = `${apiUrl.URL_ROLES}?page=1&per_page=10&sort=name&order=asc`;

    rolesApi.getRoles(queryParams);
    expect(facultyApiRequest.send).toHaveBeenCalledWith({
      method: httpMethod.GET,
      uri,
      options: { auth: true }
    });

    rolesApi.getRoles();
    expect(facultyApiRequest.send).toHaveBeenCalledWith({
      method: httpMethod.GET,
      uri: apiUrl.URL_ROLES,
      options: { auth: true }
    });
  });
});
