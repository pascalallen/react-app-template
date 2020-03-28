import { Dispatch } from 'redux';
import { Job } from '@/types/data';
import jobsActionTypes from '@/redux/jobs/jobsActionTypes';

const setJob = (jobType: string, job: Job) => (dispatch: Dispatch): void => {
  dispatch({
    type: jobsActionTypes.SET_JOB,
    payload: {
      key: jobType,
      job: {
        ...job,
        id: job.id,
        job_status: job.job_status
      }
    }
  });
};

const clearJob = (jobType: string) => (dispatch: Dispatch): void => {
  dispatch({
    type: jobsActionTypes.CLEAR_JOB,
    payload: {
      key: jobType
    }
  });
};

export default Object.freeze({
  setJob,
  clearJob
});
