import reducer, { initialState } from '@/redux/ui/uiReducer';
import uiActionAtypes from '@/redux/ui/uiActionTypes';
import appActionTypes from '@/redux/appActionTypes';

describe('uiReducer', () => {
  it('should return the initial state', () => {
    expect(reducer(initialState, { type: '', payload: {} })).toEqual(initialState);
  });

  it('should return previous state if no action matches', () => {
    expect(reducer(initialState, { type: 'NOT_A_MATCH', payload: {} })).toEqual(initialState);
  });

  it('should handle SET_SHOW_SIDE_MENU action', () => {
    const setShowSideMenuAction = {
      type: uiActionAtypes.SET_SHOW_SIDE_MENU,
      payload: { showSideMenu: false }
    };

    const expectedState = {
      ...initialState,
      showSideMenu: setShowSideMenuAction.payload.showSideMenu
    };

    expect(reducer(initialState, setShowSideMenuAction)).toEqual(expectedState);
  });

  it('should handle APP_CLEAR_STATE action', () => {
    const initialState = { showSideMenu: false };

    const clearAppStateAction = {
      type: appActionTypes.APP_CLEAR_STATE,
      payload: {}
    };

    const expectedState = { showSideMenu: true };
    expect(reducer(initialState, clearAppStateAction)).toEqual(expectedState);
  });
});
