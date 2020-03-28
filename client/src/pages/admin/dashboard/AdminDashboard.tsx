import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { routerPath } from '@/router/common';
import NotFoundRoute from '@/router/NotFoundRoute/NotFoundRoute';
import SideMenuWrapper from '@/components/SideMenuWrapper/SideMenuWrapper';
import SideMenuContent from './components/SideMenuContent/SideMenuContent';
import ManageInstitutions from './manage-institutions/ManageInstitutions';

const AdminDashboard = () => {
  const renderRoutes = () => {
    return (
      <Switch>
        <Route exact path={routerPath.ADMIN_DASHBOARD_INSTITUTIONS}>
          <ManageInstitutions />
        </Route>
        <Route exact path={routerPath.ADMIN_DASHBOARD_INSTITUTIONS_REGISTER}>
          <ManageInstitutions />
        </Route>
        {/*Fallback 404 Route*/}
        <Route>
          <NotFoundRoute />
        </Route>
      </Switch>
    );
  };

  return (
    <div className="admin-dashboard-container">
      {/*TODO: We might need to change this to something else once we know what the home route is going to be*/}
      <SideMenuWrapper logoUrlPath={routerPath.ADMIN_DASHBOARD_INSTITUTIONS} sideMenuContent={<SideMenuContent />}>
        {renderRoutes()}
      </SideMenuWrapper>
    </div>
  );
};

export default AdminDashboard;
