import React from 'react';
import classnames from 'classnames';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import { permission } from '@/constants/userAccess';
import { routerPath } from '@/router/common';
import AuthorizedRoute from '@/router/AuthorizedRoute';
import NotFoundRoute from '@/router/NotFoundRoute/NotFoundRoute';
import Footer from '@/components/Footer/Footer';
import SideMenuToggle from '@/components/SideMenuToggle/SideMenuToggle';
import RegisterTab from './register/RegisterTab';
import ManageTab from './manage/ManageTab';

export const tabs = {
  REGISTER: 'REGISTER',
  MANAGE: 'MANAGE'
};

const ManageInstitutions = () => {
  const history = useHistory();
  const location = useLocation();

  const handleTabChange = (tab: string): void => {
    switch (tab) {
      case tabs.MANAGE: {
        return history.push(routerPath.ADMIN_DASHBOARD_INSTITUTIONS);
      }
      case tabs.REGISTER: {
        return history.push(routerPath.ADMIN_DASHBOARD_INSTITUTIONS_REGISTER);
      }
      default: {
        history.push(routerPath.CLIENT_ERROR);
      }
    }
  };

  const isActiveTab = (tab: string): boolean => {
    switch (tab) {
      case tabs.MANAGE: {
        return location.pathname === routerPath.ADMIN_DASHBOARD_INSTITUTIONS;
      }
      case tabs.REGISTER: {
        return location.pathname === routerPath.ADMIN_DASHBOARD_INSTITUTIONS_REGISTER;
      }
      default: {
        return false;
      }
    }
  };

  const renderRoutes = () => {
    return (
      <Switch>
        {/*TODO: Add required permissions*/}
        <AuthorizedRoute exact path={routerPath.ADMIN_DASHBOARD_INSTITUTIONS} requiredPerms={[]}>
          <ManageTab />
        </AuthorizedRoute>
        <AuthorizedRoute
          path={routerPath.ADMIN_DASHBOARD_INSTITUTIONS_REGISTER}
          requiredPerms={[permission.REGISTER_INSTITUTION, permission.SEARCH_SCHOOLS]}>
          <RegisterTab />
        </AuthorizedRoute>
        {/*Fallback 404 Route*/}
        <Route>
          <NotFoundRoute />
        </Route>
      </Switch>
    );
  };

  return (
    <div className="d-flex flex-column vh-100 manage-institutions-container">
      <div className="header-container flex-shrink-0">
        <SideMenuToggle id="side-nav-open-button" className="side-nav-open-button position-relative" />
        <div className="register-faculty-member-header font-size-md font-weight-bold">Manage Faculty</div>
        <div className="manage-institutions-tabs-container">
          <button
            id="manage-institutions-manage-tab"
            className={classnames(
              'manage-institutions-tab',
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
            id="manage-institutions-invite-tab"
            className={classnames(
              'manage-institutions-tab',
              'bg-transparent',
              'font-size-sm',
              'font-weight-bold',
              'pb-1',
              'text-center',
              isActiveTab(tabs.REGISTER)
                ? 'active-tab border-top-0 border-top-0 border-left-0 border-right-0'
                : 'border-0'
            )}
            type="button"
            onClick={() => handleTabChange(tabs.REGISTER)}>
            Register
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

export default ManageInstitutions;
