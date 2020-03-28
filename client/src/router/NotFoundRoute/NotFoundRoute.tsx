import React from 'react';
import { useHistory } from 'react-router-dom';
import { defaultUserRedirect } from '@/router/common';
import PageContainer from '@/components/Layout/PageContainer/PageContainer';
import Logo from '@/components/Logo/Logo';
import NotFoundImg from '@/assets/images/404.png';

const NotFoundRoute = () => {
  const history = useHistory();

  const handleRedirectUser = async (): Promise<void> => {
    await defaultUserRedirect(history);
  };

  return (
    <PageContainer name="not-found">
      <div className="row">
        <div className="col-md-2">
          <div id="logo-container" className="logo-container">
            <Logo />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div id="not-found-image-container" className="not-found-image-container text-center">
            <img id="not-found-image" className="not-found-image img-fluid" src={NotFoundImg} alt="404 Not Found" />
          </div>
          <h4 id="not-found-header" className="not-found-header text-center">
            Not Found
          </h4>
          <p id="not-found-help-text" className="text-center not-found-help-text mx-auto">
            Sorry, but the page you requested can not be found.
          </p>
          <div className="text-center">
            <button
              id="not-found--back-button"
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

export default NotFoundRoute;
