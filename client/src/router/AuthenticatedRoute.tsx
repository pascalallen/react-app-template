import React, { useState, useEffect } from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { RootState, ReduxThunkDispatch } from '@/types/redux';
import { mapDispatchToProps } from '@/lib/helpers/reduxHelper';
import userActions from '@/redux/user/userActions';
import apiHelper from '@/lib/helpers/apiHelper';
import { routerPath } from '@/router/common';
import LoadingPage from '@/components/LoadingPage/LoadingPage';

type Props = RouteProps & {
  dispatch: ReduxThunkDispatch;
  token: string;
};

const AuthenticatedRoute = (props: Props) => {
  const { dispatch, token, children } = props;
  const [verifyingUser, setVerifyingUser] = useState(true);
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  useEffect(() => {
    let mounted = true;

    const verifyUserAuth = async (): Promise<void> => {
      try {
        setVerifyingUser(true);

        if (!token) {
          await dispatch(userActions.refreshToken());
        }

        if (apiHelper.isApiTokenExpired()) {
          await dispatch(userActions.refreshToken());
        }

        if (mounted) {
          setVerifyingUser(false);
        }
      } catch (error) {
        if (mounted) {
          setVerifyingUser(false);
          setRedirectToLogin(true);
        }
      }
    };

    verifyUserAuth();

    return () => {
      mounted = false;
    };
  }, [token]);

  if (verifyingUser) {
    return <LoadingPage />;
  }

  if (redirectToLogin) {
    return <Redirect to={routerPath.LOGIN} />;
  }

  return !!children ? <Route {...props}>{children}</Route> : <Route {...props} />;
};

const mapStateToProps = (state: RootState) => ({
  token: state.user.token
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticatedRoute);
