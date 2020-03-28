import _ from 'lodash';
import { AppAction } from '@/types/redux';
import appActionTypes from '@/redux/appActionTypes';
import institutionActionTypes from '@/redux/institution/institutionActionTypes';
import { InstitutionData, InstitutionsGroupsDataRecord } from '@/types/data';

export type State = {
  data: InstitutionData | null;
  groups: InstitutionsGroupsDataRecord[];
};

export const initialState: State = { data: null, groups: [] };

const reducer = (state: State = initialState, action: AppAction): State => {
  switch (action.type) {
    case institutionActionTypes.SET_INSTITUTION: {
      const { data } = action.payload;

      return { ...state, data };
    }
    case institutionActionTypes.CLEAR_INSTITUTION: {
      return initialState;
    }
    case institutionActionTypes.SET_INSTITUTION_GROUPS: {
      const { groups } = action.payload;

      return { ...state, groups };
    }
    case appActionTypes.APP_CLEAR_STATE: {
      return initialState;
    }
    case institutionActionTypes.ADD_INSTITUTION_USER: {
      const { userId } = action.payload;

      if (!state.data) {
        return state;
      }

      return {
        ...state,
        data: {
          ...state.data,
          users: [...state.data.users, userId]
        }
      };
    }
    case institutionActionTypes.REMOVE_INSTITUTION_USER: {
      const { userId } = action.payload;

      if (!state.data) {
        return state;
      }

      return {
        ...state,
        data: {
          ...state.data,
          users: _.filter(state.data.users, stateUserId => stateUserId !== userId)
        }
      };
    }
  }
  return state;
};

export default reducer;
