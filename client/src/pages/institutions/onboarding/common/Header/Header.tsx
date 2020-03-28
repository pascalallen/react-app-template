import React from 'react';
import { connect } from 'react-redux';
import { ReduxThunkDispatch } from '@/types/redux';
import { mapDispatchToProps } from '@/lib/helpers/reduxHelper';
import { useHistory } from 'react-router-dom';
import userActions from '@/redux/user/userActions';
import { routerPath } from '@/router/common';
import Logo from '@/components/Logo/Logo';

type Props = {
  dispatch: ReduxThunkDispatch;
};

const Header = (props: Props) => {
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
    <div className="header-row row">
      <div className="col-auto mr-auto">
        <Logo />
      </div>
      <div className="col-auto">
        <button id="logout-button" className="btn btn-link logout-button p-0" type="button" onClick={handleLogout}>
          <span className="logout-button-text font-size-sm">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(Header);
