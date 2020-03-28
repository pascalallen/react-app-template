import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ReduxThunkDispatch } from '@/types/redux';
import { mapDispatchToProps } from '@/lib/helpers/reduxHelper';
import { routerPath } from '@/router/common';
import userActions from '@/redux/user/userActions';
import PageContainer from '@/components/Layout/PageContainer/PageContainer';
import Logo from '@/components/Logo/Logo';

type Props = {
  dispatch: ReduxThunkDispatch;
};

const Home = (props: Props) => {
  const history = useHistory();
  const { dispatch } = props;

  const handleLogout = async (): Promise<void> => {
    try {
      await dispatch(userActions.logout());
    } finally {
      history.push(routerPath.LOGIN);
    }
  };

  return (
    <PageContainer name="home">
      <div className="row">
        <div className="col-md-4 offset-md-4">
          <div className="text-center">
            <Logo />
          </div>
        </div>
      </div>
      <h1 className="text-center mt-5">Hello OnlineMedEd</h1>
      <div className="text-center">
        <button id="logout-button" className="btn btn-primary logout-button" type="button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </PageContainer>
  );
};

export default connect(null, mapDispatchToProps)(Home);
