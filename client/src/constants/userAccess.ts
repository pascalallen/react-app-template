// permissions
const MANAGE_ONBOARDING = 'MANAGE_ONBOARDING';
const REGISTER_EMPLOYEE = 'REGISTER_EMPLOYEE';
const REGISTER_FACULTY_MEMBER = 'REGISTER_FACULTY_MEMBER';
const REMOVE_FACULTY_MEMBER = 'REMOVE_FACULTY_MEMBER';
const VIEW_FACULTY_MEMBERS = 'VIEW_FACULTY_MEMBERS';
const REGISTER_INSTITUTION = 'REGISTER_INSTITUTION';
const SEARCH_SCHOOLS = 'SEARCH_SCHOOLS';
const VIEW_GROUPS = 'VIEW_GROUPS';
const VIEW_ROLES = 'VIEW_ROLES';
const VIEW_STUDENTS = 'VIEW_STUDENTS';

export const permission = Object.freeze({
  MANAGE_ONBOARDING,
  REGISTER_EMPLOYEE,
  REGISTER_FACULTY_MEMBER,
  REMOVE_FACULTY_MEMBER,
  VIEW_FACULTY_MEMBERS,
  REGISTER_INSTITUTION,
  SEARCH_SCHOOLS,
  VIEW_GROUPS,
  VIEW_ROLES,
  VIEW_STUDENTS
});

// roles
const FACULTY_ADMIN = 'ROLE_FACULTY_ADMIN';
const FACULTY_MEMBER = 'ROLE_FACULTY_MEMBER';
const OME_ADMIN = 'ROLE_OME_ADMIN';
const SUPER_ADMIN = 'ROLE_SUPER_ADMIN';
const USER = 'ROLE_USER';

export const role = Object.freeze({
  FACULTY_ADMIN,
  FACULTY_MEMBER,
  OME_ADMIN,
  SUPER_ADMIN,
  USER
});

// user activation status
const ACTIVE = 'ACTIVE';
const INACTIVE = 'INACTIVE';

export const activationStatus = Object.freeze({
  ACTIVE,
  INACTIVE
});