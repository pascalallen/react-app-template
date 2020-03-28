import { hashStrArray } from '@/lib/common';
import { StringObject } from '@/types/common';
import { AppAction } from '@/types/redux';
import { UserData } from '@/types/data';
import appActionTypes from '@/redux/appActionTypes';
import userActionTypes from '@/redux/user/userActionTypes';

export type State = {
  token: string;
  token_data: {
    exp: number; // jwt token expire unix timestamp
    iat: number; // jwt token issued at unix timestamp
    id: string;
  };
  client_logged_at: number; // logged_at unix timestamp
  data: UserData;
  permissions: StringObject;
  roles: StringObject;
};

export const initialState: State = {
  token: '',
  token_data: {
    exp: 0,
    iat: 0,
    id: ''
  },
  client_logged_at: 0,
  data: {
    id: '',
    first_name: '',
    last_name: '',
    email_address: '',
    activation_status: '',
    institution: null,
    roles: [],
    permissions: [],
    registered_at: '',
    modified_at: ''
  },
  permissions: {},
  roles: {}
};

const reducer = (state: State = initialState, action: AppAction): State => {
  switch (action.type) {
    case userActionTypes.SET_TOKEN: {
      const { token, token_data, client_logged_at } = action.payload;
      return { ...state, token, token_data, client_logged_at };
    }
    case userActionTypes.SET_USER: {
      const { data } = action.payload;

      const roles = hashStrArray(data.roles);
      const permissions = hashStrArray(data.permissions);

      return { ...state, data, roles, permissions };
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
