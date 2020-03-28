import { ReduxThunkDispatch, RootState } from '@/types/redux';
import store from '@/redux/store';

const mapReduxProps = () => {
  const state: RootState = store.getState();
  const dispatch: ReduxThunkDispatch = store.dispatch;

  return { state, dispatch };
};

export const mapDispatchToProps = (dispatch: ReduxThunkDispatch) => ({ dispatch });

export default Object.freeze({
  mapReduxProps,
  mapDispatchToProps
});
