import _ from 'lodash';
import { AppAction } from '@/types/redux';
import appActionTypes from '@/redux/appActionTypes';
import jobsActionTypes from '@/redux/jobs/jobsActionTypes';
import { Job } from '@/types/data';

export type State = {
  [key: string]: Job;
};

export const initialState: State = {};

const reducer = (state: State = initialState, action: AppAction): State => {
  switch (action.type) {
    case jobsActionTypes.SET_JOB: {
      const { key, job } = action.payload;

      return { ...state, [key]: job };
    }
    case jobsActionTypes.CLEAR_JOB: {
      const { key } = action.payload;

      return _.omit(state, key);
    }
    case jobsActionTypes.CLEAR_JOBS_STATE: {
      return initialState;
    }
    case appActionTypes.APP_CLEAR_STATE: {
      return initialState;
    }
  }
  return state;
};

export default reducer;
