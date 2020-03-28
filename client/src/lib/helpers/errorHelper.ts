import { AxiosError } from 'axios';
import HttpStatus from 'http-status-codes';
import { appErrorTypes } from '@/constants/errors';
import { ApiError, AppError } from '@/types/errors';

const makeApiError = (err?: AxiosError): ApiError => {
  return {
    type: appErrorTypes.API_ERROR,
    status: err?.response?.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
    statusText: err?.response?.data?.status ?? '',
    message: err?.response?.data?.message ?? 'Api error',
    data: err?.response?.data?.data ?? {}
  };
};

const makeAppError = (message?: string): AppError => {
  return {
    type: appErrorTypes.APP_ERROR,
    message: message || 'An unexpected error occurred'
  };
};

export default Object.freeze({
  makeApiError,
  makeAppError
});
