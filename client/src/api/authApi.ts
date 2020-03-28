import facultyApiRequest from '@/api/apiServices/facultyApiRequest';
import apiUrl from '@/constants/apiUrl';
import httpMethod from '@/constants/httpMethod';
import { ApiResponse } from '@/types/api';
import { UserData } from '@/types/data';

type AuthData = {
  token: string;
  user: UserData;
};

const initUserSession = async (params: {
  email: string;
  password: string;
  remember_me: boolean;
}): Promise<ApiResponse<AuthData>> => {
  return facultyApiRequest.send({ method: httpMethod.POST, uri: apiUrl.URL_AUTH_SESSION, body: params });
};

const refreshUserSession = async (): Promise<ApiResponse<AuthData>> => {
  return facultyApiRequest.send({ method: httpMethod.PATCH, uri: apiUrl.URL_AUTH_SESSION });
};

const endUserSession = async (): Promise<ApiResponse<null>> => {
  return facultyApiRequest.send({ method: httpMethod.DELETE, uri: apiUrl.URL_AUTH_SESSION });
};

const requestPasswordReset = async (params: { email: string }): Promise<ApiResponse<null>> => {
  return facultyApiRequest.send({ method: httpMethod.POST, uri: apiUrl.URL_AUTH_RESET, body: params });
};

const resetPassword = async (params: {
  password: string;
  confirm_password: string;
  token: string;
}): Promise<ApiResponse<AuthData>> => {
  return facultyApiRequest.send({ method: httpMethod.POST, uri: apiUrl.URL_AUTH_PASSWORD, body: params });
};

const activate = async (params: {
  password: string;
  confirm_password: string;
  token: string;
}): Promise<ApiResponse<AuthData>> => {
  return facultyApiRequest.send({ method: httpMethod.POST, uri: apiUrl.URL_AUTH_ACTIVATE, body: params });
};

const welcome = async (params: {
  password: string;
  confirm_password: string;
  token: string;
}): Promise<ApiResponse<AuthData>> => {
  return facultyApiRequest.send({ method: httpMethod.POST, uri: apiUrl.URL_AUTH_WELCOME, body: params });
};

export default Object.freeze({
  initUserSession,
  refreshUserSession,
  endUserSession,
  requestPasswordReset,
  resetPassword,
  activate,
  welcome
});
