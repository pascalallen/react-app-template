import { AnyObject } from '@/types/common';

export type AppError = {
  type: string;
  message: string;
};

export type ApiError = {
  type: string;
  status: number;
  statusText: 'fail' | 'error';
  message: string;
  data: AnyObject;
};
