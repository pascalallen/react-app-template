import _ from 'lodash';
import jobsActions from '@/redux/jobs/jobsActions';
import jobsActionTypes from '@/redux/jobs/jobsActionTypes';
import makeMockStore from '@/lib/test/makeMockStore';

// mocked objects

describe('jobsActions', () => {
  // module tests
  it('jobsActions has proper type and keys', () => {
    expect(_.isObject(jobsActions)).toBe(true);
    expect(_.keys(jobsActions)).toEqual(['setJob', 'clearJob']);
  });

  // jobsActions.setJob tests
  it('jobsActions.setJob should dispatch proper actions with proper type and payload', async () => {
    const store = makeMockStore();
    const mockJobType = 'job_key';
    const mockJob = { id: 'job', job_status: 'fake_status' };

    await store.dispatch(jobsActions.setJob(mockJobType, mockJob));

    const actions = store.getActions();
    expect(actions[0].type).toEqual(jobsActionTypes.SET_JOB);
    expect(actions[0].payload.key).toEqual(mockJobType);
    expect(actions[0].payload.job).toEqual(mockJob);
  });

  // jobsActions.setJob tests
  it('jobsActions.clearJob should dispatch proper actions with proper type and payload', async () => {
    const store = makeMockStore();
    const mockJobType = 'job_key';

    await store.dispatch(jobsActions.clearJob(mockJobType));

    const actions = store.getActions();
    expect(actions[0].type).toEqual(jobsActionTypes.CLEAR_JOB);
    expect(actions[0].payload.key).toEqual(mockJobType);
  });
});
