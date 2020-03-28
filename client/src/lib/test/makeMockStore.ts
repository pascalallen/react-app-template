import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { RootState, ReduxThunkDispatch } from '@/types/redux';
import { initialState as institutionInitialState } from '@/redux/institution/institutionReducer';
import { initialState as jobsInitialState } from '@/redux/jobs/jobsReducer';
import { initialState as uiInitialState } from '@/redux/ui/uiReducer';
import { initialState as userInitialState } from '@/redux/user/userReducer';

const makeMockStore = (state = {}) => {
  const mockStore = configureMockStore<RootState, ReduxThunkDispatch>([thunk]);
  const initialState: RootState = {
    institution: institutionInitialState,
    jobs: jobsInitialState,
    ui: uiInitialState,
    user: userInitialState
  };

  return mockStore({ ...initialState, ...state });
};

export default makeMockStore;
