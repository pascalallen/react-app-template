import React from 'react';
import { Spinner } from 'react-bootstrap';

const LoadingPage = () => {
  return (
    <div className="loading-page-container d-flex align-items-center justify-content-center vh-100">
      <Spinner animation="grow" />
    </div>
  );
};

export default LoadingPage;
