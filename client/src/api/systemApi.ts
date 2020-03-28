import facultyApiRequest from '@/api/apiServices/facultyApiRequest';
import httpMethod from '@/constants/httpMethod';
import { ApiResponse } from '@/types/api';
import { ValidationData, Job } from '@/types/data';
import apiUrl from '@/constants/apiUrl';

const getValidations = async (formName: string): Promise<ApiResponse<ValidationData>> => {
  return facultyApiRequest.send({ method: httpMethod.GET, uri: `${apiUrl.URL_VALIDATIONS}/${formName}` });
};

const getJob = async (jobId: string): Promise<ApiResponse<Job>> => {
  const uri = `${apiUrl.URL_JOBS}/${jobId}`;
  return await facultyApiRequest.send({ method: httpMethod.GET, uri, options: { auth: true } });
};

export default Object.freeze({
  getValidations,
  getJob
});
