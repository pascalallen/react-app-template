import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { permission } from '@/constants/userAccess';
import { routerPath } from '@/router/common';
import AuthorizedRoute from '@/router/AuthorizedRoute';
import NotFoundRoute from '@/router/NotFoundRoute/NotFoundRoute';
import RolesDocument from './docs/roles/RolesDocument';
import RegisterEmployee from './employees/register/RegisterEmployee';
import RegisterInstitution from './institutions/register/RegisterInstitution';
import AdminDashboard from './dashboard/AdminDashboard';

const AdminRouter = () => {
  return (
    <Switch>
      <Route path={routerPath.ADMIN_DASHBOARD}>
        <AdminDashboard />
      </Route>
      <AuthorizedRoute path={routerPath.ADMIN_DOCS_ROLES} requiredPerms={[permission.VIEW_ROLES]}>
        <RolesDocument />
      </AuthorizedRoute>
      <AuthorizedRoute path={routerPath.ADMIN_REGISTER_EMPLOYEE} requiredPerms={[permission.REGISTER_EMPLOYEE]}>
        <RegisterEmployee />
      </AuthorizedRoute>
      <AuthorizedRoute
        path={routerPath.ADMIN_REGISTER_INSTITUTION}
        requiredPerms={[permission.REGISTER_INSTITUTION, permission.SEARCH_SCHOOLS]}>
        <RegisterInstitution />
      </AuthorizedRoute>
      {/* FALLBACK 404 ROUTE */}
      <Route>
        <NotFoundRoute />
      </Route>
    </Switch>
  );
};

export default AdminRouter;
