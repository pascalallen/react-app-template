import _ from 'lodash';
import uiActions from '@/redux/ui/uiActions';
import uiActionTypes from '@/redux/ui/uiActionTypes';
import makeMockStore from '@/lib/test/makeMockStore';

describe('uiActions', () => {
  // module tests
  it('uiActions has proper type and keys', () => {
    expect(_.isObject(uiActions)).toBe(true);
    expect(_.keys(uiActions)).toEqual(['setShowSideMenu']);
  });

  // uiActions.setShowSideMenu tests
  it('uiActions.setShowSideMenu should dispatch proper actions with proper type and payload', async () => {
    const store = makeMockStore();
    await store.dispatch(uiActions.setShowSideMenu(false));

    const actions = store.getActions();
    expect(actions[0].type).toEqual(uiActionTypes.SET_SHOW_SIDE_MENU);
    expect(actions[0].payload.showSideMenu).toEqual(false);
  });
});
