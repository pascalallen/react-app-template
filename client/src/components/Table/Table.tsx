import React from 'react';
import { RootState } from '@/types/redux';
import { connect } from 'react-redux';
import { FundingDataRecord } from '@/types/data';

type Props = {
  fundings: FundingDataRecord[];
};

const Table = (props: Props) => {
  const { fundings } = props;

  return (
    <table className="table">
      <thead>
      <tr>
        <th scope="col">Debtor</th>
        <th scope="col">Invoice #</th>
        <th scope="col">Invoice Date</th>
        <th scope="col">Due Date</th>
        <th scope="col">PO</th>
        <th scope="col">Amount</th>
        <th scope="col">Additional Details</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <th scope="row">
          <select name="debtor" id="debtor-select" className="form-control">
            <option selected>Choose Debtor</option>
            <option>...</option>
          </select>
        </th>
        <td>
          <input type="text" className="form-control" id="invoice_number" />
        </td>
        <td>
          <input type="date" className="form-control" id="date" />
        </td>
        <td>
          <select name="due_date" id="due-date" className="form-control">
            <option selected>20</option>
            <option>...</option>
          </select>
        </td>
        <td>
          <input type="text" className="form-control" id="po" />
        </td>
        <td>
          <input type="text" className="form-control" id="amount" />
        </td>
        <td>
          <input type="text" className="form-control" id="details" />
        </td>
      </tr>
      <tr>
        <th scope="row">1</th>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
        <td>@mdo</td>
        <td>@mdo</td>
        <td>@mdo</td>
      </tr>
      </tbody>
    </table>
  );
};

const mapStateToProps = (state: RootState) => ({
  fundings: state.fundings
});


export default connect(mapStateToProps, null)(Table);
