import facultyApiRequest from '@/api/apiServices/facultyApiRequest';
import httpMethod from '@/constants/httpMethod';
import { queryStringify } from '@/lib/common';
import apiUrl from '@/constants/apiUrl';
import { ApiResponse, GetFacultyMembersQueryParams, GetStudentsByGroupQueryParams } from '@/types/api';
import {
  RegisterData,
  SchoolData,
  JobIdData,
  InstitutionGroupsData,
  StudentsData,
  FacultyMembersData,
  StudentDataRecord
} from '@/types/data';

const getSchools = async (searchTerm: string): Promise<ApiResponse<SchoolData[]>> => {
  const uri = `${apiUrl.URL_SCHOOLS}?search=${searchTerm}`;
  return facultyApiRequest.send({ method: httpMethod.GET, uri, options: { auth: true } });
};

const register = async (params: {
  school_id: string;
  max_faculty: string;
  max_students: string;
  first_name: string;
  last_name: string;
  email: string;
}): Promise<ApiResponse<RegisterData>> => {
  return facultyApiRequest.send({
    method: httpMethod.POST,
    uri: apiUrl.URL_INSTITUTIONS,
    body: params,
    options: { auth: true }
  });
};

const uploadStudents = async (institutionId: string, formData: FormData): Promise<ApiResponse<JobIdData>> => {
  return facultyApiRequest.send({
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
};

const getGroups = async (institutionId: string): Promise<ApiResponse<InstitutionGroupsData>> => {
  return facultyApiRequest.send({
    method: httpMethod.GET,
    uri: `${apiUrl.URL_INSTITUTIONS}/${institutionId}/active-group-summary`,
    options: { auth: true }
  });
};

const getStudentsByGroup = async (
  institutionId: string,
  queryParams?: GetStudentsByGroupQueryParams
): Promise<ApiResponse<StudentsData>> => {
  let queryString = queryStringify(queryParams ?? {});
  queryString = queryString
    ? `${queryString}&status[]=ACTIVATED&status[]=PENDING_ACTIVATION`
    : '?status[]=ACTIVATED&status[]=PENDING_ACTIVATION';

  return facultyApiRequest.send({
    method: httpMethod.GET,
    uri: `${apiUrl.URL_INSTITUTIONS}/${institutionId}/students${queryString}`,
    options: { auth: true }
  });
};

const getStudentById = async (institutionId: string, studentId: string): Promise<ApiResponse<StudentDataRecord>> => {
  return facultyApiRequest.send({
    method: httpMethod.GET,
    uri: `${apiUrl.URL_INSTITUTIONS}/${institutionId}/students/${studentId}`,
    options: { auth: true }
  });
};

const getFacultyMembers = async (
  institutionId: string,
  queryParams?: GetFacultyMembersQueryParams
): Promise<ApiResponse<FacultyMembersData>> => {
  const queryString = queryStringify(queryParams ?? {});

  return facultyApiRequest.send({
    method: httpMethod.GET,
    uri: `${apiUrl.URL_INSTITUTIONS}/${institutionId}/faculty-members${queryString}`,
    options: { auth: true }
  });
};

const registerFacultyMember = async (
  institutionId: string,
  params: {
    first_name: string;
    last_name: string;
    email: string;
  }
): Promise<ApiResponse<RegisterData>> => {
  return facultyApiRequest.send({
    method: httpMethod.POST,
    uri: `${apiUrl.URL_INSTITUTIONS}/${institutionId}/faculty-members`,
    body: params,
    options: {
      auth: true
    }
  });
};

const removeFacultyMember = async (institutionId: string, userId: string): Promise<ApiResponse<null>> => {
  return facultyApiRequest.send({
    method: httpMethod.DELETE,
    uri: `${apiUrl.URL_INSTITUTIONS}/${institutionId}/faculty-members/${userId}`,
    options: { auth: true }
  });
};

const resendActivationEmail = async (institutionId: string, userId: string): Promise<ApiResponse<null>> => {
  return facultyApiRequest.send({
    method: httpMethod.POST,
    uri: `${apiUrl.URL_INSTITUTIONS}/${institutionId}/faculty-members/${userId}/activation`,
    options: { auth: true }
  });
};

export default Object.freeze({
  getSchools,
  register,
  uploadStudents,
  getGroups,
  getStudentsByGroup,
  getStudentById,
  getFacultyMembers,
  registerFacultyMember,
  removeFacultyMember,
  resendActivationEmail
});
