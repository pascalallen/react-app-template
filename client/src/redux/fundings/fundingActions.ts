import { Dispatch } from 'redux';
import fundingApi from '@/api/funding';
import fundingActionTypes from '@/redux/fundings/fundingActionTypes';

const getFundings = () => async (dispatch: Dispatch): Promise<void> => {
  // const res = await fundingApi.getFundings();

  // if (!res.data.records) {
  //   throw new Error('Something went wrong!')
  // }

  dispatch({
    type: fundingActionTypes.SET_FUNDINGS,
    payload: {
      fundings: [
        {
          debtor_name: 'test',
          invoice_number: '0001',
          invoice_date: new Date(),
          days_due: 20,
          po_number: '123',
          amount: 5000,
          additional_details: 'test'
        },
        {
          debtor_name: 'test',
          invoice_number: '0001',
          invoice_date: new Date(),
          days_due: 20,
          po_number: '123',
          amount: 5000,
          additional_details: 'test'
        },
      ]// res.data.records
    }
  });
};
