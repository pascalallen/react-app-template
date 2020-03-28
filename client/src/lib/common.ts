import _ from 'lodash';
import { AnyObject, StringObject } from '@/types/common';
import envHelper from '@/lib/helpers/envHelper';

export const hashStrArray = (array: string[]): StringObject => {
  const hash: StringObject = {};

  _.each(array, element => {
    hash[element] = element;
  });

  return hash;
};

// TODO: modify this function to support array keys && usages
export const queryStringify = (params: { [key: string]: number | string | undefined }): string => {
  const query = Object.keys(params)
    .map(key => key + '=' + params[key])
    .join('&');

  return query ? `?${query}` : '';
};

export const removeEmptyQueryParams = (obj: AnyObject) => {
  // removes from the queryParams object any empty value so that is not added to the queryString
  _.forEach(obj, (value, key) => {
    if (
      _.isNil(value) ||
      _.isUndefined(value) ||
      _.isNaN(value) ||
      _.isFunction(value) ||
      _.isObject(value) ||
      value === ''
    ) {
      delete obj[key];
    }
  });

  return obj;
};

export const subscribeMercureEventSource = (jobId: string) => {
  const url = new URL(envHelper.getEnv(envHelper.envKeys.MERCURE_PUBLISH_URL) ?? '');
  url.searchParams.append('topic', `${envHelper.getEnv(envHelper.envKeys.APP_BASE_URL)}/jobs/${jobId}`);
  return new EventSource(url.toJSON());
};
