import facultyApiRequest from '@/api/apiServices/facultyApiRequest';
import httpMethod from '@/constants/httpMethod';
import { RolesData } from '@/types/data';
import { ApiResponse } from '@/types/api';
import { GetRolesQueryParams } from '@/types/api';
import { queryStringify } from '@/lib/common';
import apiUrl from '@/constants/apiUrl';

const getRoles = async (queryParams?: GetRolesQueryParams): Promise<ApiResponse<RolesData>> => {
  const queryString = queryStringify(queryParams ?? {});
  const uri = `${apiUrl.URL_ROLES}${queryString}`;
  return await facultyApiRequest.send({ method: httpMethod.GET, uri, options: { auth: true } });
};

export default Object.freeze({
  getRoles
});
