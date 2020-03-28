import facultyApiRequest from '@/api/apiServices/facultyApiRequest';
import httpMethod from '@/constants/httpMethod';
import apiUrl from '@/constants/apiUrl';
import { ApiResponse } from '@/types/api';
import { RegisterData } from '@/types/data';

const register = async (params: {
  first_name: string;
  last_name: string;
  email: string;
}): Promise<ApiResponse<RegisterData>> => {
  return facultyApiRequest.send({
    method: httpMethod.POST,
    uri: apiUrl.URL_EMPLOYEES,
    body: params,
    options: { auth: true }
  });
};

export default Object.freeze({
  register
});
