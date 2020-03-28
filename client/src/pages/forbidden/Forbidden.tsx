import React from 'react';
import { useHistory } from 'react-router-dom';
import { defaultUserRedirect } from '@/router/common';
import PageContainer from '@/components/Layout/PageContainer/PageContainer';
import Logo from '@/components/Logo/Logo';
import ForbiddenImg from '@/assets/images/403.png';

const Forbidden = () => {
  const history = useHistory();

  const handleRedirectUser = async (): Promise<void> => {
    await defaultUserRedirect(history);
  };

  return (
    <PageContainer name="forbidden">
      <div className="row">
        <div className="col-md-2">
          <div id="logo-container" className="logo-container">
            <Logo />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div id="forbidden-image-container" className="forbidden-image-container text-center">
            <img id="forbidden-image" className="forbidden-image img-fluid" src={ForbiddenImg} alt="403 Forbidden" />
          </div>
          <h4 id="forbidden-header" className="forbidden-header text-center">
            Access Denied
          </h4>
          <p id="forbidden-help-text" className="text-center forbidden-help-text mx-auto">
            Sorry, but you don&apos;t have permission to access this page. Please contact your admin if you feel this is
            a mistake.
          </p>
          <div className="text-center">
            <button
              id="forbidden-back-button"
              className="btn btn-primary forbidden-back-button"
              onClick={handleRedirectUser}>
              Go Back
            </button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Forbidden;
