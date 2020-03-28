import React from 'react';
import LoadingCat from '@/components/LoadingCat/LoadingCat';
import StepBar from '../common/Steps/StepBar';
import StepsContainer from '../common/Steps/StepsContainer';

type Props = {
  displayMessage: string;
};

const Loading = (props: Props) => {
  const { displayMessage } = props;
  return (
    <div id="loading-cat-page-container" className="loading-cat-page-container">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <h3 className="heading-title">Welcome to Faculty</h3>
          <StepsContainer>
            <StepBar active checked text="Step 1 - Download Template" />
            <StepBar active checked text="Step 2 - Upload Students" />
          </StepsContainer>
          <LoadingCat />
          <h4 className="body-title text-center">{displayMessage}</h4>
        </div>
      </div>
    </div>
  );
};

export default Loading;
