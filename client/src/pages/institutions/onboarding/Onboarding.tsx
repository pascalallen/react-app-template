import React, { useEffect, useState } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useMatch } from '@/lib/customHooks';
import { permission } from '@/constants/userAccess';
import { routerPath } from '@/router/common';
import { Job } from '@/types/data';
import { State as InstitutionState } from '@/redux/institution/institutionReducer';
import { ReduxThunkDispatch, RootState } from '@/types/redux';
import { mapDispatchToProps } from '@/lib/helpers/reduxHelper';
import { subscribeMercureEventSource } from '@/lib/common';
import { jobType, jobStatus } from '@/constants/jobs';
import jobsActions from '@/redux/jobs/jobsActions';
import institutionApi from '@/api/institutionApi';
import systemApi from '@/api/systemApi';
import PageContainer from '@/components/Layout/PageContainer/PageContainer';
import AuthorizedRoute from '@/router/AuthorizedRoute';
import NotFoundRoute from '@/router/NotFoundRoute/NotFoundRoute';
import Header from './common/Header/Header';
import NeedHelpModal from './common/NeedHelpModal/NeedHelpModal';
import Step1 from './step1/Step1';
import Step2 from './step2/Step2';
import Error from './error/Error';
import Loading from './loading/Loading';

type Props = {
  dispatch: ReduxThunkDispatch;
  institution: InstitutionState;
  job: Job | null;
};

const initialState: {
  showHelpModal: boolean;
  loadingDisplayMessage: string;
} = {
  showHelpModal: false,
  loadingDisplayMessage: ''
};

const loadingDisplayMessages = {
  UPLOADING: 'Uploading your puuurfect students...',
  PROCESSING: 'Processing students...',
  SUCCESS: 'Upload successful!'
};

let mercureJobListener: EventSource;
let apiJobListener: NodeJS.Timeout;

