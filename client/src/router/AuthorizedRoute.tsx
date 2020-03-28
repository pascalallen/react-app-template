import _ from 'lodash';
import React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import userHelper from '@/lib/helpers/userHelper';
import { routerPath } from '@/router/common';

type Props = RouteProps & {
  requiredPerms: string[];
};

const AuthorizedRoute = (props: Props) => {
  const { requiredPerms = [], children } = props;

  if (!_.isEmpty(requiredPerms) && !userHelper.hasPermissions(requiredPerms)) {
    return <Redirect to={routerPath.FORBIDDEN} />;
  }

  return !!children ? <Route {...props}>{children}</Route> : <Route {...props} />;
};

export default AuthorizedRoute;
