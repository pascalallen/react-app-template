import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { useMatch } from '@/lib/customHooks';
import { permission } from '@/constants/userAccess';
import { routerPath } from '@/router/common';
import AuthorizedRoute from '@/router/AuthorizedRoute';
import NotFoundRoute from '@/router/NotFoundRoute/NotFoundRoute';
import SideMenuWrapper from '@/components/SideMenuWrapper';
import SideMenuContent from './components/SideMenuContent/SideMenuContent';
import Group from './group/Group';
import ManageFaculty from './manage-faculty/ManageFaculty';

const InstitutionsDashboard = () => {
  const location = useLocation();
  const { params } = useMatch();
  const institutionId: string = params.institutionId ?? '';

  const renderRoutes = () => {
    return (
      <Switch>
        <AuthorizedRoute
          exact
          path={routerPath.INSTITUTION}
          requiredPerms={[permission.VIEW_GROUPS, permission.VIEW_STUDENTS]}>
          <Group
            /*
             * this key is needed to let react know that it needs
             * to update the component tree when the url changes
             */
            key={`${location.pathname}${location.search}`}
          />
        </AuthorizedRoute>
        <AuthorizedRoute
          path={routerPath.INSTITUTION_GROUP}
          requiredPerms={[permission.VIEW_GROUPS, permission.VIEW_STUDENTS]}>
          <Group
            /*
             * this key is needed to let react know that it needs
             * to update the component tree when the url changes
             */
            key={`${location.pathname}${location.search}`}
          />
        </AuthorizedRoute>
        <Route path={routerPath.INSTITUTION_FACULTY_MEMBERS}>
          <ManageFaculty />
        </Route>
        {/*Fallback 404 Route*/}
        <Route>
          <NotFoundRoute />
        </Route>
      </Switch>
    );
  };

  return (
    <div className="institutions-home-container">
      <SideMenuWrapper
        logoUrlPath={`${routerPath.INSTITUTIONS}/${institutionId}`}
        sideMenuContent={<SideMenuContent />}>
        {renderRoutes()}
      </SideMenuWrapper>
    </div>
  );
};

export default InstitutionsDashboard;
