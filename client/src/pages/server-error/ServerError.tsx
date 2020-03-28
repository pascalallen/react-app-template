import React from 'react';
import { useHistory } from 'react-router-dom';
import { defaultUserRedirect } from '@/router/common';
import PageContainer from '@/components/Layout/PageContainer/PageContainer';
import Logo from '@/components/Logo/Logo';
import ServerErrorImg from '@/assets/images/500.png';

const ServerError = () => {
  const history = useHistory();

  const handleRedirectUser = async (): Promise<void> => {
    await defaultUserRedirect(history);
  };

  return (
    <PageContainer name="server-error">
      <div className="row">
        <div className="col-md-2">
          <div id="logo-container" className="logo-container">
            <Logo />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div id="server-error-image-container" className="server-error-image-container text-center">
            <img
              id="server-error-image"
              className="server-error-image img-fluid"
              src={ServerErrorImg}
              alt="500 Server Error"
            />
          </div>
          <h4 id="server-error-header" className="server-error-header text-center">
            Internal Server Error
          </h4>
          <p id="server-error-help-text" className="text-center server-error-help-text mx-auto">
            We are experiencing an internal server problem. Please, try back later.
          </p>
          <div className="text-center">
            <button
              id="server-error-back-button"
              className="btn btn-primary server-error-back-button"
              onClick={handleRedirectUser}>
              Go Back
            </button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default ServerError;
