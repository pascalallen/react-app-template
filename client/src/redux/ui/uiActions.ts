import { Dispatch } from 'redux';
import uiActionTypes from '@/redux/ui/uiActionTypes';

const setShowSideMenu = (showSideMenu: boolean) => (dispatch: Dispatch): void => {
  dispatch({
    type: uiActionTypes.SET_SHOW_SIDE_MENU,
    payload: { showSideMenu }
  });
};

export default Object.freeze({
  setShowSideMenu
});
