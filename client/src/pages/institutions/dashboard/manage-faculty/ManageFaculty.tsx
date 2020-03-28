import React from 'react';
import classnames from 'classnames';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import { useMatch } from '@/lib/customHooks';
import { permission } from '@/constants/userAccess';
import { routerPath } from '@/router/common';
import AuthorizedRoute from '@/router/AuthorizedRoute';
import NotFoundRoute from '@/router/NotFoundRoute/NotFoundRoute';
import Footer from '@/components/Footer/Footer';
import SideMenuToggle from '@/components/SideMenuToggle/SideMenuToggle';
import InviteTab from './invite/InviteTab';
import ManageTab from './manage/ManageTab';

export const tabs = {
  MANAGE: 'MANAGE',
  INVITE: 'INVITE'
};

const ManageFaculty = () => {
  const history = useHistory();
  const location = useLocation();
  const { params } = useMatch();
  const institutionId: string = params.institutionId ?? '';

  const handleTabChange = (tab: string): void => {
    switch (tab) {
      case tabs.MANAGE: {
        return history.push(`${routerPath.INSTITUTIONS}/${institutionId}/faculty-members`);
      }
      case tabs.INVITE: {
        return history.push(`${routerPath.INSTITUTIONS}/${institutionId}/faculty-members/invite`);
      }
      default: {
        history.push(routerPath.CLIENT_ERROR);
      }
    }
  };

  const isActiveTab = (tab: string): boolean => {
    switch (tab) {
      case tabs.MANAGE: {
        return location.pathname === `${routerPath.INSTITUTIONS}/${institutionId}/faculty-members`;
      }
      case tabs.INVITE: {
        return location.pathname === `${routerPath.INSTITUTIONS}/${institutionId}/faculty-members/invite`;
      }
      default: {
        return false;
      }
    }
  };

  const renderRoutes = () => {
    return (
      <Switch>
        <AuthorizedRoute
          exact
          path={routerPath.INSTITUTION_FACULTY_MEMBERS}
          requiredPerms={[permission.VIEW_FACULTY_MEMBERS]}>
          <ManageTab />
        </AuthorizedRoute>
        <AuthorizedRoute
          path={routerPath.INSTITUTION_FACULTY_MEMBERS_INVITE}
          requiredPerms={[permission.REGISTER_FACULTY_MEMBER]}>
          <InviteTab />
        </AuthorizedRoute>
        {/*Fallback 404 Route*/}
        <Route>
          <NotFoundRoute />
        </Route>
      </Switch>
    );
  };

  return (
    <div className="d-flex flex-column vh-100 manage-faculty-container">
      <div className="header-container flex-shrink-0">
        <SideMenuToggle id="side-nav-open-button" className="side-nav-open-button position-relative" />
        <div className="register-faculty-member-header font-size-md font-weight-bold">Manage Faculty</div>
        <div className="manage-faculty-tabs-container">
          <button
            id="manage-faculty-manage-tab"
            className={classnames(
              'manage-faculty-tab',
              'bg-transparent',
              'font-size-sm',
              'font-weight-bold',
              'pb-1',
              'text-center',
              isActiveTab(tabs.MANAGE) ? 'active-tab border-top-0 border-left-0 border-right-0' : 'border-0'
            )}
            type="button"
            onClick={() => handleTabChange(tabs.MANAGE)}>
            Manage
          </button>
          <button
            id="manage-faculty-invite-tab"
            className={classnames(
              'manage-faculty-tab',
              'bg-transparent',
              'font-size-sm',
              'font-weight-bold',
              'pb-1',
              'text-center',
              isActiveTab(tabs.INVITE)
                ? 'active-tab border-top-0 border-top-0 border-left-0 border-right-0'
                : 'border-0'
            )}
            type="button"
            onClick={() => handleTabChange(tabs.INVITE)}>
            Invite
          </button>
        </div>
      </div>
      <div className="body-container flex-fill-shrink-0">{renderRoutes()}</div>
      <div className="footer-container flex-shrink-0">
        <Footer />
      </div>
    </div>
  );
};

export default ManageFaculty;
