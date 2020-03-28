import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { routerPath } from '@/router/common';
import AuthenticatedRoute from '@/router/AuthenticatedRoute.tsx';
import Home from '@/pages/home/Home';
import AdminRouter from '@/pages/admin/AdminRouter';
import InstitutionsRouter from '@/pages/institutions/InstitutionsRouter';
import Login from '@/pages/login/Login';
import RequestReset from '@/pages/request-reset/RequestReset';
import RequestResetComplete from '@/pages/request-reset-complete/RequestResetComplete';
import ResetPassword from '@/pages/reset-password/ResetPassword';
import Activate from '@/pages/activate/Activate';
import Welcome from '@/pages/welcome/Welcome';
import Forbidden from '@/pages/forbidden/Forbidden';
import ServerError from '@/pages/server-error/ServerError';
import NotFoundRoute from '@/router/NotFoundRoute/NotFoundRoute';

const Router = () => (
  <Switch>
    {/* AUTH PROTECTED ROUTES */}
    <AuthenticatedRoute exact path={routerPath.HOME}>
      <Home />
    </AuthenticatedRoute>
    <AuthenticatedRoute path={routerPath.ADMIN}>
      <AdminRouter />
    </AuthenticatedRoute>
    <AuthenticatedRoute path={routerPath.INSTITUTION}>
      <InstitutionsRouter />
    </AuthenticatedRoute>
    {/* PUBLIC ROUTES */}
    <Route path={routerPath.LOGIN}>
      <Login />
    </Route>
    <Route path={routerPath.REQUEST_RESET}>
      <RequestReset />
    </Route>
    <Route path={routerPath.REQUEST_RESET_COMPLETE}>
      <RequestResetComplete />
    </Route>
    <Route path={routerPath.RESET_PASSWORD}>
      <ResetPassword />
    </Route>
    <Route path={routerPath.ACTIVATE}>
      <Activate />
    </Route>
    <Route path={routerPath.WELCOME}>
      <Welcome />
    </Route>
    <Route path={routerPath.FORBIDDEN}>
      <Forbidden />
    </Route>
    <Route path={routerPath.SERVER_ERROR}>
      <ServerError />
    </Route>
    <Route path={routerPath.CLIENT_ERROR}>
      {/* TODO: create page for client-side errors */}
      <ServerError />
    </Route>
    {/* FALLBACK 404 ROUTE */}
    <Route>
      <NotFoundRoute />
    </Route>
  </Switch>
);

export default Router;
