import apiRequest from '@/api/apiRequest';
import apiUrl from '@/constants/apiUrl';
import httpMethod from '@/constants/httpMethod';
import { ApiResponse } from '@/types/api';
import { UserData } from '@/types/data';

const login = async (params: {
  email: string;
  password: string;
  remember_me: boolean;
}): Promise<ApiResponse<UserData>> => {
  return apiRequest.send({ method: httpMethod.POST, uri: apiUrl.URL_AUTH_LOGIN, body: params });
};

const logout = async (): Promise<ApiResponse<null>> => {
  return apiRequest.send({ method: httpMethod.DELETE, uri: apiUrl.URL_AUTH_LOGOUT });
};

export default Object.freeze({
  login,
  logout
});
