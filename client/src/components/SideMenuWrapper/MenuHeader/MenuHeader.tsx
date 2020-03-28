import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { mapDispatchToProps } from '@/lib/helpers/reduxHelper';
import { ReduxThunkDispatch } from '@/types/redux';
import uiActions from '@/redux/ui/uiActions';
import Logo from '@/components/Logo/Logo';

type Props = {
  dispatch: ReduxThunkDispatch;
  logoUrlPath: string;
};

const MenuHeader = (props: Props) => {
  const history = useHistory();
  const { dispatch, logoUrlPath } = props;

  const handleCloseSideMenu = () => {
    dispatch(uiActions.setShowSideMenu(false));
  };

  return (
    <div className="side-menu-header-container">
      <div className="side-menu-header-top d-flex align-items-center justify-content-between w-100">
        <a
          id="side-menu-header-logo-btn"
          className="side-menu-header-logo-btn bg-transparent border-0 p-0"
          href={logoUrlPath}
          onClick={event => {
            event.preventDefault();
            history.push(logoUrlPath);
          }}>
          <Logo />
        </a>
        <button
          id="side-nav-header-close-btn"
          className="side-nav-header-close-btn bg-transparent border-0"
          onClick={handleCloseSideMenu}>
          <span className="fas fa-angle-left fa-1x font-size-md" />
        </button>
      </div>
      <h6 className="side-menu-header-sub-text font-size-xs font-weight-bold">FACULTY</h6>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(MenuHeader);