const Onboarding = (props: Props) => {
  const { params } = useMatch();
  const { pathname } = useLocation();
  const { dispatch, institution, job } = props;
  const history = useHistory();

  const isLoadingRoute = pathname === `${routerPath.INSTITUTIONS}/${institution.data?.id}/onboarding/loading`;

  const [showHelpModal, setShowHelpModal] = useState(initialState.showHelpModal);
  const [loadingDisplayMessage, setLoadingDisplayMessage] = useState(initialState.loadingDisplayMessage);

  const onToggleHelpModal = () => setShowHelpModal(!showHelpModal);

  const handleOnboardingFileUpload = async (file: File | null): Promise<void> => {
    if (!institution.data?.id) {
      return history.replace(routerPath.FORBIDDEN);
    }

    if (!file) {
      return history.replace(routerPath.CLIENT_ERROR);
    }

    try {
      history.push(`${routerPath.INSTITUTIONS}/${params.institutionId}/onboarding/loading`);
      setLoadingDisplayMessage(loadingDisplayMessages.UPLOADING);

      const formData = new FormData();
      formData.append('file', file);
      const res = await institutionApi.uploadStudents(institution.data.id, formData);
      if (!res.data?.job_id) {
        return history.replace(routerPath.SERVER_ERROR);
      }

      dispatch(jobsActions.setJob(jobType.IMPORT_STUDENTS, { id: res.data.job_id, job_status: jobStatus.STARTED }));
    } catch (error) {
      return history.replace(routerPath.SERVER_ERROR);
    }
  };

  const clearJobListeners = (): void => {
    if (!!mercureJobListener) {
      mercureJobListener.close();
    }

    if (!!apiJobListener) {
      clearInterval(apiJobListener);
    }
  };

  const handleJobStatus = (jobApiData: Job) => {
    if (jobApiData.job_status === jobStatus.STARTED) {
      return;
    }

    if (jobApiData.job_status === jobStatus.COMPLETED) {
      clearJobListeners();
      setLoadingDisplayMessage(loadingDisplayMessages.SUCCESS);
      setTimeout(() => {
        dispatch(jobsActions.setJob(jobType.IMPORT_STUDENTS, jobApiData));
      }, 5000);
    }

    if (jobApiData.job_status === jobStatus.FAILED) {
      clearJobListeners();
      dispatch(jobsActions.setJob(jobType.IMPORT_STUDENTS, jobApiData));
    }
  };

  const handleStartedJob = () => {
    if (!job) {
      return history.replace(routerPath.CLIENT_ERROR);
    }

    setLoadingDisplayMessage(loadingDisplayMessages.PROCESSING);

    mercureJobListener = subscribeMercureEventSource(job.id);
    mercureJobListener.onmessage = event => {
      const jobData = JSON.parse(event.data);
      handleJobStatus(jobData);
    };

    apiJobListener = setInterval(async () => {
      try {
        const res = await systemApi.getJob(job.id);
        if (!res.data) {
          clearJobListeners();
          return history.replace(routerPath.SERVER_ERROR);
        }
        handleJobStatus(res.data);
      } catch (error) {
        clearJobListeners();
        return history.replace(routerPath.SERVER_ERROR);
      }
    }, 60000);
  };

  const handleCompletedJob = () => {
    history.replace(`${routerPath.INSTITUTIONS}/${params.institutionId}`);
    dispatch(jobsActions.clearJob(jobType.IMPORT_STUDENTS));
  };

  const handleFailedJob = () => {
    // * This will run on component mount or if the status of the job changes to FAILED
    clearJobListeners();
    history.replace(`${routerPath.INSTITUTIONS}/${params.institutionId}/onboarding/error`);
  };

  const handleClearJob = () => {
    dispatch(jobsActions.clearJob(jobType.IMPORT_STUDENTS));
    history.replace(`${routerPath.INSTITUTIONS}/${params.institutionId}/onboarding/step2`);
  };

  useEffect(() => {
    if (job?.job_status === jobStatus.STARTED) {
      handleStartedJob();
    }

    if (job?.job_status === jobStatus.COMPLETED) {
      handleCompletedJob();
    }

    if (job?.job_status === jobStatus.FAILED) {
      handleFailedJob();
    }

    // * Invalid state: user refreshed the page while uploading the file
    if (!job && isLoadingRoute) {
      return history.replace(`${routerPath.INSTITUTIONS}/${params.institutionId}/onboarding/step2`);
    }
  }, [job]);

  const renderRoutes = () => {
    return (
      <Switch>
        <AuthorizedRoute exact path={routerPath.INSTITUTION_ONBOARDING} requiredPerms={[permission.MANAGE_ONBOARDING]}>
          <Step1 />
        </AuthorizedRoute>
        <AuthorizedRoute path={routerPath.INSTITUTION_ONBOARDING_STEP2} requiredPerms={[permission.MANAGE_ONBOARDING]}>
          <Step2 onOnboardingFileUpload={handleOnboardingFileUpload} />
        </AuthorizedRoute>
        <AuthorizedRoute
          path={routerPath.INSTITUTION_ONBOARDING_LOADING}
          requiredPerms={[permission.MANAGE_ONBOARDING]}>
          <Loading displayMessage={loadingDisplayMessage} />
        </AuthorizedRoute>
        <AuthorizedRoute path={routerPath.INSTITUTION_ONBOARDING_ERROR} requiredPerms={[permission.MANAGE_ONBOARDING]}>
          <Error eventMessage={job?.event_message} onClearJob={handleClearJob} />
        </AuthorizedRoute>
        {/*Fallback 404 Route*/}
        <Route>
          <NotFoundRoute />
        </Route>
      </Switch>
    );
  };

  return (
    <PageContainer name="onboarding">
      {showHelpModal && <NeedHelpModal show={showHelpModal} onClose={onToggleHelpModal} />}
      <Header />
      {renderRoutes()}
      {!isLoadingRoute && (
        <div id="need-help-container" className="need-help-container d-flex align-items-center justify-content-center">
          <button
            id="onboarding-need-help-link"
            className="btn btn-link need-help-link text-center p-0"
            onClick={onToggleHelpModal}>
            <span className="need-help-link-text font-size-sm">Need Help?</span>
          </button>
        </div>
      )}
    </PageContainer>
  );
};

const mapStateToProps = (state: RootState) => ({
  institution: state.institution,
  job: state.jobs[jobType.IMPORT_STUDENTS] ?? null
});

export default connect(mapStateToProps, mapDispatchToProps)(Onboarding);
