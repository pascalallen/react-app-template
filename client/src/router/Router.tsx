import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { routerPath } from '@/router/common';
import Home from '@/pages/home/Home';

const Router = () => (
  <Switch>
    <Route path={routerPath.HOME}>
      <Home />
    </Route>
  </Switch>
);

export default Router;
