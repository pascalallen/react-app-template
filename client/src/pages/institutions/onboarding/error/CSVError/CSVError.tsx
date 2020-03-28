import React from 'react';
import InfoImg from '@/assets/images/icon_info.png';

type Props = {
  errorColumns: {
    first_name: boolean;
    last_name: boolean;
    email_address: boolean;
    class_year: boolean;
  };
};

const message = {
  VALID: 'Puuurfect',
  INVALID: 'Errors found'
};

const CSVError = (props: Props) => {
  const { errorColumns } = props;

  return (
    <div className="row">
      <div className="col-md-8 offset-md-2">
        <h4 id="csv-error-heading" className="body-title text-center">
          Oops! There are multiple errors on your spreadsheet
        </h4>
        <p className="body-text text-center p-0">
          Make sure the names and email addresses are correct, and that there are only numeric values in the year
          column. Please fix the following errors and try again.
        </p>
        <div className="info-notification-container d-inline-flex">
          <img className="info-notification-img img-fluid" src={InfoImg} alt="Info Notification Placeholder" />
          <span className="info-notification-text">Columns with errors are highlighted</span>
        </div>
        <div className="onboarding-table-container">
          <table className="table table-bordered onboarding-table">
            <thead>
              <tr>
                <th scope="col" className={!errorColumns.first_name ? 'table-danger' : ''}>
                  First Name{' '}
                  {errorColumns.first_name ? <span className="fas fa-check-circle float-right font-size-lg" /> : null}
                </th>
                <th scope="col" className={!errorColumns.last_name ? 'table-danger' : ''}>
                  Last Name{' '}
                  {errorColumns.last_name ? <span className="fas fa-check-circle float-right font-size-lg" /> : null}
                </th>
                <th scope="col" className={!errorColumns.email_address ? 'table-danger' : ''}>
                  Email{' '}
                  {errorColumns.email_address ? (
                    <span className="fas fa-check-circle float-right font-size-lg" />
                  ) : null}
                </th>
                <th scope="col" className={!errorColumns.class_year ? 'table-danger' : ''}>
                  Class Year{' '}
                  {errorColumns.class_year ? <span className="fas fa-check-circle float-right font-size-lg" /> : null}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={!errorColumns.first_name ? 'text-danger' : 'text-success'}>
                  {!errorColumns.first_name ? message.INVALID : message.VALID}
                </td>
                <td className={!errorColumns.last_name ? 'text-danger' : 'text-success'}>
                  {!errorColumns.last_name ? message.INVALID : message.VALID}
                </td>
                <td className={!errorColumns.email_address ? 'text-danger' : 'text-success'}>
                  {!errorColumns.email_address ? message.INVALID : message.VALID}
                </td>
                <td className={!errorColumns.class_year ? 'text-danger' : 'text-success'}>
                  {!errorColumns.class_year ? message.INVALID : message.VALID}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CSVError;
