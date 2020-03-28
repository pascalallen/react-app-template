import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, useHistory } from 'react-router-dom';
import { routerPath } from '@/router/common';
import { useMatch } from '@/lib/customHooks';
import { RootState } from '@/types/redux';
import { State as InstitutionState } from '@/redux/institution/institutionReducer';
import { permission } from '@/constants/userAccess';
import NotFoundRoute from '@/router/NotFoundRoute/NotFoundRoute';
import AuthorizedRoute from '@/router/AuthorizedRoute';
import InstitutionsDashboard from './dashboard/InstitutionsDashboard';
import Onboarding from './onboarding/Onboarding';
import Student from './student/Student';

type Props = {
  institution: InstitutionState;
};

const InstitutionsRouter = (props: Props) => {
  const history = useHistory();
  const { params } = useMatch();
  const institutionId: string = params.institutionId ?? '';
  const { institution } = props;

  useEffect(() => {
    if (institutionId !== institution.data?.id) {
      // faculty user doesn't belong to institution
      return history.push(routerPath.FORBIDDEN);
    }
  }, []);

  return (
    <Switch>
      <Route exact path={routerPath.INSTITUTION}>
        <InstitutionsDashboard />
      </Route>
      <Route path={routerPath.INSTITUTION_GROUP}>
        <InstitutionsDashboard />
      </Route>
      <Route path={routerPath.INSTITUTION_FACULTY_MEMBERS}>
        <InstitutionsDashboard />
      </Route>
      <Route path={routerPath.INSTITUTION_ONBOARDING}>
        <Onboarding />
      </Route>
      <AuthorizedRoute path={routerPath.INSTITUTION_STUDENT} requiredPerms={[permission.VIEW_STUDENTS]}>
        <Student />
      </AuthorizedRoute>
      {/* FALLBACK 404 ROUTE */}
      <Route>
        <NotFoundRoute />
      </Route>
    </Switch>
  );
};

const mapStateToProps = (state: RootState) => ({
  institution: state.institution
});

export default connect(mapStateToProps)(InstitutionsRouter);
