import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyObject } from '@/types/common';
import { State as UserState } from '@/redux/user/userReducer';

export type AppAction = { type: string; payload: AnyObject };

export type RootState = {
  user: UserState;
};

export type ReduxThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;
