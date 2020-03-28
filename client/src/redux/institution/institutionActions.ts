import { Dispatch } from 'redux';
import institutionApi from '@/api/institutionApi';
import errorHelper from '@/lib/helpers/errorHelper';
import { appErrorMessages } from '@/constants/errors';
import { InstitutionData } from '@/types/data';
import institutionActionTypes from '@/redux/institution/institutionActionTypes';

const setInstitution = (data: InstitutionData) => (dispatch: Dispatch): void => {
  dispatch({
    type: institutionActionTypes.SET_INSTITUTION,
    payload: { data }
  });
};

const clearInstitution = () => (dispatch: Dispatch): void => {
  dispatch({
    type: institutionActionTypes.CLEAR_INSTITUTION
  });
};

const getInstitutionGroups = (institutionId: string) => async (dispatch: Dispatch): Promise<void> => {
  const res = await institutionApi.getGroups(institutionId);

  if (!res.data.records) {
    throw errorHelper.makeAppError(appErrorMessages.UNEXPECTED_API_OBJECT);
  }

  dispatch({
    type: institutionActionTypes.SET_INSTITUTION_GROUPS,
    payload: {
      groups: res.data.records
    }
  });
};

const registerFacultyMember = (
  institutionId: string,
  params: {
    first_name: string;
    last_name: string;
    email: string;
  }
) => async (dispatch: Dispatch): Promise<void> => {
  const res = await institutionApi.registerFacultyMember(institutionId, params);

  if (!res.data?.id) {
    throw errorHelper.makeAppError(appErrorMessages.UNEXPECTED_API_OBJECT);
  }

  dispatch({
    type: institutionActionTypes.ADD_INSTITUTION_USER,
    payload: { userId: res.data.id }
  });
};

const removeFacultyMember = (institutionId: string, userId: string) => async (dispatch: Dispatch): Promise<void> => {
  await institutionApi.removeFacultyMember(institutionId, userId);

  dispatch({
    type: institutionActionTypes.REMOVE_INSTITUTION_USER,
    payload: { userId }
  });
};

export default Object.freeze({
  setInstitution,
  clearInstitution,
  getInstitutionGroups,
  registerFacultyMember,
  removeFacultyMember
});
