import _ from 'lodash';
import facultyApiRequest from '@/api/apiServices/facultyApiRequest';
import institutionApi from '@/api/institutionApi';
import httpMethod from '@/constants/httpMethod';
import apiUrl from '@/constants/apiUrl';

jest.mock('@/api/apiServices/facultyApiRequest', () => ({
  send: jest.fn()
}));

describe('institutionApi', () => {
  // module tests
  it('institutionApi has proper type and keys', () => {
    expect(_.isObject(institutionApi)).toBe(true);
    expect(_.keys(institutionApi)).toEqual([
      'getSchools',
      'register',
      'uploadStudents',
      'getGroups',
      'getStudentsByGroup',
      'getStudentById',
      'getFacultyMembers',
      'registerFacultyMember',
      'removeFacultyMember',
      'resendActivationEmail'
    ]);
  });

  // getSchools tests
  it('expect getSchools to call facultyApiRequest.send with proper params', () => {
    const searchTerm = 'Georgetown';
    const uri = `${apiUrl.URL_SCHOOLS}?search=${searchTerm}`;
    institutionApi.getSchools(searchTerm);
    expect(facultyApiRequest.send).toHaveBeenCalledWith({
      method: httpMethod.GET,
      uri,
      options: { auth: true }
    });
  });

  // register tests
  it('expect register to call facultyApiRequest.send with proper params', () => {
    const params = {
      school_id: '',
      max_faculty: '2',
      max_students: '15',
      first_name: 'user',
      last_name: 'test',
      email: 'user@test.com'
    };
    institutionApi.register(params);
    expect(facultyApiRequest.send).toHaveBeenCalledWith({
      method: httpMethod.POST,
      uri: apiUrl.URL_INSTITUTIONS,
      body: params,
      options: { auth: true }
    });
  });

  // uploadsStudents tests
  it('expect uploadStudents to call facultyApiRequest.send with proper params', () => {
    const institutionId = '0170407c-25e5-489a-a3bd-01350a3723fc';
    const formData = new FormData();
    const file = new File(['foo'], 'foo.csv', {
      type: 'text/csv'
    });
    formData.append('file', file);
    institutionApi.uploadStudents(institutionId, formData);
    expect(facultyApiRequest.send).toHaveBeenCalledWith({
      method: httpMethod.POST,
      uri: `${apiUrl.URL_INSTITUTIONS}/${institutionId}/students/import`,
      body: formData,
      options: {
        auth: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    });
  });

  // getGroups tests
  it('expect getGroups to call facultyApiRequest.send with proper params', () => {
    const institutionId = '0170407c-25e5-489a-a3bd-01350a3723fc';

    institutionApi.getGroups(institutionId);
    expect(facultyApiRequest.send).toHaveBeenCalledWith({
      method: httpMethod.GET,
      uri: `${apiUrl.URL_INSTITUTIONS}/${institutionId}/active-group-summary`,
      options: { auth: true }
    });
  });

  // getStudentsByGroup tests
  it('expect getStudentsByGroup to call facultyApiRequest.send with proper params', () => {
    const institutionId = '0170407c-25e5-489a-a3bd-01350a3723fc';
    const queryParams = {
      page: 1,
      per_page: 10,
      sort: 'first_name',
      order: 'asc',
      group_id: 'my-group-id'
    };
    const uri = `${apiUrl.URL_INSTITUTIONS}/${institutionId}/students?page=1&per_page=10&sort=first_name&order=asc&group_id=my-group-id&status[]=ACTIVATED&status[]=PENDING_ACTIVATION`;

    institutionApi.getStudentsByGroup(institutionId, queryParams);
    expect(facultyApiRequest.send).toHaveBeenCalledWith({
      method: httpMethod.GET,
      uri,
      options: { auth: true }
    });

    const uri2 = `${apiUrl.URL_INSTITUTIONS}/${institutionId}/students?status[]=ACTIVATED&status[]=PENDING_ACTIVATION`;

    institutionApi.getStudentsByGroup(institutionId);
    expect(facultyApiRequest.send).toHaveBeenCalledWith({
      method: httpMethod.GET,
      uri: uri2,
      options: { auth: true }
    });
  });

  // getStudentById tests
  it('expect getStudentById to call facultyApiRequest.send with proper params', () => {
    const institutionId = '0170407c-25e5-489a-a3bd-01350a3723fc';
    const studentId = '0170407c-25e5-489a-a3bd-01350a3723fc'; // TODO: use real student id
    const uri = `${apiUrl.URL_INSTITUTIONS}/${institutionId}/students/${studentId}`;

    institutionApi.getStudentById(institutionId, studentId);
    expect(facultyApiRequest.send).toHaveBeenCalledWith({
      method: httpMethod.GET,
      uri,
      options: { auth: true }
    });
  });

  // getFacultyMembers tests
  it('expect getFacultyMembers to call facultyApiRequest.send with proper params', () => {
    const institutionId = '0170407c-25e5-489a-a3bd-01350a3723fc';

    institutionApi.getFacultyMembers(institutionId);
    expect(facultyApiRequest.send).toHaveBeenCalledWith({
      method: httpMethod.GET,
      uri: `${apiUrl.URL_INSTITUTIONS}/${institutionId}/faculty-members`,
      options: { auth: true }
    });
  });

  // registerFacultyMember tests
  it('expect registerFacultyMember to call facultyApiRequest.send with proper params', () => {
    const institutionId = '0170407c-25e5-489a-a3bd-01350a3723fc';
    const params = {
      first_name: 'user',
      last_name: 'test',
      email: 'user@test.com'
    };

    institutionApi.registerFacultyMember(institutionId, params);
    expect(facultyApiRequest.send).toHaveBeenCalledWith({
      method: httpMethod.POST,
      uri: `${apiUrl.URL_INSTITUTIONS}/${institutionId}/faculty-members`,
      body: params,
      options: { auth: true }
    });
  });

  // removeFacultyMember tests
  it('expect removeFacultyMember to call facultyApiRequest.send with proper params', () => {
    const institutionId = '0170407c-25e5-489a-a3bd-01350a3723fc';
    const userId = '0170407c-25e5-489a-a3bd-01350a3723fd';

    institutionApi.removeFacultyMember(institutionId, userId);
    expect(facultyApiRequest.send).toHaveBeenCalledWith({
      method: httpMethod.DELETE,
      uri: `${apiUrl.URL_INSTITUTIONS}/${institutionId}/faculty-members/${userId}`,
      options: { auth: true }
    });
  });

  // resendActivationEmail tests
  it('expect resendActivationEmail to call facultyApiRequest.send with proper params', () => {
    const institutionId = '0170407c-25e5-489a-a3bd-01350a3723fc';
    const userId = '0170407c-25e5-489a-a3bd-01350a3723fd';

    institutionApi.resendActivationEmail(institutionId, userId);
    expect(facultyApiRequest.send).toHaveBeenCalledWith({
      method: httpMethod.POST,
      uri: `${apiUrl.URL_INSTITUTIONS}/${institutionId}/faculty-members/${userId}/activation`,
      options: { auth: true }
    });
  });
});
