import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { mapDispatchToProps } from '@/lib/helpers/reduxHelper';
import { ReduxThunkDispatch, RootState } from '@/types/redux';
import { State as UiState } from '@/redux/ui/uiReducer';
import uiActions from '@/redux/ui/uiActions';
import LogoImg from '@/assets/images/OME_Button_Logo.png';

type Props = {
  dispatch: ReduxThunkDispatch;
  ui: UiState;
  id: string;
  className?: string;
};

const SideMenuToggle = (props: Props) => {
  const { dispatch, ui, id, className = '' } = props;

  const show = !ui.showSideMenu;

  const handleToggleSideMenu = () => {
    dispatch(uiActions.setShowSideMenu(!ui.showSideMenu));
  };

  return (
    <button
      id={id}
      className={classnames(
        'menu-button',
        'align-items-center',
        'justify-content-center',
        show ? 'd-inline-block' : 'd-none',
        className
      )}
      onClick={handleToggleSideMenu}>
      <img id="btn-logo" className="img-fluid logo" src={LogoImg} alt="OnlineMedEd Logo" />
      <span className="fas fa-bars fa-1x font-size-md" />
    </button>
  );
};

const mapStateToProps = (state: RootState) => ({
  ui: state.ui
});

export default connect(mapStateToProps, mapDispatchToProps)(SideMenuToggle);
