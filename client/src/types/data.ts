import { AnyObject } from '@/types/common';

export type InstitutionData = {
  id: string;
  name: string;
  school_id: string;
  contract_parameters: {
    max_students: number;
    max_faculty: number;
    modified_at: string;
  };
  primary_user_id: string;
  users: string[];
  onboarding_complete: boolean;
  registered_at: string;
  modified_at: string;
};

export type UserData = {
  id: string;
  first_name: string;
  last_name: string;
  email_address: string;
  activation_status: string;
  institution: InstitutionData | null;
  roles: string[];
  permissions: string[];
  registered_at: string;
  modified_at: string;
};

export type RegisterData = {
  id: string;
};

export type SchoolData = {
  id: string;
  name: string;
};

export type PermissionRecord = {
  id: string;
  name: string;
  description: string;
};

export type RoleRecord = {
  id: string;
  name: string;
  permissions: PermissionRecord[];
};

export type RolesData = {
  page: number;
  per_page: number;
  total_pages: number;
  total_records: number;
  records: RoleRecord[];
};

export type ValidationData = {
  [key: string]: {
    type: string;
    args: any[];
    error: 'string';
  };
};

export type JobIdData = {
  job_id: string;
};

export type EventMessage = {
  id: string;
  type: 'event';
  timestamp: string;
  payload_type: string;
  payload: AnyObject;
  meta_data: any[];
};

export type Job = {
  id: string;
  job_status: string;
  command_message?: {
    id: string;
    type: 'command';
    timestamp: string;
    payload_type: string;
    payload: AnyObject;
    meta_data: any[];
  } | null;
  event_message?: EventMessage | null;
  started_at?: string;
  completed_at?: string | null;
};

export type InstitutionsGroupsDataRecord = {
  id: string;
  name: string;
  total_students: number;
};

export type InstitutionGroupsData = {
  records: InstitutionsGroupsDataRecord[];
};

export type StudentDataRecord = {
  id: string;
  first_name: string;
  last_name: string;
  email_address: string;
  registration_status: string;
  class_year: number;
  registered_at: string;
  modified_at: string;
};

export type StudentsData = {
  page: number;
  per_page: number;
  total_pages: number;
  total_records: number;
  records: StudentDataRecord[];
};

export type FacultyMemberDataRecord = {
  id: string;
  first_name: string;
  last_name: string;
  email_address: string;
  activation_status: string;
  roles: string[];
  registered_at: string;
  modified_at: string;
};

export type FacultyMembersData = {
  page: number;
  per_page: number;
  total_pages: number;
  total_records: number;
  records: FacultyMemberDataRecord[];
};
