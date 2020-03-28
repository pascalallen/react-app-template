import _ from 'lodash';
import store from '@/redux/store';
import reduxHelper from '@/lib/helpers/reduxHelper';

// mocked objects
const mockState = { mock: 'state' };

// mocked modules
jest.mock('@/redux/store', () => ({
  getState: jest.fn().mockImplementation(() => {
    return mockState;
  }),
  dispatch: jest.fn()
}));

describe('reduxHelper', () => {
  // module tests
  it('reduxHelper has proper type and keys', () => {
    expect(_.isObject(reduxHelper)).toBe(true);
    expect(_.keys(reduxHelper)).toEqual(['mapReduxProps', 'mapDispatchToProps']);
  });

  // mapReduxProps tests
  it('mapReduxProps retrieves state and dispatch', () => {
    const { state, dispatch } = reduxHelper.mapReduxProps();
    expect(state).toEqual(mockState);
    expect(dispatch).toBe(store.dispatch);
  });

  // mapDispatchToProps tests
  it('mapDispatchToProps retrieves store dispatch', () => {
    const mockDispatch = jest.fn();
    const mappedDispatchObj = reduxHelper.mapDispatchToProps(mockDispatch);

    expect(mappedDispatchObj.dispatch).toBe(mockDispatch);
  });
});
