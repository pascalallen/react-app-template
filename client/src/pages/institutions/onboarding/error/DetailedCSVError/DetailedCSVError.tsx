import React, { useState } from 'react';
import InfoImg from '@/assets/images/icon_info.png';
import TableData from './TableData/TableData';

type CSVErrorObject = {
  valid: boolean;
  value: string | number;
  message: string;
};

type CSVErrorRecord = {
  line: number;
  first_name: CSVErrorObject;
  last_name: CSVErrorObject;
  email_address: CSVErrorObject;
  class_year: CSVErrorObject;
};

type Props = {
  errorColumns: {
    first_name: boolean;
    last_name: boolean;
    email_address: boolean;
    class_year: boolean;
  };
  errorRecords: CSVErrorRecord[];
};

const DetailedCSVError = (props: Props) => {
  const { errorColumns, errorRecords } = props;
  const [activeRowIndex, setActiveRowIndex] = useState<number | null>(null);
  const [hovered, setHovered] = useState(false);

  return (
    <div className="detailed-csv-error-container">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <h4 id="detailed-csv-error-heading" className="body-title text-center">
            Oops! There are a few errors on your spreadsheet
          </h4>
          <p className="body-text text-center p-0">
            Make sure the names and email addresses are correct, and that there are only numeric values in the year
            column. Please fix the following errors and try again.
          </p>
        </div>
      </div>
      <div className="row onboarding-table-container">
        <div className="col-md-10">
          <div className="offset-md-2 pl-2 info-notification-container d-inline-flex">
            <img className="info-notification-img img-fluid" src={InfoImg} alt="Info Notification Placeholder" />
            <span className="info-notification-text">Fields with errors are highlighted</span>
          </div>
          <table className="table table-bordered onboarding-table border-0">
            <thead>
              <tr>
                <th scope="col" className="bg-transparent border-0" />
                <th scope="col">
                  First Name{' '}
                  {errorColumns.first_name ? <span className="fas fa-check-circle float-right font-size-lg" /> : null}
                </th>
                <th scope="col">
                  Last Name{' '}
                  {errorColumns.last_name ? <span className="fas fa-check-circle float-right font-size-lg" /> : null}
                </th>
                <th scope="col">
                  Email{' '}
                  {errorColumns.email_address ? (
                    <span className="fas fa-check-circle float-right font-size-lg" />
                  ) : null}
                </th>
                <th scope="col">
                  Class Year{' '}
                  {errorColumns.class_year ? <span className="fas fa-check-circle float-right font-size-lg" /> : null}
                </th>
              </tr>
            </thead>
            <tbody className="onboarding-table-tbody" onMouseLeave={() => setHovered(false)}>
              {errorRecords.map((record: CSVErrorRecord, idx: number) => (
                <tr
                  key={`csv-error-tr-${idx}`}
                  className={activeRowIndex !== idx && hovered ? 'disabled' : ''}
                  onMouseEnter={() => {
                    setHovered(true);
                    setActiveRowIndex(idx);
                  }}
                  onMouseLeave={() => setActiveRowIndex(null)}>
                  <td id={`line-indicator-${record.line}`} className="csv-line-number border-0 float-right pb-0 pt-1">
                    <span className="badge badge-primary rounded d-flex align-items-center justify-content-center">
                      Line {record.line}
                    </span>
                  </td>
                  <TableData
                    withTooltip={!record.first_name.valid}
                    data={record.first_name}
                    onMouseEnter={() => setActiveRowIndex(idx)}
                  />
                  <TableData
                    withTooltip={!record.last_name.valid}
                    data={record.last_name}
                    onMouseEnter={() => setActiveRowIndex(idx)}
                  />
                  <TableData
                    withTooltip={!record.email_address.valid}
                    data={record.email_address}
                    onMouseEnter={() => setActiveRowIndex(idx)}
                  />
                  <TableData
                    withTooltip={!record.class_year.valid}
                    data={record.class_year}
                    onMouseEnter={() => setActiveRowIndex(idx)}
                  />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DetailedCSVError;
