import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import MenuHeader from './MenuHeader/MenuHeader';
import { RootState } from '@/types/redux';
import { mapDispatchToProps } from '@/lib/helpers/reduxHelper';
import { State as UiState } from '@/redux/ui/uiReducer';

type Props = {
  ui: UiState;
  logoUrlPath: string;
  sideMenuContent: React.ReactNode | null;
  children?: React.ReactNode | null;
};

const SideMenuWrapper = (props: Props) => {
  const { ui, logoUrlPath, sideMenuContent, children } = props;

  return (
    <div className="side-menu-wrapper vh-100 vw-100">
      <nav
        className={classnames(
          'side-menu-container',
          'bg-white',
          'h-100',
          'fixed-top',
          ui.showSideMenu ? 'open-side-menu-container' : 'closed-side-menu-container'
        )}>
        <div className="side-menu-inner-container">
          <MenuHeader logoUrlPath={logoUrlPath} />
          <div className="side-menu-body-container">{sideMenuContent}</div>
        </div>
      </nav>
      <div
        className={classnames(
          'content-container',
          ui.showSideMenu ? 'pushed-content-container' : 'full-content-container ml-0'
        )}>
        {children}
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  ui: state.ui
});

export default connect(mapStateToProps, mapDispatchToProps)(SideMenuWrapper);
