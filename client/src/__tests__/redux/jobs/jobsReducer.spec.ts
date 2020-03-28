import reducer, { initialState } from '@/redux/jobs/jobsReducer';
import jobsActionTypes from '@/redux/jobs/jobsActionTypes';
import appActionTypes from '@/redux/appActionTypes';

describe('jobsReducer', () => {
  it('should return the initial state', () => {
    expect(reducer(initialState, { type: '', payload: {} })).toEqual(initialState);
  });

  it('should return previous state if no action matches', () => {
    expect(reducer(initialState, { type: 'NOT_A_MATCH', payload: {} })).toEqual(initialState);
  });

  it('should handle SET_JOB action', () => {
    const setJobAction = {
      type: jobsActionTypes.SET_JOB,
      payload: {
        key: 'job_test_key',
        job: { fake: 'job' }
      }
    };

    const expectedState = {
      ...initialState,
      [setJobAction.payload.key]: setJobAction.payload.job
    };

    expect(reducer(initialState, setJobAction)).toEqual(expectedState);
  });

  it('should handle CLEAR_JOB action', () => {
    const job1 = { id: 'job1', job_status: 'FAKE_STATUS' };
    const job2 = { id: 'job2', job_status: 'FAKE_STATUS' };
    const initialState = { job_test_key1: job1, job_test_key2: job2 };

    const clearJobAction1 = {
      type: jobsActionTypes.CLEAR_JOB,
      payload: { key: 'job_test_key1' }
    };
    const expectedState1 = { job_test_key2: job2 };
    expect(reducer(initialState, clearJobAction1)).toEqual(expectedState1);

    const clearJobAction2 = {
      type: jobsActionTypes.CLEAR_JOB,
      payload: { key: 'job_test_key2' }
    };

    const expectedState2 = { job_test_key1: job1 };
    expect(reducer(initialState, clearJobAction2)).toEqual(expectedState2);

    const clearJobAction3 = {
      type: jobsActionTypes.CLEAR_JOB,
      payload: { key: 'not_a_job_key' }
    };

    expect(reducer(initialState, clearJobAction3)).toEqual(initialState);
  });

  it('should handle CLEAR_JOBS_STATE action', () => {
    const job1 = { id: 'job1', job_status: 'FAKE_STATUS' };
    const job2 = { id: 'job2', job_status: 'FAKE_STATUS' };
    const initialState = { job_test_key1: job1, job_test_key2: job2 };

    const clearJobsStateAction = {
      type: jobsActionTypes.CLEAR_JOBS_STATE,
      payload: {}
    };
    const expectedState = {};
    expect(reducer(initialState, clearJobsStateAction)).toEqual(expectedState);
  });

  it('should handle APP_CLEAR_STATE action', () => {
    const job1 = { id: 'job1', job_status: 'FAKE_STATUS' };
    const job2 = { id: 'job2', job_status: 'FAKE_STATUS' };
    const initialState = { job_test_key1: job1, job_test_key2: job2 };

    const clearAppStateAction = {
      type: appActionTypes.APP_CLEAR_STATE,
      payload: {}
    };
    const expectedState = {};
    expect(reducer(initialState, clearAppStateAction)).toEqual(expectedState);
  });
});
