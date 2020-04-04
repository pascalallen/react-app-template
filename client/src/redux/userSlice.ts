import { createSlice } from '@reduxjs/toolkit';
import { UserData } from '@/types/data';
import auth from '@/api/auth';
import { AppThunk } from '@/redux/store';

export type State = {
  data: UserData;
  error: string | null;
};

export const initialState: State = {
  data: {
    id: '',
    first_name: '',
    last_name: '',
    email_address: ''
  },
  error: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.data = action.payload.data;
      state.error = null;
    },
    loginFailed(state, action) {
      state.error = action.payload;
    },
    logoutSuccess(state) {
      // on logout, reset to initial state
      state = initialState;
    }
  }
});

export const { loginSuccess, loginFailed, logoutSuccess } = userSlice.actions;

export default userSlice.reducer;

export const login = (params: { email: string; password: string }): AppThunk => async dispatch => {
  try {
    const res = await auth.login(params);
    dispatch(loginSuccess(res));
  } catch (err) {
    dispatch(loginFailed(err.toString()));
  }
};

export const logout = (): AppThunk => async dispatch => {
  try {
    await auth.logout();
  } finally {
    dispatch(logoutSuccess());
  }
};
