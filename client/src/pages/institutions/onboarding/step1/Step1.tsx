import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMatch } from '@/lib/customHooks';
import classnames from 'classnames';
import { routerPath } from '@/router/common';
import envHelper from '@/lib/helpers/envHelper';
import StepsContainer from '../common/Steps/StepsContainer';
import StepBar from '../common/Steps/StepBar';
import NavigateBack from '../common/NavigateBack/NavigateBack';
import GraphicImg from '@/assets/images/OME_graphic_placeholder.png';

const initialState: {
  downloaded: boolean;
} = {
  downloaded: false
};

const appBaseUrl = envHelper.getEnv(envHelper.envKeys.APP_BASE_URL);
const downloadPath = appBaseUrl ? `${appBaseUrl}/files/student-template` : '#';

const Step1 = () => {
  const history = useHistory();
  const { params } = useMatch();
  const institutionId = params.institutionId ?? '';

  const [downloaded, setDownloaded] = useState(initialState.downloaded);

  const onDownload = (): void => {
    setDownloaded(true);
  };

  const onNextStep = (): void => {
    history.push(`${routerPath.INSTITUTIONS}/${institutionId}/onboarding/step2`);
  };

  return (
    <div id="step-1-container" className="step-1-container">
      {/* to keep spacing */}
      <NavigateBack show={false} />
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <h3 className="heading-title">Welcome to Faculty</h3>
          <StepsContainer>
            <StepBar active checked={false} text="Step 1 - Download Template" />
            <StepBar active={false} checked={false} text="Step 2 - Upload Students" />
          </StepsContainer>
          <h4 className="body-title text-center">First, add your students</h4>
          <p className="body-text text-center p-0">
            Spicy jalapeno bacon ipsum dolor amet tri-tip landjaeger beef frankfurter, kielbasa tail strip steak
            brisket. Chislic salami meatloaf picanha pastrami.
          </p>
          <div className="graphic-container d-flex flex-column align-items-center justify-content-center">
            <img
              className="graphic-placeholder align-self-center img-fluid"
              src={GraphicImg}
              alt="Graphic Placeholder"
            />
            <div className="graphic-text align-self-center">OnlineMedEd Student Import.zip</div>
            <div className="graphic-sub-text align-self-center">100KB</div>
          </div>
          <div className="action-buttons-container d-flex align-items-center justify-content-center">
            <a
              id="step-1-download-template"
              className="btn btn-primary action-button"
              href={downloadPath}
              download="OnlineMedEd Student Import.zip"
              tabIndex={0}
              onClick={onDownload}>
              <span className="action-button-text">Download Template</span>
            </a>
            <button
              id="step-1-download-template-next"
              className={classnames(
                'btn btn-primary action-button action-button-last',
                !downloaded ? 'btn-disabled cursor-not-allowed' : ''
              )}
              tabIndex={1}
              disabled={!downloaded}
              onClick={onNextStep}>
              <div className="action-button-text overflow-hidden text-nowrap w-100">Next</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step1;
