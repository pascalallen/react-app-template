import _ from 'lodash';
import storePersist from '@/redux/storePersist';
import makeMockStore from '@/lib/test/makeMockStore';

describe('storePersist', () => {
  // module tests
  it('storePersist has proper type and keys', () => {
    expect(_.isObject(storePersist)).toBe(true);
    expect(_.keys(storePersist)).toEqual(['stateKeysToPersist', 'saveState', 'loadState']);
  });

  // stateKeysToPersist tests
  it('stateKeysToPersist should have the proper keys to be persisted', () => {
    const expectedKeys = { institution: true, jobs: true, ui: true };
    expect(expectedKeys).toEqual(storePersist.stateKeysToPersist);
  });

  // saveState tests
  it('saveState should persist state in localStorage', () => {
    const mockJobState = { job_key: { id: 'job_id', job_status: 'job_status' } };
    const mockStore = makeMockStore({ jobs: mockJobState });
    const state = mockStore.getState();
    storePersist.saveState(state);

    const persistedState = JSON.parse(localStorage.getItem('state') ?? '');
    _.forEach(storePersist.stateKeysToPersist, (stateValue, stateKey) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      expect(state[stateKey]).toEqual(persistedState[stateKey]);
    });
  });

  // loadState tests
  it('loadState should return undefined if there is no saved state', () => {
    localStorage.clear();
    expect(storePersist.loadState()).toBeUndefined();
  });

  it('loadState should return localStorage state if there is one', () => {
    const mockState = { fake: 'state' };
    localStorage.setItem('state', JSON.stringify(mockState));
    expect(storePersist.loadState()).toEqual(mockState);
  });

  it('loadState should return undefined if the saved state is null', () => {
    localStorage.setItem('state', JSON.stringify(null));
    expect(storePersist.loadState()).toBeUndefined();
  });

  it('loadState should return undefined if there is an error', () => {
    localStorage.setItem('state', '{ mal_formed: json }');
    expect(storePersist.loadState()).toBeUndefined();
  });
});
