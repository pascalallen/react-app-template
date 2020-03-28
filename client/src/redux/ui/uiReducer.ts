import { AppAction } from '@/types/redux';
import appActionTypes from '@/redux/appActionTypes';
import uiActionTypes from '@/redux/ui/uiActionTypes';

export type State = {
  showSideMenu: boolean;
};

export const initialState: State = {
  showSideMenu: true
};

const reducer = (state: State = initialState, action: AppAction): State => {
  switch (action.type) {
    case uiActionTypes.SET_SHOW_SIDE_MENU: {
      const { showSideMenu } = action.payload;

      return { ...state, showSideMenu };
    }
    case appActionTypes.APP_CLEAR_STATE: {
      return initialState;
    }
  }
  return state;
};

export default reducer;
