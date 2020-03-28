import _ from 'lodash';
import reducer, { initialState } from '@/redux/institution/institutionReducer';
import institutionActionTypes from '@/redux/institution/institutionActionTypes';
import appActionTypes from '@/redux/appActionTypes';

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
    total_students: 1048
  },
  {
    id: '01709b71-6647-4162-9c97-d3264f2ef7fb',
    name: '2022 Class Year',
    total_students: 1056
  },
  {
    id: '01709b71-6627-44c1-91d0-1a149ddf8819',
    name: '2023 Class Year',
    total_students: 1040
  },
  {
    id: '01709b71-661f-43a2-bb0d-d13c1eb67407',
    name: '2024 Class Year',
    total_students: 1056
  }
];

const mockUserId = 'some_user_id';

describe('institutionReducer', () => {
  it('should return the initial state', () => {
    expect(reducer(initialState, { type: '', payload: {} })).toEqual(initialState);
  });

  it('should return previous state if no action matches', () => {
    expect(reducer(initialState, { type: 'NOT_A_MATCH', payload: {} })).toEqual(initialState);
  });

  it('should handle SET_INSTITUTION action', () => {
    const setInstitutionAction = {
      type: institutionActionTypes.SET_INSTITUTION,
      payload: {
        data: mockInstitutionData
      }
    };

    const expectedState = {
      ...initialState,
      data: setInstitutionAction.payload.data
    };

    expect(reducer(initialState, setInstitutionAction)).toEqual(expectedState);
  });

  it('should handle CLEAR_INSTITUTION action', () => {
    const initialState = { data: mockInstitutionData, groups: mockInstitutionGroups };

    const clearInstitutionAction = {
      type: institutionActionTypes.CLEAR_INSTITUTION,
      payload: {}
    };

    const expectedState = { data: null, groups: [] };
    expect(reducer(initialState, clearInstitutionAction)).toEqual(expectedState);
  });

  it('should handle SET_INSTITUTION_GROUPS action', () => {
    const setInstitutionGroupsAction = {
      type: institutionActionTypes.SET_INSTITUTION_GROUPS,
      payload: {
        groups: mockInstitutionGroups
      }
    };

    const expectedState = {
      ...initialState,
      groups: setInstitutionGroupsAction.payload.groups
    };

    expect(reducer(initialState, setInstitutionGroupsAction)).toEqual(expectedState);
  });

  it('should handle APP_CLEAR_STATE action', () => {
    const initialState = { data: mockInstitutionData, groups: mockInstitutionGroups };

    const clearAppStateAction = {
      type: appActionTypes.APP_CLEAR_STATE,
      payload: {}
    };

    const expectedState = { data: null, groups: [] };
    expect(reducer(initialState, clearAppStateAction)).toEqual(expectedState);
  });

  it('should handle ADD_INSTITUTION_USER action', () => {
    const initialState1 = { data: null, groups: mockInstitutionGroups };
    const addInstitutionUserAction1 = {
      type: institutionActionTypes.ADD_INSTITUTION_USER,
      payload: {
        userId: mockUserId
      }
    };
    expect(reducer(initialState1, addInstitutionUserAction1)).toEqual(initialState1);

    const initialState2 = { data: mockInstitutionData, groups: mockInstitutionGroups };
    const addInstitutionUserAction2 = {
      type: institutionActionTypes.ADD_INSTITUTION_USER,
      payload: {
        userId: mockUserId
      }
    };
    const expectedState = {
      ...initialState2,
      data: {
        ...initialState2.data,
        users: [...initialState2.data.users, addInstitutionUserAction2.payload.userId]
      }
    };
    expect(reducer(initialState2, addInstitutionUserAction2)).toEqual(expectedState);
  });

  it('should handle REMOVE_INSTITUTION_USER action', () => {
    const initialState = { data: mockInstitutionData, groups: mockInstitutionGroups };
    const userIdToRemove = mockInstitutionData.users[0];
    const removeInstitutionUserAction = {
      type: institutionActionTypes.REMOVE_INSTITUTION_USER,
      payload: {
        userId: userIdToRemove
      }
    };
    const expectedState = {
      ...initialState,
      data: {
        ...initialState.data,
        users: _.filter(initialState.data.users, stateUserId => stateUserId !== userIdToRemove)
      }
    };
    expect(reducer(initialState, removeInstitutionUserAction)).toEqual(expectedState);
  });
});
