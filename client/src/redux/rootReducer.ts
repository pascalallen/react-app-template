import { combineReducers } from '@reduxjs/toolkit';

// bring in reducers from your slices here
import userReducer from '@/redux/userSlice';

const rootReducer = combineReducers({
  user: userReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
