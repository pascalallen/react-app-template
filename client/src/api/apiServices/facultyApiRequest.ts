import facultyApiService from '@/api/apiServices/facultyApiService';
import httpMethod from '@/constants/httpMethod';
import apiHelper from '@/lib/helpers/apiHelper';
import errorHelper from '@/lib/helpers/errorHelper';
import { AnyObject } from '@/types/common';
import { FacultyApiServiceOptions } from '@/types/api';

type ApiRequestProps = {
  method: string;
  uri: string;
  body?: AnyObject;
  options?: FacultyApiServiceOptions;
};

const send = async (props: ApiRequestProps) => {
  try {
    const api = await facultyApiService.makeFacultyApi(props.options);
    switch (props.method) {
      case httpMethod.DELETE: {
        const res = await api.delete(props.uri);
        return apiHelper.transformApiResponse(res);
      }
      case httpMethod.GET: {
        const res = await api.get(props.uri);
        return apiHelper.transformApiResponse(res);
      }
      case httpMethod.PATCH: {
        const res = await api.patch(props.uri, props.body);
        return apiHelper.transformApiResponse(res);
      }
      case httpMethod.POST: {
        const res = await api.post(props.uri, props.body);
        return apiHelper.transformApiResponse(res);
      }
      case httpMethod.PUT: {
        const res = await api.put(props.uri, props.body);
        return apiHelper.transformApiResponse(res);
      }
      default: {
        throw new Error('Unexpected method');
      }
    }
  } catch (error) {
    throw errorHelper.makeApiError(error);
  }
};

export default Object.freeze({
  send
});
