import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyObject } from '@/types/common';
import { State as UserState } from '@/redux/userSlice';

export type AppAction = { type: string; payload: AnyObject }; // may not be necessary

export type RootState = {
  user: UserState;
};

export type ReduxThunkDispatch = ThunkDispatch<RootState, any, AnyAction>; // may not be necessary
