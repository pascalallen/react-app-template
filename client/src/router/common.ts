import { History } from 'history';
import { role } from '@/constants/userAccess';
import userHelper from '@/lib/helpers/userHelper';
import reduxHelper from '@/lib/helpers/reduxHelper';
import userActions from '@/redux/user/userActions';

export const routerPath = {
  HOME: '/',
  ADMIN: '/admin',
  // TODO: move /admin/dashboard/<route> routes to /admin/<route>
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_DASHBOARD_INSTITUTIONS: '/admin/dashboard/institutions',
  ADMIN_DASHBOARD_INSTITUTIONS_REGISTER: '/admin/dashboard/institutions/register',
  ADMIN_REGISTER_INSTITUTION: '/admin/institutions/register',
  ADMIN_REGISTER_EMPLOYEE: '/admin/employees/register',
  ADMIN_DOCS_ROLES: '/admin/docs/roles',
  INSTITUTIONS: '/institutions',
  INSTITUTION: '/institutions/:institutionId',
  INSTITUTION_GROUP: '/institutions/:institutionId/groups/:groupId',
  INSTITUTION_STUDENT: '/institutions/:institutionId/students/:studentId',
  INSTITUTION_FACULTY_MEMBERS: '/institutions/:institutionId/faculty-members',
  INSTITUTION_FACULTY_MEMBERS_INVITE: '/institutions/:institutionId/faculty-members/invite',
  INSTITUTION_ONBOARDING: '/institutions/:institutionId/onboarding',
  INSTITUTION_ONBOARDING_STEP2: '/institutions/:institutionId/onboarding/step2',
  INSTITUTION_ONBOARDING_LOADING: '/institutions/:institutionId/onboarding/loading',
  INSTITUTION_ONBOARDING_ERROR: '/institutions/:institutionId/onboarding/error',
  LOGIN: '/login',
  REQUEST_RESET: '/request-reset',
  REQUEST_RESET_COMPLETE: '/request-reset-complete',
  RESET_PASSWORD: '/reset-password/:token',
  ACTIVATE: '/activate/:token',
  WELCOME: '/welcome/:token',
  FORBIDDEN: '/forbidden',
  SERVER_ERROR: '/server-error',
  CLIENT_ERROR: '/client-error'
};

export const defaultUserRedirect = async (history: History): Promise<void> => {
  try {
    const { state, dispatch } = reduxHelper.mapReduxProps();

    if (!state.user.token) {
      await dispatch(userActions.refreshToken());
    }

    if (!state.user.token) {
      history.push(routerPath.LOGIN);
    }

    if (userHelper.hasRole(role.SUPER_ADMIN)) {
      return history.push(routerPath.ADMIN_REGISTER_EMPLOYEE);
    }

    if (userHelper.hasRole(role.OME_ADMIN)) {
      return history.push(routerPath.ADMIN_REGISTER_INSTITUTION);
    }

    if (userHelper.hasRole(role.FACULTY_ADMIN)) {
      if (!state.institution.data) {
        return history.push(routerPath.CLIENT_ERROR);
      }

      if (!state.institution.data.onboarding_complete) {
        return history.push(`${routerPath.INSTITUTIONS}/${state.institution.data.id}/onboarding`);
      }

      return history.push(`${routerPath.INSTITUTIONS}/${state.institution.data.id}`);
    }

    if (userHelper.hasRole(role.FACULTY_MEMBER)) {
      if (!state.institution.data) {
        return history.push(routerPath.CLIENT_ERROR);
      }

      return history.push(`${routerPath.INSTITUTIONS}/${state.institution.data.id}`);
    }

    history.push(routerPath.HOME);
  } catch (error) {
    history.push(routerPath.LOGIN);
  }
};
