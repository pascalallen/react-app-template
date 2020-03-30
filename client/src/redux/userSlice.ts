import { createSlice } from '@reduxjs/toolkit';
import { UserData } from '@/types/data';
import auth from '@/api/auth';

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

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    login(state, action) {
      const { data } = action.payload;
      const res = await auth.login(data);

      if (!res.data) {
        throw new Error('Login failed!');
      }

      return { ...state, data: res.data };
    },
    logout() {
      await auth.logout();

      return initialState;
    }
  }
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
