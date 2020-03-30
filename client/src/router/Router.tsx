import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { routerPath } from '@/router/common';
import Home from '@/pages/home/Home';
import FundingRequests from '@/pages/funding-requests/FundingRequests';

const Router = () => (
  <Switch>
    <Route exact path={routerPath.HOME}>
      <Home />
    </Route>
    <Route path={routerPath.FUNDING_REQUESTS}>
      <FundingRequests />
    </Route>
  </Switch>
);

export default Router;
