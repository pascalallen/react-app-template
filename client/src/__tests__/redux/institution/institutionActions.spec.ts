import _ from 'lodash';
import institutionActions from '@/redux/institution/institutionActions';
import institutionActionTypes from '@/redux/institution/institutionActionTypes';
import makeMockStore from '@/lib/test/makeMockStore';
import errorHelper from '@/lib/helpers/errorHelper';
import { appErrorMessages } from '@/constants/errors';

// mocked objects
const mockInstitutionData = {
  id: 'institution_id',
  name: 'institution_name',
  school_id: 'school_id',
  contract_parameters: {
    max_students: 100,
    max_faculty: 10,
    modified_at: 'a_date'
  },
  primary_user_id: 'primary_user_id',
  users: ['user_1', 'user_2'],
  onboarding_complete: false,
  registered_at: 'a_date',
  modified_at: 'a_date'
};

const mockInstitutionGroups = [
  {
    id: '01709b71-660e-4337-93a2-bf53fae3daf1',
    name: '2021 Class Year',
    active_students: 1048
  },
  {
    id: '01709b71-6647-4162-9c97-d3264f2ef7fb',
    name: '2022 Class Year',
    active_students: 1056
  },
  {
    id: '01709b71-6627-44c1-91d0-1a149ddf8819',
    name: '2023 Class Year',
    active_students: 1040
  },
  {
    id: '01709b71-661f-43a2-bb0d-d13c1eb67407',
    name: '2024 Class Year',
    active_students: 1056
  }
];

const mockFacultyMemberFormParams = {
  first_name: 'Leeroy',
  last_name: 'Jenkins',
  email: 'ljenkins@life.edu'
};

const testError = {
  type: 'TEST_ERROR',
  message: 'test error!'
};

const mockUserId = 'some_user_id';

// mocked modules
jest.mock('@/api/institutionApi', () => ({
  getGroups: jest
    .fn()
    // @1a
    .mockImplementationOnce(() => {
      return Promise.resolve({
        data: {
          records: mockInstitutionGroups
        }
      });
    })
    // @1b
    .mockImplementationOnce(() => {
      return Promise.resolve({
        data: {}
      });
    })
    // @1c
    .mockImplementationOnce(() => {
      return Promise.reject(testError);
    }),
  registerFacultyMember: jest
    .fn()
    // @2a
    .mockImplementationOnce(() => {
      return Promise.resolve({
        data: {
          id: mockUserId
        }
      });
    })
    // @2b
    .mockImplementationOnce(() => {
      return Promise.resolve({
        data: {}
      });
    })
    // @2c
    .mockImplementationOnce(() => {
      return Promise.reject(testError);
    }),
  removeFacultyMember: jest
    .fn()
    // @3a
    .mockImplementationOnce(() => {
      return Promise.resolve({
        data: null
      });
    })
}));

describe('institutionActions', () => {
  // module tests
  it('institutionActions has proper type and keys', () => {
    expect(_.isObject(institutionActions)).toBe(true);
    expect(_.keys(institutionActions)).toEqual([
      'setInstitution',
      'clearInstitution',
      'getInstitutionGroups',
      'registerFacultyMember',
      'removeFacultyMember'
    ]);
  });

  // institutionActions.setInstitution tests
  it('institutionActions.setInstitution should dispatch proper actions with proper type and payload', async () => {
    const store = makeMockStore();

    await store.dispatch(institutionActions.setInstitution(mockInstitutionData));

    const actions = store.getActions();
    expect(actions[0].type).toEqual(institutionActionTypes.SET_INSTITUTION);
    expect(actions[0].payload.data).toEqual(mockInstitutionData);
  });

  // institutionActions.clearInstitution tests
  it('institutionActions.clearInstitution should dispatch proper actions with proper type and payload', async () => {
    const store = makeMockStore();
    await store.dispatch(institutionActions.clearInstitution());

    const actions = store.getActions();
    expect(actions[0].type).toEqual(institutionActionTypes.CLEAR_INSTITUTION);
  });

  // institutionActions.getInstitutionGroups tests
  // @1a
  it('institutionActions.getInstitutionGroups should dispatch proper actions with proper type and payload', async () => {
    const store = makeMockStore();
    await store.dispatch(institutionActions.getInstitutionGroups('some_institution_id'));

    const actions = store.getActions();
    expect(actions[0].type).toEqual(institutionActionTypes.SET_INSTITUTION_GROUPS);
    expect(actions[0].payload.groups).toEqual(mockInstitutionGroups);
  });

  // @1b
  it('institutionActions.getInstitutionGroups should throw proper error if wrong data object comes from api', async () => {
    const store = makeMockStore();
    try {
      const thunk = institutionActions.getInstitutionGroups('some_institution_id');
      await store.dispatch(thunk);
      expect(thunk).toThrow();
    } catch (error) {
      expect(error).toEqual(errorHelper.makeAppError(appErrorMessages.UNEXPECTED_API_OBJECT));
      const actions = store.getActions();
      expect(actions).toEqual([]);
    }
  });

  // @1c
  it('institutionActions.getInstitutionGroups should throw same error api throws', async () => {
    const store = makeMockStore();
    try {
      const thunk = institutionActions.getInstitutionGroups('some_institution_id');
      await store.dispatch(thunk);
      expect(thunk).toThrow();
    } catch (error) {
      expect(error).toEqual(testError);
      const actions = store.getActions();
      expect(actions).toEqual([]);
    }
  });

  // institutionActions.registerFacultyMember tests
  // @2a
  it('institutionActions.registerFacultyMember should dispatch proper actions with proper type and payload', async () => {
    const store = makeMockStore();
    await store.dispatch(institutionActions.registerFacultyMember('some_institution_id', mockFacultyMemberFormParams));

    const actions = store.getActions();
    expect(actions[0].type).toEqual(institutionActionTypes.ADD_INSTITUTION_USER);
    expect(actions[0].payload.userId).toEqual(mockUserId);
  });

  // @2b
  it('institutionActions.registerFacultyMember should throw proper error if wrong data object comes from api', async () => {
    const store = makeMockStore();
    try {
      const thunk = institutionActions.registerFacultyMember('some_institution_id', mockFacultyMemberFormParams);
      await store.dispatch(thunk);
      expect(thunk).toThrow();
    } catch (error) {
      expect(error).toEqual(errorHelper.makeAppError(appErrorMessages.UNEXPECTED_API_OBJECT));
      const actions = store.getActions();
      expect(actions).toEqual([]);
    }
  });

  // @2c
  it('institutionActions.registerFacultyMember should throw same error api throws', async () => {
    const store = makeMockStore();
    try {
      const thunk = institutionActions.registerFacultyMember('some_institution_id', mockFacultyMemberFormParams);
      await store.dispatch(thunk);
      expect(thunk).toThrow();
    } catch (error) {
      expect(error).toEqual(testError);
      const actions = store.getActions();
      expect(actions).toEqual([]);
    }
  });

  // institutionActions.removeFacultyMember tests
  // @3a
  it('institutionActions.removeFacultyMember should dispatch proper actions with proper type and payload', async () => {
    const store = makeMockStore();
    const userIdToRemove = mockInstitutionData.users[0];
    await store.dispatch(institutionActions.removeFacultyMember(mockInstitutionData.id, userIdToRemove));

    const actions = store.getActions();
    expect(actions[0].type).toEqual(institutionActionTypes.REMOVE_INSTITUTION_USER);
    expect(actions[0].payload.userId).toEqual(userIdToRemove);
  });
});
