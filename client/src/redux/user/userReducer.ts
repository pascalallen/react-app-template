import { AppAction } from '@/types/redux';
import { UserData } from '@/types/data';
import appActionTypes from '@/redux/appActionTypes';
import userActionTypes from '@/redux/user/userActionTypes';

export type State = {
  data: UserData;
};

export const initialState: State = {
  data: {
    id: '',
    first_name: '',
    last_name: '',
    email_address: '',
  },
};

const reducer = (state: State = initialState, action: AppAction): State => {
  switch (action.type) {
    case userActionTypes.SET_USER: {
      const { data } = action.payload;

      return { ...state, data };
    }
    case userActionTypes.CLEAR_USER_STATE: {
      return initialState;
    }
    case appActionTypes.APP_CLEAR_STATE: {
      return initialState;
    }
  }
  return state;
};

export default reducer;
