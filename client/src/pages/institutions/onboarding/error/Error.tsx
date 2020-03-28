import React from 'react';
import { Redirect } from 'react-router-dom';
import domainEvents from '@/constants/domainEvents';
import { EventMessage } from '@/types/data';
import { getEventName } from '@/lib/helpers/domainEventHelper';
import { routerPath } from '@/router/common';
import NavigateBack from '../common/NavigateBack/NavigateBack';
import StepBar from '../common/Steps/StepBar';
import StepsContainer from '../common/Steps/StepsContainer';
import CSVError from './CSVError/CSVError';
import DetailedCSVError from './DetailedCSVError/DetailedCSVError';
import MaxStudentsExceeded from './MaxStudentsExceeded/MaxStudentsExceeded';
import StudentsImportFailed from './StudentsImportFailed/StudentsImportFailed';

type Props = {
  onClearJob: () => void;
  eventMessage?: EventMessage | null;
};

const Error = (props: Props) => {
  const { eventMessage, onClearJob } = props;

  if (!eventMessage) {
    return <Redirect to={routerPath.CLIENT_ERROR} />;
  }

  const eventName = getEventName(eventMessage);
  const eventPayload = eventMessage.payload;

  return (
    <div id="onboarding-error-page-container" className="onboarding-error-page-container">
      <NavigateBack />
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <h3 className="heading-title">Welcome to Faculty</h3>
          <StepsContainer>
            <StepBar active checked text="Step 1 - Download Template" />
            <StepBar active checked={false} text="Step 2 - Upload Students" />
          </StepsContainer>
        </div>
      </div>
      {eventName === domainEvents.STUDENTS_IMPORT_INVALID && eventPayload.total_lines > 10 ? (
        <CSVError errorColumns={eventPayload.columns} />
      ) : null}
      {eventName === domainEvents.STUDENTS_IMPORT_INVALID && eventPayload.total_lines <= 10 ? (
        <DetailedCSVError errorColumns={eventPayload.columns} errorRecords={eventPayload.records} />
      ) : null}
      {eventName === domainEvents.MAX_STUDENTS_EXCEEDED ? (
        <MaxStudentsExceeded institutionName={eventPayload.institution_name} maxStudents={eventPayload.max_students} />
      ) : null}
      {eventName === domainEvents.STUDENTS_IMPORT_FAILED ? (
        <StudentsImportFailed errorMessage={eventPayload.error_message} />
      ) : null}
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="graphic-text text-center font-size-md">Please fix errors and reupload</div>
          <div className="reupload-button-container d-flex align-items-center justify-content-center">
            <button id="reupload-button" className="btn btn-primary reupload-button" tabIndex={0} onClick={onClearJob}>
              <div className="reupload-button-text overflow-hidden text-nowrap w-100">Reupload</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;
