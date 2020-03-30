import { AppAction } from '@/types/redux';
import { FundingDataRecord } from '@/types/data';
import fundingActionTypes from '@/redux/fundings/fundingActionTypes';

export type State = {
  fundings: FundingDataRecord[];
};

export const initialState: State = {
  fundings: []
};

const reducer = (state: State = initialState, action: AppAction): State => {
  switch (action.type) {
    case fundingActionTypes.SET_FUNDINGS: {
      const { fundings } = action.payload;

      return { ...state, fundings };
    }
  }
  return state;
};

export default reducer;
