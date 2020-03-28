import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyObject } from '@/types/common';
import { State as InstitutionState } from '@/redux/institution/institutionReducer';
import { State as JobState } from '@/redux/jobs/jobsReducer';
import { State as UiState } from '@/redux/ui/uiReducer';
import { State as UserState } from '@/redux/user/userReducer';

export type AppAction = { type: string; payload: AnyObject };

export type RootState = {
  institution: InstitutionState;
  jobs: JobState;
  ui: UiState;
  user: UserState;
};

export type ReduxThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;
