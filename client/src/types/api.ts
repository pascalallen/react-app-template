import { StringObject } from '@/types/common';

export type FacultyApiServiceOptions = {
  auth?: boolean;
  headers?: StringObject;
};

export type ApiResponse<Data> = {
  statusText: string;
  data: Data;
};

export type GetStudentsByGroupQueryParams = {
  page?: number;
  per_page?: number;
  sort?: string;
  order?: string;
  group_id?: string;
  search?: string;
};

export type GetRolesQueryParams = {
  page?: number;
  per_page?: number;
  sort?: string;
  order?: string;
};

export type GetFacultyMembersQueryParams = {
  page?: number;
  per_page?: number;
  sort?: string;
  order?: string;
};
