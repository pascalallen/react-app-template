import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { mapDispatchToProps } from '@/lib/helpers/reduxHelper';
import { ReduxThunkDispatch } from '@/types/redux';
import { routerPath } from '@/router/common';
import userActions from '@/redux/user/userActions';
import { SideMenuIconButton } from '@/components/SideMenuWrapper';

type Props = {
  dispatch: ReduxThunkDispatch;
};

const SideMenuContent = (props: Props) => {
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
    <div className="side-menu-actions-container">
      <SideMenuIconButton
        id="side-nav-logout-button"
        className="action-button"
        iconClassName="fas fa-graduation-cap fa-1x"
        active={_.includes(location.pathname, routerPath.ADMIN_DASHBOARD_INSTITUTIONS)}
        text="Manage Institutions"
        onClick={() => history.push(routerPath.ADMIN_DASHBOARD_INSTITUTIONS)}
      />
      <SideMenuIconButton
        id="side-nav-logout-button"
        className="action-button"
        iconClassName="fas fa-user-circle fa-1x"
        text="Logout"
        onClick={handleLogout}
      />
    </div>
  );
};

export default connect(null, mapDispatchToProps)(SideMenuContent);
