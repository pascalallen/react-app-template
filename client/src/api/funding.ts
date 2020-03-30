import apiRequest from '@/api/apiRequest';
import apiUrl from '@/constants/apiUrl';
import httpMethod from '@/constants/httpMethod';
import { ApiResponse } from '@/types/api';
import { FundingsData } from '@/types/data';

const getFundings = async (): Promise<ApiResponse<FundingsData>> => {
  return apiRequest.send({ method: httpMethod.GET, uri: apiUrl.URL_FUNDINGS });
};

export default Object.freeze({
  getFundings
});
